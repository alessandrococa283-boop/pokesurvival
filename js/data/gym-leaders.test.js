const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = { G: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'gym-leaders.js'), 'utf8'), context);
const gyms = context.G.GymLeaders.LIST;

assert.deepEqual(
  Array.from(gyms, gym => [gym.order, gym.appearanceLevel, gym.pokemon, gym.pokemonLevel]),
  [
    [1, 7, 95, 8],
    [2, 15, 121, 16],
    [3, 20, 26, 21],
    [4, 25, 45, 26],
    [5, 30, 110, 31],
    [6, 35, 65, 36],
    [7, 40, 59, 41],
    [8, 50, 112, 51]
  ]
);
assert.equal(new Set(Array.from(gyms, gym => gym.id)).size, 8);
assert.deepEqual(
  Array.from(gyms.slice(0, 6), gym => gym.coopMultiplier),
  [1.2, 1.35, 1.5, 1.6, 1.8, 2]
);
assert.equal(gyms[6].coopMultiplier, null);
assert.equal(gyms[7].coopMultiplier, null);
assert.equal(gyms.every(gym => gym.city && gym.medal && gym.type), true);
