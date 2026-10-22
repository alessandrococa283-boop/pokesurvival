// Pruebas deterministas: node js/cards/card-system.test.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '../..');
const G = {
  Acquisition: {
    gacha: {
      rates: [[1, 65], [2, 23], [3, 9], [4, 2.5], [5, .5]],
      duplicateRefund: { 1: 15, 2: 30, 3: 60, 4: 120, 5: 300 }
    }
  },
  UI: { $() {} }
};
global.G = G;
vm.runInThisContext(fs.readFileSync(path.join(root, 'js/data/pokedex.js'), 'utf8'));
G.DB = {
  save: {
    coins: 3000,
    tickets: { t1: 30 },
    owned: {},
    cardCollection: { v: 1, fragments: {}, discovered: {}, operations: {} }
  },
  commit() {},
  grant(dex, from) { this.save.owned[dex] = { at: 1, from }; }
};
G.UI = { $() {}, refreshCoins() {} };
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'card-system.js'), 'utf8'));

assert.equal(G.CardSystem.validate(), true);
assert.deepEqual([0, .65, .88, .97, .995].map(x => G.CardSystem.selectRarity(() => x)), [1, 2, 3, 4, 5]);
assert.deepEqual(Object.values(G.CardSystem.CONFIG.fragmentsRequiredByRarity), [3, 4, 5, 3, 2]);
assert.equal(G.CardSystem.probabilityRows().reduce((n, row) => n + row.weight, 0), 100);
assert.equal(G.CardSystem.probabilityRows().reduce((n, row) => n + row.actualWeight, 0), 100);
assert.equal(G.CardSystem.unmatched.length, 0, `Sin asociación: ${G.CardSystem.unmatched.join(', ')}`);
assert.equal(new Set(G.CardSystem.catalog.map(card => card.collectionKey)).size, G.CardSystem.catalog.length);
for (const card of G.CardSystem.catalog) {
  assert.ok(G.DEX_BY[card.id], `No existe el Pokémon ${card.id}`);
  assert.ok(fs.existsSync(path.join(root, card.image)), `Falta la imagen ${card.image}`);
}
for (const variant of G.CardSystem.CONFIG.pack.variants)
  assert.ok(fs.existsSync(path.join(root, variant.image)), `Falta el sobre ${variant.id}`);
assert.equal(G.CardSystem.catalog.filter(card => card.pool === 'classic').length, 69);
assert.deepEqual(
  G.CardSystem.catalog.filter(card => card.pool === 'cute').map(card => card.collectionKey),
  ['cute-1', 'cute-4', 'cute-7']
);
assert.equal(G.CardSystem.probabilityRows('cute').reduce((n, row) => n + row.count, 0), 3);

const save = G.DB.save;
save.coins = 299;
assert.throws(() => G.CardSystem.open({ rng: () => 0 }), /300 monedas y 3 tickets/);
assert.equal(save.coins, 299);
save.coins = 3000;
save.tickets.t1 = 30;

const missing = G.CardSystem.probabilityRows().find(row => row.count === 0 && row.weight > 0);
if (missing) {
  const prefix = G.CardSystem.CONFIG.rarityRates
    .filter(row => row.rarity < missing.rarity)
    .reduce((sum, row) => sum + row.weight, 0);
  let call = 0;
  const fallback = G.CardSystem.open({
    rng: () => call++ ? 0 : (prefix + missing.weight / 2) / 100,
    operationId: 'fallback'
  });
  assert.notEqual(fallback.rarity, missing.rarity);
  assert.equal(G.CardSystem.catalog.find(card => card.id === fallback.cardId).rarity, fallback.rarity);
}

const firstRate = G.CardSystem.CONFIG.rarityRates[0].weight;
G.CardSystem.CONFIG.rarityRates[0].weight = firstRate - 1;
const coinsBeforeInvalid = save.coins;
assert.throws(() => G.CardSystem.open({ rng: () => 0 }), /deben sumar 100/);
assert.equal(save.coins, coinsBeforeInvalid);
G.CardSystem.CONFIG.rarityRates[0].weight = firstRate;

