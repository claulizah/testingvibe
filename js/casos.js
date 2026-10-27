/* Sección «Casos probados»: dibuja las tarjetas desde /data/casos.json (solo datos mínimos; ver data/casos.json). Sin JS queda el aviso de <noscript>. */
(function () {
  var box = document.getElementById("casos-lista");
  if (!box) return;
  var datos = null;

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = txt; return e; }
  function lang() { return window.TV_I18N && window.TV_I18N.lang() === "en" ? "en" : "es"; }

  function pintar() {
    if (!datos) return;
    var l = lang(), t = datos.etiquetas[l];
    box.textContent = "";
    datos.casos.forEach(function (c) {
      var card = el("article", "caso" + (c.estado === "en_revision" ? " caso-pend" : ""));
      var top = el("div", "caso-top");
      top.appendChild(el("h3", "caso-sitio", c.sitio));
      top.appendChild(el("span", "caso-paquete", c.paquete[l]));
      card.appendChild(top);
      if (c.estado === "en_revision") {
        card.appendChild(el("p", "caso-estado", t.revision));
      } else {
        var m = el("dl", "caso-datos");
        function par(k, v) { var d = el("div"); d.appendChild(el("dt", "", k)); d.appendChild(el("dd", "", v)); m.appendChild(d); }
        par(t.puntaje, c.puntaje + "/100");
        if (c.veredicto) par(t.veredicto, c.veredicto[l]);
        if (c.nivel) par(t.nivel, c.nivel[l]);
        card.appendChild(m);
      }
      card.appendChild(el("p", "caso-frase", c.frase[l]));
      if (c.estado !== "en_revision") card.appendChild(el("p", "caso-fecha", t.fecha + " " + c.fecha_texto[l]));
      box.appendChild(card);
    });
  }

  fetch("/data/casos.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error("casos"); return r.json(); })
    .then(function (d) { datos = d; pintar(); })
    .catch(function () { box.hidden = true; });
  document.addEventListener("tv-lang", pintar);
})();
