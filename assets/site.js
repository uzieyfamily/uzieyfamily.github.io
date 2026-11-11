
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.replace(/index\.html$/, "").replace(/\/?$/, "/");
  document.querySelectorAll(".desktop-nav a, .mobile-nav a").forEach((link) => {
    const href = new URL(link.href, window.location.origin).pathname.replace(/\/?$/, "/");
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
});
