/* ============ gym-leaders.js — líderes de gimnasio de Kanto ============ */
G.GymLeaders = (() => {
  const LIST = [
    { id: 'brock', order: 1, leader: 'Brock', leaderImage: 'Brock.png', city: 'Ciudad Plateada', medal: 'Medalla Roca', badge: 'Roca', pokemon: 95, appearanceLevel: 7, pokemonLevel: 8, difficulty: 'fácil', coopMultiplier: 1.2, type: 'rock' },
    { id: 'misty', order: 2, leader: 'Misty', leaderImage: 'Misty.png', city: 'Ciudad Celeste', medal: 'Medalla Cascada', badge: 'Cascada', pokemon: 121, appearanceLevel: 15, pokemonLevel: 16, difficulty: 'media-baja', coopMultiplier: 1.35, type: 'water' },
    { id: 'lt-surge', order: 3, leader: 'Lt. Surge', leaderImage: 'Teniente_Surge.png', city: 'Ciudad Carmín', medal: 'Medalla Trueno', badge: 'Trueno', pokemon: 26, appearanceLevel: 20, pokemonLevel: 21, difficulty: 'media', coopMultiplier: 1.5, type: 'electric' },
    { id: 'erika', order: 4, leader: 'Erika', leaderImage: 'Erika.png', city: 'Ciudad Azulona', medal: 'Medalla Arcoíris', badge: 'Arcoíris', pokemon: 45, appearanceLevel: 25, pokemonLevel: 26, difficulty: 'media', coopMultiplier: 1.6, type: 'grass' },
    { id: 'koga', order: 5, leader: 'Koga', leaderImage: 'Koga.png', city: 'Ciudad Fucsia', medal: 'Medalla Alma', badge: 'Alma', pokemon: 110, appearanceLevel: 30, pokemonLevel: 31, difficulty: 'desafiante', coopMultiplier: 1.8, type: 'poison' },
    { id: 'sabrina', order: 6, leader: 'Sabrina', leaderImage: 'Sabrina.png', city: 'Ciudad Azafrán', medal: 'Medalla Pantano', badge: 'Pantano', pokemon: 65, appearanceLevel: 35, pokemonLevel: 36, difficulty: 'desafiante', coopMultiplier: 2, type: 'psychic' },
    { id: 'blaine', order: 7, leader: 'Blaine', leaderImage: 'Blaine.png', city: 'Isla Canela', medal: 'Medalla Volcán', badge: 'Volcán', pokemon: 59, appearanceLevel: 40, pokemonLevel: 41, difficulty: 'desafiante', coopMultiplier: null, type: 'fire' },
    { id: 'giovanni', order: 8, leader: 'Giovanni', leaderImage: 'Giovanni.png', city: 'Ciudad Verde', medal: 'Medalla Tierra', badge: 'Tierra', pokemon: 112, appearanceLevel: 50, pokemonLevel: 51, difficulty: 'desafiante', coopMultiplier: null, type: 'ground' }
  ];
  for (const gym of LIST) {
    gym.leaderImage = `assets/gymbatle/lideres/kanto/${gym.leaderImage}`;
    gym.medalImage = `assets/gymbatle/medallas/kanto/${gym.order}.png`;
  }
  const BY_ID = Object.fromEntries(LIST.map(gym => [gym.id, gym]));
  return { LIST, BY_ID };
})();
