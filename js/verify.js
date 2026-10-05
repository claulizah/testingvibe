/* Verificación de reportes por ID. Consulta /data/reports.json (solo datos mínimos y con consentimiento del cliente).
   Formato de cada registro: { "id": "...", "date": "YYYY-MM-DD", "package": "...", "verdict": "..." } */
(function () {
  var form = document.getElementById("verify-form");
  var out = document.getElementById("verify-result");
  var input = document.getElementById("rid");
  var T = window.TV_I18N;
  var EN_MSG = { // se registran aquí para no inflar el diccionario general
    "v.notfound": "No report found with that ID. Check that you typed it exactly as printed.",
    "v.found": "Valid report issued by TestingVibe.",
    "v.err": "Could not check right now. Please try again later.",
    "v.id": "ID", "v.date": "Date", "v.pkg": "Package", "v.verdict": "Verdict"
  };
  var ES_MSG = {
    "v.notfound": "No se encontró ningún reporte con ese ID. Revisa que lo hayas escrito igual que en tu reporte.",
    "v.found": "Reporte válido emitido por TestingVibe.",
    "v.err": "No se pudo consultar en este momento. Intenta de nuevo más tarde.",
    "v.id": "ID", "v.date": "Fecha", "v.pkg": "Paquete", "v.verdict": "Veredicto"
  };
  var t = function (k) { return (T && T.lang() === "en" ? EN_MSG : ES_MSG)[k]; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  var preset = /[?&]id=([^&]+)/.exec(location.search);
  if (preset) { input.value = decodeURIComponent(preset[1]); check(); }

  form.addEventListener("submit", function (e) { e.preventDefault(); check(); });

  function check() {
    var id = input.value.trim().toUpperCase();
    if (!id) { out.innerHTML = ""; return; }
    fetch("/data/reports.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        var rec = (d.reports || []).filter(function (x) { return String(x.id).toUpperCase() === id; })[0];
        if (!rec) { out.className = "result err"; out.textContent = t("v.notfound"); return; }
        out.className = "result ok";
        out.innerHTML = "<p><strong>" + esc(t("v.found")) + "</strong></p><dl>" +
          "<dt>" + t("v.id") + "</dt><dd>" + esc(rec.id) + "</dd>" +
          "<dt>" + t("v.date") + "</dt><dd>" + esc(rec.date) + "</dd>" +
          "<dt>" + t("v.pkg") + "</dt><dd>" + esc(rec.package) + "</dd>" +
          "<dt>" + t("v.verdict") + "</dt><dd>" + esc(rec.verdict) + "</dd></dl>";
      })
      .catch(function () { out.className = "result err"; out.textContent = t("v.err"); });
  }
})();
