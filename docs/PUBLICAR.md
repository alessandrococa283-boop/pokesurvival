# Publicar PokéSurvival

GitHub guarda el código fuente; Firebase Hosting sirve el sitio en
<https://proyecto-pokemon2.web.app/>. El dominio `web.app` lo proporciona
Firebase y no requiere comprar un dominio ni configurar DNS.

La configuración de Hosting está en `firebase.json`, en la raíz del
repositorio, y publica el contenido de `public/`. Los archivos fuente y las
herramientas del juego también están dentro de `public/`.

## Requisitos

- Node.js y Python 3 instalados.
- Git instalado y autenticado con la cuenta propietaria del repositorio.
- Acceso de despliegue al proyecto Firebase `proyecto-pokemon2`.
- Repositorio público vacío: `https://github.com/alessandrococa283-boop/pokesurvival`.

## Preparar y subir cambios a GitHub

Desde PowerShell, en la raíz del repositorio:

```powershell
Set-Location .\public
node .\tools\build.js
node .\tools\export_data.js
python .\tools\make_seo_pages.py
Set-Location ..
git status
git add -A
git commit -m "Describe los cambios"
git push -u origin main
```

Revisa `git status` antes de añadir archivos: no subas contraseñas, tokens,
claves privadas, credenciales de service account ni la lista privada de
contactos. El archivo `.gitignore` excluye las cachés locales y los contactos
privados.

Si aún no hay un repositorio Git local, inicialízalo y añade el remoto una sola
vez:

```powershell
git init -b main
git remote add origin https://github.com/alessandrococa283-boop/pokesurvival.git
```

## Desplegar en Firebase Hosting

Instala la CLI de Firebase si hace falta e inicia sesión:

```powershell
npx firebase-tools login
```

Después de compilar y revisar los cambios, publica **sólo Hosting**:

```powershell
npx firebase-tools deploy --only hosting --project proyecto-pokemon2
```

Ejecuta el comando desde la raíz del repositorio, donde está `firebase.json`.
La carpeta publicada es `public/`. La URL asignada por Firebase es
<https://proyecto-pokemon2.web.app/>.

**No ejecutes `firebase deploy` sin `--only hosting`**: también podría
desplegar reglas de bases de datos e índices. Para modificar reglas, revisa
primero `public/firestore.rules` y `public/database.rules.json`, y despliega
esos servicios por separado.

## Comprobación posterior

1. Abre `https://proyecto-pokemon2.web.app/` y prueba una partida.
2. Comprueba `https://proyecto-pokemon2.web.app/version.json`; debe contener la
   huella generada por `tools/build.js`.
3. En Firebase Authentication, autoriza `proyecto-pokemon2.web.app`.
4. Revisa los registros de Hosting en Firebase Console si la publicación falla.
