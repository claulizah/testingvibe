/* Enlaces externos en un solo lugar. Cambia aquí los Stripe Payment Links (modo real).
   Cada enlace debe cobrar el precio que muestra la página (para Completa y Acompañamiento, el de lanzamiento).
   Checklist y negocios están guardados pero NO se muestran en el sitio todavía (sus tarjetas no están publicadas). */
window.TV_LINKS = {
  EMAIL: "contacto@testingvibe.com",
  CALENDLY: "https://calendly.com/clauliz-acosta/30min",
  TALLY_CHEQUEO: "https://tally.so/r/xXeyyE", // formulario del Chequeo rápido
  TALLY_INTAKE: "https://tally.so/r/ob429x",  // formulario de inicio de todos los paquetes de pago
  STRIPE: {
    flujo: "https://buy.stripe.com/14A28serafpW9Lw8g7fUQ01",
    express: "https://buy.stripe.com/6oUdRafve1z67DoeEvfUQ03",
    auditoria: "https://buy.stripe.com/fZu7sMdn6fpW8Hs1RJfUQ06",
    // mensual: "https://buy.stripe.com/3cI3cwcj26TqcXIfIzfUQ07", // OCULTO: Mensual no se ofrece por ahora; quitar «//» junto con el comentario de su tarjeta en index.html
    checklist: "https://buy.stripe.com/fZu7sM2Isa5Cf5QfIzfUQ04", // oculto: sin activar
    negocios: "https://buy.stripe.com/6oUcN60Ak5PmaPA1RJfUQ02"   // oculto: sin mostrar en el sitio
  }
};
