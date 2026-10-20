# PokéSurvival

PokéSurvival es un proyecto fan no oficial de supervivencia para navegador,
inspirado en PokéSurvivor. Es un proyecto derivado e independiente para seguir
desarrollando y publicar mejoras en su propio repositorio.

El juego se ejecuta en el navegador con HTML, CSS, JavaScript y Canvas 2D. Incluye
combate automático, mejoras al subir de nivel, Pokémon de las nueve regiones,
partidas individuales y cooperativas, y español e inglés.

## Ejecutar en local

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
python -m http.server 8080
```

Abre <http://127.0.0.1:8080/>. Para iniciar sesión y guardar en la nube, Firebase
debe estar configurado y el dominio local autorizado en Authentication.

## Regenerar la publicación

Requisitos: Node.js y Python 3. Desde la raíz del proyecto:

```powershell
node tools/build.js
node tools/export_data.js
python tools/make_seo_pages.py
```

`dev.html` y los archivos de `js/` son la fuente. `index.html`, `js/app.min.js`,
`version.json` y las páginas SEO se generan; no edites los generados a mano.

## Publicar

El código se guarda en GitHub y el sitio se sirve desde Firebase Hosting en
<https://proyecto-pokemon2.web.app/>. Sigue [docs/PUBLICAR.md](docs/PUBLICAR.md)
para compilar, subir los cambios y desplegar únicamente Hosting.

## Atribución, licencias y marcas

Este repositorio es un derivado de
[PokéSurvivor](https://github.com/JPTER78/pokesurvivor), de JPTER78. El aviso
obligatorio del titular original y la licencia PolyForm Noncommercial 1.0.0 se
conservan en [LICENSE](LICENSE) y [LICENSE-NONCOMMERCIAL.md](LICENSE-NONCOMMERCIAL.md).
El código derivado no se puede usar con fines comerciales.

Los sprites de SpriteCollab requieren atribución y uso no comercial (CC BY-NC
4.0); sus autores están enumerados en [CREDITS.md](CREDITS.md). La fuente
Pixelify Sans usa SIL Open Font License 1.1. Los datos de Pokédex proceden de
PokeAPI.

Pokémon y los nombres, personajes y marcas relacionados pertenecen a sus
respectivos titulares. PokéSurvival no está afiliado, patrocinado ni aprobado
por Nintendo, Creatures Inc., GAME FREAK ni The Pokémon Company.
