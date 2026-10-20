# SEO de PokéSurvival

La publicación web es <https://proyecto-pokemon2.web.app/>. Las páginas
descriptivas en español e inglés, metadatos, sitemap y `robots.txt` se generan
a partir de `dev.html` y los datos del juego.

Para regenerar las páginas:

```powershell
node tools/export_data.js
python tools/make_seo_pages.py
```

Los resultados incluyen la guía, la Pokédex, tipos, ataques por rareza,
logros, novedades, un 404, `robots.txt` y `sitemap.xml`. El dominio `web.app`
es de Firebase Hosting; no añadas registros DNS de Cloudflare para él.

Si se conecta un dominio propio en el futuro, sigue primero la verificación y
los registros DNS que Firebase muestre en Hosting. Después actualiza `SITE` en
`tools/make_seo_pages.py` y los metadatos canónicos de `dev.html`, regenera y
despliega.

PokéSurvival es un proyecto fan no oficial inspirado en PokéSurvivor. Conserva
los avisos de licencia y atribución del proyecto de origen y de los autores de
recursos; no lo presentes como un juego oficial de Pokémon.
