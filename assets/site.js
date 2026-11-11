document.addEventListener("DOMContentLoaded", function () {
  // Highlight the current page in the main navigation.
  const path = window.location.pathname.replace(/index\.html$/i, "");
  const currentPath = path.endsWith("/") ? path : path + "/";
  document.querySelectorAll(".desktop-nav a, .mobile-nav a").forEach(function (link) {
    try {
      const linkPathname = new URL(link.href, window.location.origin).pathname.replace(/index\.html$/i, "");
      const linkPath = linkPathname.endsWith("/") ? linkPathname : linkPathname + "/";
      if (linkPath === currentPath) link.setAttribute("aria-current", "page");
    } catch (_) {}
  });

  document.querySelectorAll(".mobile-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      const menu = link.closest("details");
      if (menu) menu.open = false;
    });
  });

  document.querySelectorAll("[data-current-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  // Build one shared, accessible warning dialog for all pages.
  const dialog = document.createElement("dialog");
  dialog.className = "warning-dialog";
  dialog.id = "uziey-warning-dialog";
  dialog.setAttribute("aria-labelledby", "uziey-warning-title");
  dialog.setAttribute("aria-describedby", "uziey-warning-intro");
  dialog.innerHTML =
    '<div class="warning-dialog__header">' +
      '<p class="warning-dialog__eyebrow">Notis penting Uziey Family</p>' +
      '<h2 id="uziey-warning-title">⚠️ CASH ONLY &amp; AMARAN KESELAMATAN QR CODE</h2>' +
    '</div>' +
    '<div class="warning-dialog__body">' +
      '<p id="uziey-warning-intro"><strong>Sila baca sebelum membuat sebarang pembayaran.</strong> Makluman ini dipaparkan untuk mengelakkan kekeliruan dan melindungi pelanggan daripada pautan atau kod QR palsu.</p>' +
      '<section class="warning-dialog__section" id="uziey-warning-payment" tabindex="-1">' +
        '<h3>💵 CASH ONLY – BAYARAN TUNAI SAHAJA</h3>' +
        '<p><strong>Bayaran cashless / tanpa tunai melalui QR Code tidak boleh digunakan buat masa ini.</strong></p>' +
        '<p>Sila sediakan wang tunai untuk semua urusan pembayaran di Kedai Print dan Fotostat Uziey Family. Jangan membuat bayaran melalui QR Code atau akaun yang tidak disahkan oleh pihak kedai.</p>' +
      '</section>' +
      '<section class="warning-dialog__section" id="uziey-warning-qr" tabindex="-1">' +
        '<h3>🛡️ AMARAN HACK / PENIPUAN QR CODE</h3>' +
        '<p>Berhati-hati dengan QR Code palsu, pelekat QR yang ditukar, pautan mencurigakan atau permintaan bayaran yang menyamar sebagai pihak Uziey Family.</p>' +
        '<p><strong>Jangan imbas QR Code yang tidak disahkan, jangan buka pautan mencurigakan dan jangan masukkan kata laluan, OTP atau maklumat bank selepas mengimbas kod yang meragukan.</strong></p>' +
        '<p>Jika menerima arahan pembayaran yang meragukan, hentikan urusan dan sahkan terus dengan Uziey Family melalui nombor rasmi <a href="https://wa.me/601158769834" target="_blank" rel="noopener noreferrer">WhatsApp +6011-58769834</a>.</p>' +
      '</section>' +
      '<p class="small-note">Notis ini tidak meminta pelanggan membuat pembayaran dalam talian. Kaedah pembayaran yang dimaklumkan sekarang ialah tunai sahaja.</p>' +
    '</div>' +
    '<div class="warning-dialog__footer">' +
      '<button class="warning-dialog__close" type="button" data-close-warning>Saya Faham – Tutup</button>' +
    '</div>';
  document.body.appendChild(dialog);

  function markSeen() {
    try { window.sessionStorage.setItem("uzieyWarningPopupSeen", "1"); } catch (_) {}
  }

  function closeWarning() {
    if (typeof dialog.close === "function" && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  function openWarning(topic) {
    try {
      if (typeof dialog.showModal === "function") {
        if (!dialog.open) dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    } catch (error) {
      // Fallback for browsers that do not support the native dialog API.
      dialog.setAttribute("open", "");
    }
    markSeen();

    const target = dialog.querySelector(topic === "qr" ? "#uziey-warning-qr" : "#uziey-warning-payment");
    if (target) {
      target.scrollIntoView({ block: "nearest" });
      try { target.focus({ preventScroll: true }); } catch (_) { target.focus(); }
    }
  }

  // Delegate clicks so every footer button and the homepage trigger work,
  // including buttons added by future page edits.
  document.addEventListener("click", function (event) {
    const clicked = event.target;
    if (!clicked || typeof clicked.closest !== "function") return;

    const opener = clicked.closest("[data-open-warning]");
    if (opener) {
      event.preventDefault();
      openWarning(opener.getAttribute("data-warning-topic"));
      return;
    }

    if (clicked.closest("[data-close-warning]")) {
      closeWarning();
    }
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) closeWarning();
  });

  // Show the complete notice once per browser tab session.
  let alreadySeen = false;
  try { alreadySeen = window.sessionStorage.getItem("uzieyWarningPopupSeen") === "1"; } catch (_) {}
  if (!alreadySeen) openWarning("payment");
});