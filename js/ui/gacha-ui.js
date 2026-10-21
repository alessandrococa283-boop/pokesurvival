/* ============ gacha-ui.js — banners por generación y animación de tirada ============
 * La lógica (probabilidades, pity, shiny, repetidos) está en systems/gacha.js.
 */
G.GachaUI = (() => {
  const $ = G.UI.$;
  let busy = false;
  let gen = 1;
  let kind = 'normal';
  let eggTicker = 0;
  const babyImages = new Map();

  function init() {
    $('pull-1').onclick = () => pull(1);
    $('pull-10').onclick = () => pull(10);
    $('pull-baby').onclick = pullBaby;
    $('pull-close').onclick = close;
    document.querySelectorAll('#gacha-kind-tabs .tab').forEach(tab => {
      tab.onclick = () => setKind(tab.dataset.kind);
    });

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
    setKind('normal');
  }

  function openBabies() {
    G.UI.show('scr-gacha', true);
    setKind('babies');
  }

  function setKind(next) {
    kind = next;
    document.querySelectorAll('#gacha-kind-tabs .tab').forEach(tab => tab.classList.toggle('on', tab.dataset.kind === kind));
    $('gacha-normal-view').classList.toggle('hidden', kind !== 'normal');
    $('gacha-baby-view').classList.toggle('hidden', kind !== 'babies');
    clearInterval(eggTicker);
    eggTicker = 0;
    if (kind === 'normal') refresh();
    else {
      refreshBabies();
      eggTicker = setInterval(() => {
        if (kind === 'babies' && G.UI.isOpen('scr-gacha')) tickBabies();
      }, 1000);
    }
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
    $('gacha-tickets').innerHTML = `Tienes ${G.Icons.html('ticket', 18)} <b>${t.t1}</b> tickets normales y ${G.Icons.html('coin', 18)} <b>${s.coins.toLocaleString('es')}</b> monedas. El ticket morado es exclusivo para bebés.`;
    $('pull-1').disabled = !G.Gacha.costOf(s, 1);
    $('pull-10').disabled = !G.Gacha.costOf(s, 10);
    G.UI.refreshCoins();
  }

  function babySprite(dex, size = 104) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    canvas.className = 'baby-sprite';
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    let image = babyImages.get(dex);
    if (!image) {
      image = new Image();
      image.onload = () => drawBabyFrame(ctx, image, dex, size);
      image.onerror = () => console.error(`[BabyGacha] No se pudo cargar assets/huevos/sprites babymons/${dex}/Idle.png`);
      image.src = `assets/huevos/sprites%20babymons/${dex}/Idle.png`;
      babyImages.set(dex, image);
    } else if (image.complete && image.naturalWidth) drawBabyFrame(ctx, image, dex, size);
    return canvas;
  }

  function drawBabyFrame(ctx, image, dex, size) {
    const anim = G.SPRITE_META[dex].a.Idle;
    const scale = Math.min(size * 0.84 / anim.w, size * 0.84 / anim.h);
    const w = anim.w * scale, h = anim.h * scale;
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(image, 0, 0, anim.w, anim.h, (size - w) / 2, (size - h) / 2, w, h);
  }

  function eggImage(className) {
    const img = document.createElement('img');
    img.className = className;
    img.alt = 'Huevo bebé';
    img.src = 'assets/huevos/sprites%20huevos/mystery-egg.png';
    img.onerror = () => console.error('[BabyGacha] No se pudo cargar assets/huevos/sprites huevos/mystery-egg.png');
    return img;
  }

  function timeLeft(ms) {
    const seconds = Math.max(0, Math.ceil(ms / 1000));
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  }

  function refreshBabies() {
    const save = G.DB.save;
    const now = Date.now();
    const ready = (save.babyEggs || []).filter(egg => egg.hatchAt <= now);
    if (ready.length) {
      const hatched = ready.map(egg => G.BabyGacha.hatch(save, egg.id, now)).filter(Boolean);
      if (hatched.length) {
        G.DB.commit(true);
        const newNames = hatched.filter(result => result.isNew).map(result => result.mon.name);
        const duplicates = hatched.filter(result => !result.isNew);
        const duplicateCoins = duplicates.reduce((sum, result) => sum + result.coins, 0);
        const text = newNames.length
          ? `¡Eclosionó ${newNames.join(', ')}!`
          : `Huevo repetido${duplicates.length > 1 ? 's' : ''}: +${duplicateCoins} monedas.`;
        G.UI.toast(text, 3500);
        G.Audio.sfx('shinyGet');
      }
    }

    const owned = G.BabyGacha.owned(save);
    $('baby-owned-count').textContent = `Colección: ${owned.length} / ${G.BabyMons.LIST.length} compañeros bebé`;
    $('baby-ticket-count').innerHTML = `Tienes ${G.Icons.html('ticket10', 18)} <b>${save.tickets.t10}</b> tickets morados y ${G.Icons.html('coin', 18)} <b>${save.coins.toLocaleString('es')}</b> monedas`;
    const cost = G.Acquisition.babyGacha.cost;
    $('baby-cost').innerHTML = `${G.Icons.html('ticket10', 18)} ${cost.t10} + ${G.Icons.html('coin', 18)} ${cost.coins.toLocaleString('es')}`;
    $('pull-baby').disabled = !G.BabyGacha.costOf(save);
    $('baby-rates').innerHTML = '<b>Probabilidades e incubación</b>' + G.BabyGacha.rates.map(([rarity, chance]) =>
      `<div><span>${G.Gacha.RARITY_NAME[rarity]}</span><span>${chance}% · ${G.BabyMons.hatchMinutes[rarity]} min</span></div>`).join('') +
      '<p class="note">El contenido del huevo se revela al eclosionar. Los compañeros repetidos se convierten en monedas.</p>';

    const eggs = $('baby-eggs');
    eggs.innerHTML = '';
    if (!save.babyEggs.length) eggs.innerHTML = '<p class="sub">No tienes huevos incubándose. ¡Consigue uno con el ticket morado!</p>';
    for (const egg of save.babyEggs) {
      const mon = G.BabyMons.BY_DEX[egg.dex];
      const card = document.createElement('div');
      card.className = 'baby-egg-card';
      card.appendChild(eggImage('baby-egg-image'));
      const readyNow = egg.hatchAt <= now;
      const left = G.BabyMons.hatchMinutes[mon.rarity] * 60 * 1000 - (now - egg.acquiredAt);
      const detail = document.createElement('div');
      detail.innerHTML = `<b>Huevo misterioso</b><small>${G.Gacha.RARITY_NAME[mon.rarity]} · Incubación ${G.BabyMons.hatchMinutes[mon.rarity]} min</small>`;
      const countdown = document.createElement('strong');
      countdown.className = 'baby-egg-time';
      countdown.dataset.eggId = egg.id;
      countdown.textContent = readyNow ? 'Eclosionando…' : 'Eclosiona en ' + timeLeft(left);
      detail.appendChild(countdown);
      card.appendChild(detail);
      eggs.appendChild(card);
    }

    const active = save.babyPartner && G.BabyMons.BY_DEX[save.babyPartner];
    const activeLabel = $('baby-active');
    activeLabel.textContent = active ? `Compañero bebé seleccionado: ${active.name} · ${active.passive}` : 'Aún no has elegido un compañero bebé.';
    if (active) activeLabel.appendChild(babySprite(active.dex, 64));
    const collection = $('baby-collection');
    collection.innerHTML = '';
    if (!owned.length) collection.innerHTML = '<p class="sub">Tus compañeros aparecerán aquí al eclosionar sus huevos.</p>';
    for (const mon of owned.slice().sort((a, b) => b.rarity - a.rarity || a.name.localeCompare(b.name))) {
      const card = document.createElement('article');
      card.className = 'baby-card';
      card.appendChild(babySprite(mon.dex));
      const detail = document.createElement('div');
      detail.className = 'baby-card-detail';
      detail.innerHTML = `<b>${mon.name}</b><small>${G.Gacha.RARITY_NAME[mon.rarity]} · ${mon.passive}</small><p>${mon.description}</p>`;
      const equip = document.createElement('button');
      const isActive = save.babyPartner === mon.dex;
      equip.className = 'btn small' + (isActive ? '' : ' gold');
      equip.textContent = isActive ? 'Compañero activo' : 'Elegir compañero';
      equip.disabled = isActive;
      equip.onclick = () => {
        save.babyPartner = mon.dex;
        G.DB.commit(true);
        G.Audio.sfx('select');
        refreshBabies();
      };
      detail.appendChild(equip);
      card.appendChild(detail);
      collection.appendChild(card);
    }
    G.UI.refreshCoins();
  }

  function tickBabies() {
    const save = G.DB.save;
    const now = Date.now();
    if (save.babyEggs.some(egg => egg.hatchAt <= now)) {
      refreshBabies();
      return;
    }
    document.querySelectorAll('#baby-eggs .baby-egg-time').forEach(countdown => {
      const egg = save.babyEggs.find(item => item.id === countdown.dataset.eggId);
      if (egg) countdown.textContent = 'Eclosiona en ' + timeLeft(egg.hatchAt - now);
    });
  }

  const wait = ms => new Promise(r => setTimeout(r, ms));

  async function pull(n) {
    if (busy) return;
    busy = true;
    try {
      const res = G.Gacha.pull(G.DB.save, n, gen);
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

  async function pullBaby() {
    if (busy) return;
    busy = true;
    try {
      const result = G.BabyGacha.pull(G.DB.save);
      if (!result) {
        G.Audio.sfx('error');
        G.UI.toast('Necesitas 1 ticket morado y 700 monedas para conseguir un huevo.');
        return;
      }
      G.DB.save.stats.babyPulls = (G.DB.save.stats.babyPulls || 0) + 1;
      G.DB.commit(true);

      const fx = $('pull-fx'), slot = $('slot'), out = $('pull-results');
      out.innerHTML = '';
      $('pull-close').classList.add('hidden');
      slot.style.display = '';
      fx.classList.remove('hidden');
      await G.Slots.play(slot, [{ rarity: result.mon.rarity, shiny: false }]);
      slot.style.display = 'none';

      const card = document.createElement('div');
      card.className = 'baby-pull-card';
      card.appendChild(eggImage('baby-pull-egg'));
      const detail = document.createElement('div');
      detail.innerHTML = `<b>¡Conseguiste un huevo bebé!</b><p>${G.Gacha.RARITY_NAME[result.mon.rarity]} · Eclosiona en ${G.BabyMons.hatchMinutes[result.mon.rarity]} min.</p><small>Podrás ver qué compañero contiene cuando eclosione.</small>`;
      card.appendChild(detail);
      out.appendChild(card);
      G.Audio.sfx('reveal', { rarity: result.mon.rarity });
      $('pull-close').classList.remove('hidden');
    } finally {
      busy = false;
    }
  }

  function close() {
    $('pull-fx').classList.add('hidden');
    if (kind === 'normal') refresh();
    else refreshBabies();
  }

  return { init, open, openBabies, get open_() { return !$('pull-fx').classList.contains('hidden'); } };
})();
