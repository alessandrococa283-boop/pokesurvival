# Dirección web de PokéSurvival

La primera dirección del juego es el subdominio gratuito que Firebase asigna al
proyecto:

<https://proyecto-pokemon2.web.app/>

Es una dirección de Firebase Hosting, no un dominio propio comprado. No
reutiliza `pokesurvivor.com`, el DNS ni el hosting del proyecto original y no
necesita registros en Cloudflare.

## Si quieres conectar un dominio propio más adelante

1. En Firebase Console, abre **Hosting → Add custom domain**.
2. Introduce el dominio que hayas comprado y sigue la verificación que muestra
   Firebase.
3. Añade en el proveedor DNS únicamente los registros que indique Firebase y
   espera a que aparezca el certificado HTTPS.
4. Actualiza `SITE` en `tools/make_seo_pages.py`, el canonical de `dev.html` y
   la dirección de publicación de esta guía; luego vuelve a generar y desplegar.

No cambies los DNS del sitio original ni actives Workers o servicios de pago.
