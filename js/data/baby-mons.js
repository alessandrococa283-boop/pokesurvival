/* ============ baby-mons.js — Pokémon bebé y sus huevos ============ */
G.BabyMons = (() => {
  const hatchMinutes = { 1: 2, 2: 5, 3: 10, 4: 20, 5: 35 };
  const LIST = [
    { dex: 172, name: 'Pichu', rarity: 1, passive: 'Descarga estática', description: 'Otorga un 2,5 % de probabilidad de paralizar al enemigo golpeado durante 1 segundo. Los jefes reciben una reducción de la duración.' },
    { dex: 173, name: 'Cleffa', rarity: 1, passive: 'Polvo curativo', description: 'Aumenta un 3 % la eficacia de las curaciones recibidas, incluyendo curación por ataques y habilidades.' },
    { dex: 174, name: 'Igglybuff', rarity: 1, passive: 'Encanto', description: 'Cada ataque tiene un 2 % de probabilidad de enamorar al enemigo durante 2 segundos, haciendo que ataque a otros enemigos cercanos en lugar de al jugador.' },
    { dex: 175, name: 'Togepi', rarity: 1, passive: 'Dicha', description: 'Aumenta un 3 % la probabilidad de obtener objetos de recuperación de los enemigos derrotados.' },
    { dex: 298, name: 'Azurill', rarity: 2, passive: 'Cola saltarina', description: 'Aumenta un 5 % la velocidad de movimiento y un 3 % el alcance de recolección de experiencia.' },
    { dex: 360, name: 'Wynaut', rarity: 2, passive: 'Contraataque', description: 'Otorga un 4 % de probabilidad de reflejar parte del daño recibido al enemigo atacante. El daño reflejado equivale al 20 % del daño recibido.' },
    { dex: 406, name: 'Budew', rarity: 2, passive: 'Polen revitalizante', description: 'Aumenta un 5 % la duración de los efectos de veneno y otras alteraciones de estado aplicadas por el jugador.' },
    { dex: 433, name: 'Chingling', rarity: 2, passive: 'Resonancia', description: 'Aumenta un 4 % el área de efecto de los ataques que dañan a varios enemigos.' },
    { dex: 236, name: 'Tyrogue', rarity: 3, passive: 'Espíritu luchador', description: 'Aumenta un 6 % el daño de los ataques cuerpo a cuerpo. Si la vida del jugador baja del 30 %, el bono aumenta temporalmente al 10 %.' },
    { dex: 238, name: 'Smoochum', rarity: 3, passive: 'Beso gélido', description: 'Otorga un 5 % de probabilidad de ralentizar a los enemigos golpeados un 30 % durante 2 segundos.' },
    { dex: 239, name: 'Elekid', rarity: 3, passive: 'Sobrecarga', description: 'Aumenta un 6 % la velocidad de ataque de las habilidades eléctricas y un 3 % la de los demás ataques.' },
    { dex: 240, name: 'Magby', rarity: 3, passive: 'Combustión', description: 'Aumenta un 6 % el daño por quemadura y un 3 % la probabilidad de aplicar quemadura.' },
    { dex: 438, name: 'Bonsly', rarity: 4, passive: 'Defensa pétrea', description: 'Reduce un 6 % el daño recibido. Si el jugador permanece 3 segundos sin recibir daño, obtiene una barrera equivalente al 2 % de su vida máxima.' },
    { dex: 439, name: 'Mime Jr.', rarity: 4, passive: 'Pantalla protectora', description: 'Reduce un 8 % el daño de proyectiles enemigos y un 4 % el daño de contacto.' },
    { dex: 440, name: 'Happiny', rarity: 4, passive: 'Don de la vida', description: 'Aumenta un 8 % las curaciones recibidas y otorga un 5 % de probabilidad de recuperar un pequeño porcentaje de vida al derrotar a un enemigo de élite.' },
    { dex: 447, name: 'Riolu', rarity: 4, passive: 'Aura combativa', description: 'Aumenta un 8 % el daño mientras haya al menos 10 enemigos cerca del jugador. El bono desaparece cuando la zona vuelve a estar despejada.' },
    { dex: 446, name: 'Munchlax', rarity: 5, passive: 'Voracidad', description: 'Aumenta un 12 % la cantidad de experiencia obtenida y un 8 % la eficacia de los objetos de recuperación.' },
    { dex: 458, name: 'Mantyke', rarity: 5, passive: 'Marea regeneradora', description: 'Otorga un 10 % de probabilidad de recuperar el 2 % de la vida máxima al derrotar enemigos con ataques de tipo Agua. Tiene un enfriamiento interno de 2 segundos.' },
    { dex: 848, name: 'Toxel', rarity: 5, passive: 'Toxina eléctrica', description: 'Los ataques eléctricos tienen un 12 % de probabilidad de electrocutar al enemigo durante 1,5 segundos. Los enemigos electrocutados reciben un 10 % más de daño eléctrico durante ese efecto.' }
  ];
  const BY_DEX = Object.fromEntries(LIST.map(mon => [mon.dex, mon]));
  return { LIST, BY_DEX, hatchMinutes };
})();
