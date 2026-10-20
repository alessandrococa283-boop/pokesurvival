# PokéSurvival — instrucciones del proyecto

## Fuentes y publicación

- Edita `dev.html` y los archivos fuente de `js/`; `index.html` se genera.
- Antes de publicar, ejecuta en este orden:
  `node tools/build.js`, `node tools/export_data.js`,
  `python tools/make_seo_pages.py`.
- `build.js` debe seguir generando `js/app.min.js` y `version.json`.
- No quites `js/core/updater.js`: revisa `version.json` cada cinco minutos y
  actualiza a los jugadores sin perder la partida ni el guardado pendiente.
- Los cambios de juego y arreglos van en `js/data/changelog.js`, en español e
  inglés y con la fecha actual. Los cambios de hosting, base de datos o costes
  no van en el changelog.

## Servicios

- Repositorio: `https://github.com/alessandrococa283-boop/pokesurvival`.
- Sitio: `https://proyecto-pokemon2.web.app/`.
- Firebase: proyecto independiente `proyecto-pokemon2`. Usa el plan gratuito;
  no habilites Identity Platform ni servicios de pago.
- Para publicar el sitio, despliega **sólo** `hosting`; no uses un despliegue
  Firebase general que también publique reglas o índices sin revisarlos.
- Nunca subas contraseñas, tokens, claves privadas ni archivos de service
  account. `firebase-config.js` contiene configuración web pública.

## Atribución

PokéSurvival es un proyecto fan derivado e inspirado en PokéSurvivor. Conserva
el aviso obligatorio de copyright, las licencias y los créditos de terceros.
No presentes el juego como oficial ni como obra sin relación con su proyecto
de origen.
