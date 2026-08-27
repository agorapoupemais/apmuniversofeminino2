// ==========================================
// CONFIGURAÇÕES
// ==========================================

// Cole aqui o link real do seu grupo do WhatsApp.
const WHATSAPP_GROUP_URL = "https://garimpa.store/c/universo-feminino-hvtoo";

// Cole aqui o ID do seu Meta Pixel.
// Deixe vazio enquanto não estiver configurado.
const META_PIXEL_ID = "COLE_AQUI_O_META_PIXEL_ID";

// ==========================================
// TRACKING
// ==========================================

function loadMetaPixel() {
  if (!META_PIXEL_ID || META_PIXEL_ID.includes("COLE_AQUI")) return;

  window.fbq = window.fbq || function () {
    window.fbq.callMethod
      ? window.fbq.callMethod.apply(window.fbq, arguments)
      : window.fbq.queue.push(arguments);
  };

  window.fbq.push = window.fbq;
  window.fbq.loaded = true;
  window.fbq.version = "2.0";
  window.fbq.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");

  // Evento complementar para sinalizar visualização do conteúdo.
  window.fbq("track", "ViewContent");
}

function trackWhatsAppClick(location) {
  if (typeof window.fbq === "function" && META_PIXEL_ID && !META_PIXEL_ID.includes("COLE_AQUI")) {
    window.fbq("track", "Lead", { content_name: "APM Universo Feminino", button_location: location });
  }
}

// ==========================================
// CTA / WHATSAPP
// ==========================================

function isWhatsAppConfigured() {
  return WHATSAPP_GROUP_URL &&
         !WHATSAPP_GROUP_URL.includes("COLE_AQUI") &&
         /^https?:\/\//i.test(WHATSAPP_GROUP_URL);
}

function handleWhatsAppClick(event) {
  event.preventDefault();

  const location = event.currentTarget.dataset.cta || "unknown";

  if (!isWhatsAppConfigured()) {
    showToast("Configure o link do grupo do WhatsApp no script.js.");
    return;
  }

  trackWhatsAppClick(location);

  // Pequeno atraso para permitir o disparo do Pixel antes da navegação.
  window.setTimeout(() => {
    window.location.href = WHATSAPP_GROUP_URL;
  }, 120);
}

// ==========================================
// INTERAÇÕES
// ==========================================

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

document.addEventListener("DOMContentLoaded", () => {
  loadMetaPixel();

  document.querySelectorAll(".js-whatsapp").forEach((button) => {
    button.addEventListener("click", handleWhatsAppClick);
  });

  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
});
