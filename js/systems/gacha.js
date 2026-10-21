/* ============ gacha.js — un banner por generación ============
 * Lógica pura: no toca la interfaz. La pantalla está en ui/gacha-ui.js.
 *
 * 9 banners (Kanto ... Paldea). Cada uno con su propio pity.
 * Probabilidades por tirada:  1★ 65% · 2★ 23% · 3★ 9% · 4★ 2.5% · 5★ 0.5%
 * Garantías:
 *   - la tirada ×10 trae al menos un 4★ o superior
 *   - a las 70 tiradas sin 5★ en ese banner, el siguiente es 5★ seguro
 * Shiny: 1 de cada 100 tiradas sale en su versión shiny.
 * Repetidos: se convierten en Pokémonedas (los shiny repetidos, el triple).
 *
 * Cada tirada consume tickets normales y monedas. El ticket morado es exclusivo
 * del gacha de Pokémon bebé.
 */
G.Gacha = (() => {
  const cfg = G.Acquisition.gacha;
  let pulling = false;

  /** Devuelve el coste completo si el saldo permite pagarlo; no modifica el guardado. */
  function costOf(save, n) {
    if (!save || (n !== 1 && n !== 10)) return null;
    const price = n === 1 ? cfg.costs.single : cfg.costs.ten;
    const t = save.tickets || { t1: 0, t10: 0 };
    const cost = { t1: price.t1, coins: price.coins };
    return t.t1 >= cost.t1 && save.coins >= cost.coins ? cost : null;
  }
  const RATES = cfg.rates;
  const PITY_5 = cfg.pityFive;
  const SHINY_RATE = cfg.shinyRate;
  const REFUND = cfg.duplicateRefund;
  let forceShiny = 0;           // para pruebas y vídeos: las N próximas salen shiny

  const RARITY_NAME = { 1: 'Común', 2: 'Poco común', 3: 'Rara', 4: 'Épica', 5: 'Legendaria' };
  const RARITY_COLOR = { 1: '#9fb1c9', 2: '#5fe08a', 3: '#4fb4ff', 4: '#c47bff', 5: '#ffcb3d' };

  const BANNERS = [
    { gen: 1, name: 'Kanto',   color: ['#3a1d6e', '#1b2f78', '#0f4d6e'] },
    { gen: 2, name: 'Johto',   color: ['#5a2a1a', '#7a3d1f', '#2d4a6e'] },
    { gen: 3, name: 'Hoenn',   color: ['#0f4d6e', '#1b6a5a', '#2a3d78'] },
    { gen: 4, name: 'Sinnoh',  color: ['#2a2a5e', '#3d3d8a', '#5a2a6e'] },
    { gen: 5, name: 'Teselia', color: ['#1a1a2a', '#3a3a4e', '#2a4a6e'] },
    { gen: 6, name: 'Kalos',   color: ['#4a1a3a', '#2a3a7a', '#1a5a7a'] },
    { gen: 7, name: 'Alola',   color: ['#7a3a1a', '#1a6a6a', '#2a4a8a'] },
    { gen: 8, name: 'Galar',   color: ['#4a1a5a', '#1a3a6a', '#6a1a3a'] },
    { gen: 9, name: 'Paldea',  color: ['#6a2a1a', '#4a1a5a', '#1a4a6a'] }
  ];

  function inBanner(p, gen) { return p.gen === gen && !!G.SPRITE_META[p.dex]; }

  /** Pokémon de una rareza en un banner. */
  function pool(rarity, gen) { return G.DEX.filter(p => inBanner(p, gen) && p.rarity === rarity); }

  function ratesFor(gen, min = 1) {
    const available = RATES.filter(([rarity]) => rarity >= min && pool(rarity, gen).length);
    const total = available.reduce((sum, [, weight]) => sum + weight, 0);
    return total ? available.map(([rarity, weight]) => [rarity, weight * 100 / total]) : [];
  }

  function rollRarity(gen, min = 1) {
    const rates = ratesFor(gen, min);
    const total = rates.reduce((sum, [, weight]) => sum + weight, 0);
    if (!total) return null;
    let x = Math.random() * total;
    for (const [r, w] of rates) { x -= w; if (x <= 0) return r; }
    return rates[rates.length - 1][0];
  }

  function canGuaranteeTen(gen) { return ratesFor(gen, cfg.tenGuaranteeRarity).length > 0; }
  function hasLegendary(gen) { return pool(5, gen).length > 0; }

  /** Los 3 más fuertes de la generación, para el cartel del banner. */
  function featured(gen) {
    return G.DEX.filter(p => inBanner(p, gen) && p.rarity === 5)
      .sort((a, b) => b.bst - a.bst).slice(0, 3).map(p => p.dex);
  }

  /**
   * Hace `n` tiradas en el banner `gen` sobre el guardado `save` (lo modifica).
   * Devuelve null si no hay recursos suficientes o no hay especies en el banner:
   *   { dex, rarity, shiny, isNew, refund }
   */
  function pull(save, n, gen = 1) {
    if (pulling) return null;
    const cost = costOf(save, n);
    if (!cost || !BANNERS[gen - 1] || !G.DEX.some(p => inBanner(p, gen))) return null;
    pulling = true;
    try {
      save.tickets = save.tickets || { t1: 0, t10: 0 };
      save.tickets.t1 -= cost.t1;
      save.coins -= cost.coins;
      save.pity = save.pity || {};
      save.shiny = save.shiny || {};
      save.pity[gen] = save.pity[gen] || 0;

      const out = [];
      for (let i = 0; i < n; i++) {
        if (hasLegendary(gen)) save.pity[gen]++;
        let want;
        if (hasLegendary(gen) && save.pity[gen] >= PITY_5) want = 5;
        else if (n === 10 && i === n - 1 && !out.some(r => r.rarity >= cfg.tenGuaranteeRarity) && canGuaranteeTen(gen))
          want = rollRarity(gen, cfg.tenGuaranteeRarity);
        else want = rollRarity(gen);

        const list = pool(want, gen);
        if (!list.length) throw new Error(`No hay Pokémon de rareza ${want} en el banner ${gen}.`);
        if (want === 5) save.pity[gen] = 0;
        let mon = G.U.pick(list);
        let shiny = G.Sprites.hasShiny(mon.dex) && (forceShiny > 0 ? (forceShiny--, true) : Math.random() < SHINY_RATE);
        if (shiny && save.shiny[mon.dex]) {
          const missing = list.filter(p => G.Sprites.hasShiny(p.dex) && !save.shiny[p.dex]);
          if (missing.length) mon = G.U.pick(missing);
          else shiny = false;
        }

        let isNew = false, refund = 0;
        if (shiny) {
          isNew = !save.shiny[mon.dex];
          if (isNew) save.shiny[mon.dex] = { at: Date.now(), from: 'gacha' };
          else refund = REFUND[want] * cfg.shinyDuplicateMultiplier;
          if (!save.owned[mon.dex]) save.owned[mon.dex] = { at: Date.now(), from: 'gacha' };
        } else {
          isNew = !save.owned[mon.dex];
          if (isNew) save.owned[mon.dex] = { at: Date.now(), from: 'gacha' };
          else refund = REFUND[want];
        }
        save.coins += refund;
        out.push({ dex: mon.dex, rarity: want, shiny, isNew, refund });
      }
      save.stats.pulls = (save.stats.pulls || 0) + n;
      return out;
    } finally {
      pulling = false;
    }
  }

  return { debugForceShiny(n = 1) { forceShiny = n; },
           costOf, RATES, PITY_5, SHINY_RATE, REFUND, RARITY_NAME, RARITY_COLOR, BANNERS,
           pool, ratesFor, canGuaranteeTen, hasLegendary, featured, pull };
})();
