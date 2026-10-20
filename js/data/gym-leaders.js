/* ============ gym-leaders.js — líderes de gimnasio de Kanto ============ */
G.GymLeaders = (() => {
  const LIST = [
    { id: 'brock', order: 1, leader: 'Brock', leaderImage: 'Brock.png', city: 'Ciudad Plateada', medal: 'Medalla Roca', badge: 'Roca', pokemon: 95, level: 7, type: 'rock' },
    { id: 'misty', order: 2, leader: 'Misty', leaderImage: 'Misty.png', city: 'Ciudad Celeste', medal: 'Medalla Cascada', badge: 'Cascada', pokemon: 121, level: 15, type: 'water' },
    { id: 'lt-surge', order: 3, leader: 'Lt. Surge', leaderImage: 'Teniente_Surge.png', city: 'Ciudad Carmín', medal: 'Medalla Trueno', badge: 'Trueno', pokemon: 26, level: 18, type: 'electric' },
    { id: 'erika', order: 4, leader: 'Erika', leaderImage: 'Erika.png', city: 'Ciudad Azulona', medal: 'Medalla Arcoíris', badge: 'Arcoíris', pokemon: 45, level: 20, type: 'grass' },
    { id: 'koga', order: 5, leader: 'Koga', leaderImage: 'Koga.png', city: 'Ciudad Fucsia', medal: 'Medalla Alma', badge: 'Alma', pokemon: 110, level: 24, type: 'poison' },
    { id: 'sabrina', order: 6, leader: 'Sabrina', leaderImage: 'Sabrina.png', city: 'Ciudad Azafrán', medal: 'Medalla Pantano', badge: 'Pantano', pokemon: 65, level: 27, type: 'psychic' },
    { id: 'blaine', order: 7, leader: 'Blaine', leaderImage: 'Blaine.png', city: 'Isla Canela', medal: 'Medalla Volcán', badge: 'Volcán', pokemon: 59, level: 30, type: 'fire' },
    { id: 'giovanni', order: 8, leader: 'Giovanni', leaderImage: 'Giovanni.png', city: 'Ciudad Verde', medal: 'Medalla Tierra', badge: 'Tierra', pokemon: 112, level: 33, type: 'ground' }
  ];
  for (const gym of LIST) {
    gym.leaderImage = `assets/gymbatle/lideres/kanto/${gym.leaderImage}`;
    gym.medalImage = `assets/gymbatle/medallas/kanto/${gym.order}.png`;
  }
  const BY_ID = Object.fromEntries(LIST.map(gym => [gym.id, gym]));
  return { LIST, BY_ID };
})();
