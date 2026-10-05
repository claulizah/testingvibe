// Verifica que cada data-i18n / data-i18n-attr tenga traducción EN y que no sobren claves; revisa enlaces internos.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? (f === ".git" || f === "node_modules" ? [] : walk(p)) : [p]; });
const htmls = walk(root).filter((f) => f.endsWith(".html"));
const i18n = readFileSync(join(root, "js/i18n.js"), "utf8");
const dict = new Set([...i18n.matchAll(/^\s*"([\w.]+)":/gm), ...i18n.matchAll(/,\s*"([\w.]+)":/g)].map((m) => m[1]));
const used = new Set(); let bad = 0;
for (const f of htmls) {
  const h = readFileSync(f, "utf8");
  for (const m of h.matchAll(/data-i18n="([^"]+)"/g)) used.add(m[1]);
  for (const m of h.matchAll(/data-i18n-attr="([^"]+)"/g)) m[1].split(",").forEach((p) => used.add(p.split(":")[1].trim()));
  for (const m of h.matchAll(/(?:href|src|srcset)="(\/[^"#?\s]*)/g)) {
    const t = m[1] === "/" ? "index.html" : m[1].slice(1);
    const ok = existsSync(join(root, t)) || existsSync(join(root, t, "index.html"));
    if (!ok && m[1] !== "/muestra.pdf") { console.log("ENLACE ROTO", f.replace(root, ""), m[1]); bad++; }
  }
}
const extra = ["blog.title","blog.by","terms.title"]; // usadas solo por JS/builders
for (const k of used) if (!dict.has(k)) { console.log("FALTA EN:", k); bad++; }
for (const k of dict) if (!used.has(k) && !k.startsWith("intake.ok") && !k.startsWith("intake.err") && !k.startsWith("intake.pending") && !k.startsWith("intake.invalid") && !extra.includes(k)) console.log("(sin usar)", k);
console.log(bad ? `${bad} problema(s)` : "OK: i18n y enlaces internos");
process.exit(bad ? 1 : 0);
