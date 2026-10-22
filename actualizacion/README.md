# Parche: colección de cartas Pokémon

Este directorio reúne los archivos para portar la colección de cartas a otra copia del juego. Está preparado para versiones que conservan la arquitectura de esta edición: JavaScript clásico con `G`, `G.DEX`/`G.DEX_BY`, `G.DB.save`, `G.UI`, un `dev.html` que lista los scripts y un `tools/build.js` que genera el bundle.

## Contenido

- `js/cards/card-system.js`: lógica, configuración, catálogo, apertura, progreso, desbloqueo y UI.
- `js/cards/card-system.test.js`: pruebas deterministas para correr desde la raíz del juego después de copiar el módulo.
- `assets/cards/base-set/`: las 69 cartas Base Set originales, con nombres intactos.
- `assets/cards/packs/`: tres recortes de la imagen de referencia adjunta (Blastoise, Charizard y Venusaur).
- `css/coleccion-cartas.css`: estilos para añadir a la hoja de estilo existente.
- `patches/integracion-cartas.patch`: cambios mínimos a los archivos existentes del juego.
- `docs/CARD_COLLECTION.md`: detalles de configuración, guardado y asociaciones.

No se incluyen `index.html`, `js/app.min.js` ni `public/`: son salidas generadas y deben reconstruirse en el juego de destino.

## Aplicación

1. Haz una copia de seguridad o crea una rama en la otra versión.
2. Desde la raíz de esa versión, copia `actualizacion/js/cards/card-system.js` a `js/cards/`, las carpetas `actualizacion/assets/cards/` a `assets/cards/`, y `actualizacion/css/coleccion-cartas.css` a un lugar temporal.
3. Comprueba que los archivos base del destino corresponden a la arquitectura indicada. Ejecuta `git apply --check actualizacion/patches/integracion-cartas.patch`; si no hay conflictos, ejecuta `git apply actualizacion/patches/integracion-cartas.patch`.
4. Añade `coleccion-cartas.css` al final de `css/style.css` (o impórtalo desde la hoja usada por `dev.html`).
5. Ejecuta `node js/cards/card-system.test.js` desde la raíz del juego.
6. Regenera el juego con `node tools/build.js`, y prepara Hosting con `node tools/prepare_hosting.js` si esa versión utiliza `public/`.

El parche integra la pantalla en `dev.html`, registra el módulo después de los sistemas de datos/UI, añade el nuevo screen al router, lo inicializa en el arranque y migra/fusiona `cardCollection` en `G.DB`. También agrega la entrada de changelog y el arreglo de comillas de rutas para que el build de Windows funcione en carpetas con espacios.

## Ajustes de versión

Si el destino ya reorganizó el menú, el arreglo de pantallas o el arranque, conserva sus cambios y aplica solo las líneas `cards` equivalentes. Si cambió el esquema de Pokédex, revisa la asociación por `G.DEX` en `card-system.js`; el ID interno esperado es el número `dex` actual. Si cambió su guardado, adapta `cardCollection`, `coins`, `tickets.t1` y `owned[dex]` al adaptador local sin reemplazar esos sistemas.