save.coins = 1000;
save.tickets.t1 = 10;
const result = G.CardSystem.open({ rng: () => 0, operationId: 'first' });
assert.equal(save.coins, 700);
assert.equal(save.tickets.t1, 7);
assert.equal(result.after, 1);
assert.equal(result.required, 3);
assert.equal(result.completed, false);
assert.equal(result.unlocked, false);
assert.deepEqual(G.CardSystem.open({ rng: () => 0, operationId: 'first' }), result);
assert.equal(save.coins, 700);
assert.equal(save.tickets.t1, 7);

const second = G.CardSystem.open({ rng: () => 0, operationId: 'second' });
assert.equal(second.before, 1);
assert.equal(second.after, 2);
assert.equal(second.completed, false);
const completed = G.CardSystem.open({ rng: () => 0, operationId: 'third' });
assert.equal(completed.before, 2);
assert.equal(completed.after, 3);
assert.equal(completed.completed, true);
assert.equal(completed.unlocked, true);
assert.equal(save.owned[result.cardId].from, 'card-fragments');

const external = G.CardSystem.catalog.find(card =>
  card.id !== result.cardId && !save.cardCollection.discovered[card.id]);
assert.ok(external, 'Debe haber cartas no descubiertas para probar el registro externo.');
save.owned[external.id] = { at: Date.now(), from: 'other-source' };
const externalCard = G.CardSystem.snapshot().find(card => card.id === external.id);
assert.equal(externalCard.unlocked, true);
assert.equal(externalCard.discovered, false);

save.owned[result.cardId] = { at: Date.now(), from: 'test' };
save.coins = 1000;
save.tickets.t1 = 10;
const beforeDuplicate = save.coins;
const duplicate = G.CardSystem.open({ rng: () => 0, operationId: 'duplicate' });
assert.equal(duplicate.duplicate, true);
assert.equal(save.coins, beforeDuplicate - 300 + G.CardSystem.CONFIG.duplicateCoinsByRarity[duplicate.rarity]);
assert.equal(save.tickets.t1, 7);

const cuteCard = G.CardSystem.catalog.find(card => card.pool === 'cute');
assert.ok(cuteCard, 'Debe existir una carta de Colección Cute.');
save.owned[cuteCard.id] = { at: Date.now(), from: 'already-unlocked' };
save.coins = 5000;
save.tickets.t1 = 30;
const rarityPrefix = G.CardSystem.CONFIG.rarityRates
  .filter(row => row.rarity < cuteCard.rarity)
  .reduce((sum, row) => sum + row.weight, 0);
const fixedCuteRng = () => {
  let call = 0;
  return () => call++ ? 0 : (rarityPrefix + .001) / 100;
};
let cuteResult;
let cuteOperation = 0;
while (!cuteResult || !cuteResult.completed) {
  cuteResult = G.CardSystem.open({
    rng: fixedCuteRng(),
    packId: 'cute',
    operationId: `owned-cute-${cuteOperation++}`
  });
  assert.equal(cuteResult.cardId, cuteCard.id);
  assert.equal(cuteResult.duplicate, false);
}
assert.equal(cuteResult.unlocked, false);
assert.equal(save.owned[cuteCard.id].from, 'already-unlocked');
assert.equal(save.cardCollection.fragments[cuteCard.collectionKey], cuteCard.fragmentsRequired);
assert.equal(save.cardCollection.discovered[cuteCard.collectionKey], true);
assert.equal(cuteResult.completed, true);
const classicSamePokemon = G.CardSystem.catalog.find(card => card.pool === 'classic' && card.id === cuteCard.id);
assert.equal(save.cardCollection.fragments[classicSamePokemon.collectionKey] || 0, 0);

console.log(`OK: ${G.CardSystem.catalog.length} cartas; fragmentos aun con el Pokémon desbloqueado, sobres Cute, costes, idempotencia y duplicados verificados.`);
