/* ============ levelup.js — mejoras al subir de nivel ============ */
G.LevelUp = (() => {
  const STATS = [
    { id: 'hp', icon: 'heart', title: 'Vigor', desc: '+20 de vida máxima (y la recupera).',
      apply: pl => pl.addMaxHp(20) },
    { id: 'atk', icon: 'fist', title: 'Potencia', desc: '+10% de daño con el ataque.',
      apply: pl => pl.atkMul *= 1.10, max: 40 },
    { id: 'spd', icon: 'boot', title: 'Carrera', desc: '+7% de velocidad de movimiento.',
      apply: pl => pl.spdMul *= 1.07, max: 8 },
    { id: 'cd', icon: 'clock', title: 'Velocidad de ataque', desc: '+8% de velocidad de ataque.',
      apply: pl => pl.attackSpeedMul *= 0.92, max: 10 },
    { id: 'def', icon: 'shield', title: 'Coraza', desc: '+6% de reducción de daño recibido.',
      apply: pl => pl.dmgReduce = Math.min(0.7, pl.dmgReduce + 0.06), max: 12 },
    { id: 'rgn', icon: 'sprout', title: 'Síntesis', desc: '+0.9 de vida regenerada por segundo.',
      apply: pl => pl.regenFlat += 0.9 },
    { id: 'mag', icon: 'magnet', title: 'Imán', desc: '+30% de radio de recogida de experiencia.',
      apply: pl => pl.magnet *= 1.30, max: 6 },
    { id: 'xp', icon: 'book', title: 'Aprendizaje', desc: '+12% de experiencia ganada.',
      apply: pl => pl.xpMul *= 1.12, max: 8 },
    { id: 'heal', icon: 'berry', title: 'Baya Zidra', desc: 'Recupera el 45% de tu vida ahora mismo.',
      apply: pl => pl.heal(pl.maxHp * 0.45) }
  ];

  const RANGED = new Set(['projectile', 'nova', 'boomerang', 'cone']);
  const BOUNCEABLE = new Set(['projectile', 'nova', 'cone']);

  function candidates(pl) {
    const out = [];
    const add = (card) => out.push(card);
    const room = s => !s.max || (pl.statsTaken[s.id] || 0) < s.max;

    for (const s of STATS) {
      if (!room(s)) continue;
      add({
        w: 6, type: 'stat', key: 'stat:' + s.id,
        icon: s.icon, color: '#8fa3c4', tag: 'Mejora',
        title: s.title, desc: s.desc,
        apply: p => { s.apply(p); p.statsTaken[s.id] = (p.statsTaken[s.id] || 0) + 1; }
      });
    }

    const move = pl.activeMove();
    if (move) {
      const next = G.Moves.nextUpText(move);
      if (next) {
        add({
          w: 10, type: 'up', key: 'move-level:' + move.id, icon: 'move:' + move.id,
          color: G.U.TYPE_COLOR[move.type], tag: 'Ataque',
          title: `${move.name} · Nv. ${move.lvl + 1}`,
          desc: next,
          apply: () => { G.Moves.levelUp(move); }
        });
      }
    }
    if (move && RANGED.has(move.kind)) {
      if ((pl.projectileBonus || 0) < 5) {
        add({
          w: 8, type: 'stat', key: 'combat:projectiles', icon: 'move:' + move.id,
          color: G.U.TYPE_COLOR[move.type], tag: 'Ataque a distancia',
          title: '+1 proyectil', desc: 'Dispara un proyectil adicional con tu ataque.',
          apply: p => { p.projectileBonus = (p.projectileBonus || 0) + 1; }
        });
      }
      if (BOUNCEABLE.has(move.kind) && (!pl.rangeUpgrade || pl.rangeUpgrade === 'pierce') &&
          (pl.pierceBonus || 0) < 5) {
        add({
          w: 5, type: 'stat', key: 'combat:pierce', icon: 'move:' + move.id,
          color: G.U.TYPE_COLOR[move.type], tag: 'Ataque a distancia',
          title: 'Perforación', desc: '+1 perforación. No se puede combinar con rebote.',
          apply: p => { p.rangeUpgrade = 'pierce'; p.pierceBonus = Math.min(5, (p.pierceBonus || 0) + 1); }
        });
      }
      if (BOUNCEABLE.has(move.kind) && (!pl.rangeUpgrade || pl.rangeUpgrade === 'bounce') &&
          (pl.bounceCount || 0) < 5) {
        add({
          w: 5, type: 'stat', key: 'combat:bounce', icon: 'move:' + move.id,
          color: G.U.TYPE_COLOR[move.type], tag: 'Ataque a distancia',
          title: 'Rebote', desc: '+1 rebote entre enemigos. No se puede combinar con perforación.',
          apply: p => { p.rangeUpgrade = 'bounce'; p.bounceCount = Math.min(5, (p.bounceCount || 0) + 1); }
        });
      }
    }

    if (move && move.kind === 'melee' && (pl.lifeStealRate || 0) < 0.5) {
      add({
        w: 6, type: 'stat', key: 'combat:lifesteal', icon: 'heart',
        color: G.U.TYPE_COLOR[move.type], tag: 'Cuerpo a cuerpo',
        title: 'Robo de vida', desc: 'Recupera vida equivalente al 5% del daño de los ataques cuerpo a cuerpo.',
        apply: p => { p.lifeStealRate = Math.min(0.5, (p.lifeStealRate || 0) + 0.05); }
      });
    }

    if ((pl.critDamageBonus || 0) < 1.5) {
      add({
        w: 5, type: 'stat', key: 'combat:crit-damage', icon: 'star',
        color: '#ffd23f', tag: 'Ataque',
        title: 'Daño crítico', desc: '+15% de daño adicional en los golpes críticos.',
        apply: p => { p.critDamageBonus = Math.min(1.5, (p.critDamageBonus || 0) + 0.15); }
      });
    }

    return out;
  }

  function offer(pl, n = 3) {
    const pool = candidates(pl);
    const picked = [];
    while (picked.length < n && pool.length) {
      const total = pool.reduce((sum, card) => sum + card.w, 0);
      let roll = Math.random() * total;
      let index = 0;
      for (let i = 0; i < pool.length; i++) {
        roll -= pool[i].w;
        if (roll <= 0) { index = i; break; }
      }
      picked.push(pool.splice(index, 1)[0]);
    }
    return picked;
  }

  function offerEvolutionMove(pl, n = 3) {
    const available = move => !pl.hasMove(move.id) && !pl.banned.has(move.id);
    let pool = G.Moves.availableFor(pl.mon).filter(available);
    if (!pool.length) pool = G.Moves.ALL.filter(available);
    const picked = [];
    while (picked.length < n && pool.length) {
      const index = Math.floor(Math.random() * pool.length);
      const move = pool.splice(index, 1)[0];
      picked.push({
        w: 1, type: 'evo', key: 'evolution-move:' + move.id,
        icon: 'move:' + move.id, color: G.U.TYPE_COLOR[move.type], tag: 'Ataque extra',
        title: move.name,
        desc: `${move.desc} Se lanzará junto con ${pl.activeMove().name}.`,
        apply: p => { p.addEvolutionMove(move.id); }
      });
    }
    if (!picked.length) throw new Error(`No hay ataques extra disponibles para ${pl.mon.name}.`);
    return picked;
  }

  return { offer, offerEvolutionMove, STATS };
})();
