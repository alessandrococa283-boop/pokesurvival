G.ActiveAbilities = (() => {
  function initialize(pl) {
    pl.abilityCooldowns = pl.abilityCooldowns || { dash: 0, shield: 0, ultimate: 0 };
    pl.dashT = pl.dashT || 0;
    pl.dashDir = pl.dashDir || [Math.cos(pl.moveAngle), Math.sin(pl.moveAngle)];
  }

  function allowed(pl) {
    return !!pl && !pl.dead && !pl.frozen && G.Game.state === 'playing';
  }

  function dash(pl) {
    if (!allowed(pl)) return false;
    initialize(pl);
    if (pl.abilityCooldowns.dash > 0 || pl.dashT > 0) return false;
    const axis = G.Input.axis();
    const moving = axis && (axis[0] || axis[1]);
    pl.dashDir = moving ? axis : [Math.cos(pl.moveAngle), Math.sin(pl.moveAngle)];
    pl.dashT = G.AbilityData.DASH.duration;
    pl.abilityCooldowns.dash = G.AbilityData.DASH.cooldown;
    pl.invuln = Math.max(pl.invuln, pl.dashT + 0.04);
    G.FX.ring(pl.x, pl.y, 8, pl.r * 2.2, '#9feaff', 0.25, 3);
    G.Audio.sfx('select');
    return true;
  }

  function shield(pl) {
    if (!allowed(pl)) return false;
    initialize(pl);
    if (pl.abilityCooldowns.shield > 0 || pl.shieldT > 0) return false;
    const cfg = G.AbilityData.SHIELD;
    pl.shieldHp = Math.min(pl.maxHp * cfg.capacity, Math.max(0, pl.maxHp * cfg.capacity));
    pl.shieldT = cfg.duration;
    pl.abilityCooldowns.shield = cfg.cooldown;
    G.FX.ring(pl.x, pl.y, pl.r, pl.r * 3, '#82e8ff', 0.55, 4);
    G.Audio.sfx('heal');
    return true;
  }

  function ultimateConfig(pl) {
    const base = G.AbilityData.ULTIMATE;
    const type = (pl.mon.types || ['normal'])[0];
    const mode = G.Game.storyMode ? 'story' : 'survival';
    return Object.assign({}, base, base.byMode[mode], base.bySpecies[pl.dex], base.byType[type], { type });
  }

  function ultimateUnlocked(pl, cfg = ultimateConfig(pl)) {
    return pl.level >= cfg.unlockLevel || (cfg.unlockAfterEvolution && pl.evolutionCount > 0);
  }

  function ultimate(pl) {
    if (!allowed(pl)) return false;
    initialize(pl);
    const cfg = ultimateConfig(pl);
    if (!ultimateUnlocked(pl, cfg)) {
      G.UI.toast('La habilidad definitiva se desbloquea al nivel ' + cfg.unlockLevel + ' o al evolucionar.');
      return false;
    }
    if (pl.abilityCooldowns.ultimate > 0) return false;
    const radius = G.U.clamp(cfg.radius + pl.level * 1.5, cfg.radius, 420);
    const targets = G.EnemyMgr.all()
      .filter(e => !e.dead && G.U.dist2(e.x, e.y, pl.x, pl.y) <= radius * radius)
      .sort((a, b) => G.U.dist2(a.x, a.y, pl.x, pl.y) - G.U.dist2(b.x, b.y, pl.x, pl.y));
    if (cfg.effect === 'chain') targets.length = Math.min(targets.length, cfg.targets || 6);
    const damage = Math.min(1e7, pl.atk * cfg.damage + pl.level * 5);
    for (const e of targets) {
      const dx = e.x - pl.x, dy = e.y - pl.y;
      const multiplier = G.Types.mult(cfg.type, e.types) * G.Weather.mult(cfg.type);
      e.hurt(damage * multiplier, cfg.color, dx, dy, cfg.effect === 'knock' ? 220 : 90);
      if (cfg.effect === 'burn') { e.burn = Math.min(3, (e.burn || 0) + 1); e.burnT = Math.max(e.burnT || 0, 3); }
      if (cfg.effect === 'poison') { e.poison = Math.min(3, (e.poison || 0) + 1); e.poisonT = Math.max(e.poisonT || 0, 4); }
      if (cfg.effect === 'slow') { e.slow = Math.max(e.slow || 0, 0.45); e.slowT = Math.max(e.slowT || 0, 3); }
    }
    G.FX.ring(pl.x, pl.y, 12, radius, cfg.color, 0.65, 7);
    G.FX.burst(pl.x, pl.y - pl.bodyH * 0.5, cfg.color, Math.min(64, 18 + targets.length), 210);
    pl.abilityCooldowns.ultimate = cfg.cooldown;
    G.Audio.sfx('legend');
    return true;
  }

  function update(pl, dt) {
    initialize(pl);
    for (const key of Object.keys(pl.abilityCooldowns)) {
      pl.abilityCooldowns[key] = Math.max(0, pl.abilityCooldowns[key] - dt);
    }
    pl.dashT = Math.max(0, pl.dashT - dt);
    if (pl.dashT > 0) pl.invuln = Math.max(pl.invuln, dt + 0.02);
  }

  function movement(pl, ax, ay) {
    initialize(pl);
    return pl.dashT > 0
      ? { ax: pl.dashDir[0], ay: pl.dashDir[1], speed: G.AbilityData.DASH.speed }
      : { ax, ay, speed: 1 };
  }

  return { dash, shield, ultimate, ultimateConfig, ultimateUnlocked, update, movement };
})();
