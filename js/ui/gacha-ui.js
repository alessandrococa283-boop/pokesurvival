/* ============ gacha-ui.js — banners por generación y animación de tirada ============
 * La lógica (probabilidades, pity, shiny, repetidos) está en systems/gacha.js.
 */
G.GachaUI = (() => {
  const $ = G.UI.$;
  let busy = false;
  let gen = 1;

  function init() {
    $('pull-1').onclick = () => pull(1);
    $('pull-10').onclick = () => pull(10, 't1');
    $('pull-10b').onclick = () => pull(10, 't10');
    $('pull-close').onclick = close;

    const tabs = $('gacha-gens');
    G.Gacha.BANNERS.forEach(b => {
      const t = document.createElement('button');
      t.className = 'gen-tab';
      t.dataset.gen = b.gen;
      t.innerHTML = `<b>${b.name}</b><small>Gen ${b.gen}</small>`;
      t.onclick = () => { gen = b.gen; refresh(); };
      tabs.appendChild(t);
    });
  }

  function open() {
    G.UI.show('scr-gacha', true);
    refresh();
  }

  function refresh() {
    const s = G.DB.save;
    const banner = G.Gacha.BANNERS[gen - 1];
    document.querySelectorAll('#gacha-gens .gen-tab').forEach(t => t.classList.toggle('on', +t.dataset.gen === gen));

    const all = G.DEX.filter(p => p.gen === gen);
    const owned = all.filter(p => s.owned[p.dex]).length;
    const shinies = all.filter(p => s.shiny && s.shiny[p.dex]).length;
    const [c1, c2, c3] = banner.color;
    $('banner').style.background =
      `radial-gradient(circle at 80% 30%, rgba(255,210,63,.3), transparent 45%),
       radial-gradient(circle at 15% 80%, rgba(196,123,255,.3), transparent 50%),
       linear-gradient(135deg, ${c1}, ${c2} 55%, ${c3})`;
    $('banner-title').textContent = banner.name + ' Misterioso';
    $('banner-desc').textContent = `Los ${all.length} Pokémon de la generación ${gen}. ¡Los legendarios esperan!`;
    $('gacha-owned').innerHTML = `Tienes ${owned} de ${all.length}` +
      (shinies ? ` · ${G.Icons.html('shiny', 12)} ${shinies} shiny` : '');

    const feat = $('gacha-feat');
    feat.innerHTML = '';
    for (const dex of G.Gacha.featured(gen)) {
      feat.appendChild(G.UI.spriteCanvas(dex, 170, 190, { lively: true, scale: 2, dir: 1 }));
    }

    const pity = (s.pity && s.pity[gen]) || 0;
    $('gacha-pity').textContent = G.Gacha.hasLegendary(gen)
      ? `Tiradas sin legendaria en ${banner.name}: ${pity} / ${G.Gacha.PITY_5}`
      : `Este banner no tiene Pokémon legendarios; el pity no aplica.`;

    const rates = G.Gacha.ratesFor(gen);
    const notes = [];
    if (G.Gacha.canGuaranteeTen(gen)) notes.push('La tirada ×10 garantiza al menos una Épica.');
    if (G.Gacha.hasLegendary(gen)) notes.push(`A las ${G.Gacha.PITY_5} tiradas sin Legendaria en un banner, la siguiente lo es.`);
    notes.push('Los porcentajes se ajustan a las rarezas disponibles en este banner.');
    notes.push('Los repetidos dan Pokémonedas. Los shiny no se repiten.');
    notes.push('Los tickets se consiguen jugando; los de misión y logro se muestran ya ajustados.');
    $('gacha-rates').innerHTML = '<h3>Probabilidades</h3>' + rates.slice().reverse().map(([r, percentage]) => `
      <div><span style="color:${G.Gacha.RARITY_COLOR[r]}">${G.UI.stars(r, 10)} ${G.Gacha.RARITY_NAME[r]}</span>
      <span>${Number(percentage.toFixed(2)).toLocaleString('es')}% · ${G.Gacha.pool(r, gen).length}</span></div>`).join('') +
      `<div><span>${G.Icons.html('shiny', 12)} Shiny</span><span>${G.Gacha.SHINY_RATE * 100}%</span></div>
       <p class="note">${notes.map(note => '· ' + note).join('<br>')}</p>`;

    const t = s.tickets;
    const costs = G.Acquisition.gacha.costs;
    $('cost-1').innerHTML = `${G.Icons.html('ticket', 18)} ${costs.single.t1} + ${G.Icons.html('coin', 18)} ${costs.single.coins.toLocaleString('es')}`;
    $('cost-10').innerHTML = `${G.Icons.html('ticket', 18)} ${costs.ten.t1} + ${G.Icons.html('coin', 18)} ${costs.ten.coins.toLocaleString('es')}`;
    $('cost-10b').innerHTML = `${G.Icons.html('ticket10', 18)} ${costs.ten.t10} + ${G.Icons.html('coin', 18)} ${costs.ten.coins.toLocaleString('es')}`;
    $('gacha-tickets').innerHTML = `Tienes ${G.Icons.html('ticket', 18)} <b>${t.t1}</b> tickets, ${G.Icons.html('ticket10', 18)} <b>${t.t10}</b> tickets ×10 y ${G.Icons.html('coin', 18)} <b>${s.coins.toLocaleString('es')}</b> monedas`;
    $('pull-1').disabled = !G.Gacha.costOf(s, 1);
    $('pull-10').disabled = !G.Gacha.costOf(s, 10, 't1');
    $('pull-10b').disabled = !G.Gacha.costOf(s, 10, 't10');
    G.UI.refreshCoins();
  }

  const wait = ms => new Promise(r => setTimeout(r, ms));

  async function pull(n, use = 't1') {
    if (busy) return;
    busy = true;
    try {
      const res = G.Gacha.pull(G.DB.save, n, gen, use);
      if (!res) {
        G.Audio.sfx('error');
        G.UI.toast('No tienes los tickets y las monedas necesarias para esta tirada.');
        return;
      }
      G.Progress.checkAch();
      G.DB.commit(true);

      const best = Math.max(...res.map(r => r.rarity));
      const fx = $('pull-fx'), slot = $('slot'), out = $('pull-results');
      out.innerHTML = '';
      $('pull-close').classList.add('hidden');
      slot.style.display = '';
      fx.classList.remove('hidden');

      await G.Slots.play(slot, res);
      G.Audio.sfx('burst', { rarity: best });
      slot.style.display = 'none';

      for (const r of res) {
        const mon = G.DEX_BY[r.dex];
        const c = document.createElement('div');
        c.className = 'pcard r' + r.rarity + (r.shiny ? ' shiny' : '');
        c.style.setProperty('--rc', r.shiny ? '#9ae6ff' : G.Gacha.RARITY_COLOR[r.rarity]);
        c.innerHTML = `<div class="stars">${G.UI.stars(r.rarity, 24)}</div>`;
        c.appendChild(G.UI.spriteCanvas(r.dex, 132, 120, { lively: r.rarity >= 4 || r.shiny, scale: 2, shiny: r.shiny }));
        const tag = r.isNew
          ? `<span class="new">${r.shiny ? '¡SHINY NUEVO!' : '¡NUEVO!'}</span>`
          : `Repetido · <span class="coin"></span> +${r.refund}`;
        c.insertAdjacentHTML('beforeend', `<b>${r.shiny ? G.Icons.html('shiny', 12) + ' ' : ''}${mon.name}</b><div class="tag">${tag}</div>`);
        out.appendChild(c);
        G.Audio.sfx('reveal', { rarity: r.rarity });
        await wait(n === 10 ? 150 : 0);
      }
      $('pull-close').classList.remove('hidden');
    } finally {
      busy = false;
    }
  }

  function close() {
    $('pull-fx').classList.add('hidden');
    refresh();
  }

  return { init, open, get open_() { return !$('pull-fx').classList.contains('hidden'); } };
})();
