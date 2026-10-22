/* Flags y constantes del sitio. Los enlaces (Stripe, Tally, Calendly) viven en links.js.
   Se carga de forma síncrona en <head> para que los flags apliquen sin parpadeo. */
window.TV = {
  // --- Flags de secciones (false = oculta) ---
  SHOW_TESTIMONIALS: false,  // testimonios: la sección está comentada en index.html; al tener testimonios reales, descomentarla y activar
  SHOW_CHECKLIST: false,     // Checklist $19: la tarjeta está comentada en index.html; descomentarla y activar solo cuando exista el PDF
  SHOW_SAMPLE_REPORT: false, // botón de reporte de muestra (requiere /muestra.pdf)
  SHOW_SEAL: false,          // sello verificable: el bloque está comentado en index.html; descomentarlo y activar al tener 3 clientes
  SHOW_BLOG: false,          // enlace al blog en el menú

  // Correo de contacto del sitio: mientras sea false, `node scripts/check.mjs --publicar` falla si la dirección aparece en el sitio o en un PDF publicado.
  // Ponlo en true solo cuando el buzón esté activo y quieras publicar la dirección.
  correoActivo: true,

  CF_ANALYTICS_TOKEN: "",    // PENDIENTE: token de Cloudflare Web Analytics
  SAMPLE_PDF: "/muestra.pdf" // PENDIENTE: subir muestra.pdf a la raíz
};
(function () {
  var c = window.TV, h = document.documentElement;
  if (c.SHOW_TESTIMONIALS) h.classList.add("f-testimonials");
  if (c.SHOW_CHECKLIST) h.classList.add("f-checklist");
  if (c.SHOW_SAMPLE_REPORT) h.classList.add("f-sample");
  if (c.SHOW_SEAL) h.classList.add("f-seal");
  if (c.SHOW_BLOG) h.classList.add("f-blog");
})();
