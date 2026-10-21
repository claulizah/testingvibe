/* Enlaces externos en un solo lugar. Cambia aquí los Stripe Payment Links (modo real).
   Cada enlace debe cobrar el precio de lista que muestra la página.
   Checklist y negocios están guardados pero NO se muestran en el sitio todavía (sus tarjetas no están publicadas). */
window.TV_LINKS = {
  EMAIL: "contacto@testingvibe.com",
  CALENDLY: "https://calendly.com/clauliz-acosta/30min",
  TALLY_CHEQUEO: "https://tally.so/r/xXeyyE", // formulario del Chequeo rápido
  TALLY_INTAKE: "https://tally.so/r/ob429x",  // formulario de inicio de todos los paquetes de pago
  STRIPE: {
    flujo: "https://buy.stripe.com/14A28serafpW9Lw8g7fUQ01",
    express: "https://buy.stripe.com/6oUdRafve1z67DoeEvfUQ03",
    auditoria: "https://buy.stripe.com/4gM00k5UEelScXIfIzfUQ05",
    mensual: "https://buy.stripe.com/4gMfZi4QAelSf5QgMDfUQ00",
    checklist: "https://buy.stripe.com/fZu7sM2Isa5Cf5QfIzfUQ04", // oculto: sin activar
    negocios: "https://buy.stripe.com/6oUcN60Ak5PmaPA1RJfUQ02"   // oculto: sin mostrar en el sitio
  }
};
