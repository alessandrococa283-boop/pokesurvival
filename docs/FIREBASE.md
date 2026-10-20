# Firebase para PokéSurvival

PokéSurvival usa el proyecto independiente `proyecto-pokemon2`. La configuración
web de cliente está en `js/core/firebase-config.js`; es pública por diseño y no
debe confundirse con credenciales privadas.

## Servicios necesarios

En Firebase Console, dentro de `proyecto-pokemon2`:

1. En **Authentication → Sign-in method**, habilita los proveedores que vas a
   ofrecer en el juego: correo/contraseña y Google.
2. En **Authentication → Settings → Authorized domains**, añade:
   `proyecto-pokemon2.web.app`. Para pruebas locales añade `localhost` y
   `127.0.0.1` si Firebase Console lo permite.
3. Crea Firestore en modo de producción y revisa sus reglas antes de publicar.
4. Crea Realtime Database en la región elegida para el proyecto. Este proyecto
   espera la dirección `https://proyecto-pokemon2-default-rtdb.firebaseio.com`.
   Revisa `database.rules.json` antes de desplegar sus reglas.
5. En **Project settings → Your apps**, registra la app web y compara sus datos
   con `js/core/firebase-config.js`.

No habilites Identity Platform, MFA de pago ni funciones de pago. Mantén el
proyecto en el plan gratuito y no añadas servicios de facturación.

## Restricciones de la API key web

Si la API key tiene restricciones de referente HTTP, autoriza estos orígenes en
Google Cloud Console:

- `https://proyecto-pokemon2.web.app/*`
- `http://127.0.0.1:8080/*`
- `http://localhost:8080/*`

Configura Authentication y las restricciones de API key en el mismo proyecto.
No publiques claves privadas ni archivos JSON de service account; el juego no
los necesita.

## Publicar reglas con cuidado

El `firebase.json` de la raíz del repositorio configura Hosting para publicar
`public/`. Desplegar reglas de Firestore o Realtime Database es independiente
de Hosting. Sólo después de revisar las reglas y confirmar que las bases de
datos ya existen, usa desde la raíz del repositorio:

```powershell
npx firebase-tools deploy --only firestore,database --project proyecto-pokemon2
```

Para publicar únicamente la web, usa el comando indicado en
[PUBLICAR.md](PUBLICAR.md): `--only hosting`.
