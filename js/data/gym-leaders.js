/* ============ gym-leaders.js — líderes de gimnasio de Kanto ============ */
G.GymLeaders = (() => {
  const LIST = [
    { id: 'brock', order: 1, leader: 'Brock', city: 'Ciudad Plateada', medal: 'Medalla Roca', badge: 'Roca', pokemon: 95, level: 7, type: 'rock' },
    { id: 'misty', order: 2, leader: 'Misty', city: 'Ciudad Celeste', medal: 'Medalla Cascada', badge: 'Cascada', pokemon: 121, level: 15, type: 'water' },
    { id: 'lt-surge', order: 3, leader: 'Lt. Surge', city: 'Ciudad Carmín', medal: 'Medalla Trueno', badge: 'Trueno', pokemon: 26, level: 18, type: 'electric' },
    { id: 'erika', order: 4, leader: 'Erika', city: 'Ciudad Azulona', medal: 'Medalla Arcoíris', badge: 'Arcoíris', pokemon: 45, level: 20, type: 'grass' },
    { id: 'koga', order: 5, leader: 'Koga', city: 'Ciudad Fucsia', medal: 'Medalla Alma', badge: 'Alma', pokemon: 110, level: 24, type: 'poison' },
    { id: 'sabrina', order: 6, leader: 'Sabrina', city: 'Ciudad Azafrán', medal: 'Medalla Pantano', badge: 'Pantano', pokemon: 65, level: 27, type: 'psychic' },
    { id: 'blaine', order: 7, leader: 'Blaine', city: 'Isla Canela', medal: 'Medalla Volcán', badge: 'Volcán', pokemon: 59, level: 30, type: 'fire' },
    { id: 'giovanni', order: 8, leader: 'Giovanni', city: 'Ciudad Verde', medal: 'Medalla Tierra', badge: 'Tierra', pokemon: 112, level: 33, type: 'ground' }
  ];
  const BY_ID = Object.fromEntries(LIST.map(gym => [gym.id, gym]));
  return { LIST, BY_ID };
})();
