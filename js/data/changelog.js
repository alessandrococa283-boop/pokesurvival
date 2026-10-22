/* ============ changelog.js — novedades del juego ============
 * Lo que ve la gente en el botón "Novedades" de la barra de arriba: cambios
 * de juego y fallos arreglados (nada de servidores ni bases de datos).
 * La fecha más nueva, arriba. En cada fecha, por apartados:
 *   new  lo nuevo · chg  cambios y ajustes · fix  fallos arreglados
 * Cada línea en español y en inglés.
 */
G.CHANGELOG = [
  { d: '2026-10-21', title: ['Colección clásica de cartas', 'Classic Card Collection'], new: [
    ['Añadimos ilustraciones de cartas clásicas a la colección de 69 Pokémon y a los sobres. Abre sobres con monedas y tickets, reúne fragmentos para desbloquear personajes y recibe monedas por los duplicados. La colección se guarda y sincroniza con tu partida.',
     'Classic card illustrations are now featured in the 69-Pokémon collection and on its packs. Open packs with coins and tickets, collect fragments to unlock characters, and receive coins for duplicates. The collection is saved and synced with your game.']
  ] },
  { d: '2026-10-21', title: ['Regalar objetos en cooperativo', 'Share Items in Co-op'], new: [
    ['En multijugador, cuando ya llevas un objeto puedes enviar el nuevo a cualquiera de tus compañeros conectados en lugar de reemplazar el tuyo o dejarlo pasar.',
     'In multiplayer, if you already carry an item, you can send a new one to any connected teammate instead of replacing yours or letting it go to waste.']
  ] },
  { d: '2026-10-21', title: ['HUD táctil y habilidades innatas', 'Touch HUD and Innate Abilities'], chg: [
    ['La vida, el nombre y el nivel del Pokémon aparecen centrados junto al borde inferior. Los ataques y el objeto equipado están en la esquina superior derecha, alineados y con recuadros del mismo tamaño. Las habilidades se reorganizaron abajo a la derecha en una disposición compacta para pantallas táctiles. La ficha de pasivas muestra por separado la habilidad del Pokémon y, debajo, la de su compañero bebé sin detener la partida.',
     'The Pokémon’s health, name and level appear centered near the bottom edge. Attacks and the equipped item are aligned in same-sized boxes in the top-right corner. Abilities are arranged compactly at the bottom right for touchscreens. The passive panel shows the Pokémon’s ability separately from its baby companion’s below, without pausing the game.']
  ] },
  { d: '2026-10-21', title: ['Donaciones voluntarias y créditos', 'Voluntary Donations and Credits'], new: [
    ['PokéSurvival sigue siendo completamente gratuito. Añadimos un enlace opcional de Ko-fi para quien quiera ayudar a mantener el servidor, junto con los créditos de diseño y el contacto del proyecto.',
     'PokéSurvival remains completely free. We added an optional Ko-fi link for anyone who wants to help keep the server running, along with the project design credits and contact information.']
  ] },
  { d: '2026-10-21', title: ['Ataques, compañeros bebé y cooperativo', 'Attacks, Baby Companions and Co-op'], new: [
    ['Al evolucionar eliges un ataque extra que se lanza junto al principal. Los Pokémon sin evolución y los que evolucionan a niveles altos reciben una elección adicional al nivel evolutivo medio. Los compañeros bebé ya aparecen junto al jugador y sus pasivas tienen efecto durante la partida.',
     'When a Pokémon evolves, choose an extra attack that launches alongside its main attack. Pokémon without evolutions and those that evolve at high levels receive an extra choice at the average evolution level. Baby companions now appear beside the player and their passives work during runs.'],
    ['Al mejorar un ataque hasta el nivel 10, en la siguiente elección puedes escoger otro ataque; se suma al grupo y se lanza a la vez que los demás.',
     'When you upgrade an attack to level 10, you can choose another attack at the next choice; it joins the group and launches alongside the others.'],
    ['Las salas cooperativas admiten hasta cinco jugadores. El anfitrión elige entre el modo Normal e Historia, cada jugador puede cambiar su Pokémon y compañero bebé en la sala, y los compañeros bebé de todos aparecen durante la partida.',
     'Co-op rooms now support up to five players. The host chooses Normal or Story mode, each player can change their Pokémon and baby companion in the lobby, and everyone’s baby companions appear during the run.']
  ] },
  { d: '2026-10-20', title: ['Gacha de compañeros bebé', 'Baby Companion Gacha'], new: [
    ['Ya puedes conseguir huevos bebé con un ticket morado y 700 monedas. El tiempo de incubación depende de la rareza; al eclosionar, el Pokémon se añade a tu colección y puedes elegir un compañero bebé.',
     'You can now get baby Pokémon eggs with one purple ticket and 700 coins. Incubation time depends on rarity; after hatching, the Pokémon joins your collection and you can select a baby companion.'],
    ['El ticket morado ahora se reserva para los compañeros bebé. El gacha normal cuesta 1 ticket y 500 monedas por tirada, o 10 tickets y 4.000 monedas por diez.',
     'Purple tickets are now reserved for baby companions. The regular gacha costs 1 ticket and 500 coins per pull, or 10 tickets and 4,000 coins for ten.']
  ] },
  { d: '2026-10-20', title: ['Gacha y economía de tickets', 'Gacha and Ticket Economy'], chg: [
    ['Las probabilidades se ajustan a las rarezas disponibles en cada banner y se muestran en pantalla.',
     'Probabilities adapt to the rarities available in each banner and are shown on screen.'],
    ['Se redujeron las recompensas de tickets de misiones y logros, además de las de cofres, jefes y eventos. Los saldos existentes se conservan.',
     'Ticket rewards from missions and achievements, chests, bosses and events were reduced. Existing balances are preserved.']
  ] },
  { d: '2026-10-20', title: ['Combate, habilidades y evoluciones', 'Combat, Abilities and Evolutions'], new: [
    ['Antes de empezar eliges un ataque compatible con el tipo y la rareza de tu Pokémon. Durante la partida puedes usar el dash, el escudo, la pasiva y la habilidad definitiva; la experiencia aumenta con el tiempo.',
     'Before a run, choose an attack compatible with your Pokémon’s type and rarity. During the run, use dash, shield, passive and ultimate abilities; experience gain scales over time.'],
    ['En Historia solo se pueden elegir formas base de Kanto. Al alcanzar el nivel necesario, las evoluciones ocurren automáticamente; se conserva el ataque y sus mejoras cuando es compatible. Las evoluciones por piedra o intercambio no se activan automáticamente.',
     'Story Mode only allows base forms from Kanto. Reaching the required level triggers evolution automatically; the current attack and its upgrades are kept when compatible. Stone and trade evolutions are not triggered automatically.'],
    ['Las habilidades ahora se muestran en la misma barra inferior que el ataque. En los combates de gimnasio aparecen el retrato del líder y su medalla.',
     'Abilities now appear in the same bottom bar as the attack. Gym battles display the leader portrait and badge.']
  ], fix: [
    ['Las mejoras de ataques remotos se reconstruyen respetando el orden correcto de cada nivel.',
     'Remote attack upgrades are now reconstructed in the correct level order.']
  ] },
  { d: '2026-10-20', title: ['Retratos y medallas de Kanto', 'Kanto Leader Portraits and Badges'], new: [
    ['La colección de gimnasios ahora muestra los retratos de sus líderes y las medallas de Kanto; permanecen en silueta hasta conseguir cada medalla.',
     'The Gym collection now displays its Leaders’ portraits and Kanto badges; they remain silhouettes until each badge is earned.']
  ] },
  { d: '2026-10-20', title: ['Modo Historia: los gimnasios de Kanto', 'Story Mode: Kanto Gyms'], new: [
    ['Llega el Modo Historia: elige un Pokémon de Kanto que ya tengas, enfréntate en orden a los ocho líderes en portales especiales y consigue sus medallas. Las victorias dan experiencia extra, cuentan para las misiones de jefes y registran tu mejor tiempo. Al reunir las ocho, completas Kanto. Arceus no aparece en este modo; los demás eventos y las grietas se mantienen.',
     'Story Mode is here: choose an owned Kanto Pokémon, challenge all eight Gym Leaders in order through special portals, and earn their badges. Victories grant bonus experience, count toward boss missions, and record your best time. Collect all eight to complete Kanto. Arceus does not appear in this mode; other events and rifts remain.']
  ] },
  { d: '2026-10-20', title: ['Acceso con correo y contraseña', 'Sign in with email and password'], new: [
    ['Las cuentas nuevas se crean e inician sesión con correo electrónico y contraseña; el nombre de jugador se elige por separado. Puedes pedir un enlace para restablecer la contraseña. Las cuentas antiguas todavía admiten iniciar sesión con su nombre anterior.',
     'New accounts use an email address and password; choose a separate player name. You can request a password reset link. Older accounts can still sign in with their previous name.']
  ] },
  { d: '2026-10-20', title: ['Nueva etapa: PokéSurvival', 'A new chapter: PokéSurvival'], chg: [
    ['PokéSurvival inicia como un proyecto fan derivado e inspirado en PokéSurvivor, con repositorio y servicios propios. Se mantienen los avisos de licencia y los créditos de sus autores.',
     'PokéSurvival begins as a fan project derived from and inspired by PokéSurvivor, with its own repository and services. The license notices and creator credits are preserved.']
  ] },
  { d: '2026-10-19', title: ['Ataques propios, mejoras y evoluciones', 'Signature attacks, upgrades and evolutions'], new: [
    ['Cada Pokémon empieza con un ataque automático definido por sus tipos y rareza. Al subir de nivel eliges mejoras de combate, como daño, velocidad de ataque, proyectiles, críticos, perforación o rebote; los ataques cuerpo a cuerpo pueden obtener robo de vida.',
     'Each Pokémon starts with an automatic attack determined by its types and rarity. On level-up, choose combat upgrades such as damage, attack speed, extra projectiles, critical damage, piercing or ricochets; melee attacks can gain life steal.'],
    ['Bulbasaur, Ivysaur y Venusaur tienen la pasiva Semilla Vital. Bulbasaur evoluciona a Ivysaur al nivel 16 e Ivysaur a Venusaur al nivel 32; sus estadísticas y pasivas mejoran al evolucionar.',
     'Bulbasaur, Ivysaur and Venusaur have the Vital Seed passive. Bulbasaur evolves into Ivysaur at level 16 and Ivysaur into Venusaur at level 32; their stats and passive improve as they evolve.']
  ] },
  { d: '2026-10-15', title: ['Actualizaciones obligatorias', 'Required updates'], chg: [
    ['Cuando una actualización sea obligatoria (por ejemplo, para arreglar un fallo importante), la partida en curso se termina tras un aviso de 10 s y el juego se recarga. No pierdes nada: las monedas, los tickets, los récords y el ranking de esa partida se guardan como al abandonarla.',
     'When an update is required (for example, to fix an important bug), your current run ends after a 10 s notice and the game reloads. You lose nothing: that run’s coins, tickets, records and leaderboard entry are saved as if you had quit.']
  ] },
  { d: '2026-10-14', title: ['Recupera tu cuenta con Gmail', 'Recover your account with Gmail'], new: [
    ['Si juegas con nombre y contraseña, puedes vincular tu Gmail: si un día olvidas la contraseña, entras con Google y es tu misma cuenta. Te lo ofrecemos al entrar.',
     'If you play with a name and password, you can link your Gmail: if you ever forget your password, sign in with Google and it is the same account. We offer it when you sign in.'],
    ['Móvil: ya puedes colocar los botones donde quieras. En Ajustes > Controles > Colocar los botones arrastras los ataques (con el objeto), la pausa y el joystick, que ahora también puede ser fijo en vez de aparecer donde pones el dedo.',
     'Mobile: you can now place the buttons wherever you want. In Settings > Controls > Place the buttons, drag the attacks (with the item), the pause button and the joystick, which can now also be fixed instead of appearing where you put your finger.']
  ], chg: [
    ['Las tablas de la semana y del mes del ranking empiezan de cero, como el histórico: ahora sólo cuentan partidas con la Sentencia de Arceus y todas las tablas cuadran entre sí.',
     'The weekly and monthly leaderboards start from scratch, like the all-time one: now only runs with the Judgment of Arceus count, and all boards match each other.'],
    ['El código del juego pasa a una licencia no comercial (PolyForm Noncommercial 1.0.0): se puede seguir estudiando y modificando, pero nadie puede cobrar por él.',
     'The game’s code moves to a non-commercial license (PolyForm Noncommercial 1.0.0): you can still study and modify it, but nobody may charge for it.']
  ], fix: [
    ['Cooperativo: la partida ya no se queda parada con cada uno esperando a que el otro elija. Un objeto y las cartas de nivel ya no se tapan, y si la conexión pierde un aviso se arregla solo.',
     'Co-op: the game no longer freezes with each player waiting for the other to choose. An item and the level-up cards no longer cover each other, and if the connection drops a message it fixes itself.'],
    ['Cooperativo: al volver de una grieta, quien no era el anfitrión ya ve a todos los enemigos (antes algunos eran invisibles y sólo se veían sus ataques).',
     'Co-op: after coming back from a rift, players who are not the host can see every enemy again (some used to be invisible, with only their attacks showing).'],
    ['Amigos: si tu móvil u ordenador tiene la hora (o la zona horaria) mal puesta, tus amigos ya no salen siempre desconectados y sus invitaciones te llegan.',
     'Friends: if your phone or computer has the wrong time (or time zone), your friends no longer always show as offline and their invitations reach you.'],
    ['Jugar en dos aparatos (PC y móvil) ya no hace perder monedas ni tickets: antes, si uno tenía la partida abierta con datos viejos y guardaba, borraba lo ganado en el otro. Ahora se suma lo de los dos. Y al volver al juego tras un rato fuera, se trae lo conseguido en el otro aparato (Pokémon, shinies...) sin recargar.',
     'Playing on two devices (PC and phone) no longer loses coins or tickets: before, if one had the game open with old data and saved, it erased what you earned on the other. Now both are added up. And when you come back to the game after a while away, it brings in what you got on the other device (Pokémon, shinies...) without reloading.'],
    ['Los avisos grandes de la partida (un Gholdengo cerca, una marea...) ya salen siempre centrados.',
     'Big in-game announcements (a nearby Gholdengo, a swarm...) are always centered now.']
  ] },
  { d: '2026-10-13', title: ['La Sentencia de Arceus', 'The Judgment of Arceus'], new: [
    ['La Sentencia de Arceus: al llegar al minuto 30, Arceus baja del cielo y te lleva a las Ruinas del Juicio. Es invencible, te persigue cada vez más deprisa y lanza pilares de luz, rayos y ondas; si te toca, te quita casi media vida. Cada 5 segundos acude un legendario con el doble de vida y de daño que el anterior. ¿Cuánto aguantarás?',
     'The Judgment of Arceus: at minute 30, Arceus descends from the sky and takes you to the Ruins of Judgment. It is invincible, chases you faster and faster and casts pillars of light, beams and shockwaves; if it touches you, you lose almost half your HP. Every 5 seconds a legendary joins, each with twice the HP and damage of the previous one. How long can you last?'],
    ['Tres logros nuevos: La Sentencia (llega al minuto 30), Ante el Creador (aguanta 1 minuto ante Arceus) y Desafío divino (derrota a 3 legendarios ante Arceus en una partida).',
     'Three new achievements: The Judgment (reach minute 30), Before the Creator (survive 1 minute against Arceus) and Divine challenge (defeat 3 legendaries against Arceus in a single run).'],
    ['Música nueva para la pelea contra Arceus.', 'New music for the fight against Arceus.'],
    ['Botón para reportar marcas sospechosas en el ranking (la banderita de cada fila).',
     'A button to report suspicious records on the leaderboard (the little flag on each row).']
  ], chg: [
    ['El ranking histórico empieza de cero: ahora que las partidas acaban ante Arceus, las marcas de antes ya no se podrían alcanzar. Las tablas de hoy, de la semana y del mes siguen igual.',
     'The all-time leaderboard starts from scratch: now that runs end against Arceus, older records could no longer be reached. The daily, weekly and monthly boards are unchanged.'],
    ['Se quita el tiempo extra del minuto 60 (ya no se llega hasta ahí).',
     'Overtime from minute 60 is removed (runs no longer get that far).'],
    ['Desde el minuto 28 ya no se abren grietas, para que la Sentencia no te pille dentro de una.',
     'Rifts no longer open from minute 28 on, so the Judgment does not catch you inside one.'],
    ['Ranking protegido contra trampas: el servidor comprueba que cada marca se ha jugado de verdad. Nunca se pierde nada de lo que ganas jugando.',
     'Leaderboard protected against cheating: the server checks that every record was really played. You never lose anything you earn by playing.'],
    ['Se han quitado del ranking las marcas de más de 35 minutos: con la Sentencia de Arceus ya no son posibles.',
     'Records over 35 minutes have been removed from the leaderboard: with the Judgment of Arceus they are no longer possible.']
  ], fix: [
    ['Las tiradas del gacha, los Pokémon nuevos y los premios se guardan en la nube al momento. Si abriste el juego en otro aparato o navegador y te faltaba algo, vuelve a abrirlo donde lo conseguiste: se recupera solo.',
     'Gacha pulls, new Pokémon and rewards are saved to the cloud right away. If you opened the game on another device or browser and something was missing, open it again where you got it: it comes back on its own.']
  ] },
  { d: '2026-10-12', title: ['Tiempo extra y grietas con menos azar', 'Overtime and less random rifts'], new: [
    ['Tiempo extra: desde el minuto 60 los Pokémon salvajes se vuelven cada vez más fuertes (más vida y más daño), y cada vez más deprisa. Antes, con las mejoras al máximo, algunas partidas no acababan nunca; ahora las mejores rondarán la hora y media.',
     'Overtime: from minute 60 on, wild Pokémon keep getting stronger (more HP and more damage), faster and faster. Before, with maxed upgrades, some runs never ended; now the best ones will last about an hour and a half.'],
    ['El juego se actualiza solo cuando sale una versión nueva: si estás en el menú, a los 5 segundos; si estás jugando, al acabar la partida (sin perder nada).',
     'The game now updates itself when a new version is out: within 5 seconds if you are in the menu, or after your run if you are playing (without losing anything).'],
    ['Botón de Novedades (esta ventana) con todos los cambios del juego.',
     'A "What\'s new" button (this window) with every change to the game.'],
    ['Números más fáciles de leer: el 2, el 5 y el 8 ya no se confunden.',
     'Easier to read numbers: 2, 5 and 8 no longer look alike.'],
    ['Elige la versión normal o shiny de tu compañero desde el menú principal, debajo de él.',
     'Pick the normal or shiny version of your partner right from the main menu, under it.'],
    ['Mejoras nuevas para cada Pokémon: Golpe Crítico (+3 % de críticos por nivel, que hacen x1,5 de daño), Cambio de cartas (+1 cambio de las cartas de nivel por run) y Veto (bloquea movimientos para que no te salgan en las cartas; se eligen en Mejoras).',
     'New upgrades for each Pokémon: Critical Hit (+3% critical chance per level, crits deal x1.5 damage), Card reroll (+1 level-up card reroll per run) and Ban (block moves so they never show up in your cards; pick them in Upgrades).'],
    ['Atajos de movimientos (en Mejoras, para cada Pokémon): elige qué movimiento va siempre en cada hueco, por ejemplo Confusión siempre en el 1, para la memoria muscular.',
     'Move shortcuts (in Upgrades, for each Pokémon): choose which move always goes in each slot, for example Confusion always on 1, for muscle memory.']
  ], chg: [
    ['Avalancha hace menos daño (21 en vez de 26): derrotaba casi el doble que la media de los movimientos.',
     'Rock Slide deals less damage (21 instead of 26): it defeated almost twice as many as the average move.'],
    ['Los cambios de cartas de nivel ya no se ganan venciendo jefes: tienes 1 gratis por run y el resto se compra en Mejoras.',
     'Level-up card rerolls are no longer earned by defeating bosses: you get 1 free per run and can buy more in Upgrades.'],
    ['Los legendarios de grieta ya no dan siempre tickets x10: dan uno la mitad de las veces (antes daban 2 siempre y salían demasiados).',
     'Rift legendaries no longer always drop x10 tickets: they drop one half of the time (they used to always drop 2, which was too many).'],
    ['Cooperativo: si vuestras redes no consiguen conectar entre sí, la sala lo avisa y lo reintenta sola, en vez de jugar a tirones por un servidor lento.',
     'Co-op: if your networks cannot connect to each other, the room says so and keeps retrying, instead of playing laggy through a slow server.'],
    ['Hemos cambiado de servidores para que el juego siga siendo gratis: puede que tengas que volver a iniciar sesión (con la misma cuenta y contraseña, o con Google). Tu partida y tus Pokémon siguen igual.',
     'We moved to new servers so the game can stay free: you may need to sign in again (with the same account and password, or with Google). Your save and your Pokémon are unchanged.'],
    ['Gacha: los shiny ya no salen repetidos. Si te toca uno que ya tienes, sale otro de la misma rareza que te falte.',
     'Gacha: shinies no longer come out as duplicates. If you roll one you already have, you get another of the same rarity that you are missing.'],
    ['Grietas con menos azar: cada vez que no sale una, la siguiente es más probable (como mucho 2,5 minutos sin grieta).',
     'Less random rifts: every time one does not show up, the next one is more likely (at most 2.5 minutes without a rift).'],
    ['Los legendarios que aún no has vencido salen 4 veces más en las grietas.',
     'Legendaries you have not beaten yet show up 4 times as often in rifts.'],
    ['Los curanderos curan más cuanto más fuerte pegas, pero cada vez menos y con un tope (como mucho el 2,5x).',
     'Healers heal more the harder you hit, but with diminishing returns and a cap (2.5x at most).'],
    ['Ataques cuerpo a cuerpo más fuertes: mientras llevas uno activo recibes un 25 % menos de daño, llegan un 25 % más lejos y hacen un 20 % más de daño.',
     'Stronger melee attacks: while one is active you take 25% less damage, and they reach 25% further and deal 20% more damage.'],
    ['Cooperativo: al elegir con qué objeto quedarte, la partida se para para todos (antes seguía y te pegaban mientras elegías).',
     'Co-op: choosing which held item to keep now pauses the run for everyone (it used to keep going and you got hit while choosing).'],
    ['Cooperativo: mientras alguien elige una fusión, la partida se para para todos.',
     'Co-op: while someone is choosing a fusion, the run pauses for everyone.'],
    ['Cooperativo: si el anfitrión cambia de pestaña o se le para el juego, la partida se pausa para todos hasta que vuelva.',
     'Co-op: if the host switches tabs or their game stalls, the run pauses for everyone until they are back.'],
    ['Las runs de menos de 1 minuto ya no cuentan para el ranking.',
     'Runs shorter than 1 minute no longer count for the leaderboard.']
  ], fix: [
    ['Quitadas del ranking las marcas rotas por el fallo del minuto 84 (el reloj seguía corriendo con el juego parado) y alguna imposible. Si tenías una, tu próxima partida vuelve a contar.',
     'Removed broken records from the leaderboard caused by the minute 84 bug (the clock kept running while the game was frozen) and a few impossible ones. If you had one, your next run counts again.'],
    ['iPhone (Safari y Chrome): a veces no se podía cambiar de movimiento tocando los iconos, sobre todo con el otro dedo en el joystick. Además los botones quedan por encima de la barra de inicio.',
     'iPhone (Safari and Chrome): sometimes you could not switch moves by tapping the icons, especially with your other finger on the joystick. Buttons also sit above the home bar now.'],
    ['En las partidas de más de 84 minutos la pantalla se quedaba en negro, el juego se paraba o empezabas a subir de nivel sin fin. Ya puedes jugar todo lo que aguantes.',
     'In runs longer than 84 minutes the screen went black, the game froze or you kept levelling up forever. Now you can play for as long as you survive.'],
    ['Si el juego fallara, la partida se cierra sola y se guarda (tiempo, derrotados, récords y ranking) en vez de perderse.',
     'If the game ever crashes, the run ends by itself and is saved (time, defeated, records and leaderboard) instead of being lost.'],
    ['Las partidas muy largas a veces se tomaban por trampas y no contaban para el ranking.',
     'Very long runs were sometimes flagged as cheating and did not count for the leaderboard.'],
    ['Cooperativo: si el anfitrión cambiaba de pestaña, los enemigos se quedaban quietos y los demás jugaban con ventaja.',
     'Co-op: if the host switched tabs, enemies stood still and everyone else got a free advantage.'],
    ['iPhone: mantener el dedo en el joystick sacaba "Copiar / Seleccionar todo".',
     'iPhone: holding your finger on the joystick brought up "Copy / Select all".'],
    ['iPhone: a veces no salía la pantalla completa. Ahora el botón explica cómo tenerla (Compartir y "Añadir a pantalla de inicio").',
     'iPhone: fullscreen sometimes did not show up. Now the button explains how to get it (Share and "Add to Home Screen").']
  ] },
  { d: '2026-10-11', title: ['Vínculos', 'Bonds'], new: [
    ['Vínculos: al vencer a un legendario fusionas movimientos que se lanzan a la vez desde un solo hueco (hasta 4).',
     'Bonds: defeating a legendary lets you fuse moves that fire at the same time from a single slot (up to 4).'],
    ['Botón para cambiar las cartas de subir de nivel.',
     'A button to reroll the level-up cards.']
  ], chg: [
    ['Más grietas.', 'More rifts.'],
    ['Movimientos psíquicos y curanderos más flojos.', 'Weaker psychic moves and healers.'],
    ['Las mejoras de las cartas de nivel (velocidad, recarga, experiencia, imán, coraza y potencia) tienen un tope de veces.',
     'Level-up card upgrades (speed, cooldown, experience, magnet, armor and power) can only be taken a limited number of times.'],
    ['En el móvil, la ficha del Pokémon sale al lado; entrar es más rápido y el gacha x10 se puede cerrar.',
     'On mobile, the Pokémon details show alongside; logging in is faster and the x10 gacha can be closed.']
  ], fix: [
    ['Pantalla negra en partidas de más de una hora por llenarse la memoria de imágenes.',
     'Black screen in runs longer than an hour because image memory filled up.'],
    ['Los tickets se perdían si se cerraba la pestaña antes de acabar la partida: ahora se guardan al cogerlos.',
     'Tickets were lost if the tab closed before the run ended: now they are saved as soon as you pick them up.'],
    ['Una mejora comprada justo después de guardar se cobraba y no se apuntaba.',
     'An upgrade bought right after saving was charged but not applied.'],
    ['El juego se quedaba congelado para siempre si algo fallaba a mitad de partida.',
     'The game froze forever if something went wrong mid-run.']
  ] },
  { d: '2026-10-10', title: ['Más reto', 'More challenge'], new: [
    ['Jefes y legendarios con 4 ataques avisados que se enfurecen a media vida.',
     'Bosses and legendaries with 4 telegraphed attacks that get enraged at half health.'],
    ['12 movimientos nuevos y 8 formas de atacar nuevas: bumerán, cadena, minas, meteoros, torreta, embestida, rastro y abanico.',
     '12 new moves and 8 new ways to attack: boomerang, chain, mines, meteors, turret, dash, trail and spray.'],
    ['Eventos a mitad de partida (hordas de un tipo, hora dorada, Pokémon perdidos) y Meowth y Gholdengo que huyen cargados de monedas.',
     'Mid-run events (single-type hordes, golden hour, lost Pokémon) and Meowth and Gholdengo running away loaded with coins.'],
    ['Estatuas para los Pokémon grandes.', 'Statues for big Pokémon.']
  ], chg: [
    ['Más difícil: menos enemigos pero más duros.', 'Harder: fewer but tougher enemies.'],
    ['Subir de nivel es más lento, los tickets son más raros y los jefes dan ticket x10 una de cada tres veces.',
     'Levelling up is slower, tickets are rarer and bosses drop a x10 ticket one time in three.'],
    ['Carga más rápida.', 'Faster loading.']
  ], fix: [
    ['Los enemigos rezagados desaparecían delante de ti: ahora sólo fuera de la vista.',
     'Straggling enemies vanished in front of you: now only off-screen.'],
    ['Los menús y pantallas se montaban encima de la barra de arriba.',
     'Menus and screens overlapped the top bar.']
  ] },
  { d: '2026-10-09', title: ['Móvil e inglés', 'Mobile and English'], new: [
    ['Se puede jugar en móvil y tablet con joystick táctil, e instalar como app.',
     'Play on phones and tablets with a touch joystick, and install it as an app.'],
    ['El juego, en español y en inglés.', 'The game in English and Spanish.'],
    ['Pantalla de ajustes con calidad gráfica automática.', 'Settings screen with automatic graphics quality.']
  ], chg: [
    ['Menos enemigos en pantalla pero más fuertes.', 'Fewer but stronger enemies on screen.'],
    ['Gigadrenado pasa a ser Hierba Lazo (ya no cura).', 'Giga Drain becomes Grass Knot (no more healing).']
  ] },
  { d: '2026-10-08', title: ['Misiones, grietas y cooperativo', 'Missions, rifts and co-op'], new: [
    ['Misiones diarias y semanales, logros con medallas y títulos, y perfil público.',
     'Daily and weekly missions, achievements with medals and titles, and a public profile.'],
    ['Objetos equipables, evoluciones de movimientos y enemigos que curan, protegen, invocan o explotan.',
     'Held items, move evolutions and enemies that heal, shield, summon or explode.'],
    ['Grietas que llevan a 18 arenas legendarias, una por tipo, y clima que cambia la batalla.',
     'Rifts leading to 18 legendary arenas, one per type, and weather that changes the fight.'],
    ['Cooperativo con tu lista de amigos y ranking.', 'Co-op with your friends list and leaderboards.'],
    ['Mejoras para cada Pokémon, gacha tragaperras con tickets y tabla de tipos.',
     'Upgrades for each Pokémon, a slot-machine ticket gacha and a type chart.']
  ], chg: [
    ['Cámara más lejos y enemigos que rodean los obstáculos.', 'Camera further out and enemies that walk around obstacles.']
  ] },
  { d: '2026-10-07', title: ['Primera versión', 'First version'], new: [
    ['Primera versión pública de PokéSurvival.', 'First public version of PokéSurvival.']
  ] }
];
