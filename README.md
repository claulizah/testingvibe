# testingvibe.com

Landing estática + blog (HTML/CSS/JS sin dependencias). Hosting: GitHub Pages con dominio propio.

> ## ⚠️ ANTES DE PUBLICAR: cambiar los enlaces de Stripe a los reales
> Los Payment Links de `js/links.js` son de **PRUEBA** (`buy.stripe.com/test_…`). Mientras haya alguno, el sitio muestra una franja “MODO PRUEBA”.
> Reemplázalos por los reales y verifica que cada enlace cobre el precio que muestra la página (la página muestra solo el precio de lista ($99 y $449). Los precios especiales del programa de casos de estudio se acuerdan por correo; no se publica ningún código de descuento).

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
{ "reports": [ { "id": "[COMPLETAR formato de ID]", "date": "2026-10-15", "package": "Revisión Express", "verdict": "Con condiciones" } ] }
```

## Blog

Artículos en `content/blog/*.md` (ver `_plantilla.md`), firmados “Por Claudia Acosta”. Genera con `node scripts/build-blog.mjs` y haz commit de `blog/`. Al activar `SHOW_BLOG`, quita el `noindex` en `scripts/build-blog.mjs`, el `Disallow: /blog/` de `robots.txt` y añade las URLs a `sitemap.xml`.

## Verificación

`node scripts/check.mjs` — traducciones EN completas y sin enlaces internos rotos.

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
