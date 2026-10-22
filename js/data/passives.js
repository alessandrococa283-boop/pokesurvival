G.PassiveData = (() => {
  const BY_DEX = {
  "1": {
    "name": "Semilla Vital",
    "level": 1,
    "description": "Bulbasaur absorbe parte de la energía vital de la vegetación que lo rodea. Recupera un 1% de la vida máxima cada 5 segundos."
  },
  "2": {
    "name": "Semilla Vital",
    "level": 2,
    "description": "El bulbo crece y desarrolla una mayor capacidad de absorción de energía. Recupera un 1,5% de la vida máxima cada 5 segundos. Recupera un 2% de su vida máxima al subir de nivel."
  },
  "3": {
    "name": "Semilla Vital",
    "level": 3,
    "description": "La flor de Venusaur absorbe energía y la transforma en una fuente constante de vitalidad. Recupera un 2% de la vida máxima cada 5 segundos. Cada 20 enemigos derrotados, obtiene un escudo del 4% de su vida máxima durante 4 segundos. Recupera un 3% de su vida máxima al subir de nivel. Al derrotar a un jefe, recupera un 10% de su vida máxima."
  },
  "4": {
    "name": "Alma Caliente",
    "level": 1,
    "description": "La llama de su cola arde con más intensidad al sentirse amenazado, liberando su calor interno. Cuando la salud de Charmander cae por debajo del 25%, el daño, la velocidad de disparo y el área de efecto de todos sus ataques de fuego aumentan un 50%. La habilidad pierde efecto cuando se recupera más del 50% de su vida."
  },
  "5": {
    "name": "Alma Caliente – Nivel II",
    "level": 2,
    "description": "Su espíritu combatiente y naturaleza ardiente intensifican el calor de su cuerpo a temperaturas extremas. Cuando la salud de Charmeleon cae por debajo del 30%, el daño, la velocidad de disparo y el área de efecto de todos sus ataques de fuego aumentan un 60%. Deja caer de su cola un charco de fuego que quema a los enemigos durante 1.5 segundos. La habilidad pierde efecto cuando se recupera más del 60% de su vida."
  },
  "6": {
    "name": "Alma Caliente – Nivel III",
    "level": 3,
    "description": "Al alcanzar su máximo desarrollo, la furia de su llama interior desata un fuego abrasador e incontrolable. Cuando la salud de Charizard cae por debajo del 30%, el daño, la velocidad de disparo y el área de efecto de todos sus ataques de fuego aumentan un 75%. Deja caer de su cola un charco de fuego que quema a los enemigos durante 2 segundos. Gana la habilidad de quemar a sus enemigos con sus ataques; la quemadura tiene un 50% de probabilidad de expandirse a los enemigos cercanos y crear una explosión al derrotarlos. La habilidad pierde efecto cuando se recupera más del 75% de su vida."
  },
  "7": {
    "name": "Torrente Defensivo",
    "level": 1,
    "description": "Su resistente caparazón le permite replegarse para absorber impactos y repeler a sus agresores. Squirtle reduce todo el daño recibido un 30%"
  },
  "8": {
    "name": "Torrente Defensivo – Nivel II",
    "level": 2,
    "description": "Su afelpada cola le otorga un perfecto equilibrio en combate mientras devuelve la fuerza de los impactos recibidos. Wartortle reduce todo el daño recibido un 30% y al caer su vida al 20% genera un escudo de agua del 40% de su vida máxima durante 4 segundos."
  },
  "9": {
    "name": "Torrente Defensivo – Nivel III",
    "level": 3,
    "description": "Los potentes cañones de su espalda canalizan la máxima presión del agua, convirtiendo su defensa en una fuerza devastadora. Blastoise reduce todo el daño recibido un 40% y refleja un 20% del daño sufrido a los enemigos cercanos, al caer su vida al 30% genera un escudo de agua del 50% de su vida máxima durante 4 segundos. cada 5 ataques recibidos, dispara un torrente en área que daña a los enemigos, sus ataques tienen un 25% de probabilidad de ralentizar a los enemigos golpeados"
  },
  "10": {
    "name": "Hilo Entorpecedor",
    "level": 1,
    "description": "Secreta de su cuerpo una seda pegajosa e inagotable para frenar a las amenazas que lo acechan. Sus ataques ralentizan la velocidad de movimiento de los enemigos un 15% durante 2 segundos."
  },
  "11": {
    "name": "Hilo Entorpecedor – Nivel II",
    "level": 2,
    "description": "Su rígida coraza de crisálida endurece su defensa mientras canaliza capullos de seda de alta densidad. Sus ataques ralentizan la velocidad de movimiento de los enemigos un 25% durante 2.5 segundos. Reduce todo el daño recibido un 20%"
  },
  "12": {
    "name": "Hilo Entorpecedor – Nivel III",
    "level": 3,
    "description": "El polvo místico de sus alas se combina con su seda para desatar tormentas de esporas devastadoras. Sus ataques ralentizan a los enemigos un 35% y tienen un 30% de probabilidad de infligir daño por veneno continuo durante 3 segundos."
  },
  "13": {
    "name": "Aguijón Ponzoñoso",
    "level": 1,
    "description": "El afilado aguijón de su cabeza inyecta una toxina rápida para desgastar gradualmente a sus atacantes. Sus ataques tienen un 20% de probabilidad de envenenar a los enemigo."
  },
  "14": {
    "name": "Aguijón Ponzoñoso – Nivel II",
    "level": 2,
    "description": "Su coraza impenetrable acumula toxinas de alta concentración mientras se prepara para eclosionar. Reduce todo el daño recibido un 20%. Sus ataques tienen un 30% de probabilidad de envenenar a los enemigos durante 2.5 segundos."
  },
  "15": {
    "name": "Aguijón Ponzoñoso – Nivel III",
    "level": 3,
    "description": "Volando a gran velocidad, sus letales aguijones descargan ráfagas de veneno crítico sobre el campo de batalla. Aumenta su velocidad de movimiento y velocidad de disparo un 25%. Sus ataques tienen un 40% de probabilidad de envenenar y causan un 10% de daño adicional contra objetivos que ya sufran veneno."
  },
  "16": {
    "name": "Viento Cortante",
    "level": 1,
    "description": "Agita sus alas con rapidez para generar ráfagas de aire que desorientan a las amenazas cercanas. Aumenta la velocidad de ataque un 15%."
  },
  "17": {
    "name": "Viento Cortante – Nivel II",
    "level": 2,
    "description": "Su ágil vuelo y afinada visión aérea le permiten dominar las corrientes de aire para atacar con precisión. Aumenta la velocidad de ataque un 25% y la velocidad de movimiento un 15%."
  },
  "18": {
    "name": "Viento Cortante – Nivel III",
    "level": 3,
    "description": "Volando a velocidades supersónicas, despliega potentes vendavales capaces de despedazar las filas enemigas. Aumenta la velocidad de ataque un 35% y la velocidad de movimiento un 25%. Sus ataques tienen un 30% de probabilidad de lanzar hojas de aire que atraviesan hasta a 3 enemigos."
  },
  "19": {
    "name": "Frenesí Voraz",
    "level": 1,
    "description": "Sus afilados incisivos y constante agilidad le permiten asestar mordiscos letales a objetivos desprevenidos. Aumenta la velocidad de ataque un 20%."
  },
  "20": {
    "name": "Frenesí Voraz – Nivel II",
    "level": 2,
    "description": "Sus colmillos imparables son capaces de triturar la coraza más dura para causar estragos en el combate. Aumenta la velocidad de ataque un 35% y la probabilidad de golpe crítico un 15%. Inflige un 25% más de daño a enemigos (no jefes) que tengan más del 75% de su vida."
  },
  "21": {
    "name": "Pico Furia",
    "level": 1,
    "description": "Su naturaleza territorial y constante aleteo impulsan ataques rápidos e implacables. Aumenta la velocidad de ataque un 20%."
  },
  "22": {
    "name": "Pico Furia – Nivel II",
    "level": 2,
    "description": "Su pico alargado y majestuosa envergadura le permiten atravesar el viento y rasgar a sus enemigos con extrema ferocidad. Aumenta la velocidad de ataque un 30% y la velocidad de movimiento un 20%. Cada 3 ataques inflige daño crítico."
  },
  "23": {
    "name": "Constricción Venenosa",
    "level": 1,
    "description": "Su cuerpo flexible se enrosca silenciosamente sobre sus presas para inmovilizarlas antes de asestar su mordedura. Sus ataques tienen un 20% de probabilidad de reducir su velocidad de movimiento un 30%."
  },
  "24": {
    "name": "Constricción Venenosa – Nivel II",
    "level": 2,
    "description": "Los intimidantes patrones de su capó paralizan de terror a sus víctimas mientras las envuelve en un abrazo mortífero. Sus ataques tienen un 35% de probabilidad de inmovilizar por completo a los enemigos durante 1 segundos. Cada 10 enemigos afectados por inmovilización, envenena a los enemigos."
  },
  "25": {
    "name": "Estática Voltáica",
    "level": 1,
    "description": "Acumula electricidad constante en las bolsas de sus mejillas para descargar chispas destructivas al menor contacto. Aumenta la velocidad de disparo y de movimiento un 20%. Sus ataques tienen un 25% de probabilidad de paralizar a los enemigos durante 0.5 segundos."
  },
  "26": {
    "name": "Estática Voltáica – Nivel II",
    "level": 2,
    "description": "Su cola actúa como toma de tierra para liberar voltajes masivos capaces de electrificar todo el campo de batalla. Aumenta la velocidad de disparo un 35% y la velocidad de movimiento un 30%. Sus ataques tienen un 35% de probabilidad de paralizarlos durante 1 segundo. Al moverse continuamente, acumula carga eléctrica que potencia el siguiente ataque."
  },
  "27": {
    "name": "Coraza Arenosa",
    "level": 1,
    "description": "Se enrosca en una bola compacta para deslizarse velozmente y repeler ataques directos con su piel dura. Reduce todo el daño recibido un 15%."
  },
  "28": {
    "name": "Coraza Arenosa – Nivel II",
    "level": 2,
    "description": "Sus garras afiladas y púas de tierra le permiten desgarrar el suelo y responder con contraataques letales. Reduce todo el daño recibido un 25% y la probabilidad de sufrir golpes críticos un 50%. Al recibir daño, levanta una cortina de arena que reduce la precisión de los enemigos cercanos un 30% durante 2 segundos."
  },
  "29": {
    "name": "Piel Espinosa",
    "level": 1,
    "description": "Sus pequeñas púas secretan un veneno suave para disuadir a las amenazas que se le acercan. Al recibir daño, libera espinas tóxicas que infectan a los enemigos cercanos con veneno durante 1 segundo."
  },
  "30": {
    "name": "Piel Espinosa – Nivel II",
    "level": 2,
    "description": "Desarrolla espinas más duras y receptivas que responden con firmeza ante cualquier agresión física. Aumenta su reducción de daño recibido un 20%. Al recibir un golpe, devuelve un 20% del impacto como daño de veneno."
  },
  "31": {
    "name": "Piel Espinosa – Nivel III",
    "level": 3,
    "description": "Su cuerpo masivo y acorazado convierte la defensa en un terremoto continuo de toxinas y contención. Aumenta su reducción de daño recibido un 30% y su vida máxima un 25%. Al recibir un golpe, devuelve un 50% del impacto como daño de veneno."
  },
  "32": {
    "name": "Cuerno Perforante",
    "level": 1,
    "description": "Canaliza su constante agresividad en su cuerno frontal para asestar estocadas rápidas y certeras. Aumenta la probabilidad de golpe crítico un 15%."
  },
  "33": {
    "name": "Cuerno Perforante – Nivel II",
    "level": 2,
    "description": "Su temperamento irritable e impetuoso impulsa embestidas violentas capaces de atravesar defensas sólidas. Aumenta la probabilidad de golpe crítico un 25% y el daño crítico un 20%."
  },
  "34": {
    "name": "Cuerno Perforante – Nivel III",
    "level": 3,
    "description": "Desata una fuerza destructiva e imparable, demoliendo el campo de batalla con impactos sísmicos letales. Aumenta la probabilidad de golpe crítico un 35% y el daño crítico un 40%. Sus golpes críticos aplican un veneno concentrado que dura 3 segundos."
  },
  "35": {
    "name": "Luz Lunar",
    "level": 1,
    "description": "Canaliza el resplandor de las estrellas para sanar sus heridas. Recupera un 1% de su vida máxima cada 5 segundos."
  },
  "36": {
    "name": "Luz Lunar – Nivel II",
    "level": 2,
    "description": "Su conexión celestial invoca auras curativas que repelen e infligen desgaste a las hordas hostiles. Recupera un 2% de su vida máxima cada 5 segundos. Cada 12 segundos, libera un aura estelar que cura un 5% de su vida máxima y de los aliados. Aumenta un 15% su reducción de daño mientras su vida se mantenga por encima del 60%."
  },
  "37": {
    "name": "Fuego Fatuo",
    "level": 1,
    "description": "Manipula orbes de llamas místicas que persiguen a sus presas y consumen su energía vital. Sus ataques tienen un 20% de probabilidad de invocar un orbe espiritual que busca automáticamente al enemigo más cercano."
  },
  "38": {
    "name": "Fuego Fatuo – Nivel II",
    "level": 2,
    "description": "El poder milenario de sus nueve colas desata maldiciones abrasadoras que devoran el campo de batalla. Aumenta el daño de sus ataques de fuego un 30% y la velocidad de disparo un 20%. Sus ataques tienen un 35% de probabilidad de invocar 3 orbes espirituales que persiguen a los enemigos mas cercanos."
  },
  "39": {
    "name": "Canto Arrollador",
    "level": 1,
    "description": "Entona una melodía cautivadora que adormece a las criaturas cercanas, dejándolas indefensas. Cada 8 segundos, entona una canción en área que adormece a los enemigos durante 1.5 segundos."
  },
  "40": {
    "name": "Canto Arrollador – Nivel II",
    "level": 2,
    "description": "Su cuerpo elástico se infla para resistir impactos mientras proyecta ondas sonoras retumbantes. Aumenta su vida máxima un 25%. Cada 6 segundos, entona un canto expansivo que adormece a los enemigos durante 2 segundos y reduce su defensa un 30%."
  },
  "41": {
    "name": "Drenaje Ultrasónico",
    "level": 1,
    "description": "Emite ondas ultrasónicas en la oscuridad para orientarse. Aumenta la velocidad de movimiento un 20%."
  },
  "42": {
    "name": "Drenaje Ultrasónico – Nivel II",
    "level": 2,
    "description": "Sus fauces cavernosa devoran la vitalidad de hordas enteras para mantener un estado de voracidad insaciable. Aumenta la velocidad de movimiento un 30% y la velocidad de ataque un 20%. Sus ataques tienen un 20% de probabilidad de recuperar un 5% del daño infligido como vida."
  },
  "43": {
    "name": "Clorofila Nocturna",
    "level": 1,
    "description": "Absorbe la luz de la luna para fortalecer sus esporas y desplazarse con soltura entre las sombras. Aumenta la velocidad de movimiento un 15%. Sus ataques tienen un 15% de probabilidad de envenenar a los enemigos durante 2 segundos."
  },
  "44": {
    "name": "Clorofila Nocturna – Nivel II",
    "level": 2,
    "description": "El fétido hedor de su néctar entorpece y frena el avance de las hordas hostiles. Aumenta la velocidad de movimiento un 20%. Sus ataques tienen un 25% de probabilidad de envenenar"
  },
  "45": {
    "name": "Clorofila Nocturna – Nivel III",
    "level": 3,
    "description": "Sus enormes pétalos sacuden nubes masivas de polen tóxico que devastan todo a su alrededor. Aumenta la velocidad de movimiento un 25% y el área de efecto de sus ataques un 30%. Sus ataques tienen un 35% de probabilidad de envenenar a los enemigos y reducir su velocidad de movimiento un 20%."
  },
  "46": {
    "name": "Esporas Drenantes",
    "level": 1,
    "description": "Los hongos de su lomo absorben la vitalidad de sus presas para sustentarse. Sus ataques tienen un 15% de probabilidad de recuperar un 1% de su vida máxima al infligir daño."
  },
  "47": {
    "name": "Esporas Drenantes – Nivel II",
    "level": 2,
    "description": "El hongo parásito toma el control completo, drenando energía continuamente para mantenerse indestructible. Sus ataques tienen un 25% de probabilidad de recuperar un 2% de su vida máxima al infligir daño. Al recibir impacto, libera una nube de esporas que adormece a los enemigos cercanos durante 1.5 segundos."
  },
  "48": {
    "name": "Ojos Radar",
    "level": 1,
    "description": "Sus ojos compuestos actúan como radares de precisión para localizar los puntos débiles de sus presas. Aumenta la probabilidad de golpe crítico un 15%."
  },
  "49": {
    "name": "Ojos Radar – Nivel II",
    "level": 2,
    "description": "Al batir sus alas deshoja escamas venenosas que desorientan e infectan al enemigo. Aumenta la probabilidad de golpe crítico un 25% y la velocidad de ataque un 15%. Sus golpes críticos liberan un polvo tóxico que envenena a los enemigos afectados durante 3 segundos."
  },
  "50": {
    "name": "Excavador Sigiloso",
    "level": 1,
    "description": "Excava a gran velocidad bajo tierra para emerger por sorpresa y emboscar a sus enemigos. Aumenta la velocidad de movimiento un 15%."
  },
  "51": {
    "name": "Excavador Sigiloso – Nivel II",
    "level": 2,
    "description": "El trabajo coordinado de sus tres cabezas provoca temblores subterráneos que desquebrajan el terreno a su paso. Aumenta la velocidad de movimiento un 25% y la velocidad de ataque un 20%. Sus ataques tienen un 20% de probabilidad de ralentizar la velocidad de movimiento de los enemigos un 20% durante 2 segundos."
  },
  "52": {
    "name": "Día de Pago",
    "level": 1,
    "description": "Su afinidad por las cosas brillantes le permite despojar de recursos adicionales a los enemigos que derrota. Aumenta la ganancia de oro y experiencia un 15%."
  },
  "53": {
    "name": "Día de Pago – Nivel II",
    "level": 2,
    "description": "Su porte elegante y garras traicioneras le permiten ejecutar ataques fulminantes que multiplican sus botines. Aumenta la ganancia de oro y experiencia un 25% y la probabilidad de golpe crítico un 20%. Sus golpes críticos tienen un 20% de probabilidad de hacer soltar recursos adicionales."
  },
  "54": {
    "name": "Jaqueca Psíquica",
    "level": 1,
    "description": "Al intensificarse su constante dolor de cabeza, libera descargas psicoquinéticas incontrolables a su alrededor. Cuando su salud cae por debajo del 40%, libera una onda psíquica que aturde a los enemigos durante 1 segundo."
  },
  "55": {
    "name": "Jaqueca Psíquica – Nivel II",
    "level": 2,
    "description": "Canaliza con maestría su poder psíquico reprimido para dominar las corrientes y repeler ataques masivos. Aumenta la velocidad de disparo un 20%. Cuando su salud cae por debajo del 50%, desata un pulso psíquico que ralentiza a los enmigos un 40% durante 3 segundos y genera un escudo del 25% de su vida máxima."
  },
  "56": {
    "name": "Ira Ininterrumpida",
    "level": 1,
    "description": "Su temperamento explosivo convierte cada impacto recibido en una furia desenfrenada que acelera sus golpes. Al recibir daño, aumenta su velocidad de ataque un 5% durante 4 segundos (acumulable hasta 5 veces)."
  },
  "57": {
    "name": "Ira Ininterrumpida – Nivel II",
    "level": 2,
    "description": "Su ira alcanza niveles incontrolables, haciéndolo letal e implacable conforme avanza el combate. Al recibir o infligir daño, aumenta su velocidad de ataque un 8% y su daño un 5% durante 5 segundos (acumulable hasta 5 veces). Al alcanzar el máximo de acumulaciones, se vuelve inmune a efectos de ralentización e inmovilización."
  },
  "58": {
    "name": "Intimidación Ardiente",
    "level": 1,
    "description": "Su naturaleza leal y feroz le permite emitir rugidos amenazantes que acobardan a sus atacantes. Emite un aura que reduce el daño infligido por los enemigos cercanos un 15%."
  },
  "59": {
    "name": "Intimidación Ardiente – Nivel II",
    "level": 2,
    "description": "Su imponente presencia y rugido majestuoso infunden pavor en las tropas enemigas mientras avanza a gran velocidad. Emite un aura que reduce el daño de los enemigos cercanos un 25% y su velocidad un 20%. Aumenta la velocidad de movimiento un 25%. Sus ataques de fuego tienen un 35% de probabilidad de quemar a los enemigos durante 2 segundos."
  },
  "60": {
    "name": "Espiral Hipnótica",
    "level": 1,
    "description": "La espiral de su vientre gira rítmicamente para desorientar a las criaturas que intentan atacarlo. Sus ataques tienen un 20% de probabilidad de confundir a los enemigos."
  },
  "61": {
    "name": "Espiral Hipnótica – Nivel II",
    "level": 2,
    "description": "El movimiento constante de su vientre genera ondas mareantes que adormecen y ralentizan las hordas enemigas. Sus ataques tienen un 30% de probabilidad de ralentizar a los enemigos. Al recibir daño, tiene un 20% de probabilidad de adormecer al atacante durante 1 segundo."
  },
  "62": {
    "name": "Espiral Hipnótica – Nivel III",
    "level": 3,
    "description": "Su desarrollada musculatura y dominio de la corriente convierten cada golpe en un impacto contundente e imparable. Aumenta la velocidad de ataque un 20% y la vida máxima un 20%. Sus ataques tienen un 30% de probabilidad de aturdir a los enemigos durante 1 segundo e infligen un 20% de daño adicional contra enemigos aturdidos o ralentizados."
  },
  "63": {
    "name": "Teletransporte Evasivo",
    "level": 1,
    "description": "Detecta el peligro de forma instintiva, desplazándose instantáneamente para evitar daños fatales. Al recibir daño, tiene una probabilidad de 30%, de teletransportarse a una corta distancia y aumenta su velocidad de movimiento un 20% durante 2 segundos."
  },
  "64": {
    "name": "Teletransporte Evasivo – Nivel II",
    "level": 2,
    "description": "Emite ondas alfa potenciadas que amplifican sus reflejos psíquicos y distorsionan el espacio a su alrededor. Aumenta la probabilidad de esquivar ataques un 25%. Al esquivar un ataque, libera una onda psíquica que daña a los enemigos cercanos."
  },
  "65": {
    "name": "Teletransporte Evasivo – Nivel III",
    "level": 3,
    "description": "Su intelecto desbordante prevé los movimientos enemigos, desatando colapsos mentales destructivos. Aumenta la probabilidad de esquivar un 35% y la velocidad de disparo un 30%. Sus ataques tienen un 30% de probabilidad de causar una explosión psíquica en área. Al esquivar un ataque, libera una onda psíquica que daña a los enemigos cercanos."
  },
  "66": {
    "name": "Agallas Inquebrantables",
    "level": 1,
    "description": "Desarrolla sus músculos incansablemente para incrementar la potencia de cada impacto. Aumenta la probabilidad de golpe crítico un 10%."
  },
  "67": {
    "name": "Agallas Inquebrantables – Nivel II",
    "level": 2,
    "description": "El cinturón que limita su fuerza le permite liberar ráfagas de energía física concentrada. Aumenta la velocidad de ataque un 25% y la probabilidad de golpe crítico un 20%."
  },
  "68": {
    "name": "Agallas Inquebrantables – Nivel III",
    "level": 3,
    "description": "Desata la potencia de sus cuatro brazos para asestar una lluvia imparable de puñetazos mortales. Aumenta la velocidad de ataque un 35% y la probabilidad de golpe crítico un 30%. Cada 5 golpes el siguiente hace el 100% de daño adicional."
  },
  "69": {
    "name": "Clorofila Ácida",
    "level": 1,
    "description": "Su cuerpo flexible y tallo delgado le permiten balancearse velozmente mientras escupe fluidos corrosivos. Sus ataques tienen un 20% de probabilidad de envenenar a los enemigos durante 1.5 segundos."
  },
  "70": {
    "name": "Clorofila Ácida – Nivel II",
    "level": 2,
    "description": "Segrega un ácido corrosivo que disuelve a las presas antes de engullirlas por completo. Aumenta la velocidad de movimiento un 20%. Sus ataques tienen un 30% de probabilidad de envenenar a los enemigos durante 2 segundos."
  },
  "71": {
    "name": "Clorofila Ácida – Nivel III",
    "level": 3,
    "description": "Atrae a hordas enteras con su dulce aroma para derretirlas en una tormenta de ácido digestivo. Aumenta la velocidad de movimiento un 25%. Sus ataques tienen un 40% de probabilidad de envenenar a los enemigos durante 3 segundos. Los enemigos derrotados mientras estén envenenados dejan un charco ácido que daña y envenena a las criaturas cercanas."
  },
  "72": {
    "name": "Tentáculos Tóxicos",
    "level": 1,
    "description": "Flota a la deriva extendiendo sus tentáculos transparentes cargados de toxinas paralizantes. Sus ataques tienen un 20% de probabilidad de envenenar a los enemigos durante 1.5 segundos."
  },
  "73": {
    "name": "Tentáculos Tóxicos – Nivel II",
    "level": 2,
    "description": "Sus numerosos tentáculos crean una red mortífera de veneno que atrapa y desgasta a sus presas. Reduce todo el daño recibido un 15%. Sus ataques tienen un 35% de probabilidad de envenenar a los enemigos durante 3 segundos e infligen un 20% de daño adicional a objetivos envenenados."
  },
  "74": {
    "name": "Cuerpo Rocoso",
    "level": 1,
    "description": "Su cuerpo de piedra sólida le permite absorber impactos sin inmutarse mientras Rueda hacia el enemigo. Reduce todo el daño físico recibido un 15%."
  },
  "75": {
    "name": "Cuerpo Rocoso – Nivel II",
    "level": 2,
    "description": "Rueda colina abajo sin detenerse, pulverizando rocas y enemigos que se crucen en su trayectoria. Reduce todo el daño recibido un 20%. Al recibir daño, tiene un 25% de probabilidad de soltar fragmentos de roca que infligen daño físico a los enemigos cercanos."
  },
  "76": {
    "name": "Cuerpo Rocoso – Nivel III",
    "level": 3,
    "description": "Su impenetrable armadura de piedra canaliza la energía de los golpes recibidos para desatar detonaciones destructivas. Reduce todo el daño recibido un 30%. Al recibir 8 impactos, desencadena una onda de choque rocosa que inflige daño en área y empuja a los enemigos. Al caer por debajo del 20% de su vida, se vuelve invulnerable durante 2 segundos y provoca una explosión masiva a su alrededor."
  },
  "77": {
    "name": "Galope Flameante",
    "level": 1,
    "description": "Sus pezuñas duras como el diamante y su crin ardiente intensifican la velocidad de sus embestidas. Aumenta la velocidad de movimiento un 20%."
  },
  "78": {
    "name": "Galope Flameante – Nivel II",
    "level": 2,
    "description": "Alcanza velocidades deslumbrantes envolviéndose en llamas incandescentes para arrollar cualquier amenaza. Aumenta la velocidad de movimiento un 30% y la velocidad de ataque un 20%. Deja un rastro ardiente a su paso que inflige daño de quemadura continuo a los enemigos que lo pisan."
  },
  "79": {
    "name": "Despistado",
    "level": 1,
    "description": "Su extrema lentitud de reflejos hace que tarde en procesar el dolor, distribuyendo los golpes recibidos. Retrasa un 30% del daño recibido para sufrirlo de forma gradual a lo largo de 3 segundos."
  },
  "80": {
    "name": "Despistado – Nivel II",
    "level": 2,
    "description": "El constante mordisco de Shellder en su cola estimula su sistema nervioso, otorgándole ráfagas de regeneración e insensibilidad. Retrasa un 40% del daño recibido para sufrirlo de forma gradual a lo largo de 4 segundos. Recupera un 1.5% de su vida máxima cada 5 segundos. Al sufrir un golpe que reduciría su vida a 0, ignora el daño y regenera un 20% de su vida máxima (cooldown de 60 segundos)."
  },
  "81": {
    "name": "Campo Magnético",
    "level": 1,
    "description": "Genera una tracción electromagnética constante que perturba los proyectiles enemigos y atrae recursos distantes. Aumenta el rango de recolección de recursos un 25%."
  },
  "82": {
    "name": "Campo Magnético – Nivel II",
    "level": 2,
    "description": "El enlace magnético de sus tres núcleos crea una sobrecarga eléctrica que paraliza a las hordas hostiles. Aumenta el rango de recolección de recursos un 40% y la velocidad de disparo un 20%. Sus ataques tienen un 25% de probabilidad de paralizar a los enemigos durante 1 segundo y neutralizar proyectiles enemigos cercanos."
  },
  "83": {
    "name": "Tallo Cortante",
    "level": 1,
    "description": "Blande su puerro con precisión quirúrgica para encontrar las grietas en las defensas oponentes. Aumenta la probabilidad de golpe crítico un 20% y el daño crítico un 25%."
  },
  "84": {
    "name": "Doble Alerta",
    "level": 1,
    "description": "Sus dos cabezas vigilan en direcciones opuestas sin descanso, permitiéndole reaccionar velozmente ante el peligro. Aumenta la velocidad de movimiento un 20%."
  },
  "85": {
    "name": "Doble Alerta – Nivel II",
    "level": 2,
    "description": "El trabajo en equipo de sus tres mentes le permite coordinar embestidas frenéticas e esquivar con soltura. Aumenta la velocidad de movimiento un 30% y la velocidad de ataque un 25%. Aumenta la probabilidad de esquivar ataques un 15%"
  },
  "86": {
    "name": "Capa Helada",
    "level": 1,
    "description": "Su densa piel recubierta de grasa fría absorbe impactos y enfría el aire a su alrededor. Reduce todo el daño recibido un 15%."
  },
  "87": {
    "name": "Capa Helada – Nivel II",
    "level": 2,
    "description": "Se desliza sobre el hielo congelando instantáneamente el terreno al menor contacto con el enemigo. Reduce el daño recibido un 25% e inmuniza contra efectos de ralentización. Sus ataques tienen un 30% de probabilidad de congelar por completo a los enemigos durante 1.5 segundos."
  },
  "88": {
    "name": "Lodo Pegajoso",
    "level": 1,
    "description": "Su cuerpo viscoso de materia tóxica se adhiere a los enemigos ralentizando su paso. Al recibir daño, deja caer un charco de lodo tóxico que reduce la velocidad de movimiento de los enemigos cercanos un 20% durante 2 segundos."
  },
  "89": {
    "name": "Lodo Pegajoso – Nivel II",
    "level": 2,
    "description": "Emana un olor fétido y toxinas concentradas que disuelven y asfixian a quien intente acorralarlo. Sus ataques tienen un 35% de probabilidad de envenenar a los enemigos durante 2 segundos. Al recibir daño, emite una onda de hedor que ralentiza a los enemigos un 30% e inflige daño de veneno continuo en área."
  },
  "90": {
    "name": "Concha Reforzada",
    "level": 1,
    "description": "Cierra firmemente su dura concha para repeler ataques y proteger sus partes blandas. Reduce todo el daño recibido un 15%."
  },
  "91": {
    "name": "Concha Reforzada – Nivel II",
    "level": 2,
    "description": "Su caparazón de dureza diamantina dispara ráfagas de espinas heladas al recibir impactos. Reduce todo el daño recibido un 25% y es inmune a los golpes críticos. Al recibir daño, tiene un 30% de probabilidad de disparar espinas de hielo en 8 direcciones que ralentizan a los enemigos un 30% durante 2 segundos."
  },
  "92": {
    "name": "Cuerpo Gaseoso",
    "level": 1,
    "description": "Compuesto de gas tóxico e impalpable, atraviesa a las presas para desgastarlas sin sufrir daño directo. Aumenta la probabilidad de esquivar ataques un 15%."
  },
  "93": {
    "name": "Cuerpo Gaseoso – Nivel II",
    "level": 2,
    "description": "Se oculta entre las sombras para lamer y consumir la energía vital de sus víctimas inadvertidas. Aumenta la probabilidad de esquivar un 20% y la velocidad de movimiento un 15%."
  },
  "94": {
    "name": "Cuerpo Gaseoso – Nivel III",
    "level": 3,
    "description": "Su sombra cobra vida propia para sembrar la discordia, robando vitalidad y desatando el caos. Aumenta la probabilidad de esquivar un 30% y la velocidad de disparo un 25%. Sus ataques tienen un 25% de probabilidad de aterrorizar a los enemigos durante 1.5 segundos, haciendo que huyan e infligiéndoles veneno continuo."
  },
  "95": {
    "name": "Coloso de Piedra",
    "level": 1,
    "description": "Su gigantesco cuerpo formado por rocas unidas excava a gran velocidad provocando derrumbes a su paso. Reduce todo el daño físico recibido un 20%. Al desplazarse, deja tras de sí un rastro de rocas duras que frena y daña a los enemigos que lo persiguen."
  },
  "96": {
    "name": "Comedor de Sueños",
    "level": 1,
    "description": "Devora la energía de las pesadillas de sus presas para adormecerlas y regenerarse. Sus ataques tienen un 20% de probabilidad de adormecer a los enemigos durante 1.5 segundos."
  },
  "97": {
    "name": "Comedor de Sueños – Nivel II",
    "level": 2,
    "description": "El vaivén constante de su péndulo sume a las hordas en un trance profundo e inquebrantable. Cada 8 segundos, oscila su péndulo en área adormeciendo a los enemigos cercanos durante 2 segundos. Inflige un 25% de daño adicional a los enemigos adormecidos o con alteraciones de estado. Recupera un 1% de su vida máxima al golpear a un enemigo adormecido."
  },
  "98": {
    "name": "Tenaza Brutal",
    "level": 1,
    "description": "Sus potentes pinzas le permiten asestar mordazas mecánicas que destrozan la armadura enemiga. Aumenta la probabilidad de golpe crítico un 15%."
  },
  "99": {
    "name": "Tenaza Brutal – Nivel II",
    "level": 2,
    "description": "Su enorme pinza hipertrofiada descarga pellizcos devastadores capaces de partir en dos a cualquier rival. Aumenta la probabilidad de golpe crítico un 25% y el daño crítico un 20%. Los golpes críticos ignoran el 40% de la armadura enemiga."
  },
  "100": {
    "name": "Núcleo Inestable",
    "level": 1,
    "description": "Su cuerpo cargado de energía volátil reacciona ante el peligro amenazando con estallar. Aumenta la velocidad de movimiento un 20%. Al recibir daño, tiene un 25% de probabilidad de liberar una descarga eléctrica en área que daña a los enemigos cercanos."
  },
  "101": {
    "name": "Núcleo Inestable – Nivel II",
    "level": 2,
    "description": "Almacena niveles extremos de electricidad estática, convirtiendo su propia sobrecarga en detonaciones masivas. Aumenta la velocidad de movimiento un 30% y la velocidad de ataque un 20%. Al recibir daño o caer por debajo del 30% de vida, desencadena una explosión eléctrica que daña e inmoviliza a los enemigos cercanos durante 1.5 segundos."
  },
  "102": {
    "name": "Mente Colectiva",
    "level": 1,
    "description": "Sus seis cabezas se comunican por telepatía para coordinar proyectiles simultáneos y prever amenazas. Aumenta la velocidad de disparo un 15%."
  },
  "103": {
    "name": "Mente Colectiva – Nivel II",
    "level": 2,
    "description": "El rugido psicodélico de sus tres cabezas maduras bombardea el campo de batalla con polen psicoquinético. Aumenta la velocidad de disparo un 25%. Sus ataques tienen un 30% de probabilidad de causar una explosión psíquica en área que confunde a los enemigos durante 2 segundos. Al derrotar a un jefe, libera una lluvia masiva de semillas explosivas en todo el escenario."
  },
  "104": {
    "name": "Hueso Vengativo",
    "level": 1,
    "description": "El duelo por su madre fortalece cada uno de los golpes que asesta con su hueso. Aumenta la probabilidad de golpe crítico un 15%. Sus ataques tienen un 20% de probabilidad de aturdir brevemente al enemigo durante 0.5 segundos."
  },
  "105": {
    "name": "Hueso Vengativo – Nivel II",
    "level": 2,
    "description": "Ha superado su pena convirtiendo su hueso en un arma letal de combate implacable. Aumenta la probabilidad de golpe crítico un 25% y el daño crítico un 20%. Sus ataques tienen un 30% de probabilidad de aturdir brevemente al enemigo durante 1.5 segundos."
  },
  "106": {
    "name": "Patada Elástica",
    "level": 1,
    "description": "Sus piernas extensibles le permiten asestar patadas relámpago a distancias sorprendentes. Aumenta la velocidad de ataque un 20% y el alcance de sus ataques un 25%. Cada 4.º ataque ejecuta una patada giratoria en área que inflige daño crítico garantizado."
  },
  "107": {
    "name": "Puño Ráfaga",
    "level": 1,
    "description": "Su técnica de boxeo depurada desata combinaciones imparables de puñetazos elementales. Aumenta la velocidad de ataque un 25%. Sus ataques tienen un 20% de probabilidad de alternar un efecto elemental, pudiendo quemar, congelar o paralizar al enemigo durante 1 segundo."
  },
  "108": {
    "name": "Lengüetazo Paralizante",
    "level": 1,
    "description": "Su larga y pegajosa lengua paraliza a las presas mientras drena su energía. Sus ataques tienen un 20% de probabilidad de paralizar a los enemigos durante 1 segundo. Recupera un 1% de su vida máxima al golpear a un enemigo paralizado."
  },
  "109": {
    "name": "Nube Tóxica",
    "level": 1,
    "description": "Su cuerpo inflado retiene gases volátiles que se filtran constantemente al ambiente. Emite una nube de gas a su alrededor que envenena a los enemigos cercanos durante 2.5 segundos. Al recibir daño, expulsa una ráfaga de gas que reduce la velocidad de movimiento de los atacantes un 20% durante 2 segundos."
  },
  "110": {
    "name": "Nube Tóxica – Nivel II",
    "level": 2,
    "description": "La combinación de sus dos núcleos intensifica la densidad de sus gases hasta hacerlos altamente explosivos. Emite una densa aura tóxica constante que inflige daño de veneno y ralentiza a los enemigos cercanos un 25%. Los enemigos derrotados mientras estén envenenados explotan, infligiendo daño de veneno en área a las criaturas adyacentes."
  },
  "111": {
    "name": "Armadura Perforante",
    "level": 1,
    "description": "Su cráneo de roca sólida y sus embestidas brutales arrollan cualquier obstáculo a su paso. Reduce todo el daño físico recibido un 15%. Al desplazarse en línea recta, aumenta su daño un 20%."
  },
  "112": {
    "name": "Armadura Perforante – Nivel II",
    "level": 2,
    "description": "Su cuerno taladro gira a alta velocidad para demoler defensas y provocar temblores telúricos. Reduce todo el daño recibido un 25% e inmune a efectos de ralentización. Al desplazarse en línea recta, aumenta su daño un 40%. Cada 5 segundos provoca un temblor que daña a los enemigos cercanos."
  },
  "113": {
    "name": "Huevo Nutritivo",
    "level": 1,
    "description": "Comparte la energía curativa de su huevo sagrado para sostener la vitalidad en momentos críticos. Aumenta su vida máxima un 35%. Cada 10 segundos, genera un huevo en el suelo que cura un 8% de la vida máxima al recogerlo y otorga un escudo del 10% durante 4 segundos."
  },
  "114": {
    "name": "Enredadera Cautivadora",
    "level": 1,
    "description": "Desenreda sus azules lianas para atrapar, frenar y desgastar a las criaturas que lo rodean. Sus ataques tienen un 20% de probabilidad de enredar a los enemigos, reduciendo su velocidad de movimiento un 30% durante 2 segundos. Al recibir daño, libera tentáculos vegetales que frenan a los atacantes cercanos."
  },
  "115": {
    "name": "Vínculo Materno",
    "level": 1,
    "description": "El feroz instinto de protección hacia la cría de su bolsa duplica su agresividad en batalla. Aumenta la velocidad de ataque un 20%. Cada ataque tiene un 35% de probabilidad de asestar un segundo golpe consecutivo ejecutado por su cría que inflige un 50% del daño base."
  },
  "116": {
    "name": "Tinta Cegadora",
    "level": 1,
    "description": "Escupe chorros de tinta densa para cegar y confundir a los atacantes que intenten acorralarlo. Sus ataques tienen un 20% de probabilidad de reducir la precisión de los enemigos un 30% durante 2 segundos."
  },
  "117": {
    "name": "Tinta Cegadora – Nivel II",
    "level": 2,
    "description": "Sus afiladas púas dorsales y potentes chorros de agua repelen ferozmente cualquier amenaza. Aumenta la velocidad de movimiento un 20% y la velocidad de disparo un 20%. Sus ataques tienen un 30% de probabilidad de emitir una nube de tinta que reduce la velocidad enemiga un 30%."
  },
  "118": {
    "name": "Danza de Aletas",
    "level": 1,
    "description": "Ata con elegancia sus aletas para desplazarse velozmente a través de las corrientes acuáticas. Aumenta la velocidad de movimiento un 20%. Sus ataques tienen un 25% de probabilidad de ralentizar al enemigo."
  },
  "119": {
    "name": "Danza de Aletas – Nivel II",
    "level": 2,
    "description": "Su cuerno espiral y vistoso nado convierten cada embestida en un impacto punzante y certero. Aumenta la velocidad de movimiento un 25% y la velocidad de ataque un 20%. Sus ataques tienen un 45% de probabilidad de ralentizar al enemigo."
  },
  "120": {
    "name": "Núcleo Regenerativo",
    "level": 1,
    "description": "El brillante núcleo de su pecho emite un pulso de luz constante que sana rápidamente sus extremidades. Recupera un 1% de su vida máxima cada 5 segundos. Al recibir un golpe letal, sobrevive con 1 de vida y genera un escudo del 15% durante 2 segundos (cooldown de 60 segundos)."
  },
  "121": {
    "name": "Núcleo Regenerativo – Nivel II",
    "level": 2,
    "description": "Su gema central resplandece en siete colores, canalizando energía psíquica para una autorreparación continua. Recupera un 2% de su vida máxima cada 5 segundos. Cada 10 segundos, libera una onda luminosa en área que repele e inmoviliza a los enemigos cercanos durante 1 segundo. Al recibir un golpe letal, sobrevive con 1 de vida y genera un escudo del 25% durante 3 segundos (cooldown de 45 segundos)."
  },
  "122": {
    "name": "Barrera Invisible",
    "level": 1,
    "description": "Moldea paredes invisibles con sus manos que bloquean impactos y desorientan el paso enemigo. Genera un escudo equivalente al 10% de su vida máxima cada 10 segundos. Los enemigos que impacten contra el escudo sufren un 20% de reducción de velocidad de movimiento durante 2 segundos."
  },
  "123": {
    "name": "Corte Relámpago",
    "level": 1,
    "description": "Se desplaza a velocidades imperceptibles, usando sus guadañas para desmenuzar las defensas rivales. Aumenta la velocidad de ataque un 25% y la probabilidad de golpe crítico un 15%. Cada 5 ataques, tiene una probabilidad del 15% de ejecutar a los enemigos (no afecta a los jefe)."
  },
  "124": {
    "name": "Danza Cautivadora",
    "level": 1,
    "description": "Sus sinuosos movimientos y ritmo seductor obligan a las hordas a caer en un trance helado. Sus ataques tienen un 25% de probabilidad de ralentizar a los enemigos un 30% durante 2 segundos. Los enemigos ralentizados reciben un 20% más de daño psíquico."
  },
  "125": {
    "name": "Corriente Descargable",
    "level": 1,
    "description": "Gira sus brazos frenéticamente para almacenar voltaje que se libera con explosiva ferocidad. Aumenta la velocidad de disparo un 25%. Cada 6 ataques, libera una descarga radial que paraliza a los enemigos cercanos durante 1 segundo."
  },
  "126": {
    "name": "Radiación Térmica",
    "level": 1,
    "description": "El intenso calor que emite su cuerpo distorsiona el aire a su alrededor, abrasando a quienes se acerquen. Aumenta el área de efecto de sus ataques un 20%. Los enemigos que permanezcan cerca de Magmar sufren daño continuo por quemadura. Cada 15 ataques el siguiente causa una explosion que quema a los enemigos cercanos."
  },
  "127": {
    "name": "Tenaza Demoledora",
    "level": 1,
    "description": "Atrapa a sus rivales con los afilados cuernos de su cabeza hasta triturar sus defensas físicas. Aumenta el daño de sus ataques un 20%. Reduce el 20% de daño de los ataques, aumenta al 30% al tener menos de 25% de vida maxima. Sus ataques ignoran el 25% de la armadura enemiga."
  },
  "128": {
    "name": "Embestida Desenfrenada",
    "level": 1,
    "description": "Se azota con sus tres colas para acumular impulso y arrasar con todo a su paso. Aumenta la velocidad de movimiento un 25%. Al moverse en línea recta sin detenerse, aumenta su daño progresivamente hasta un 30% adicional."
  },
  "129": {
    "name": "Salpicadura Desesperada",
    "level": 1,
    "description": "Da saltos inútiles con torpeza, apelando al puro instinto de supervivencia en momentos de peligro. Al recibir un impacto, incrementa su velocidad de movimiento un 30% adicional durante 1.5 segundos."
  },
  "130": {
    "name": "Furia Intimidadora",
    "level": 1,
    "description": "Su temperamento violento y rugido devastador siembran el pánico en todo el campo de batalla. Aumenta su daño un 25% y la velocidad de ataque un 20%. Emite un aura de terror que reduce el daño infligido por los enemigos cercanos un 20%. Al derrotar a un jefe, desata una marejada destructiva que atraviesa toda la pantalla."
  },
  "131": {
    "name": "Canto del Océano",
    "level": 1,
    "description": "Su voz melodiosa calma la agresividad enemiga mientras proyecta resguardos de hielo místico. Reduce todo el daño recibido un 20%. Cada 10 segundos, emite un canto que otorga un escudo del 15% de su vida máxima y ralentiza a los enemigos cercanos un 25%."
  },
  "132": {
    "name": "Transformación Fluida",
    "level": 1,
    "description": "Reorganiza su estructura celular para replicar y adaptar atributos de las amenazas que lo rodean. Copia un 10% de las estadísticas de daño y velocidad del enemigo más cercano con mayor vida."
  },
  "133": {
    "name": "Potencial Inestable",
    "level": 1,
    "description": "Su código genético irregular le permite amoldarse con rapidez a cualquier situación de combate. Aumenta la ganancia de experiencia un 20%. Al subir de nivel, recupera un 5% de su vida máxima y obtiene un 10% de velocidad durante 4 segundos."
  },
  "134": {
    "name": "Hidratación Fluida",
    "level": 1,
    "description": "Disuelve su estructura celular en el agua para volverse intangible y regenerarse al contacto. Recupera un 1.5% de su vida máxima cada 5 segundos. Al no recibir daño durante 5 segundos aumenta la velocidad de movimiento un 10% (máximo de 30%). Tiene un 15% de probabilidad de esquivar cualquier ataque."
  },
  "135": {
    "name": "Púas Voltáicas",
    "level": 1,
    "description": "Eriza su pelaje cargado de iones para erigirse como un pararrayos de alta frecuencia. Aumenta la velocidad de movimiento un 25% y la velocidad de ataque un 20%. Al no recibir daño durante 5 segundos aumenta la velocidad de ataque un 6% (máximo de 30%). Al recibir daño, erupciona soltando agujas eléctricas que paralizan a los atacantes durante 1.5 segundos."
  },
  "136": {
    "name": "Alma Incandescente",
    "level": 1,
    "description": "Almacena aire térmico en su bolsa de fuego para liberar ráfagas abrasadoras a temperaturas extremas. Aumenta el daño de sus ataques un 25%. Al no recibir daño durante 5 segundos aumenta el ataque un 5% (máximo de 30%). Sus ataques tienen un 30% de probabilidad de quemar al objetivo, cuando el enemigo muere por quemadura tiene una probabilidad del 15% de que se expanda la quemadura a los enemigos cercanos."
  },
  "137": {
    "name": "Conversión Digital",
    "level": 1,
    "description": "Su código de programación pura le permite recalibrar sus defensas en tiempo real. Aumenta la velocidad de disparo un 15%. Reduce un 20% el daño recibido del tipo de ataque elemental que sufrió más recientemente."
  },
  "138": {
    "name": "Caparazón Espiral",
    "level": 1,
    "description": "Flota en las aguas ancestrales protegido por una concha dura que amortigua golpes directos. Reduce todo el daño recibido un 15%. Al recibir daño, aumenta su armadura un 10% durante 3 segundos (acumulable hasta 3 veces)."
  },
  "139": {
    "name": "Caparazón Espiral – Nivel II",
    "level": 2,
    "description": "Sus tentáculos con ventosas y afiladas mordeduras atrapan e inmovilizan a sus presas prehistóricas. Reduce todo el daño recibido un 25%. Cada 5 segundo crea un onda sísmica que daña a los enemigos cercanos Al recibir daño, aumenta su armadura un 20% durante 3 segundos (acumulable hasta 3 veces)."
  },
  "140": {
    "name": "Armadura Fósil",
    "level": 1,
    "description": "Protegido por su rígida cubierta primordial, utiliza los ojos de su lomo para anticipar peligros. Aumenta la probabilidad de esquivar un 10% y reduce el daño físico recibido un 15%."
  },
  "141": {
    "name": "Armadura Fósil – Nivel II",
    "level": 2,
    "description": "Sus garras en forma de guadaña están diseñadas para rebanar y drenar la vitalidad de sus presas. Aumenta la velocidad de ataque un 25% y la probabilidad de golpe crítico un 20%. Sus golpes críticos recuperan un 3% del daño infligido como vida. Cada 5 ataques, tiene una probabilidad del 15% de ejecutar a los enemigos (no afecta a los jefe)."
  },
  "142": {
    "name": "Depredador Primordial",
    "level": 1,
    "description": "Dominaba los cielos prehistóricos atacando en picado con sus colmillos de sierra. Aumenta la velocidad de movimiento un 30% y el daño de los golpes críticos un 30%. Sus ataques infligen un 20% de daño adicional contra enemigos que tengan más del 60% de su vida. Al tener menos de un 25% de vida aumenta drásticamente su velocidad de movimiento en un 50%."
  },
  "143": {
    "name": "Inmunidad Corpulenta",
    "level": 1,
    "description": "Su potente estómago e imponente masa corporal lo hacen inmune a toxinas e inamovible ante impactos. Aumenta su vida máxima un 40%. Aumenta su vida maxima un 0.5% cada 2 segundos si se queda quieto. Recupera un 2% de su vida máxima cada 5 segundos. Al recibir daño letal, se queda dormido regenerando un 30% de su vida máxima durante 2 segundos (cooldown de 90 segundos)."
  },
  "144": {
    "name": "Ventisca Helada",
    "level": 1,
    "description": "El batir de sus alas translúcidas congela instantáneamente la humedad del aire que lo rodea. Aumenta la velocidad de movimiento un 20% y el daño a enemigos helados un 25%. Sus ataques tienen un 35% de probabilidad de congelar a los enemigos durante 1.5 segundos. Al derrotar a un jefe, desata una ventisca absoluta que congela a todos los enemigos en pantalla durante 3 segundos."
  },
  "145": {
    "name": "Tormenta Voltáica",
    "level": 1,
    "description": "Genera chasquidos eufóricos al volar, canalizando relámpagos que caen ininterrumpidamente sobre el terreno. Aumenta la velocidad de ataque un 30% y la velocidad de disparo un 25%. Cada 4 segundos, cae un rayo automático sobre el enemigo más cercano que lo paraliza durante 1 segundo. Al derrotar a un jefe, desata una descarga masiva de truenos sobre toda la pantalla."
  },
  "146": {
    "name": "Fénix de Llamas",
    "level": 1,
    "description": "El fulgor de sus alas envueltas en llamas sagradas renueva su energía e incinera todo a su paso. Aumenta el daño de sus ataques un 25% y el área de efecto un 20%. Sus ataques aplican una quemadura sagrada que se extiende a los enemigos adyacentes al morir el objetivo. Al sufrir un golpe letal, renace en una explosión de fuego recuperando el 40% de su vida (cooldown de 120 segundos)."
  },
  "147": {
    "name": "Escama Especial",
    "level": 1,
    "description": "Su piel mística muda continuamente para liberarse de aflicciones e incrementar su resistencia. Aumenta su velocidad de movimiento un 15%."
  },
  "148": {
    "name": "Escama Especial – Nivel II",
    "level": 2,
    "description": "Las orbes de su cuello y cola le permiten manipular el clima para proteger su aura pura. Reduce todo el daño recibido un 15%. Aumenta la velocidad de movimiento un 20% y el área de sus ataques un 15%."
  },
  "149": {
    "name": "Escama Especial – Nivel III",
    "level": 3,
    "description": "Surca los mares a velocidad supersónica uniendo la fuerza mística del dragón con una agilidad implacable. Reduce todo el daño recibido un 25% mientras su vida esté por encima del 50%. Aumenta la velocidad de movimiento un 25% y la velocidad de ataque un 25%. Cada 10 ataques tenga una probabilidad de el 20% de desatar un impacto dracónico que inflige daño masivo e inmoviliza a los enemigos durante 1.5 segundos."
  },
  "150": {
    "name": "Presión Psíquica",
    "level": 1,
    "description": "Creado por reingeniería genética, su poder telequinético abrumador somete la voluntad de cualquier oponente. Aumenta el daño de todos sus ataques un 30% y la velocidad de disparo un 20%. Sus ataques repelen a los enemigos y reducen su velocidad de movimiento un 30%. Al sufrir un golpe, libera una onda telequinética expansiva que destruye proyectiles enemigos y aturde durante 1 segundo."
  },
  "151": {
    "name": "Génesis Ancestral",
    "level": 1,
    "description": "Contiene el código genético de todos los Pokémon, lo que le otorga una adaptabilidad perfecta y absoluta. Aumenta la velocidad de movimiento un 20% y la ganancia de experiencia un 25%. Cada 10 segundos, obtiene aleatoriamente un efecto durante 5 segundos: un escudo del 20% de su vida, garantía de golpes críticos o inmunidad total al daño. Sus ataques tienen un 20% de probabilidad de aplicar una alteración de estado aleatoria (quemadura, congelación, parálisis o veneno)."
  }
};

  const clamp01 = n => Math.max(0, Math.min(1, n));
  const number = (text, re) => {
    const match = text.match(re);
    return match ? Number(match[1].replace(',', '.')) : 0;
  };
  const EFFECTS = {};
  function effects(dex) {
    if (EFFECTS[dex]) return EFFECTS[dex];
    const passive = BY_DEX[dex];
    if (!passive) return {};
    const text = passive.description.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/(\d)\.(\d)/g, '$1,$2');
    const fraction = (re) => number(text, re) / 100;
    const result = {
      damage: 1 + fraction(/(?:dano de (?:todos )?sus ataques|dano infligido|su dano) un (\d+(?:[.,]\d+)?)%/i),
      attackSpeed: 1 + fraction(/velocidad de ataque (?:y (?:la )?velocidad de movimiento )?un (\d+(?:[.,]\d+)?)%/i),
      fireRate: 1 + fraction(/velocidad de disparo (?:y (?:de )?movimiento )?un (\d+(?:[.,]\d+)?)%/i),
      moveSpeed: 1 + fraction(/(?:velocidad de movimiento|velocidad de disparo y de movimiento|velocidad de ataque y de movimiento) un (\d+(?:[.,]\d+)?)%/i),
      area: 1 + fraction(/(?:area de efecto|area) de (?:todos )?sus ataques un (\d+(?:[.,]\d+)?)%/i),
      reduction: Math.max(
        fraction(/reduce todo el dano recibido un (\d+(?:[.,]\d+)?)%/i),
        fraction(/reduccion de dano recibido un (\d+(?:[.,]\d+)?)%/i)
      ),
      physicalReduction: fraction(/reduce todo el dano fisico recibido un (\d+(?:[.,]\d+)?)%/i),
      reductionThreshold: fraction(/reduce todo el dano recibido un \d+(?:[.,]\d+)?% mientras su vida (?:esta|este|se mantenga) por encima del (\d+(?:[.,]\d+)?)%/i),
      maxHp: 1 + fraction(/vida maxima un (\d+(?:[.,]\d+)?)%/i),
      critChance: fraction(/probabilidad de golpe critico un (\d+(?:[.,]\d+)?)%/i),
      critDamage: fraction(/(?:dano critico|dano de (?:los )?golpes criticos|dano de golpe critico) un (\d+(?:[.,]\d+)?)%/i),
      experience: 1 + fraction(/ganancia de experiencia un (\d+(?:[.,]\d+)?)%/i),
      coins: 1 + fraction(/ganancia de oro y experiencia un (\d+(?:[.,]\d+)?)%/i),
      magnet: 1 + fraction(/rango de recoleccion(?: de recursos)? un (\d+(?:[.,]\d+)?)%/i),
      dodgeChance: fraction(/probabilidad de esquivar(?: ataques)? un (\d+(?:[.,]\d+)?)%/i),
      levelHeal: fraction(/al subir de nivel,? recupera un (\d+(?:[.,]\d+)?)%/i),
      regen: fraction(/recupera un (\d+(?:[.,]\d+)?)% de (?:su )?vida maxima cada (\d+(?:[.,]\d+)?) segundos/i),
      regenInterval: number(text, /recupera un \d+(?:[.,]\d+)?% de (?:su )?vida maxima cada (\d+(?:[.,]\d+)?) segundos/i),
      onHit: null,
      fireDamage: 1 + fraction(/dano de sus ataques de fuego un (\d+(?:[.,]\d+)?)%/i),
      lowHpThreshold: fraction(/(?:salud|vida) cae por debajo del (\d+(?:[.,]\d+)?)%/i),
      lowHpBonus: fraction(/ataques de fuego aumentan un (\d+(?:[.,]\d+)?)%/i),
      lowHpRecovery: fraction(/pierde efecto cuando se recupera mas del (\d+(?:[.,]\d+)?)%/i),
      highHpThreshold: fraction(/enemigos[^.]*?que tengan mas del (\d+(?:[.,]\d+)?)% de su vida/i),
      highHpBonus: fraction(/(?:inflige|infligen) un (\d+(?:[.,]\d+)?)% (?:mas de dano a enemigos|de dano adicional contra enemigos)/i),
      poisonedBonus: Math.max(
        fraction(/inflige[n]? un (\d+(?:[.,]\d+)?)% de dano adicional a objetivos envenenados/i),
        fraction(/dano adicional contra objetivos envenenados un (\d+(?:[.,]\d+)?)%/i)
      ),
      statusBonus: fraction(/(?:inflige[n]? un (\d+(?:[.,]\d+)?)% de dano adicional[^.]*?(?:aturdidos|ralentizados|adormecidos|alteraciones de estado))/i),
      slowTargetBonus: fraction(/enemigos ralentizados reciben un (\d+(?:[.,]\d+)?)% mas de dano/i),
      onHitHealChance: fraction(/ataques tienen un (\d+(?:[.,]\d+)?)% de probabilidad de recuperar un \d+(?:[.,]\d+)?% de (?:su )?vida maxima al infligir dano/i),
      onHitHeal: fraction(/ataques tienen un \d+(?:[.,]\d+)?% de probabilidad de recuperar un (\d+(?:[.,]\d+)?)% de (?:su )?vida maxima al infligir dano/i),
      lifeStealChance: fraction(/ataques tienen un (\d+(?:[.,]\d+)?)% de probabilidad de recuperar un \d+(?:[.,]\d+)?% del dano infligido como vida/i),
      lifeStealRate: fraction(/ataques tienen un \d+(?:[.,]\d+)?% de probabilidad de recuperar un (\d+(?:[.,]\d+)?)% del dano infligido como vida/i),
      critLifeSteal: fraction(/golpes criticos recuperan un (\d+(?:[.,]\d+)?)% del dano infligido como vida/i),
      statusHitHeal: fraction(/recupera un (\d+(?:[.,]\d+)?)% de su vida maxima al golpear a un enemigo (?:adormecido|paralizado)/i),
      thresholdShield: fraction(/vida al (\d+(?:[.,]\d+)?)% genera un escudo/i),
      thresholdShieldRate: fraction(/genera un escudo (?:de agua )?del (\d+(?:[.,]\d+)?)%/i),
      thresholdShieldDuration: number(text, /genera un escudo[^.]*?durante (\d+(?:[.,]\d+)?) segundos/i),
      lethalShieldDuration: number(text, /escudo[^.]*?durante (\d+(?:[.,]\d+)?) segundos/i),
      reflectRate: fraction(/refleja un (\d+(?:[.,]\d+)?)% del dano sufrido/i),
      poisonReflectRate: fraction(/devuelve un (\d+(?:[.,]\d+)?)% del impacto como dano de veneno/i),
      lethalHeal: fraction(/(?:(?:golpe|dano) letal[^.]*?(?:regenera|regenerando|recuperando)|ignora el dano y regenera) (?:el |un )?(\d+(?:[.,]\d+)?)%/i),
      lethalShield: fraction(/sobrevive con 1 de vida y genera un escudo del (\d+(?:[.,]\d+)?)%/i),
      lethalCooldown: number(text, /cooldown de (\d+(?:[.,]\d+)?) segundos/i)
    };
    if (result.lowHpThreshold && /(?:salud|vida) cae por debajo del \d+(?:[.,]\d+)?%[^.]*genera un escudo/.test(text))
      result.thresholdShield = result.lowHpThreshold;
    if (dex === 1) Object.assign(result, { regen: 0.01, regenInterval: 5 });
    if (dex === 2) Object.assign(result, { regen: 0.015, regenInterval: 5, levelHeal: 0.02 });
    if (dex === 3) Object.assign(result, { regen: 0.02, regenInterval: 5, levelHeal: 0.03, shieldEvery: 20, shieldRate: 0.04, bossHeal: 0.1 });
    if (/al no recibir dano durante/.test(text) && /velocidad de movimiento un/.test(text) && /maximo de/.test(text))
      result.moveSpeed = 1;
    result.critChance = clamp01(result.critChance);
    if (dex === 1) result.levelHeal = 0;
    if (dex === 4) result.lowHpThreshold = 0.25, result.lowHpBonus = 0.5;
    if (dex === 5) result.lowHpThreshold = 0.3, result.lowHpBonus = 0.6;
    if (dex === 6) result.lowHpThreshold = 0.3, result.lowHpBonus = 0.75;
    const statusTexts = text.match(/[^.]*sus ataques[^.]*|[^.]*sus golpes criticos[^.]*/g) || [];
    const onHitEffects = [];
    for (const snippet of statusTexts) {
      const criticalOnly = /sus golpes criticos/.test(snippet) && !/sus ataques/.test(snippet);
      const randomStatus = /alteracion de estado aleatoria/.test(snippet);
      if (randomStatus) {
        onHitEffects.push({ key: 'random', chance: number(snippet, /(\d+(?:[.,]\d+)?)% de probabilidad/) / 100, duration: 3, randomStatus });
        continue;
      }
      const chanceFor = verbs => number(snippet, new RegExp(`(\\d+(?:[.,]\\d+)?)% de probabilidad de (?:${verbs})`)) / 100;
      const duration = number(snippet, /durante (\d+(?:[.,]\d+)?) segundos/);
      const slowChance = chanceFor('reducir|ralentizar|frenar');
      const slowStrength = number(snippet, /(?:velocidad de movimiento(?: de los enemigos)?|velocidad enemiga|ralentizan a los enemigos|ralentizar a los enemigos) un (\d+(?:[.,]\d+)?)%/) / 100;
      if (/ralentiz|reducen[^.]*velocidad/.test(snippet)) {
        onHitEffects.push({
          key: 'slow', chance: slowChance || 1, strength: slowStrength || 0.3,
          duration: duration || 1.2, criticalOnly
        });
      }
      const statuses = [
        ['poison', /envenen|dano por veneno/, 'envenenar|infligir dano por veneno|aplicar veneno', 3],
        ['burn', /quemar|quemadura/, 'quemar|aplicar quemadura', 3],
        ['stun', /congel|paraliz|aturd|inmoviliz|dormir|adormec/, 'congelar|paralizar|aturdir|inmovilizar|dormir|adormecer', 1],
        ['fear', /aterroriz|huir/, 'aterrorizar|hacer que huyan', 1.5],
        ['charm', /confundir|confusion/, 'confundir', 2]
      ];
      for (const [key, match, verbs, defaultDuration] of statuses) {
        const chance = chanceFor(verbs);
        const guaranteed = /(?:sus ataques aplican|sus ataques causan|gana la habilidad de) [^.]*?(?:quemadura|veneno)/.test(snippet);
        if (!match.test(snippet) || (!chance && !guaranteed && !criticalOnly)) continue;
        onHitEffects.push({
          key, chance: guaranteed || (criticalOnly && !chance) ? 1 : chance,
          duration: duration || defaultDuration, criticalOnly
        });
      }
    }
    if (onHitEffects.length) {
      result.onHitEffects = onHitEffects;
      result.onHit = onHitEffects[0];
    }
    EFFECTS[dex] = result;
    return result;
  }
  const TYPE_BONUSES = Object.freeze({
    fire: { name: 'Fuerza Térmica', damage: 0.15, area: 0.10 },
    water: { name: 'Fluidez Hydro', cooldown: 0.10, moveSpeed: 0.10 },
    grass: { name: 'Simbiosis Nutritiva', healing: 0.20, maxHp: 0.10 },
    electric: { name: 'Sobrecarga Dinámica', projectileSpeed: 0.20, attackSpeed: 0.12 },
    poison: { name: 'Corrosión', enemyHealingReduction: 0.15, magnet: 0.20 },
    flying: { name: 'Aerodinámica', moveSpeed: 0.15, dodge: 0.06 },
    normal: { name: 'Adaptabilidad', experience: 0.15, coins: 0.15 },
    ground: { name: 'Firmeza Tectónica', reduction: 0.10, enemySlowAura: 0.10 },
    bug: { name: 'Instinto de Enjambre', attackSpeed: 0.12, moveSpeed: 0.15 },
    rock: { name: 'Estructura Mineral', maxHp: 0.15, reduction: 0.35 },
    fighting: { name: 'Impacto Certero', critChance: 0.10, critDamage: 0.15 },
    psychic: { name: 'Enfoque Mental', damage: 0.15, ignorePhysical: 0.15 },
    fairy: { name: 'Aura Mística', shield: 0.08 },
    ghost: { name: 'Incorporeidad', phase: true, dodge: 0.08 },
    steel: { name: 'Temple de Hierro', reduction: 0.12, projectileReduction: 0.20 },
    ice: { name: 'Cero Absoluto', statusDamage: 0.15 },
    dragon: { name: 'Furia Ascendente', damagePer100: 0.01 },
    dark: { name: 'Oportunismo', lowHpDamage: 0.12, lifeSteal: 0.03 }
  });

  function typeEffects(types) {
    const unique = [...new Set(types || [])];
    const weight = unique.length > 1 ? 0.5 : 1;
    const result = {
      damage: 1, area: 1, cooldown: 1, moveSpeed: 1, healing: 1, maxHp: 1,
      projectileSpeed: 1, attackSpeed: 1, enemyHealingReduction: 0, magnet: 1,
      dodge: 0, experience: 1, coins: 1, reduction: 0, enemySlowAura: 0,
      critChance: 0, critDamage: 0, ignorePhysical: 0, shield: 0, phase: false,
      projectileReduction: 0, statusDamage: 0, damagePer100: 0, lowHpDamage: 0,
      lifeSteal: 0, names: [], weight
    };
    for (const type of unique) {
      const bonus = TYPE_BONUSES[type];
      if (!bonus) continue;
      result.names.push(bonus.name);
      result.damage += (bonus.damage || 0) * weight;
      result.area += (bonus.area || 0) * weight;
      result.cooldown -= (bonus.cooldown || 0) * weight;
      result.moveSpeed += (bonus.moveSpeed || 0) * weight;
      result.healing += (bonus.healing || 0) * weight;
      result.maxHp += (bonus.maxHp || 0) * weight;
      result.projectileSpeed += (bonus.projectileSpeed || 0) * weight;
      result.attackSpeed += (bonus.attackSpeed || 0) * weight;
      result.enemyHealingReduction += (bonus.enemyHealingReduction || 0) * weight;
      result.magnet += (bonus.magnet || 0) * weight;
      result.dodge += (bonus.dodge || 0) * weight;
      result.experience += (bonus.experience || 0) * weight;
      result.coins += (bonus.coins || 0) * weight;
      result.reduction += (bonus.reduction || 0) * weight;
      result.enemySlowAura += (bonus.enemySlowAura || 0) * weight;
      result.critChance += (bonus.critChance || 0) * weight;
      result.critDamage += (bonus.critDamage || 0) * weight;
      result.ignorePhysical += (bonus.ignorePhysical || 0) * weight;
      result.shield += (bonus.shield || 0) * weight;
      result.phase ||= !!bonus.phase;
      result.projectileReduction += (bonus.projectileReduction || 0) * weight;
      result.statusDamage += (bonus.statusDamage || 0) * weight;
      result.damagePer100 += (bonus.damagePer100 || 0) * weight;
      result.lowHpDamage += (bonus.lowHpDamage || 0) * weight;
      result.lifeSteal += (bonus.lifeSteal || 0) * weight;
    }
    result.cooldown = Math.max(0.1, result.cooldown);
    return result;
  }

  function typeBonus(types) {
    return typeEffects(types).weight;
  }

  function typeDescription(types) {
    const unique = [...new Set(types || [])];
    const weight = unique.length > 1 ? 0.5 : 1;
    const pct = value => `${Math.round(value * weight * 1000) / 10}%`;
    return unique.map(type => {
      const bonus = TYPE_BONUSES[type];
      if (!bonus) return null;
      const details = [];
      if (bonus.damage) details.push(`+${pct(bonus.damage)} daño`);
      if (bonus.area) details.push(`+${pct(bonus.area)} área`);
      if (bonus.cooldown) details.push(`-${pct(bonus.cooldown)} recarga`);
      if (bonus.moveSpeed) details.push(`+${pct(bonus.moveSpeed)} velocidad`);
      if (bonus.healing) details.push(`+${pct(bonus.healing)} curación`);
      if (bonus.maxHp) details.push(`+${pct(bonus.maxHp)} vida máxima`);
      if (bonus.projectileSpeed) details.push(`+${pct(bonus.projectileSpeed)} velocidad de proyectil`);
      if (bonus.attackSpeed) details.push(`+${pct(bonus.attackSpeed)} velocidad de ataque`);
      if (bonus.enemyHealingReduction) details.push(`-${pct(bonus.enemyHealingReduction)} curación enemiga`);
      if (bonus.magnet) details.push(`+${pct(bonus.magnet)} rango de recolección`);
      if (bonus.dodge) details.push(`${pct(bonus.dodge)} de probabilidad de esquivar`);
      if (bonus.experience) details.push(`+${pct(bonus.experience)} experiencia`);
      if (bonus.coins) details.push(`+${pct(bonus.coins)} oro`);
      if (bonus.reduction) details.push(`-${pct(bonus.reduction)} daño recibido`);
      if (bonus.enemySlowAura) details.push(`${pct(bonus.enemySlowAura)} de ralentización cercana`);
      if (bonus.critChance) details.push(`+${pct(bonus.critChance)} crítico`);
      if (bonus.critDamage) details.push(`+${pct(bonus.critDamage)} daño crítico`);
      if (bonus.ignorePhysical) details.push(`${pct(bonus.ignorePhysical)} de probabilidad de ignorar daño físico`);
      if (bonus.shield) details.push(`escudo de ${pct(bonus.shield)} de vida máxima que se regenera tras 8 s`);
      if (bonus.phase) details.push('atraviesa colisiones');
      if (bonus.projectileReduction) details.push(`-${pct(bonus.projectileReduction)} daño de proyectiles`);
      if (bonus.statusDamage) details.push(`+${pct(bonus.statusDamage)} daño a enemigos alterados`);
      if (bonus.damagePer100) details.push(`+${pct(bonus.damagePer100)} daño por cada 100 bajas`);
      if (bonus.lowHpDamage) details.push(`+${pct(bonus.lowHpDamage)} daño a enemigos bajo 40% de vida`);
      if (bonus.lifeSteal) details.push(`${pct(bonus.lifeSteal)} de robo de vida`);
      return `${bonus.name} (${Math.round(weight * 100)}%): ${details.join(', ')}`;
    }).filter(Boolean).join(' · ');
  }

  return { BY_DEX, TYPE_BONUSES, get(dex) { return BY_DEX[dex] || null; }, effects, typeBonus, typeEffects, typeDescription };
})();
