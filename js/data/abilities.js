G.AbilityData = (() => {
  const DASH = { cooldown: 7, duration: 0.2, speed: 3.8 };
  const SHIELD = { cooldown: 20, duration: 6, capacity: 0.5 };
  const EXPERIENCE = { interval: 300, increase: 0.5, maxMultiplier: 100 };
  const ULTIMATE = {
    cooldown: 30, unlockLevel: 10, unlockAfterEvolution: true, radius: 210, damage: 3.2,
    byMode: { story: {}, survival: {} },
    bySpecies: {},
    byType: {
      fire: { name: 'Explosión Ígnea', effect: 'burn', color: '#ff7545' },
      water: { name: 'Oleada de Energía', effect: 'slow', color: '#55c9ff' },
      grass: { name: 'Raíces en Espiral', effect: 'slow', color: '#67e08a' },
      electric: { name: 'Descarga Total', effect: 'chain', color: '#ffe05a', targets: 6 },
      rock: { name: 'Impacto Terrestre', effect: 'knock', color: '#d3ad78' },
      ground: { name: 'Terremoto', effect: 'knock', color: '#d3ad78' },
      psychic: { name: 'Pulso Psíquico', effect: 'slow', color: '#d28aff' },
      ice: { name: 'Ventisca', effect: 'slow', color: '#9cecff' },
      poison: { name: 'Nube Tóxica', effect: 'poison', color: '#bd7ae8' },
      flying: { name: 'Vendaval', effect: 'knock', color: '#9cc9ff' },
      bug: { name: 'Enjambre', effect: 'slow', color: '#d4e05a' },
      fighting: { name: 'Golpe Supremo', effect: 'knock', color: '#ff9d60' },
      ghost: { name: 'Onda Espectral', effect: 'slow', color: '#ae83ff' },
      dragon: { name: 'Pulso Dragón', effect: 'knock', color: '#a589ff' },
      fairy: { name: 'Destello Feérico', effect: 'slow', color: '#ff9ed8' },
      steel: { name: 'Cañón Metálico', effect: 'knock', color: '#aeb8c8' },
      dark: { name: 'Pulso Umbrío', effect: 'slow', color: '#927da8' },
      normal: { name: 'Onda de Choque', effect: 'knock', color: '#e2e7f0' }
    }
  };
  function xpMultiplier(time) {
    return Math.min(EXPERIENCE.maxMultiplier, 1 + EXPERIENCE.increase * Math.floor(Math.max(0, time) / EXPERIENCE.interval));
  }
  return { DASH, SHIELD, EXPERIENCE, ULTIMATE, xpMultiplier };
})();
