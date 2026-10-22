/* Colección clásica de Pokémon con ilustraciones del juego; no usa escaneos TCG. */
G.CardSystem = (() => {
  const CARD_DEXES = [
    63,65,59,15,9,1,10,113,6,4,5,35,87,50,84,148,147,96,51,125,101,83,92,58,130,
    93,107,2,124,64,14,109,68,67,66,129,126,81,82,11,150,34,32,33,38,95,17,16,25,
    60,61,62,77,137,26,20,19,27,86,7,121,120,114,3,100,37,8,13,145
  ];
  const CONFIG = {
    pack: {
      id: 'classic-basic',
      name: 'Sobre básico · colección clásica',
      cost: { coins: 300, tickets: 3 },
      rewards: 1,
      variants: [
        { id: 'bulbasaur', name: 'Bosque', dex: 1, color: '#38765a' },
        { id: 'charmander', name: 'Llama', dex: 4, color: '#a95136' },
        { id: 'squirtle', name: 'Océano', dex: 7, color: '#3478a2' }
      ]
    },
    rarityRates: G.Acquisition.gacha.rates.map(([rarity, weight]) => ({ rarity, weight })),
    fragmentsRequiredByRarity: { 1: 3, 2: 4, 3: 5, 4: 3, 5: 2 },
    fragmentsByRarity: { 1: 1, 2: 2, 3: 3, 4: 5, 5: 10 },
    duplicateCoinsByRarity: G.Acquisition.gacha.duplicateRefund
  };
  const rarityNames = { 1: 'Común', 2: 'Poco común', 3: 'Rara', 4: 'Épica', 5: 'Legendaria' };
  const catalog = CARD_DEXES.map(id => G.DEX_BY[id]).filter(Boolean).map(mon => ({
    id: mon.dex,
    name: mon.name,
    pokedex: mon.dex,
    rarity: mon.rarity,
    types: mon.types,
    fragmentsRequired: CONFIG.fragmentsRequiredByRarity[mon.rarity],
    enabled: !mon.leg,
    availableInPacks: !mon.leg,
    weight: null
  }));

  function state() {
    const save = G.DB.save;
    if (!save) throw new Error('Inicia sesión para usar la colección de cartas.');
    if (!save.cardCollection || typeof save.cardCollection !== 'object' || Array.isArray(save.cardCollection))
      save.cardCollection = { v: 1, fragments: {}, discovered: {}, operations: {} };
    for (const key of ['fragments', 'discovered', 'operations']) {
      if (!save.cardCollection[key] || typeof save.cardCollection[key] !== 'object' || Array.isArray(save.cardCollection[key]))
        save.cardCollection[key] = {};
    }
    return save.cardCollection;
  }

  function validate() {
    const rates = CONFIG.rarityRates;
    const sum = rates.reduce((total, row) => total + Number(row.weight), 0);
    if (rates.length !== 5 || rates.some(row => !Number.isFinite(row.weight) || row.weight < 0) || Math.abs(sum - 100) > 1e-8)
      throw Error('Configuración inválida: probabilidades de rareza deben sumar 100 %.');
    if (Object.values(CONFIG.fragmentsByRarity).some(amount => !Number.isInteger(amount) || amount < 1))
      throw Error('Configuración inválida: fragmentos por rareza.');
    if (Object.values(CONFIG.fragmentsRequiredByRarity).some(amount => !Number.isInteger(amount) || amount < 1))
      throw Error('Configuración inválida: requisitos por rareza.');
    if (!Number.isInteger(CONFIG.pack.cost.coins) || CONFIG.pack.cost.coins < 0 ||
        !Number.isInteger(CONFIG.pack.cost.tickets) || CONFIG.pack.cost.tickets < 0 || CONFIG.pack.rewards !== 1)
      throw Error('Configuración inválida: coste o cantidad de recompensas del sobre.');
    if (Object.values(CONFIG.duplicateCoinsByRarity).some(amount => !Number.isFinite(amount) || amount < 0))
      throw Error('Configuración inválida: compensación de duplicados.');
    if (!catalog.length) throw Error('No hay personajes disponibles en la colección.');
    return true;
  }

  function pick(items, weightFn, rng) {
    const total = items.reduce((sum, item) => sum + weightFn(item), 0);
    let roll = rng() * total;
    for (const item of items) {
      roll -= weightFn(item);
      if (roll < 0) return item;
    }
    return items[items.length - 1];
  }

  function selectRarity(rng = Math.random) {
    validate();
    return pick(CONFIG.rarityRates, row => row.weight, rng).rarity;
  }

  function cardFor(rarity, rng) {
    let eligible = catalog.filter(card => card.enabled && card.availableInPacks && card.rarity === rarity);
    let actualRarity = rarity;
    if (!eligible.length) {
      const available = CONFIG.rarityRates.map(row => row.rarity)
        .filter(value => catalog.some(card => card.enabled && card.availableInPacks && card.rarity === value));
      const fallback = available.sort((a, b) => Math.abs(a - rarity) - Math.abs(b - rarity) || a - b)[0];
      if (fallback == null) throw Error('No hay cartas disponibles; el sobre no se cobró.');
      actualRarity = fallback;
      eligible = catalog.filter(card => card.enabled && card.availableInPacks && card.rarity === fallback);
    }
    return { card: pick(eligible, card => Number.isFinite(card.weight) && card.weight > 0 ? card.weight : 1, rng), rarity: actualRarity };
  }

  function probabilityRows() {
    const rows = CONFIG.rarityRates.map(row => ({
      ...row,
      count: catalog.filter(card => card.enabled && card.availableInPacks && card.rarity === row.rarity).length
    }));
    const effective = Object.fromEntries(rows.map(row => [row.rarity, 0]));
    for (const row of rows) {
      let target = row.rarity;
      if (!row.count) {
        const fallback = rows.filter(other => other.count)
          .sort((a, b) => Math.abs(a.rarity - row.rarity) - Math.abs(b.rarity - row.rarity) || a.rarity - b.rarity)[0];
        target = fallback && fallback.rarity;
      }
      if (target != null) effective[target] += row.weight;
    }
    return rows.map(row => ({ ...row, name: rarityNames[row.rarity], actualWeight: effective[row.rarity] }));
  }

  let busy = false;
  function open({ rng = Math.random, operationId = makeOperationId() } = {}) {
    if (busy) throw Error('La apertura ya está en curso.');
    busy = true;
    try {
      validate();
      const save = G.DB.save, collection = state();
      if (typeof operationId !== 'string' || !/^[a-zA-Z0-9_-]{1,128}$/.test(operationId))
        throw Error('Identificador de apertura inválido.');
      if (Object.prototype.hasOwnProperty.call(collection.operations, operationId))
        return collection.operations[operationId];
      if (save.coins < CONFIG.pack.cost.coins || save.tickets.t1 < CONFIG.pack.cost.tickets)
        throw Error('Necesitas 300 monedas y 3 tickets para abrir este sobre.');

      const drawnRarity = selectRarity(rng);
      const picked = cardFor(drawnRarity, rng);
      const card = picked.card;
      const previous = Number(collection.fragments[card.id] || 0);
      const duplicate = !!save.owned[card.id];
      const reward = duplicate ? 0 : CONFIG.fragmentsByRarity[card.rarity];
      const next = duplicate ? previous : Math.min(card.fragmentsRequired, previous + reward);
      const completed = !duplicate && previous < card.fragmentsRequired && next >= card.fragmentsRequired;
      const unlocked = completed && !save.owned[card.id];
      const duplicateCoins = duplicate ? Number(CONFIG.duplicateCoinsByRarity[card.rarity] || 0) : 0;
      const result = {
        operationId,
        cardId: card.id,
        rarity: card.rarity,
        fragments: reward,
        before: previous,
        after: next,
        required: card.fragmentsRequired,
        duplicate,
        duplicateCoins,
        completed,
        unlocked
      };

      save.coins -= CONFIG.pack.cost.coins;
      save.tickets.t1 -= CONFIG.pack.cost.tickets;
      if (duplicate) save.coins += duplicateCoins;
      else {
        collection.fragments[card.id] = next;
        collection.discovered[card.id] = true;
      }
      if (unlocked) G.DB.grant(card.id, 'card-fragments');
      collection.operations[operationId] = result;
      const operations = Object.keys(collection.operations);
      for (const old of operations.slice(0, Math.max(0, operations.length - 100))) delete collection.operations[old];
      G.DB.commit(true);
      G.UI.refreshCoins();
      return result;
    } finally {
      busy = false;
    }
  }

  function makeOperationId() {
    const cryptoApi = typeof crypto === 'object' ? crypto : null;
    return cryptoApi && typeof cryptoApi.randomUUID === 'function'
      ? cryptoApi.randomUUID() : `${Date.now()}-${Math.random()}`;
  }

  function snapshot() {
    const collection = state();
    return catalog.map(card => ({
      ...card,
      fragments: collection.fragments[card.id] || 0,
      unlocked: !!G.DB.save.owned[card.id],
      discovered: !!collection.discovered[card.id]
    }));
  }

  return {
    CONFIG,
    catalog,
    unmatched: CARD_DEXES.filter(id => !G.DEX_BY[id]),
    rarityNames,
    validate,
    selectRarity,
    probabilityRows,
    open,
    snapshot
  };
})();

