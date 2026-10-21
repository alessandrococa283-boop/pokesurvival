/* ============ baby-gacha.js — gacha e incubación de huevos bebé ============ */
G.BabyGacha = (() => {
  const cfg = G.Acquisition.babyGacha;
  const rates = cfg.rates;
  let busy = false;

  function costOf(save) {
    if (!save) return null;
    const tickets = save.tickets || { t1: 0, t10: 0 };
    return tickets.t10 >= cfg.cost.t10 && save.coins >= cfg.cost.coins
      ? { t10: cfg.cost.t10, coins: cfg.cost.coins }
      : null;
  }

  function roll() {
    const available = rates.filter(([rarity]) => G.BabyMons.LIST.some(mon => mon.rarity === rarity));
    const total = available.reduce((sum, [, weight]) => sum + weight, 0);
    let point = Math.random() * total;
    let rarity = available[available.length - 1][0];
    for (const [candidate, weight] of available) {
      point -= weight;
      if (point < 0) { rarity = candidate; break; }
    }
    const pool = G.BabyMons.LIST.filter(mon => mon.rarity === rarity);
    return G.U.pick(pool);
  }

  function pull(save) {
    if (busy) return null;
    const cost = costOf(save);
    if (!cost) return null;
    const mon = roll();
    busy = true;
    try {
      save.tickets = save.tickets || { t1: 0, t10: 0 };
      save.tickets.t10 -= cost.t10;
      save.coins -= cost.coins;
      save.babyEggs = Array.isArray(save.babyEggs) ? save.babyEggs : [];
      const now = Date.now();
      const egg = {
        id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
        dex: mon.dex,
        acquiredAt: now,
        hatchAt: now + G.BabyMons.hatchMinutes[mon.rarity] * 60 * 1000
      };
      save.babyEggs.push(egg);
      return { egg, mon };
    } finally {
      busy = false;
    }
  }

  function hatch(save, id, now = Date.now()) {
    if (!save || !Array.isArray(save.babyEggs)) return null;
    const index = save.babyEggs.findIndex(egg => egg.id === id);
    if (index < 0 || save.babyEggs[index].hatchAt > now) return null;
    const [egg] = save.babyEggs.splice(index, 1);
    const mon = G.BabyMons.BY_DEX[egg.dex];
    if (!mon) throw new Error(`Huevo bebé con especie desconocida: ${egg.dex}`);
    save.babyOwned = save.babyOwned || {};
    const isNew = !save.babyOwned[mon.dex];
    let coins = 0;
    if (isNew) save.babyOwned[mon.dex] = { at: now, from: 'baby-gacha' };
    else {
      coins = cfg.duplicateCoins[mon.rarity];
      save.coins += coins;
    }
    return { mon, isNew, coins };
  }

  function owned(save) {
    return G.BabyMons.LIST.filter(mon => save && save.babyOwned && save.babyOwned[mon.dex]);
  }

  return { costOf, pull, hatch, owned, rates, duplicateCoins: cfg.duplicateCoins };
})();
