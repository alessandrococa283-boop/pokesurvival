/* Colección Base Set. IDs = dex numérico existente; la imagen se asocia por nombre normalizado. */
G.CardSystem = (() => {
  const CONFIG = {
    pack: { id: 'base-set-basic', name: 'Sobre básico - Set clásico', cost: { coins: 300, tickets: 3 }, rewards: 1,
      variants: [
        { id: 'blastoise', name: 'Blastoise', image: 'assets/cards/packs/blastoise.png' },
        { id: 'charizard', name: 'Charizard', image: 'assets/cards/packs/charizard.png' },
        { id: 'venusaur', name: 'Venusaur', image: 'assets/cards/packs/venusaur.png' }
      ] },
    // Reutiliza las probabilidades de rareza 1–5 ya configuradas para los banners del juego.
    rarityRates: G.Acquisition.gacha.rates.map(([rarity, weight]) => ({ rarity, weight })),
    // Los requisitos se basan en la rareza, según el balance solicitado.
    fragmentsRequiredByRarity: { 1: 3, 2: 4, 3: 5, 4: 3, 5: 2 },
    // Entrega provisional por apertura; distinta del requisito para completar la carta.
    fragmentsByRarity: { 1: 1, 2: 2, 3: 3, 4: 5, 5: 10 },
    // Reutiliza la economía de duplicados ya definida para el gacha normal.
    duplicateCoinsByRarity: G.Acquisition.gacha.duplicateRefund,
  };
  const rarityNames = { 1: 'Común', 2: 'Poco común', 3: 'Rara', 4: 'Épica', 5: 'Legendaria' };
  const fileNames = [
    'abra-base-set-bs-43-325x447.jpg','alakazam-base-set-bs-1.jpg','arcanine-base-set-bs-23-325x447.jpg','beedrill-base-set-bs-17-325x447.jpg','blastoise-base-set-bs-2-325x447.jpg','bulbasaur-base-set-bs-44-325x447.jpg','caterpie-base-set-bs-45-325x447.jpg','chansey-base-set-bs-3-325x447.jpg','charizard-base-set-bs-4-325x447.jpg','charmander-base-set-bs-46-325x447.jpg','charmeleon-base-set-bs-24-325x447.jpg','clefairy-base-set-bs-5-325x447.jpg','dewgong-base-set-bs-25-325x447.jpg','diglett-base-set-bs-47-325x447.jpg','doduo-base-set-bs-48-325x447.jpg','dragonair-base-set-bs-18-325x447.jpg','dratini-base-set-bs-26-325x447.jpg','drowzee-base-set-bs-49-325x447.jpg','dugtrio-base-set-bs-19-325x447.jpg','electabuzz-base-set-bs-20-325x447.jpg','electrode-base-set-bs-21-325x447.jpg','farfetchd-base-set-bs-27-325x447.jpg','gastly-base-set-bs-50-325x447.jpg','growlithe-base-set-bs-28-325x447.jpg','gyarados-base-set-bs-6-325x447.jpg','haunter-base-set-bs-29-325x447.jpg','hitmonchan-base-set-bs-7-325x447.jpg','ivysaur-base-set-bs-30-325x447.jpg','jynx-base-set-bs-31-325x447.jpg','kadabra-base-set-bs-32-325x447.jpg','kakuna-base-set-bs-33-325x447.jpg','koffing-base-set-bs-51-325x447.jpg','machamp-base-set-bs-8-325x447.jpg','machoke-base-set-bs-34-325x447.jpg','machop-base-set-bs-52-325x447.jpg','magikarp-base-set-bs-35-325x447.jpg','magmar-base-set-bs-36-325x447.jpg','magnemite-base-set-bs-53-325x447.jpg','magneton-base-set-bs-9-325x447.jpg','metapod-base-set-bs-54-325x447.jpg','mewtwo-base-set-bs-10-325x447.jpg','nidoking-base-set-bs-11-325x447.jpg','nidoran-male-base-set-bs-55-325x447.jpg','nidorino-base-set-bs-37-325x447.jpg','ninetales-base-set-bs-12-325x447.jpg','onix-base-set-bs-56-325x447.jpg','pidgeotto-base-set-bs-22-325x447.jpg','pidgey-base-set-bs-57-325x447.jpg','pikachu-base-set-bs-58-325x447.jpg','poliwag-base-set-bs-59-325x447.jpg','poliwhirl-base-set-bs-38-325x447.jpg','poliwrath-base-set-bs-13-325x447.jpg','ponyta-base-set-bs-60-325x447.jpg','porygon-base-set-bs-39-325x447.jpg','raichu-base-set-bs-14-325x447.jpg','raticate-base-set-bs-40-325x447.jpg','rattata-base-set-bs-61-325x447.jpg','sandshrew-base-set-bs-62-325x447.jpg','seel-base-set-bs-41-325x447.jpg','squirtle-base-set-bs-63-325x447.jpg','starmie-base-set-bs-64-325x447.jpg','staryu-base-set-bs-65-325x447.jpg','tangela-base-set-bs-66-325x447.jpg','venusaur-base-set-bs-15-325x447.jpg','voltorb-base-set-bs-67-325x447.jpg','vulpix-base-set-bs-68-325x447.jpg','wartortle-base-set-bs-42-325x447.jpg','weedle-base-set-bs-69-325x447.jpg','zapdos-base-set-bs-16-325x447.jpg'
  ];
  const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const nameFromFile = f => f.replace(/-base-set-bs-.*$/, '').replace(/-325x447$/, '').replace(/-/g, ' ');
  const alias = { nidoranmale: '32' };
  const byName = new Map(G.DEX.map(mon => [normalize(mon.name), mon]));
  const cards = fileNames.map(file => {
    const name = nameFromFile(file), mon = alias[normalize(name)] ? G.DEX_BY[alias[normalize(name)]] : byName.get(normalize(name));
    if (!mon) return { id: null, sourceName: name, image: `assets/cards/base-set/${file}`, match: false };
    return { id: mon.dex, name: mon.name, pokedex: mon.dex, rarity: mon.rarity, types: mon.types,
      image: `assets/cards/base-set/${file}`, fragmentsRequired: CONFIG.fragmentsRequiredByRarity[mon.rarity],
      enabled: !mon.leg, availableInPacks: !mon.leg, weight: null, match: true };
  });
  const catalog = cards.filter(c => c.match);
  const state = () => {
    const s = G.DB.save;
    if (!s) throw new Error('Inicia sesión para usar la colección de cartas.');
    s.cardCollection ||= { v: 1, fragments: {}, discovered: {}, operations: {} };
    return s.cardCollection;
  };
  function validate() {
    const rates = CONFIG.rarityRates;
    const sum = rates.reduce((n, r) => n + Number(r.weight), 0);
    if (rates.length !== 5 || rates.some(r => !Number.isFinite(r.weight) || r.weight < 0) || Math.abs(sum - 100) > 1e-8) throw Error('Configuración inválida: probabilidades de rareza deben sumar 100 %.');
    if (Object.values(CONFIG.fragmentsByRarity).some(n => !Number.isInteger(n) || n < 1)) throw Error('Configuración inválida: fragmentos por rareza.');
    if (Object.values(CONFIG.fragmentsRequiredByRarity).some(n => !Number.isInteger(n) || n < 1)) throw Error('Configuración inválida: requisitos por rareza.');
    if (!Number.isInteger(CONFIG.pack.cost.coins) || CONFIG.pack.cost.coins < 0 || !Number.isInteger(CONFIG.pack.cost.tickets) || CONFIG.pack.cost.tickets < 0 || CONFIG.pack.rewards !== 1) throw Error('Configuración inválida: coste o cantidad de recompensas del sobre.');
    if (Object.values(CONFIG.duplicateCoinsByRarity).some(n => !Number.isFinite(n) || n < 0)) throw Error('Configuración inválida: compensación de duplicados.');
    return true;
  }
  function pick(items, weightFn, rng) {
    const total = items.reduce((n, item) => n + weightFn(item), 0);
    let roll = rng() * total;
    for (const item of items) { roll -= weightFn(item); if (roll < 0) return item; }
    return items[items.length - 1];
  }
  function rarity(rng = Math.random) { validate(); return pick(CONFIG.rarityRates, r => r.weight, rng).rarity; }
  function cardFor(r, rng = Math.random) {
    let eligible = catalog.filter(c => c.enabled && c.availableInPacks && G.DEX_BY[c.id] && c.rarity === r);
    let actualRarity = r;
    // Fallback documentado: rareza más cercana disponible, luego la siguiente; peso por carta uniforme salvo weight explícito.
    if (!eligible.length) {
      const other = CONFIG.rarityRates.map(x => x.rarity).filter(x => catalog.some(c => c.enabled && c.availableInPacks && G.DEX_BY[c.id] && c.rarity === x));
      const substitute = other.sort((a, b) => Math.abs(a - r) - Math.abs(b - r) || a - b)[0];
      if (substitute == null) throw Error('No hay cartas disponibles en el catálogo; la apertura se canceló sin cobrar.');
      actualRarity = substitute;
      eligible = catalog.filter(c => c.enabled && c.availableInPacks && G.DEX_BY[c.id] && c.rarity === substitute);
    }
    return { card: pick(eligible, c => Number.isFinite(c.weight) && c.weight > 0 ? c.weight : 1, rng), rarity: actualRarity };
  }
  function probabilityRows() {
    const available = CONFIG.rarityRates.map(row => ({ ...row, count: catalog.filter(c => c.enabled && c.availableInPacks && G.DEX_BY[c.id] && c.rarity === row.rarity).length }));
    const effective = Object.fromEntries(available.map(row => [row.rarity, 0]));
    for (const row of available) {
      let target = row.rarity;
      if (!row.count) target = available.filter(x => x.count).sort((a, b) => Math.abs(a.rarity - row.rarity) - Math.abs(b.rarity - row.rarity) || a.rarity - b.rarity)[0]?.rarity;
      if (target != null) effective[target] += row.weight;
    }
    return available.map(row => ({ ...row, name: rarityNames[row.rarity], actualWeight: effective[row.rarity] }));
  }
  let busy = false;
  function open({ rng = Math.random, operationId = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}` } = {}) {
    if (busy) throw Error('La apertura ya está en curso.');
    busy = true;
    try {
      validate(); const save = G.DB.save, col = state();
      if (col.operations[operationId]) return col.operations[operationId];
      if (save.coins < CONFIG.pack.cost.coins || save.tickets.t1 < CONFIG.pack.cost.tickets) throw Error('Necesitas 300 monedas y 3 tickets para abrir este sobre.');
      const drawnRarity = rarity(rng), picked = cardFor(drawnRarity, rng), card = picked.card, r = picked.rarity;
      const previous = Number(col.fragments[card.id] || 0);
      const duplicate = !!save.owned[card.id], reward = duplicate ? 0 : CONFIG.fragmentsByRarity[card.rarity];
      const next = duplicate ? previous : Math.min(card.fragmentsRequired, previous + reward);
      const completed = !duplicate && previous < card.fragmentsRequired && next >= card.fragmentsRequired;
      // Todo lo aleatorio y validable queda resuelto antes de tocar el saldo.
      save.coins -= CONFIG.pack.cost.coins; save.tickets.t1 -= CONFIG.pack.cost.tickets;
      let duplicateCoins = 0;
      if (duplicate) { duplicateCoins = Number(CONFIG.duplicateCoinsByRarity[card.rarity] || 0); save.coins += duplicateCoins; }
      else { col.fragments[card.id] = next; col.discovered[card.id] = true; }
      let unlocked = false;
      if (completed && !save.owned[card.id]) {
        const registered = G.DB.recordPokemon?.(card.id, 'card-fragments');
        if (registered?.ok === false) throw Error(registered.error || 'No se pudo registrar el personaje.');
        if (!save.owned[card.id]) save.owned[card.id] = { at: Date.now(), from: 'card-fragments' };
        unlocked = true;
      }
      const result = { operationId, cardId: card.id, rarity: card.rarity, fragments: reward, before: previous, after: next, required: card.fragmentsRequired,
        duplicate, duplicateCoins, completed, unlocked };
      col.operations[operationId] = result; G.DB.commit(true); G.UI.refreshCoins();
      return result;
    } finally { busy = false; }
  }
  function snapshot() {
    const col = state();
    return catalog.map(c => ({ ...c, fragments: col.fragments[c.id] || 0, unlocked: !!G.DB.save.owned[c.id], discovered: !!col.discovered[c.id] }));
  }
  return { CONFIG, catalog, unmatched: cards.filter(c => !c.match), rarityNames, validate, selectRarity: rarity, probabilityRows, open, snapshot };
})();

G.CardCollectionUI = (() => {
  const $ = G.UI.$;
  let filter = 'all', busy = false, selectedPack = G.CardSystem.CONFIG.pack.variants[0].id;
  function setView(view) {
    $('card-pack-view').classList.toggle('hidden', view !== 'pack');
    $('card-collection-view').classList.toggle('hidden', view !== 'collection');
    if (view === 'collection') renderCollection(); else renderPack();
  }
  function renderPack() {
    const save = G.DB.save, rows = G.CardSystem.probabilityRows(), variants = G.CardSystem.CONFIG.pack.variants;
    const operationId = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
    const selected = variants.find(p => p.id === selectedPack) || variants[0];
    $('card-pack-view').innerHTML = `<div class="card-pack-picker">${variants.map(p => `<button class="pack-choice ${p.id === selected.id ? 'selected' : ''}" data-pack="${p.id}" aria-pressed="${p.id === selected.id}"><img src="${p.image}" alt="Sobre de ${p.name}"><span>${p.name}</span></button>`).join('')}</div><div class="panel card-pack"><img class="pack-image" src="${selected.image}" alt="Sobre con ilustración de ${selected.name}"><div><h3>${G.CardSystem.CONFIG.pack.name}</h3><p>Diseño ${selected.name} · Una carta · 300 monedas + 3 tickets</p><p>Saldo: ${save.coins.toLocaleString('es')} monedas · ${save.tickets.t1} tickets</p><div class="card-rates">${rows.map(r => `<span>${r.name}: ${r.actualWeight}%${r.cardCount ? '' : ' (respaldo)'}</span>`).join('')}</div><button class="btn gold" id="card-open" ${busy ? 'disabled' : ''}>Abrir sobre</button></div></div>`;
    $('card-pack-view').querySelectorAll('[data-pack]').forEach(b => b.onclick = () => { selectedPack = b.dataset.pack; renderPack(); });
    $('card-open').onclick = () => {
      if (busy) return; busy = true; $('card-open').disabled = true; $('card-message').textContent = '';
      try { const result = G.CardSystem.open({ operationId }); showReward(result); renderPack(); }
      catch (e) { $('card-message').textContent = e.message; G.UI.toast(e.message); renderPack(); }
      finally { busy = false; }
    };
  }
  function showReward(result) {
    const card = G.CardSystem.catalog.find(c => c.id === result.cardId);
    const message = result.duplicate ? `Duplicado: +${result.duplicateCoins} monedas.` : `+${result.fragments} fragmentos · ${result.before} → ${result.after}/${result.required}.`;
    $('card-message').innerHTML = `<div class="panel card-reward"><img src="${card.image}" alt="Carta de ${card.name}"><div><h3>${card.name} · ${G.CardSystem.rarityNames[result.rarity]}</h3><p>${message}</p>${result.completed ? '<strong>¡Carta completada!</strong>' : ''}${result.unlocked ? '<strong> ¡Personaje desbloqueado!</strong>' : ''}</div></div>`;
  }
  function renderCollection() {
    const records = G.CardSystem.snapshot();
    $('card-collection-view').innerHTML = `<div class="card-filters">${[['all','Todas'],['rarity-1','Comunes'],['rarity-2','Poco comunes'],['rarity-3','Raras'],['rarity-4','Épicas'],['rarity-5','Legendarias'],['progress','En progreso'],['complete','Completadas'],['unlocked','Desbloqueados']].map(([k,n]) => `<button class="btn small ${filter === k ? 'gold' : 'ghost'}" data-filter="${k}">${n}</button>`).join('')}</div><div class="grid card-grid">${records.filter(c => filter === 'all' || filter === `rarity-${c.rarity}` || filter === 'progress' && c.fragments > 0 && c.fragments < c.fragmentsRequired || filter === 'complete' && c.fragments >= c.fragmentsRequired || filter === 'unlocked' && c.unlocked).map(c => { const ratio = Math.min(1,c.fragments/c.fragmentsRequired); return `<button class="card-entry" data-detail="${c.id}" aria-label="${c.discovered ? c.name : 'Carta desconocida'}, ${c.fragments} de ${c.fragmentsRequired} fragmentos"><span class="card-art" style="--fill:${ratio*100}%"><img class="card-art-base" src="${c.image}" alt=""><img class="card-art-fill" src="${c.image}" alt=""></span><b>${c.discovered ? c.name : '???'}</b><span>${G.CardSystem.rarityNames[c.rarity]}</span><span>${c.fragments}/${c.fragmentsRequired}</span><progress max="${c.fragmentsRequired}" value="${Math.min(c.fragments,c.fragmentsRequired)}"></progress>${c.unlocked ? '<small>Pokémon disponible</small>' : ''}</button>`; }).join('')}</div>`;
    $('card-collection-view').querySelectorAll('[data-filter]').forEach(b => b.onclick = () => { filter = b.dataset.filter; renderCollection(); });
    $('card-collection-view').querySelectorAll('[data-detail]').forEach(b => b.onclick = () => showDetail(records.find(x => String(x.id) === b.dataset.detail)));
  }
  function showDetail(c) {
    const ratio = Math.min(1,c.fragments/c.fragmentsRequired);
    $('card-detail-content').innerHTML = `<div class="card-detail-layout"><span class="card-detail-art card-art" style="--fill:${ratio*100}%"><img class="card-art-base" src="${c.image}" alt=""><img class="card-art-fill" src="${c.image}" alt=""></span><div><h2 id="card-detail-title">${c.discovered ? c.name : 'Carta desconocida'}</h2><p>${c.discovered ? G.CardSystem.rarityNames[c.rarity] : 'Sin descubrir'}</p><p>Fragmentos: ${c.fragments}/${c.fragmentsRequired}</p><progress max="${c.fragmentsRequired}" value="${Math.min(c.fragments,c.fragmentsRequired)}"></progress><p>${c.unlocked ? 'Pokémon disponible en selección.' : c.discovered ? 'Aún no desbloqueado.' : 'La carta se irá revelando al obtener fragmentos.'}</p></div></div>`;
    $('card-detail').classList.remove('hidden');
  }
  function open(view = 'pack') { G.UI.show('scr-cards'); setView(view); }
  function init() {
    try { G.CardSystem.validate(); } catch (e) { console.error('[Cartas]', e); }
    document.querySelectorAll('[data-card-view]').forEach(b => b.onclick = () => setView(b.dataset.cardView));
    document.querySelectorAll('[data-detail-close]').forEach(b => b.onclick = () => $('card-detail').classList.add('hidden'));
    $('card-detail').onclick = e => { if (e.target === $('card-detail')) $('card-detail').classList.add('hidden'); };
  }
  return { init, open, renderCollection };
})();
