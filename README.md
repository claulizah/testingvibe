# testingvibe.com

Landing estática + blog (HTML/CSS/JS sin dependencias). Hosting: GitHub Pages con dominio propio.

> ## Enlaces de pago
> Los Payment Links de `js/links.js` son los **reales** (modo real). Cada enlace debe cobrar el precio que muestra la página (el de lanzamiento en Completa y Acompañamiento, sin códigos promocionales ni `prefilled_promo_code`); el precio de lanzamiento de la Completa (primeros 3 clientes, a cambio de un testimonio) ya es el del enlace y no se publica ningún código de descuento. Los de Checklist y Revisión para negocios están guardados pero **no se muestran** en el sitio todavía.

## Previsualizar

```bash
python -m http.server 8080      # o: npx serve .
# abre http://localhost:8080  (EN: http://localhost:8080/?lang=en)
```

Las rutas son absolutas (`/css/...`): sirve la carpeta desde la raíz; abrir el archivo con doble clic no funciona.

## Dónde cambiar qué

| Archivo | Contiene |
|---|---|
| `js/links.js` | Stripe Payment Links, Tally, Calendly |
| `js/config.js` | Flags (`SHOW_TESTIMONIALS`, `SHOW_CHECKLIST`, `SHOW_SAMPLE_REPORT`, `SHOW_SEAL`, `SHOW_BLOG`, todos `false`), `CF_ANALYTICS_TOKEN`, ruta del PDF de muestra |
| `js/i18n.js` | Traducciones EN (el ES vive en el HTML) |
| `data/reports.json` | Reportes verificables en `/verificar.html` |

### Verificación de reportes
Agrega un registro por reporte entregado, **solo con consentimiento del cliente** y sin datos sensibles:

```json
{ "reports": [ { "id": "TV-20261015-ABCD", "date": "2026-10-15", "package": "Revisión Express", "verdict": "Con condiciones" } ] }
```

## Borradores en una rama aparte

El **blog** (fuentes y salida generada) y la página de **Términos** (con sus textos EN) no están en el sitio publicado: viven en la rama local `borradores-privados` (carpeta `_borradores/`, más un `LEEME-BORRADORES.md`). El enlace «Blog» del menú está comentado en `index.html` y el de «Términos» ya no está en el pie.

> **Esa rama no debe subirse con `git push`** si quieres que siga fuera del público: el repo es público y cualquier rama subida se puede leer. (Los archivos originales del blog y de Términos ya están en el historial de `main`.)

**Trabajar con los borradores sin tocar esta rama:**
```bash
git worktree add ../testingvibe-borradores borradores-privados
node scripts/build-blog.mjs --desde=../testingvibe-borradores/_borradores   # regenera el blog de borradores
```
(`scripts/check.mjs` ignora las carpetas que empiezan con `_`.)

**Volver a publicar el blog:** copiar los artículos reales de `_borradores/blog-fuentes/` a `content/blog/`, correr `node scripts/build-blog.mjs --publicar` (genera `blog/`), restaurar el enlace del menú en `index.html`, poner `SHOW_BLOG` en `true`, quitar el `noindex` del script, el `Disallow: /blog/` de `robots.txt` y añadir las URLs a `sitemap.xml`.

**Volver a publicar los Términos:** copiar `_borradores/terminos.html` a la raíz, pegar sus textos EN de `_borradores/terminos-en.txt` en `js/i18n.js`, enlazarla en el pie de `index.html` y reemplazar el texto pendiente por el texto legal real.

## Verificación de reportes
Agrega un registro por reporte entregado, **solo con consentimiento del cliente** y sin datos sensibles:

```json
{ "reports": [ { "id": "TV-20261015-ABCD", "date": "2026-10-15", "package": "Revisión Express", "verdict": "Con condiciones" } ] }
```

## Fuera de la publicación: _borradores/

