(function () {
  const header = document.querySelector(".tvtt-site-header");

  if (!header) {
    return;
  }

  const toggle = header.querySelector(".tvtt-site-nav-toggle");
  const nav = header.querySelector(".tvtt-site-nav");
  const mobileQuery = window.matchMedia("(max-width: 960px)");
  const root = document.documentElement;

  if (!toggle || !nav) {
    return;
  }

  function syncHeaderHeight() {
    root.style.setProperty("--tvtt-header-height", header.getBoundingClientRect().height + "px");
  }

  function closeMenu() {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    syncHeaderHeight();
  }

  syncHeaderHeight();

  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(header);
  }

  window.addEventListener("resize", syncHeaderHeight);

  toggle.addEventListener("click", function () {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
      return;
    }

    header.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    syncHeaderHeight();
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (mobileQuery.matches) {
        closeMenu();
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  mobileQuery.addEventListener("change", function (event) {
    if (!event.matches) {
      closeMenu();
      return;
    }

    syncHeaderHeight();
  });
}());
