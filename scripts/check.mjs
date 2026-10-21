// Verifica que cada data-i18n / data-i18n-attr tenga traducción EN y que no sobren claves; revisa enlaces internos, anclas, marcadores pendientes y botones de pago.
//   node scripts/check.mjs             revisión normal (los enlaces de Stripe de prueba solo avisan)
//   node scripts/check.mjs --publicar  modo estricto, antes de publicar: falla con enlaces de prueba o con cualquier «[COMPLETAR» en páginas y scripts
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
// las carpetas que empiezan con «_» (por ejemplo _borradores/) están fuera de la publicación y de estas verificaciones
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? (f === ".git" || f === "node_modules" || f.startsWith("_") ? [] : walk(p)) : [p]; });
const htmls = walk(root).filter((f) => f.endsWith(".html"));
const i18n = readFileSync(join(root, "js/i18n.js"), "utf8");
const dict = new Set([...i18n.matchAll(/^\s*"([\w.]+)":/gm), ...i18n.matchAll(/,\s*"([\w.]+)":/g)].map((m) => m[1]));
const used = new Set(); let bad = 0;
const publicar = process.argv.includes("--publicar");
for (const f of htmls) {
  const h = readFileSync(f, "utf8");
  for (const m of h.matchAll(/data-i18n="([^"]+)"/g)) used.add(m[1]);
  for (const m of h.matchAll(/data-i18n-attr="([^"]+)"/g)) m[1].split(",").forEach((p) => used.add(p.split(":")[1].trim()));
  for (const m of h.replace(/<!--[\s\S]*?-->/g, "").matchAll(/(?:href|src|srcset)="(\/[^"#?\s]*)/g)) { // lo comentado (secciones retiradas) no cuenta
    const t = m[1] === "/" ? "index.html" : m[1].slice(1);
    const ok = existsSync(join(root, t)) || existsSync(join(root, t, "index.html"));
    if (!ok && m[1] !== "/muestra.pdf") { console.log("ENLACE ROTO", f.replace(root, ""), m[1]); bad++; }
  }
}

// --- Página principal: anclas, marcadores pendientes y botones de pago (lo que está comentado no cuenta como publicado a la vista) ---
const indexCrudo = readFileSync(join(root, "index.html"), "utf8");
const index = indexCrudo.replace(/<!--[\s\S]*?-->/g, "");
const ids = new Set([...index.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const m of index.matchAll(/href="#([^"]+)"/g)) if (!ids.has(m[1])) { console.log("ANCLA MUERTA index.html #" + m[1]); bad++; }
if (indexCrudo.includes("[COMPLETAR")) { console.log("MARCADOR [COMPLETAR en index.html (ni siquiera comentado)"); bad++; }
for (const m of index.matchAll(/<a\b[^>]*data-pay="([^"]+)"[^>]*>/g)) {
  const href = /href="([^"]*)"/.exec(m[0])?.[1] || "";
  if (!href || href.startsWith("#")) { console.log("BOTÓN DE PAGO sin enlace propio:", m[1], href || "(sin href)"); bad++; }
}
const links = readFileSync(join(root, "js/links.js"), "utf8");
const marcaPrueba = "te" + "st_"; // así marca Stripe sus enlaces de prueba (por partes, para que ni este script la contenga)
const deprueba = [...links.matchAll(new RegExp("^\\s*(\\w+):\\s*\"https://buy\\.stripe\\.com/" + marcaPrueba, "gm"))].map((m) => m[1]);
if (deprueba.length) { console.log((publicar ? "ENLACE DE PRUEBA" : "(aviso) enlace de Stripe de PRUEBA") + " en js/links.js:", deprueba.join(", ")); if (publicar) bad++; }
if (publicar) {
  for (const f of [...htmls, join(root, "js/i18n.js"), join(root, "js/config.js"), join(root, "js/links.js")]) {
    if (readFileSync(f, "utf8").includes("[COMPLETAR")) { console.log("MARCADOR [COMPLETAR en", f.replace(root, "")); bad++; }
  }
}

const extra = ["blog.title","blog.by","terms.title"]; // usadas solo por JS/builders
for (const k of used) if (!dict.has(k)) { console.log("FALTA EN:", k); bad++; }
for (const k of dict) if (!used.has(k) && !k.startsWith("intake.ok") && !k.startsWith("intake.err") && !k.startsWith("intake.pending") && !k.startsWith("intake.invalid") && !extra.includes(k)) console.log("(sin usar)", k);
console.log(bad ? `${bad} problema(s)` : "OK: i18n, enlaces internos, anclas y botones de pago");
process.exit(bad ? 1 : 0);
