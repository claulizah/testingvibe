/* Flags y constantes del sitio. Los enlaces (Stripe, Tally, Calendly) viven en links.js.
   Se carga de forma síncrona en <head> para que los flags apliquen sin parpadeo. */
window.TV = {
  // --- Flags de secciones (false = oculta) ---
  SHOW_TESTIMONIALS: false,  // sección de testimonios (rellenar antes de activar)
  SHOW_CHECKLIST: false,     // tarjeta del Checklist $19: activar cuando exista el PDF
  SHOW_SAMPLE_REPORT: false, // botón de reporte de muestra (requiere /muestra.pdf)
  SHOW_SEAL: false,          // sello verificable: activar al tener 3 clientes
  SHOW_BLOG: false,          // enlace al blog en el menú

  CF_ANALYTICS_TOKEN: "",    // [COMPLETAR] token de Cloudflare Web Analytics
  SAMPLE_PDF: "/muestra.pdf" // [COMPLETAR] subir muestra.pdf a la raíz
};
(function () {
  var c = window.TV, h = document.documentElement;
  if (c.SHOW_TESTIMONIALS) h.classList.add("f-testimonials");
  if (c.SHOW_CHECKLIST) h.classList.add("f-checklist");
  if (c.SHOW_SAMPLE_REPORT) h.classList.add("f-sample");
  if (c.SHOW_SEAL) h.classList.add("f-seal");
  if (c.SHOW_BLOG) h.classList.add("f-blog");
})();
