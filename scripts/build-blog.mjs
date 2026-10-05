// Genera blog/index.html y blog/<slug>/index.html desde content/blog/*.md (sin dependencias).
// Uso: node scripts/build-blog.mjs
// Front matter: title, date (YYYY-MM-DD), description, lang (es|en). Los borradores usan "draft: true" y se omiten.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "content", "blog");
const out = join(root, "blog");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g, (_, t, u) =>
      `<a href="${u}"${u.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${t}</a>`);
}

function md(text) {
  const lines = text.split(/\r?\n/);
  let html = "", list = null, para = [];
  const flushP = () => { if (para.length) { html += `<p>${inline(para.join(" "))}</p>\n`; para = []; } };
  const flushL = () => { if (list) { html += `</${list}>\n`; list = null; } };
  for (const line of lines) {
    let m;
    if (!line.trim()) { flushP(); flushL(); }
    else if ((m = /^(#{2,3})\s+(.*)/.exec(line))) { flushP(); flushL(); html += `<h${m[1].length}>${inline(m[2])}</h${m[1].length}>\n`; }
    else if ((m = /^[-*]\s+(.*)/.exec(line))) { flushP(); if (list !== "ul") { flushL(); html += "<ul>\n"; list = "ul"; } html += `<li>${inline(m[1])}</li>\n`; }
    else if ((m = /^\d+\.\s+(.*)/.exec(line))) { flushP(); if (list !== "ol") { flushL(); html += "<ol>\n"; list = "ol"; } html += `<li>${inline(m[1])}</li>\n`; }
    else { flushL(); para.push(line.trim()); }
  }
  flushP(); flushL();
  return html;
}

function parse(file) {
  const raw = readFileSync(join(src, file), "utf8");
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!m) throw new Error(`${file}: falta front matter`);
  const meta = {};
  for (const l of m[1].split(/\r?\n/)) { const i = l.indexOf(":"); if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim().replace(/^["']|["']$/g, ""); }
  return { slug: file.replace(/\.md$/, ""), meta, body: m[2] };
}

const head = (title, desc, path, lang) => `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex"><!-- quitar cuando SHOW_BLOG = true y haya artículos reales -->
<link rel="canonical" href="https://testingvibe.com${path}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="https://testingvibe.com/img/og-image.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/css/styles.css">
<script src="/js/config.js"></script>
<script src="/js/links.js"></script>
</head>
<body>
<header class="site-header"><div class="wrap bar">
<a class="logo" href="/" aria-label="TestingVibe"><span>testing<b>vibe</b></span></a>
<div class="lang" role="group" aria-label="Idioma" data-i18n-attr="aria-label:lang.label"><button type="button" data-lang="es" aria-pressed="true">ES</button><button type="button" data-lang="en" aria-pressed="false">EN</button></div>
</div></header>
<main class="page"><div class="wrap prose">
`;
const foot = `</div></main>
<footer class="site-footer"><div class="wrap foot"><p>© <span id="year">2026</span> TestingVibe · <span data-i18n="foot.by">por Claudia Acosta</span></p></div></footer>
<script src="/js/i18n.js" defer></script>
<script src="/js/main.js" defer></script>
</body>
</html>
`;

const posts = readdirSync(src).filter((f) => f.endsWith(".md") && !f.startsWith("_")).map(parse)
  .filter((p) => p.meta.draft !== "true")
  .sort((a, b) => (b.meta.date || "").localeCompare(a.meta.date || ""));

// limpia salida previa
for (const e of readdirSync(out, { withFileTypes: true })) if (e.isDirectory() || e.name === "index.html") rmSync(join(out, e.name), { recursive: true, force: true });

for (const p of posts) {
  const dir = join(out, p.slug); mkdirSync(dir, { recursive: true });
  const lang = p.meta.lang || "es";
  const byline = lang === "en" ? "By Claudia Acosta" : "Por Claudia Acosta";
  writeFileSync(join(dir, "index.html"),
    head(`${p.meta.title} — TestingVibe`, p.meta.description || "", `/blog/${p.slug}/`, lang) +
    `<p><a href="/blog/" data-i18n="blog.back">← Todos los artículos</a></p>
<article>
<h1>${esc(p.meta.title)}</h1>
<p class="byline">${byline} · <time datetime="${esc(p.meta.date || "")}">${esc(p.meta.date || "")}</time></p>
${md(p.body)}</article>
` + foot);
}

writeFileSync(join(out, "index.html"),
  head("Blog — TestingVibe", "Artículos sobre QA y seguridad básica para apps creadas con IA.", "/blog/", "es") +
  `<h1 data-i18n="blog.h1">Blog</h1>
${posts.length ? `<ul class="post-list">\n${posts.map((p) => `<li><h2><a href="/blog/${p.slug}/">${esc(p.meta.title)}</a></h2><p class="byline">${esc(p.meta.date || "")} · ${(p.meta.lang || "es") === "en" ? "By Claudia Acosta" : "Por Claudia Acosta"}</p><p>${esc(p.meta.description || "")}</p></li>`).join("\n")}\n</ul>` : `<p data-i18n="blog.empty">Aún no hay artículos.</p>`}
` + foot);

console.log(`Blog: ${posts.length} artículo(s) generado(s).`);