La carpeta `_borradores/` guarda, **sin enlazar y sin indexar**, lo que todavía no está listo: el **blog** (fuentes en `_borradores/blog-fuentes/`, salida generada en `_borradores/blog/`) y la página de **Términos** (`_borradores/terminos.html`, con sus textos EN en `_borradores/terminos-en.txt`). El enlace «Blog» del menú está comentado en `index.html` y el de «Términos» ya no está en el pie. `scripts/check.mjs` ignora las carpetas que empiezan con `_`. **Aviso:** GitHub Pages sirve todo lo que hay en la rama, así que esos archivos siguen alcanzables por URL directa (`robots.txt` los excluye de buscadores). Para sacarlos del todo, hay que guardarlos en otra rama.

**Volver a publicar el blog:** mover las fuentes a `content/blog/`, correr `node scripts/build-blog.mjs --publicar` (genera `blog/`), restaurar el enlace del menú, poner `SHOW_BLOG` en `true`, quitar el `noindex` del script, el `Disallow: /blog/` de `robots.txt` y añadir las URLs a `sitemap.xml`.

**Volver a publicar los Términos:** mover `terminos.html` a la raíz, pegar sus textos EN de `terminos-en.txt` en `js/i18n.js`, enlazarla en el pie y reemplazar el texto pendiente por el texto legal real.

## Verificación de reportes
Agrega un registro por reporte entregado, **solo con consentimiento del cliente** y sin datos sensibles:

```json
{ "reports": [ { "id": "TV-20261015-ABCD", "date": "2026-10-15", "package": "Revisión Express", "verdict": "Con condiciones" } ] }
```

## Blog

Artículos en `content/blog/*.md` (ver `_plantilla.md`), firmados “Por Claudia Acosta”. Genera con `node scripts/build-blog.mjs` y haz commit de `blog/`. Al activar `SHOW_BLOG`, quita el `noindex` en `scripts/build-blog.mjs`, el `Disallow: /blog/` de `robots.txt` y añade las URLs a `sitemap.xml`.

## Verificación

`node scripts/check.mjs` — traducciones EN completas, sin enlaces internos rotos ni anclas muertas, sin `[COMPLETAR` en `index.html` y sin botones de pago apuntando a `#intake`.

`node scripts/check.mjs --publicar` — modo estricto, para correr justo antes de publicar: además falla si queda algún Payment Link de **prueba** en `js/links.js` o algún `[COMPLETAR` en las páginas y scripts publicados.

**Correo de contacto:** `--publicar` también falla mientras el correo de contacto del sitio aparezca en algún archivo publicado (páginas, scripts, README…) o en un **PDF dentro del repo** y la bandera `correoActivo` de `js/config.js` no sea `true`. Cambia esa bandera solo cuando el buzón esté activo. «Publicado» es todo lo que está en el repo fuera de carpetas que empiezan con `_`: un PDF de muestra que solo vive en tu computadora (fuera del repo, o dentro de una carpeta `_`) no cuenta. En un PDF la dirección se detecta en su enlace `mailto:` y en sus cadenas literales; el texto visible solo se revisa si `pdfjs-dist` está instalado (si no, el script avisa).

### Secciones ocultas hasta tener contenido real
Checklist ($19), sello verificable y testimonios están **comentados** en `index.html` (con su flag en `js/config.js`). Para activar uno: escribir su contenido real, quitar el comentario y poner su flag en `true`.

## Dominio (GitHub Pages)

1. Repo → Settings → Pages → Deploy from a branch → rama que publiques / root. El archivo `CNAME` ya contiene `testingvibe.com`.
2. En el DNS del dominio:

| Tipo | Nombre | Valor |
|---|---|---|
| A | @ | 185.199.108.153 · 185.199.109.153 · 185.199.110.153 · 185.199.111.153 (un registro por IP) |
| AAAA (opcional) | @ | 2606:50c0:8000::153 · 2606:50c0:8001::153 · 2606:50c0:8002::153 · 2606:50c0:8003::153 |
| CNAME | www | `<tu-usuario>.github.io` |

3. Cuando Pages valide el DNS, marca *Enforce HTTPS*. Si el DNS está en Cloudflare, déjalo en “DNS only” hasta que se emita el certificado.
4. Verifica las IPs en la [documentación de GitHub](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) antes de aplicarlas.
