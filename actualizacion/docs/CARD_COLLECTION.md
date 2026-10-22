# Colección de cartas Base Set

La pantalla se abre desde **Menú → Cartas**. Se usa el guardado de partida `G.DB`: monedas (`coins`), tickets normales (`tickets.t1`) y personajes (`owned[dex]`). Cuando se completa una carta, el Pokémon recibe `owned[dex]` con origen `card-fragments`, que es el registro consultado por el selector de compañeros. El progreso versionado persiste en `cardCollection` y se fusiona entre guardado local y nube; los fragmentos entre dispositivos se fusionan conservando el máximo conocido, para evitar duplicar progreso durante sincronizaciones repetidas.

## Configuración

Edita `js/cards/card-system.js`, objeto `CONFIG`:

- `pack.cost`, `pack.rewards`: coste y cantidad de recompensas.
- `rarityRates`: toma inicialmente las cinco probabilidades de `G.Acquisition.gacha.rates` (65/23/9/2.5/0.5 %); no hay tabla duplicada.
- `fragmentsByRarity`: entrega provisional de 1/2/3/5/10 fragmentos por rareza 1–5.
- `fragmentsRequiredByRarity`: requisitos solicitados: común 3, poco común 4, rara 5, épica 3 y legendaria 2; pueden editarse por rareza y sobrescribirse por carta en el catálogo.
- `duplicateCoinsByRarity`: reutiliza `G.Acquisition.gacha.duplicateRefund` (15/30/60/120/300 monedas).

La entrega de fragmentos por tirada no existía en los datos previos del juego; sus valores iniciales 1/2/3/5/10 son provisionales de balance e independientes de los requisitos solicitados.

## Imágenes y cartas

Se conservan las 69 imágenes suministradas bajo `assets/cards/base-set/`, con sus nombres intactos. `fileNames` en `card-system.js` es el manifiesto de rutas y la asociación automática normaliza nombre/acentos y resuelve por el ID Pokédex de `G.DEX`. Nidoran♂ se asocia explícitamente con el ID nacional 32 por la forma de su nombre en el archivo. Las cartas cuyo Pokémon no exista en `G.DEX` aparecen en `G.CardSystem.unmatched`; deben añadirse al manifiesto con un alias explícito tras confirmar el personaje correcto. Imágenes duplicadas: no se detectaron nombres duplicados en la carpeta proporcionada.

Los tres diseños de sobre se recortaron de la imagen de referencia adjunta y están en `assets/cards/packs/`. Se pueden seleccionar en la pantalla del sobre; los tres conservan el mismo coste, tabla de probabilidades y catálogo.

Las cartas de Pokémon marcados como legendarios (`mon.leg`) no se incluyen en este sobre, que es el Set clásico. Si se agrega una carta, coloca el archivo real en `assets/cards/base-set/`, añade su nombre a `fileNames`, y configura `fragmentsRequired`, `enabled`, `availableInPacks` o `weight` en el registro generado del catálogo.

Las imágenes descubiertas se revelan gradualmente desde abajo: el porcentaje coloreado coincide con los fragmentos obtenidos respecto al requisito. Las cartas sin fragmentos permanecen en sombra. Tener el Pokémon por una fuente externa lo deja disponible para jugar, pero no marca la carta como descubierta; el descubrimiento sólo se guarda al ganar fragmentos de esa carta.

## Seguridad y respaldo

La selección usa `Math.random` inyectable (`G.CardSystem.open({rng, operationId})`) para resultados reproducibles. La apertura tiene exclusión de doble clic, ID idempotente, validación previa de saldo/configuración, cálculo previo del resultado y commit del guardado existente. Si una rareza no tiene candidatos, su peso se reasigna para mostrar la probabilidad efectiva; la tirada cae en la rareza disponible más cercana (empate: la menor) y selecciona carta dentro de ella. Si no queda ninguna carta elegible, se cancela antes de cobrar.

El juego actual ejecuta el gacha y el guardado desde el cliente; las reglas de Firestore validan la forma del guardado pero no ejecutan tiradas. Por ello, igual que los sistemas existentes, este sobre no es resistente a manipulación del cliente/localStorage. Para economía competitiva o compras reales, las tiradas y cobros requerirían una función de servidor.
