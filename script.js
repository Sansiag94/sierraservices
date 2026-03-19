(() => {
  const consentStorageKey = "sierraservices-cookie-consent";
  const menuToggle = document.getElementById("menu-toggle");
  const siteNav = document.getElementById("site-nav");
  const header = document.querySelector(".site-header");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a[data-page]"));
  const revealNodes = Array.from(document.querySelectorAll("[data-reveal]"));
  const currentYear = document.getElementById("year");
  const pageId = document.body.getAttribute("data-page");
  const footerWrap = document.querySelector(".footer-wrap");
  let consentBanner;

  const applyClarityConsent = (status) => {
    if (typeof window.clarity !== "function") {
      return;
    }

    window.clarity("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: status === "granted" ? "granted" : "denied"
    });
  };

  const readConsent = () => {
    try {
      return window.localStorage.getItem(consentStorageKey);
    } catch (error) {
      return null;
    }
  };

  const writeConsent = (status) => {
    try {
      window.localStorage.setItem(consentStorageKey, status);
    } catch (error) {
      return;
    }
  };

  const setConsent = (status) => {
    writeConsent(status);
    applyClarityConsent(status);
    if (consentBanner) {
      consentBanner.hidden = true;
    }
  };

  const openConsentBanner = () => {
    if (!consentBanner) {
      return;
    }
    consentBanner.hidden = false;
  };

  const createConsentBanner = () => {
    consentBanner = document.createElement("section");
    consentBanner.className = "cookie-banner";
    consentBanner.setAttribute("aria-label", "Cookie preferences");
    consentBanner.hidden = true;
    consentBanner.innerHTML = `
      <div class="cookie-banner__copy">
        <p class="cookie-banner__title">Cookie settings</p>
        <p class="cookie-banner__text">
          This website uses optional analytics cookies to understand how visitors use the site and improve the experience.
          Accepting analytics cookies helps keep your visit connected as you move between pages.
        </p>
      </div>
      <div class="cookie-banner__actions">
        <button type="button" class="btn btn-secondary cookie-banner__button" data-consent-action="deny">Decline</button>
        <button type="button" class="btn btn-primary cookie-banner__button" data-consent-action="grant">Accept analytics</button>
      </div>
    `;

    consentBanner.querySelector('[data-consent-action="deny"]').addEventListener("click", () => {
      setConsent("denied");
    });

    consentBanner.querySelector('[data-consent-action="grant"]').addEventListener("click", () => {
      setConsent("granted");
    });

    document.body.appendChild(consentBanner);
  };

  const createCookieSettingsButton = () => {
    if (!footerWrap) {
      return;
    }

    const settingsButton = document.createElement("button");
    settingsButton.type = "button";
    settingsButton.className = "footer-link-button";
    settingsButton.textContent = "Cookie Settings";
    settingsButton.addEventListener("click", openConsentBanner);
    footerWrap.appendChild(settingsButton);
  };

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

  createConsentBanner();
  createCookieSettingsButton();

  const storedConsent = readConsent();
  if (storedConsent === "granted" || storedConsent === "denied") {
    applyClarityConsent(storedConsent);
  } else {
    openConsentBanner();
  }
})();
