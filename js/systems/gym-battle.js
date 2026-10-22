/* ============ gym-battle.js — portales y combates de gimnasio en Historia ============ */
G.GymBattle = (() => {
  const R = 11, ARENA_X = 7600, ARENA_Y = 7600;
  const TS = () => G.Tiles.T * G.Sprites.PX;
  const authority = () => !G.Coop.active || G.Coop.isHost;
  let story = false, portal = null, fight = null, replayIndex = 0;
  const art = new Map();

  function image(src) {
    let entry = art.get(src);
    if (entry) return entry;
    const img = new Image();
    entry = { img, ready: false };
    img.onload = () => { entry.ready = true; };
    img.onerror = () => console.warn('[GymBattle] No se pudo cargar la imagen:', src);
    img.src = src;
    art.set(src, entry);
    return entry;
  }

  function drawHud(ctx, w) {
    if (!fight) return;
    const gym = fight.gym;
    const portrait = image(gym.leaderImage), badge = image(gym.medalImage);
    const cardW = Math.min(256, w - 20), cardH = 70;
    const x = (w - cardW) / 2, y = 88;
    ctx.save();
    ctx.fillStyle = 'rgba(10,16,28,.88)';
    ctx.strokeStyle = 'rgba(255,210,63,.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.arcTo(x + cardW, y, x + cardW, y + cardH, 10);
    ctx.arcTo(x + cardW, y + cardH, x, y + cardH, 10);
    ctx.arcTo(x, y + cardH, x, y, 10);
    ctx.arcTo(x, y, x + cardW, y, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    if (portrait.ready) {
      const scale = Math.min(46 / portrait.img.naturalWidth, 60 / portrait.img.naturalHeight);
      const pw = portrait.img.naturalWidth * scale, ph = portrait.img.naturalHeight * scale;
      ctx.drawImage(portrait.img, x + 30 - pw / 2, y + 35 - ph / 2, pw, ph);
    }
    if (badge.ready) {
      const scale = Math.min(36 / badge.img.naturalWidth, 36 / badge.img.naturalHeight);
      const bw = badge.img.naturalWidth * scale, bh = badge.img.naturalHeight * scale;
      ctx.drawImage(badge.img, x + cardW - 28 - bw / 2, y + 35 - bh / 2, bw, bh);
    }
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd23f';
    ctx.font = '800 12px Pixelify,"Segoe UI",system-ui,sans-serif';
    ctx.fillText(gym.leader, x + cardW / 2, y + 27);
    ctx.fillStyle = '#f4f8ff';
    ctx.font = '700 9px Pixelify,"Segoe UI",system-ui,sans-serif';
    ctx.fillText(gym.medal, x + cardW / 2, y + 45);
    ctx.fillStyle = '#9fb1c9';
    ctx.font = '600 8px Pixelify,"Segoe UI",system-ui,sans-serif';
    ctx.fillText(gym.city, x + cardW / 2, y + 59);
    ctx.restore();
  }

  function reset(enabled = false) {
    story = !!enabled;
    portal = null;
    fight = null;
    replayIndex = 0;
  }

  function medals() {
    const save = G.DB.save;
    if (!save) return {};
    save.gymMedals = save.gymMedals || {};
    return save.gymMedals;
  }

  function nextGym(level) {
    const pending = G.GymLeaders.LIST.find(gym => !medals()[gym.id]);
    if (pending && level >= pending.appearanceLevel) return pending;
    const defeated = G.GymLeaders.LIST.filter(gym => medals()[gym.id] && level >= gym.appearanceLevel);
    return defeated.length
      ? defeated[replayIndex % defeated.length]
      : pending || G.GymLeaders.LIST[replayIndex % G.GymLeaders.LIST.length];
  }

  function openPortal(gym, pl) {
    for (let i = 0; i < 16; i++) {
      const a = Math.random() * Math.PI * 2, d = G.U.rand(220, 330);
      const x = pl.x + Math.cos(a) * d, y = pl.y + Math.sin(a) * d * 0.85;
      if (!G.World.isFree(x, y, 24)) continue;
      portal = { gym, x, y, t: 0 };
      G.Sprites.preload([gym.pokemon]);
      G.Spawner.say('¡' + gym.leader + ' ha aparecido en ' + gym.city + '! Su ' + G.DEX_BY[gym.pokemon].name + ' está al nivel ' + gym.pokemonLevel + '. Entra en el portal para desafiarle.', 5);
      if (G.Coop.isHost) G.Coop.broadcast(['gym', 'portal', { id: gym.id, x, y }]);
      return;
    }
  }

  function update(dt, pl, time) {
    if (!story) return;
    if (fight) {
      arenaTick(dt);
      return;
    }
    if (!authority()) return;
    const gym = nextGym(pl.level);
    if (!gym || !pl || pl.dead) return;
    if (!portal && pl.level >= gym.appearanceLevel) openPortal(gym, pl);
    if (!portal) return;
    portal.t += dt;
    if (G.U.dist2(pl.x, pl.y, portal.x, portal.y - 10) < 36 * 36) enter();
  }

  function enter() {
    if (!portal || fight || !authority()) return;
    const gym = portal.gym;
    const idx = gym.order - 1;
    const cfg = {
      id: gym.id,
      tx: ARENA_X + idx * 40,
      ty: ARENA_Y + idx * 40,
      r: R,
      type: gym.type
    };
    if (G.Coop.isHost) G.Coop.broadcast(['gym', 'start', cfg]);
    begin(cfg);
  }

  function begin(cfg) {
    if (fight) return;
    const gym = G.GymLeaders.BY_ID[cfg.id];
    if (!gym) return;
    image(gym.leaderImage);
    image(gym.medalImage);
    const pl = G.Game.player;
    const ts = TS();
    const positions = new Map();
    for (const p of G.Game.everyone()) positions.set(p.uid || 'local', { x: p.x, y: p.y });
    const center = { x: cfg.tx * ts + ts / 2, y: cfg.ty * ts + ts / 2 };
    fight = { gym, cfg, center, positions, biome: G.World.biome, t: 0, downT: 0, endT: 0, phase: 'fight', bossId: 0 };
    portal = null;
    G.Touch.reset();
    if (authority()) G.EnemyMgr.stash(); else G.EnemyMgr.clearRemote();
    G.Projectiles.clear();
    G.Combat.clearFields();
    G.Hazards.clear();
    G.World.setArena({ tx: cfg.tx, ty: cfg.ty, r: cfg.r, type: cfg.type });
    G.World.setBiome(G.Tiles.arenaBiome(cfg.type), true);
    for (const [i, p] of G.Game.everyone().entries()) {
      p.x = center.x + (i - (G.Game.everyone().length - 1) / 2) * 34;
      p.y = center.y + ts * 3;
    }
    G.Camera.x = pl.x; G.Camera.y = pl.y;
    G.Game.flash('#ffd25e', 0.9);
    G.Audio.sfx('rift');
    G.Spawner.say('¡Gymbattle! ' + gym.leader + ' te desafía con ' + G.DEX_BY[gym.pokemon].name + '.', 4, true);
    if (authority()) spawnLeader();
  }

  function specialMove(gym) {
    const options = G.Moves.ALL.filter(m => m.type === gym.type && !['buff', 'orbit', 'turret', 'mine'].includes(m.kind));
    return options.find(m => ['projectile', 'beam', 'nova', 'meteor', 'chain', 'boomerang'].includes(m.kind)) || options[0];
  }

  function spawnLeader() {
    const gym = fight.gym, mon = G.DEX_BY[gym.pokemon], move = specialMove(gym);
    const level = gym.pokemonLevel, n = G.Game.everyone().length;
    const def = {
      dex: mon.dex, name: mon.name,
      hp: Math.round((180 + mon.hp * 2.2) * level * 1.4),
      spd: G.U.clamp(48 + (mon.spd - 78) * 0.6, 48, 105),
      dmg: Math.round((8 + mon.atk * 0.14) * (1 + level / 18)),
      xp: Math.round(35 + level * 12),
      behavior: move && ['projectile', 'beam', 'chain'].includes(move.kind) ? 'ranged' : 'charger',
      moveType: gym.type, specialMove: move ? move.name : 'Ataque Especial',
      shotDmg: Math.round((8 + mon.atk * 0.14) * (0.75 + level / 24)),
      shotCd: Math.max(0.7, 2.2 - level / 35), range: 270
    };
    const playerScale = gym.coopMultiplier
      ? Math.pow(gym.coopMultiplier, n - 1)
      : null;
    const scale = playerScale
      ? { hp: playerScale, spd: 1, dmg: playerScale }
      : { hp: 1 + 0.35 * (n - 1), spd: 1, dmg: 1 + 0.2 * (n - 1) };
    const e = new G.Enemy(def, fight.center.x, fight.center.y - TS() * 3.5, scale, true);
    e.gymLeader = gym.id;
    e.level = level;
    G.EnemyMgr.add(e);
    fight.bossId = e.id;
    G.Spawner.say('¡' + gym.leader + ' usa ' + def.specialMove + '!', 3.2);
    G.Camera.kick(1.1);
    G.Audio.sfx('boss');
  }

  function arenaTick(dt) {
    fight.t += dt;
    if (fight.phase !== 'fight' || !authority()) {
      if (fight.phase === 'won' || fight.phase === 'lost') {
        fight.endT -= dt;
        if (fight.endT <= 0) finish(fight.phase === 'lost');
      }
      return;
    }
    const boss = G.EnemyMgr.get(fight.bossId);
    if (!boss || boss.dead) { won(); return; }
    const allDown = G.Game.everyone().every(p => p.dead);
    fight.downT = allDown ? fight.downT + dt : 0;
    if (fight.downT > 1.4) { G.Coop.isHost && G.Coop.broadcast(['gym', 'lose', fight.gym.id]); lost(); }
  }

  function won(recordTime) {
    if (!fight || fight.phase !== 'fight') return;
    const id = fight.gym.id, elapsed = recordTime || Math.max(1, Math.floor(fight.t));
    const saved = medals()[id], alreadyComplete = G.GymLeaders.LIST.every(gym => medals()[gym.id]);
    fight.phase = 'won'; fight.endT = 4;
    if (authority()) {
      G.Coop.isHost && G.Coop.broadcast(['gym', 'win', id, elapsed]);
      G.Pickups.dropXp(fight.center.x, fight.center.y, fight.gym.pokemonLevel * 100);
    }
    G.DB.save.gymMedals[id] = {
      at: saved && saved.at || Date.now(),
      lastTime: elapsed,
      bestTime: Math.min(saved && saved.bestTime || Infinity, elapsed)
    };
    G.DB.commit(true);
    if (!saved) {
      G.Spawner.say('¡' + fight.gym.leader + ' derrotado! Has ganado la ' + fight.gym.medal + ' y experiencia extra.', 4, true);
    } else {
      G.Spawner.say('¡Has vencido otra vez a ' + fight.gym.leader + '! Tiempo: ' + G.U.mmss(elapsed) + ' · Mejor: ' + G.U.mmss(G.DB.save.gymMedals[id].bestTime) + '.', 4, true);
    }
    G.Audio.sfx('legend');
    if (saved) replayIndex = (replayIndex + 1) % G.GymLeaders.LIST.length;
    else if (G.GymLeaders.LIST.every(gym => medals()[gym.id])) replayIndex = 0;
    if (!alreadyComplete && G.GymLeaders.LIST.every(gym => medals()[gym.id])) G.Game.completeStory();
  }

  function lost() {
    if (!fight || fight.phase !== 'fight') return;
    fight.phase = 'lost'; fight.endT = 1.2;
    G.Spawner.say('El equipo cayó ante ' + fight.gym.leader + '. El portal permitirá reintentar.', 3.5, true);
    G.Audio.sfx('back');
  }

  function finish(retry) {
    if (!fight) return;
    const f = fight, pl = G.Game.player;
    fight = null;
    G.World.setArena(null);
    G.World.setBiome(f.biome, true);
    G.Weather.clear();
    if (authority()) G.EnemyMgr.restore(); else G.EnemyMgr.clearRemote();
    G.Projectiles.clear();
    G.Combat.clearFields();
    G.Hazards.clear();
    for (const p of G.Game.everyone()) {
      const saved = f.positions.get(p.uid || 'local') || f.positions.get('local');
      if (saved) { p.x = saved.x; p.y = saved.y; }
      if (p.dead) p.revive(0.3);
    }
    G.Camera.x = pl.x; G.Camera.y = pl.y;
    G.Game.flash('#ffd25e', 0.8);
    if (retry && authority()) openPortal(f.gym, pl);
    else if (!retry && story && G.GymLeaders.LIST.every(gym => medals()[gym.id])) G.Game.completeStory();
  }

  function drawable() {
    if (!portal) return null;
    const p = portal;
    return {
      y: p.y,
      draw(ctx) {
        const P = G.Sprites.PX, img = G.Tiles.propSprite(0, 'rift', Math.floor(p.t * 8) % 4);
        const w = img.width * P, h = img.height * P;
        ctx.save();
        ctx.globalAlpha = 0.24;
        ctx.fillStyle = '#ffd25e';
        ctx.beginPath(); ctx.ellipse(p.x, p.y, 36, 13, 0, 0, 6.2832); ctx.fill();
        ctx.globalAlpha = 0.9;
        ctx.drawImage(img, Math.round(p.x - w / 2), Math.round(p.y - h + 4), w, h);
        ctx.restore();
        if (Math.random() < 0.25) G.FX.px(p.x + G.U.rand(-14, 14), p.y - G.U.rand(10, 70), '#ffe59b', { vy: -35, life: 0.6 });
      }
    };
  }

  function onEvent(ev) {
    const [, action, data, elapsed] = ev;
    if (action === 'portal') {
      const gym = G.GymLeaders.BY_ID[data.id];
      if (gym && !portal) portal = { gym, x: data.x, y: data.y, t: 0 };
    } else if (action === 'start') begin(data);
    else if (action === 'win') {
      if (fight && fight.gym.id === data) won(elapsed);
    } else if (action === 'lose') {
      if (fight && fight.gym.id === data) lost();
    }
  }

  return {
    reset, update, drawable, onEvent, drawHud,
    get inArena() { return !!fight; },
    get story() { return story; },
    get medals() { return medals(); },
    debugOpen() { const gym = nextGym(G.Game.player.level); if (gym) openPortal(gym, G.Game.player); }
  };
})();
