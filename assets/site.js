document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.replace(/index\\.html$/, "").replace(/\\/?$/, "/");
  document.querySelectorAll(".desktop-nav a, .mobile-nav a").forEach((link) => {
    const href = new URL(link.href, window.location.origin).pathname.replace(/\\/?$/, "/");
    if (href === currentPath) link.setAttribute("aria-current", "page");
  });

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = link.closest("details");
      if (menu) menu.open = false;
    });
  });

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const dialog = document.createElement("dialog");
  dialog.className = "warning-dialog";
  dialog.id = "uziey-warning-dialog";
  dialog.setAttribute("aria-labelledby", "uziey-warning-title");
  dialog.setAttribute("aria-describedby", "uziey-warning-intro");
  dialog.innerHTML = `
    <div class="warning-dialog__header">
      <p class="warning-dialog__eyebrow">Notis penting Uziey Family</p>
      <h2 id="uziey-warning-title">⚠️ CASH ONLY & AMARAN KESELAMATAN QR CODE</h2>
    </div>
    <div class="warning-dialog__body">
      <p id="uziey-warning-intro"><strong>Sila baca sebelum membuat sebarang pembayaran.</strong> Makluman ini dipaparkan untuk mengelakkan kekeliruan dan melindungi pelanggan daripada pautan atau kod QR palsu.</p>
      <section class="warning-dialog__section" id="uziey-warning-payment" tabindex="-1">
        <h3>💵 CASH ONLY – BAYARAN TUNAI SAHAJA</h3>
        <p><strong>Bayaran cashless / tanpa tunai melalui QR Code tidak boleh digunakan buat masa ini.</strong></p>
        <p>Sila sediakan wang tunai untuk semua urusan pembayaran di Kedai Print dan Fotostat Uziey Family. Jangan membuat bayaran melalui QR Code atau akaun yang tidak disahkan oleh pihak kedai.</p>
      </section>
      <section class="warning-dialog__section" id="uziey-warning-qr" tabindex="-1">
        <h3>🛡️ AMARAN HACK / PENIPUAN QR CODE</h3>
        <p>Berhati-hati dengan QR Code palsu, pelekat QR yang ditukar, pautan mencurigakan atau permintaan bayaran yang menyamar sebagai pihak Uziey Family.</p>
        <p><strong>Jangan imbas QR Code yang tidak disahkan, jangan buka pautan mencurigakan dan jangan masukkan kata laluan, OTP atau maklumat bank selepas mengimbas kod yang meragukan.</strong></p>
        <p>Jika menerima arahan pembayaran yang meragukan, hentikan urusan dan sahkan terus dengan Uziey Family melalui nombor rasmi <a href="https://wa.me/601158769834" target="_blank" rel="noopener noreferrer">WhatsApp +6011-58769834</a>.</p>
      </section>
      <p class="small-note">Notis ini tidak meminta pelanggan membuat pembayaran dalam talian. Kaedah pembayaran yang dimaklumkan sekarang ialah tunai sahaja.</p>
    </div>
    <div class="warning-dialog__footer">
      <button class="warning-dialog__close" type="button" data-close-warning>Saya Faham – Tutup</button>
    </div>
  `;
  document.body.appendChild(dialog);

  const markSeen = () => {
    try { window.sessionStorage.setItem("uzieyWarningPopupSeen", "1"); } catch (_) {}
  };
  const openWarning = (topic) => {
    if (!dialog.open) dialog.showModal();
    markSeen();
    const targetId = topic === "qr" ? "uziey-warning-qr" : "uziey-warning-payment";
    const target = document.getElementById(targetId);
    if (target) target.focus({ preventScroll: false });
  };

  document.querySelectorAll("[data-open-warning]").forEach((button) => {
    button.addEventListener("click", () => openWarning(button.getAttribute("data-warning-topic")));
  });
  dialog.querySelectorAll("[data-close-warning]").forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  let alreadySeen = false;
  try { alreadySeen = window.sessionStorage.getItem("uzieyWarningPopupSeen") === "1"; } catch (_) {}
  if (!alreadySeen) {
    dialog.showModal();
    markSeen();
  }
});
