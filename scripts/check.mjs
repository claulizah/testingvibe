// Verifica que cada data-i18n / data-i18n-attr tenga traducción EN y que no sobren claves; revisa enlaces internos, anclas, marcadores pendientes y botones de pago.
//   node scripts/check.mjs             revisión normal (los enlaces de Stripe de prueba solo avisan)
//                                      (siempre) falla si queda un marcador sin completar VISIBLE ([PENDIENTE, [PENDING, [COMPLETAR, TODO, XXX) en cualquier página o en el texto EN de una clave visible; lo comentado no cuenta
//   node scripts/check.mjs --publicar  modo estricto, antes de publicar: falla con enlaces de prueba, con cualquier «[COMPLETAR» en páginas y scripts,
//                                      y si el correo de contacto aparece en el sitio o en un PDF publicado mientras `correoActivo` (js/config.js) no sea true.
//                                      «Publicado» = todo lo que está en el repo fuera de carpetas que empiezan con «_»; un PDF de muestra solo local (fuera del repo o en una carpeta «_») no cuenta.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
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
    if (!ok && m[1] !== "/muestra.pdf") { console.log("ENLACE ROTO", relative(root, f), m[1]); bad++; }
  }
}

// --- Página principal: anclas, marcadores pendientes y botones de pago (lo que está comentado no cuenta como publicado a la vista) ---
const indexCrudo = readFileSync(join(root, "index.html"), "utf8");
const index = indexCrudo.replace(/<!--[\s\S]*?-->/g, "");
const ids = new Set([...index.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const m of index.matchAll(/href="#([^"]+)"/g)) if (!ids.has(m[1])) { console.log("ANCLA MUERTA index.html #" + m[1]); bad++; }
if (indexCrudo.includes("[COMPLETAR")) { console.log("MARCADOR [COMPLETAR en index.html (ni siquiera comentado)"); bad++; }

// --- Marcadores sin completar VISIBLES, en cualquier idioma (siempre, no solo con --publicar). Lo comentado (secciones retiradas) no cuenta. ---
// Páginas: cualquier marcador fuera de comentarios y de <script>/<style>. Inglés: el texto EN de cada clave data-i18n que usa una página a la vista.
const MARCADOR = /\[(?:PENDIENTE|PENDING|COMPLETAR)\b|\bTODO\b|\bXXX\b/;
const valoresEn = new Map([...i18n.matchAll(/"([\w.]+)"\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => [m[1], m[2]]));
const clavesVisibles = new Map();
for (const f of htmls) {
  const visible = readFileSync(f, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  for (const m of visible.matchAll(/data-i18n="([^"]+)"/g)) clavesVisibles.set(m[1], f);
  for (const m of visible.matchAll(/data-i18n-attr="([^"]+)"/g)) m[1].split(",").forEach((p) => clavesVisibles.set(p.split(":")[1].trim(), f));
  const m = MARCADOR.exec(visible.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ""));
  if (m) { console.log(`MARCADOR VISIBLE «${m[0]}» en ${relative(root, f)} (línea ${visible.slice(0, visible.indexOf(m[0])).split("\n").length}): coméntalo como el Checklist hasta que exista el texto`); bad++; }
}
for (const [clave, archivo] of clavesVisibles) {
  const en = valoresEn.get(clave);
  if (en && MARCADOR.test(en)) { console.log(`MARCADOR VISIBLE (EN) en la clave «${clave}» de js/i18n.js, usada por ${relative(root, archivo)}: «${en.slice(0, 60)}»`); bad++; }
}
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
    if (readFileSync(f, "utf8").includes("[COMPLETAR")) { console.log("MARCADOR [COMPLETAR en", relative(root, f)); bad++; }
  }
}

// --- Correo de contacto: no se publica hasta que `correoActivo` sea true en js/config.js ---
const CORREO = "contacto@" + "testingvibe.com"; // por partes: este script también se publica y no debe contener la dirección
const sinComentarios = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|\s)\/\/[^\n]*/g, "$1");
const correoActivo = /\bcorreoActivo\s*:\s*true\b/.test(sinComentarios(readFileSync(join(root, "js/config.js"), "utf8")));
const EXT_TEXTO = [".html", ".js", ".mjs", ".json", ".xml", ".txt", ".md", ".css", ".svg", ".webmanifest"];
let pdfjs = null; try { pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs"); } catch { /* sin pdfjs: solo se revisan los enlaces y cadenas literales del PDF */ }
async function textoPdf(ruta) { // texto visible del PDF (solo si pdfjs-dist está disponible)
  const doc = await pdfjs.getDocument({ data: new Uint8Array(readFileSync(ruta)), useSystemFonts: true, verbosity: 0 }).promise;
  let t = ""; for (let i = 1; i <= doc.numPages; i++) t += (await (await doc.getPage(i)).getTextContent()).items.map((x) => x.str).join(" ") + " ";
  return t;
}
const conCorreo = [];
for (const f of walk(root)) {
  const ext = f.slice(f.lastIndexOf(".")).toLowerCase();
  if (EXT_TEXTO.includes(ext)) { if (readFileSync(f, "utf8").toLowerCase().includes(CORREO)) conCorreo.push(relative(root, f)); }
  else if (ext === ".pdf") { // un PDF dentro del repo se publica: el enlace mailto: y las cadenas literales van sin comprimir; el texto visible se revisa si hay pdfjs
    const enBytes = readFileSync(f).toString("latin1").toLowerCase().includes(CORREO);
    const enTexto = pdfjs ? (await textoPdf(f)).toLowerCase().includes(CORREO) : false;
    if (enBytes || enTexto) conCorreo.push(relative(root, f) + " (PDF)");
    else if (!pdfjs) console.log("(aviso) no pude leer el texto visible de", relative(root, f), "(falta pdfjs-dist): solo se revisaron sus enlaces y cadenas literales");
  }
}
if (conCorreo.length && !correoActivo) {
  console.log((publicar ? "CORREO NO ACTIVO" : "(aviso) correo no activo") + ": el correo de contacto aparece en " + conCorreo.length + " archivo(s) publicado(s) y correoActivo no es true en js/config.js:");
  for (const f of conCorreo) console.log("   -", f);
  if (publicar) bad++;
} else if (conCorreo.length) console.log("(info) correoActivo es true: el correo de contacto se publica en", conCorreo.length, "archivo(s).");

// --- data/casos.json: solo dominios en texto; sin enlaces, rutas ni direcciones que ayuden a atacar un sitio ---
if (existsSync(join(root, "data/casos.json"))) {
  const casosTxt = readFileSync(join(root, "data/casos.json"), "utf8");
  const casos = JSON.parse(casosTxt);
  const textos = []; (function rec(x) { if (typeof x === "string") textos.push(x); else if (x && typeof x === "object") Object.values(x).forEach(rec); })(casos.casos);
  for (const t of textos) if (/https?:|www\.|\/[a-z0-9_-]+|:\d{2,5}\b|\b\d{1,3}(\.\d{1,3}){3}\b|\?[a-z]+=/i.test(t)) { console.log("CASOS: texto con ruta, enlace o dirección en data/casos.json:", t.slice(0, 60)); bad++; }
  for (const c of casos.casos) {
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(c.sitio)) { console.log("CASOS: «sitio» debe ser solo un dominio:", c.sitio); bad++; }
    for (const k of ["frase", "paquete"]) if (!c[k] || !c[k].es || !c[k].en) { console.log("CASOS: falta es/en en", c.sitio, k); bad++; }
    if (c.estado === "revisado" && !(Number.isInteger(c.puntaje) && c.puntaje >= 0 && c.puntaje <= 100)) { console.log("CASOS: puntaje inválido en", c.sitio); bad++; }
    if (c.estado === "en_revision" && (c.puntaje !== undefined || c.veredicto !== undefined)) { console.log("CASOS: un caso «en revisión» no debe llevar puntaje ni veredicto:", c.sitio); bad++; }
  }
}

const extra = ["blog.title","blog.by","terms.title"]; // usadas solo por JS/builders
for (const k of used) if (!dict.has(k)) { console.log("FALTA EN:", k); bad++; }
for (const k of dict) if (!used.has(k) && !k.startsWith("intake.ok") && !k.startsWith("intake.err") && !k.startsWith("intake.pending") && !k.startsWith("intake.invalid") && !extra.includes(k)) console.log("(sin usar)", k);
console.log(bad ? `${bad} problema(s)` : "OK: i18n, enlaces internos, anclas y botones de pago");
process.exit(bad ? 1 : 0);
