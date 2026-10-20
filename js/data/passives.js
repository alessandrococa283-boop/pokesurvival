G.PassiveData = (() => {
  const BY_DEX = {
    1: { name: 'Semilla Vital', level: 1, description: 'Recupera un 1 % de su vida máxima cada 5 segundos.', regen: 0.01, interval: 5 },
    2: { name: 'Semilla Vital', level: 2, description: 'Recupera un 1,5 % de su vida máxima cada 5 segundos.', regen: 0.015, interval: 5 },
    3: {
      name: 'Semilla Vital', level: 3,
      description: 'Recupera un 2 % de su vida máxima cada 5 segundos; cada 20 derrotas obtiene un escudo y al vencer un jefe recupera vida.',
      regen: 0.02, interval: 5, shieldEvery: 20, shieldRate: 0.04, bossHeal: 0.1
    }
  };
  return { BY_DEX, get(dex) { return BY_DEX[dex] || null; } };
})();
