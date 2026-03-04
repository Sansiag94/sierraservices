(() => {
  const menuToggle = document.getElementById("menu-toggle");
  const siteNav = document.getElementById("site-nav");
  const header = document.querySelector(".site-header");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a[data-page]"));
  const revealNodes = Array.from(document.querySelectorAll("[data-reveal]"));
  const currentYear = document.getElementById("year");
  const pageId = document.body.getAttribute("data-page");

  const setMenuOpen = (isOpen) => {
    if (!siteNav || !menuToggle) {
      return;
    }
    siteNav.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  };

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      setMenuOpen(!siteNav.classList.contains("open"));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    });
  }

  if (header) {
    const syncHeader = () => {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  if (pageId) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.page === pageId);
    });
  }

  if ("IntersectionObserver" in window && revealNodes.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -24px 0px" }
    );

    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  }

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
})();
