(function () {
  var C = window.TV || {}, L = window.TV_LINKS || {};

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  [].forEach.call(document.querySelectorAll("[data-mail]"), function (a) { if (L.EMAIL) a.href = "mailto:" + L.EMAIL; });
  [].forEach.call(document.querySelectorAll("[data-calendly]"), function (a) { if (L.CALENDLY) a.href = L.CALENDLY; });
  [].forEach.call(document.querySelectorAll("[data-tally]"), function (a) { if (L.TALLY) a.href = L.TALLY; });
  [].forEach.call(document.querySelectorAll("[data-sample]"), function (a) { if (C.SAMPLE_PDF) a.href = C.SAMPLE_PDF; });

  // Stripe Payment Links desde links.js
  var testMode = false;
  [].forEach.call(document.querySelectorAll("[data-pay]"), function (a) {
    var url = L.STRIPE && L.STRIPE[a.dataset.pay];
    if (url) {
      a.href = url; a.target = "_blank"; a.rel = "noopener";
      if (url.indexOf("/test_") !== -1) testMode = true;
    } else {
      console.warn("[TestingVibe] Falta el enlace de Stripe para:", a.dataset.pay);
    }
  });

  // Aviso visible mientras haya enlaces de PRUEBA de Stripe
  if (testMode) {
    console.warn("[TestingVibe] Hay enlaces de Stripe de PRUEBA en js/links.js. Cámbialos antes de publicar.");
    var bar = document.createElement("div");
    bar.className = "test-banner";
    bar.setAttribute("role", "note");
    bar.textContent = "MODO PRUEBA — enlaces de pago de prueba (js/links.js). No publicar así.";
    document.body.appendChild(bar);
  }

  // Cloudflare Web Analytics
  if (C.CF_ANALYTICS_TOKEN) {
    var s = document.createElement("script");
    s.defer = true;
    s.src = "https://static.cloudflareinsights.com/beacon.min.js";
    s.setAttribute("data-cf-beacon", JSON.stringify({ token: C.CF_ANALYTICS_TOKEN }));
    document.head.appendChild(s);
  }
})();
