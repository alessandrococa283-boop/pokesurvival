const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '../..');
const context = { G: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'passives.js'), 'utf8'), context);
const data = context.G.PassiveData;

assert.equal(Object.keys(data.BY_DEX).length, 151);
for (let dex = 1; dex <= 151; dex++) {
  assert.ok(data.get(dex), `Falta la pasiva innata de #${dex}`);
  assert.ok(data.get(dex).name);
  assert.ok(data.get(dex).description);
}

assert.deepEqual(
  [1, 2, 3].map(dex => [data.effects(dex).regen, data.effects(dex).regenInterval]),
  [[0.01, 5], [0.015, 5], [0.02, 5]]
);
assert.equal(data.effects(3).shieldEvery, 20);
assert.equal(data.effects(3).bossHeal, 0.1);
assert.equal(data.effects(7).reduction, 0.3);
assert.equal(data.effects(74).physicalReduction, 0.15);
assert.equal(data.effects(149).reductionThreshold, 0.5);
assert.equal(data.effects(149).reduction, 0.25);
assert.equal(data.effects(31).maxHp, 1.25);
assert.equal(data.effects(32).critChance, 0.15);
assert.equal(data.effects(33).critDamage, 0.2);
assert.equal(data.effects(38).fireDamage, 1.3);
assert.equal(data.effects(40).maxHp, 1.25);
assert.equal(data.effects(133).levelHeal, 0.05);
assert.equal(data.effects(143).lethalHeal, 0.3);
assert.equal(data.effects(120).lethalShield, 0.15);
assert.equal(data.effects(120).lethalCooldown, 60);
assert.equal(data.effects(121).lethalShieldDuration, 3);
assert.equal(data.effects(142).critDamage, 0.3);
assert.equal(data.effects(142).highHpThreshold, 0.6);
assert.equal(data.effects(142).highHpBonus, 0.2);
assert.equal(data.effects(150).damage, 1.3);
assert.equal(data.effects(151).onHit.randomStatus, true);
assert.equal(data.effects(42).lifeStealChance, 0.2);
assert.equal(data.effects(42).lifeStealRate, 0.05);
assert.equal(data.effects(141).critLifeSteal, 0.03);
assert.equal(data.effects(108).statusHitHeal, 0.01);
assert.equal(data.effects(10).onHit.key, 'slow');
assert.equal(data.effects(10).onHit.chance, 1);
assert.equal(data.effects(10).onHit.strength, 0.15);
assert.equal(data.effects(10).onHit.duration, 2);
assert.equal(data.effects(13).onHit.key, 'poison');
assert.equal(data.effects(13).onHit.chance, 0.2);
assert.deepEqual(
  Array.from(data.effects(12).onHitEffects, status => [status.key, status.chance, status.strength || 0]),
  [['slow', 1, 0.35], ['poison', 0.3, 0]]
);
assert.equal(data.effects(49).onHitEffects[0].criticalOnly, true);
assert.equal(data.effects(49).onHitEffects[0].chance, 1);
assert.equal(data.effects(94).onHit.key, 'fear');
assert.equal(data.effects(94).onHit.chance, 0.25);
assert.equal(data.effects(94).onHit.duration, 1.5);
assert.equal(data.effects(144).onHit.duration, 1.5);
assert.equal(Object.keys(data.TYPE_BONUSES).length, 18);
assert.equal(data.typeBonus(['grass']), 1);
assert.equal(data.typeBonus(['fire', 'water']), 0.5);
assert.deepEqual(
  {
    damage: data.typeEffects(['fire', 'water']).damage,
    area: data.typeEffects(['fire', 'water']).area,
    cooldown: data.typeEffects(['fire', 'water']).cooldown,
    moveSpeed: data.typeEffects(['fire', 'water']).moveSpeed
  },
  { damage: 1.075, area: 1.05, cooldown: 0.95, moveSpeed: 1.05 }
);
assert.equal(data.typeEffects(['electric']).projectileSpeed, 1.2);
assert.equal(data.typeEffects(['fairy']).shield, 0.08);
assert.equal(data.typeEffects(['ghost', 'poison']).phase, true);
assert.match(data.typeDescription(['fire', 'water']), /7\.5% daño/);
assert.match(data.typeDescription(['fire', 'water']), /5% área/);

const playerContext = { G: {
  PassiveData: data,
  BabyMons: { BY_DEX: {}, passiveFor: () => null },
  Sprites: {
    Animator: class {},
    hasShiny: () => false,
    bodyRadius: () => 10,
    bodyHeight: () => 20
  },
  Weather: { speedFor: () => 1 },
  World: { liquidEffect: () => ({}) }
} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/entities/player.js'), 'utf8'), playerContext);
const makePlayer = dex => new playerContext.G.Player({
  dex, name: `#${dex}`, hp: 100, spd: 10, atk: 10, types: ['normal']
});
const makeTypedPlayer = (dex, types) => new playerContext.G.Player({
  dex, name: `#${dex}`, hp: 100, spd: 10, atk: 10, types
});
assert.equal(makePlayer(7).reduction, 0.3);
assert.equal(makePlayer(31).maxHp, 125);
assert.equal(makePlayer(18).attackRate, 1.35);
assert.equal(makeTypedPlayer(4, ['fire']).atk, 11.5);
assert.equal(makeTypedPlayer(4, ['fire', 'water']).atk, 10.75);
assert.equal(makeTypedPlayer(4, ['fire', 'water']).spd, 10.5);
assert.equal(makeTypedPlayer(25, ['electric']).attackRate, 1.344);
assert.equal(makeTypedPlayer(122, ['fairy']).typeShieldHp, 8);
assert.equal(makeTypedPlayer(75, ['rock']).reduction, 0.55);
assert.equal(makeTypedPlayer(81, ['poison']).magnet, 117);
const dragonite = makeTypedPlayer(149, ['dragon', 'flying']);
assert.equal(dragonite.reduction, 0.25);
dragonite.hp = 40;
assert.equal(dragonite.reduction, 0);
const charmander = makePlayer(4);
charmander.hp = 24;
charmander.updatePassiveThresholds();
assert.equal(charmander.lowHpPassive, true);
charmander.hp = 40;
charmander.updatePassiveThresholds();
assert.equal(charmander.lowHpPassive, true);
charmander.hp = 51;
charmander.updatePassiveThresholds();
assert.equal(charmander.lowHpPassive, false);

const combat = fs.readFileSync(path.join(root, 'js/systems/combat.js'), 'utf8');
assert.equal((combat.match(/applyInnateStatus\(pl, e(?:,|\))/g) || []).length, 3,
  'Los impactos directos y de proyectil deben compartir la aplicación de pasivas.');
assert.equal((combat.match(/passiveDamageMultiplier\(pl, .*?, e\)/g) || []).length, 2,
  'Los impactos directos y de proyectil deben compartir el cálculo de daño pasivo.');

console.log('passive data and combat integration tests passed');