G.CardCollectionUI = (() => {
  const $ = G.UI.$;
  const FILTERS = [
    ['all', 'Todas'], ['rarity-1', 'Comunes'], ['rarity-2', 'Poco comunes'],
    ['rarity-3', 'Raras'], ['rarity-4', 'Épicas'], ['rarity-5', 'Legendarias'],
    ['progress', 'En progreso'], ['complete', 'Completadas'], ['unlocked', 'Desbloqueados']
  ];
  let filter = 'all', view = 'pack', busy = false, selectedPack = G.CardSystem.CONFIG.pack.variants[0].id;

  function text(tag, value, className) {
    const el = document.createElement(tag);
    el.textContent = value;
    if (className) el.className = className;
    return el;
  }

  function sprite(dex, width, height, options = {}) {
    return G.UI.spriteCanvas(dex, width, height, Object.assign({ scale: 2, shadow: false }, options));
  }

  function artwork(dex, progress, width = 140, height = 150) {
    const wrap = document.createElement('span');
    wrap.className = 'card-art';
    wrap.style.setProperty('--fill', `${Math.max(0, Math.min(1, progress)) * 100}%`);
    const silhouette = sprite(dex, width, height, { silhouette: true });
    silhouette.className = 'card-art-base';
    silhouette.setAttribute('aria-hidden', 'true');
    const color = sprite(dex, width, height);
    color.className = 'card-art-fill';
    color.setAttribute('aria-hidden', 'true');
    wrap.append(silhouette, color);
    return wrap;
  }

  function setView(next) {
    view = next === 'collection' ? 'collection' : 'pack';
    $('card-pack-view').classList.toggle('hidden', view !== 'pack');
    $('card-collection-view').classList.toggle('hidden', view !== 'collection');
    document.querySelectorAll('[data-card-view]').forEach(button => {
      const selected = button.dataset.cardView === view;
      button.classList.toggle('ghost', !selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    if (view === 'collection') renderCollection();
    else renderPack();
  }

  function renderPack() {
    const root = $('card-pack-view');
    const save = G.DB.save;
    const config = G.CardSystem.CONFIG;
    const selected = config.pack.variants.find(pack => pack.id === selectedPack) || config.pack.variants[0];
    root.replaceChildren();

    const picker = document.createElement('div');
    picker.className = 'card-pack-picker';
    for (const pack of config.pack.variants) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `pack-choice${pack.id === selected.id ? ' selected' : ''}`;
      button.setAttribute('aria-pressed', String(pack.id === selected.id));
      const art = sprite(pack.dex, 86, 88, { hero: true });
      art.className = 'pack-choice-art';
      button.append(art, text('span', pack.name));
      button.onclick = () => { selectedPack = pack.id; renderPack(); };
      picker.appendChild(button);
    }
    root.appendChild(picker);

    const panel = document.createElement('div');
    panel.className = 'panel card-pack';
    const packArt = sprite(selected.dex, 140, 170, { hero: true });
    packArt.className = 'pack-art';
    packArt.style.setProperty('--pack-color', selected.color);
    const details = document.createElement('div');
    details.className = 'card-pack-details';
    details.append(
      text('h3', config.pack.name),
      text('p', `Diseño ${selected.name} · Una carta · ${config.pack.cost.coins} monedas + ${config.pack.cost.tickets} tickets`),
      text('p', `Saldo: ${save.coins.toLocaleString('es')} monedas · ${save.tickets.t1} tickets`)
    );
    const probabilities = document.createElement('div');
    probabilities.className = 'card-rates';
    for (const row of G.CardSystem.probabilityRows()) {
      probabilities.appendChild(text('span', `${row.name}: ${row.actualWeight}%${row.count ? '' : ' (respaldo)'}`));
    }
    const button = text('button', busy ? 'Abriendo…' : 'Abrir sobre', 'btn gold');
    button.type = 'button';
    button.disabled = busy;
    button.onclick = () => {
      if (busy) return;
      busy = true;
      button.disabled = true;
      $('card-message').replaceChildren();
      try {
        showReward(G.CardSystem.open());
      } catch (error) {
        $('card-message').textContent = error.message;
        G.UI.toast(error.message);
      } finally {
        busy = false;
        renderPack();
      }
    };
    details.append(probabilities, button);
    panel.append(packArt, details);
    root.appendChild(panel);
  }

  function showReward(result) {
    const card = G.CardSystem.catalog.find(entry => entry.id === result.cardId);
    if (!card) throw new Error('No se encontró la carta obtenida.');
    const reward = document.createElement('div');
    reward.className = 'panel card-reward';
    reward.append(artwork(card.id, result.after / result.required, 110, 126));
    const details = document.createElement('div');
    details.append(
      text('h3', `${card.name} · ${G.CardSystem.rarityNames[result.rarity]}`),
      text('p', result.duplicate
        ? `Duplicado: +${result.duplicateCoins} monedas.`
        : `+${result.fragments} fragmentos · ${result.before} → ${result.after}/${result.required}.`)
    );
    if (result.completed) details.appendChild(text('strong', '¡Carta completada!'));
    if (result.unlocked) details.appendChild(text('strong', '¡Personaje desbloqueado!'));
    reward.appendChild(details);
    $('card-message').replaceChildren(reward);
  }

  function matches(card) {
    if (filter === 'all') return true;
    if (filter.startsWith('rarity-')) return card.rarity === Number(filter.slice(7));
    if (filter === 'progress') return card.fragments > 0 && card.fragments < card.fragmentsRequired;
    if (filter === 'complete') return card.fragments >= card.fragmentsRequired;
    if (filter === 'unlocked') return card.unlocked;
    return false;
  }

  function showDetail(card) {
    const ratio = card.fragments / card.fragmentsRequired;
    const root = $('card-detail-content');
    root.replaceChildren();
    const layout = document.createElement('div');
    layout.className = 'card-detail-layout';
    const art = artwork(card.id, ratio, 230, 250);
    art.classList.add('card-detail-art');
    const details = document.createElement('div');
    const name = card.discovered ? card.name : 'Carta desconocida';
    const title = text('h2', name);
    title.id = 'card-detail-title';
    details.append(
      title,
      text('p', card.discovered ? G.CardSystem.rarityNames[card.rarity] : 'Sin descubrir'),
      text('p', `Fragmentos: ${card.fragments}/${card.fragmentsRequired}`)
    );
    const progress = document.createElement('progress');
    progress.max = card.fragmentsRequired;
    progress.value = Math.min(card.fragments, card.fragmentsRequired);
    details.appendChild(progress);
    details.appendChild(text('p', card.unlocked ? 'Pokémon disponible en selección.'
      : card.discovered ? 'Aún no desbloqueado.' : 'La carta se irá revelando al obtener fragmentos.'));
    layout.append(art, details);
    root.appendChild(layout);
    $('card-detail').classList.remove('hidden');
  }

  function renderCollection() {
    const root = $('card-collection-view');
    const records = G.CardSystem.snapshot();
    root.replaceChildren();
    const filters = document.createElement('div');
    filters.className = 'card-filters';
    for (const [id, label] of FILTERS) {
      const button = text('button', label, `btn small${filter === id ? ' gold' : ' ghost'}`);
      button.type = 'button';
      button.setAttribute('aria-pressed', String(filter === id));
      button.onclick = () => { filter = id; renderCollection(); };
      filters.appendChild(button);
    }
    root.appendChild(filters);
    const grid = document.createElement('div');
    grid.className = 'grid card-grid';
    for (const card of records.filter(matches)) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'card-entry';
      button.setAttribute('aria-label', `${card.discovered ? card.name : 'Carta desconocida'}, ${card.fragments} de ${card.fragmentsRequired} fragmentos`);
      const name = card.discovered ? card.name : '???';
      button.append(
        artwork(card.id, card.fragments / card.fragmentsRequired, 130, 142),
        text('b', name),
        text('span', G.CardSystem.rarityNames[card.rarity]),
        text('span', `${card.fragments}/${card.fragmentsRequired}`)
      );
      const progress = document.createElement('progress');
      progress.max = card.fragmentsRequired;
      progress.value = Math.min(card.fragments, card.fragmentsRequired);
      button.appendChild(progress);
      if (card.unlocked) button.appendChild(text('small', 'Pokémon disponible'));
      button.onclick = () => showDetail(card);
      grid.appendChild(button);
    }
    root.appendChild(grid);
  }

  function open(initialView = 'pack') {
    setTimeout(() => {
      G.UI.show('scr-cards');
      setView(initialView);
    }, 0);
  }

  function init() {
    try { G.CardSystem.validate(); }
    catch (error) { console.error('[Cartas]', error); }
    document.querySelectorAll('[data-card-view]').forEach(button => {
      button.onclick = () => setView(button.dataset.cardView);
    });
    document.querySelectorAll('[data-detail-close]').forEach(button => {
      button.onclick = () => $('card-detail').classList.add('hidden');
    });
    $('card-detail').onclick = event => {
      if (event.target === $('card-detail')) $('card-detail').classList.add('hidden');
    };
    G.DB.onSync(() => {
      if (!G.UI.isOpen('scr-cards')) return;
      if (view === 'collection') renderCollection();
      else renderPack();
    });
  }

  return { init, open, renderCollection };
})();
