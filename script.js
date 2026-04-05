(() => {
  const consentStorageKey = "sierraservices-cookie-consent";
  const clarityProjectId = "vqp657dphp";
  const menuToggle = document.getElementById("menu-toggle");
  const siteNav = document.getElementById("site-nav");
  const header = document.querySelector(".site-header");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a[data-page]"));
  const revealNodes = Array.from(document.querySelectorAll("[data-reveal]"));
  const currentYear = document.getElementById("year");
  const pageId = document.body.getAttribute("data-page");
  const contactForm = document.querySelector("[data-formspree-form]");
  const formStatus = document.querySelector("[data-form-status]");
  const cookieSettingsButtons = Array.from(document.querySelectorAll("[data-open-cookie-settings]"));
  const calendlyShell = document.querySelector("[data-calendly-shell]");
  const calendlyLoadButton = document.querySelector("[data-calendly-load]");
  const calendlyInlineHost = document.querySelector("[data-calendly-inline]");
  const calendlyStatus = document.querySelector("[data-calendly-status]");
  let consentBanner;
  let hasRedirectedAfterBooking = false;
  let clarityLoadPromise;
  let calendlyLoadPromise;

  const loadScript = (src, attributes = {}) =>
    new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        if (existingScript.dataset.loaded === "true") {
          resolve(existingScript);
          return;
        }

        existingScript.addEventListener("load", () => resolve(existingScript), { once: true });
        existingScript.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
          once: true
        });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      Object.entries(attributes).forEach(([name, value]) => {
        if (value === true) {
          script.setAttribute(name, "");
          return;
        }

        script.setAttribute(name, String(value));
      });
      script.addEventListener(
        "load",
        () => {
          script.dataset.loaded = "true";
          resolve(script);
        },
        { once: true }
      );
      script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
        once: true
      });
      document.head.appendChild(script);
    });

  const loadStylesheet = (href) =>
    new Promise((resolve, reject) => {
      const existingLink = document.querySelector(`link[href="${href}"]`);
      if (existingLink) {
        resolve(existingLink);
        return;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.addEventListener("load", () => resolve(link), { once: true });
      link.addEventListener("error", () => reject(new Error(`Failed to load ${href}`)), {
        once: true
      });
      document.head.appendChild(link);
    });

  const ensureClarity = async () => {
    if (typeof window.clarity === "function") {
      return window.clarity;
    }

    if (!clarityLoadPromise) {
      clarityLoadPromise = loadScript(`https://www.clarity.ms/tag/${clarityProjectId}`, { async: true })
        .then(() => window.clarity)
        .catch((error) => {
          clarityLoadPromise = undefined;
          throw error;
        });
    }

    return clarityLoadPromise;
  };

  const applyClarityConsent = async (status) => {
    try {
      const clarity = await ensureClarity();
      if (typeof clarity === "function") {
        clarity("consentv2", {
          ad_Storage: "denied",
          analytics_Storage: status === "granted" ? "granted" : "denied"
        });
      }
    } catch (error) {
      // Keep the page usable if the analytics script fails to load.
    }
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
      consentBanner.remove();
      consentBanner = null;
    }
  };

  const openConsentBanner = ({ moveFocus = false } = {}) => {
    if (!consentBanner) {
      createConsentBanner();
    }

    if (!consentBanner) {
      return;
    }

    consentBanner.hidden = false;

    if (moveFocus) {
      window.requestAnimationFrame(() => {
        const primaryAction = consentBanner.querySelector("[data-consent-action='grant']");
        if (primaryAction instanceof HTMLElement) {
          primaryAction.focus();
        }
      });
    }
  };

  const createConsentBanner = () => {
    if (consentBanner) {
      return;
    }

    consentBanner = document.createElement("section");
    consentBanner.className = "cookie-banner";
    consentBanner.setAttribute("aria-labelledby", "cookie-banner-title");
    consentBanner.setAttribute("aria-describedby", "cookie-banner-description");
    consentBanner.hidden = true;
    consentBanner.innerHTML = `
      <div class="cookie-banner__copy">
        <p class="cookie-banner__title" id="cookie-banner-title">Cookie settings</p>
        <p class="cookie-banner__text" id="cookie-banner-description">
          This website uses limited analytics by default to understand visits and improve the experience.
          If you accept analytics cookies, visits can also be recognised across pages and sessions for more complete measurement.
        </p>
      </div>
      <div class="cookie-banner__actions">
        <button type="button" class="btn btn-secondary cookie-banner__button" data-consent-action="deny">Decline</button>
        <button type="button" class="btn btn-primary cookie-banner__button" data-consent-action="grant">Accept analytics</button>
      </div>
    `;

    consentBanner.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-consent-action]");
      if (!trigger) {
        return;
      }

      setConsent(trigger.dataset.consentAction === "grant" ? "granted" : "denied");
    });

    document.body.appendChild(consentBanner);
  };

  const setFormStatus = (message, state = "") => {
    if (!formStatus) {
      return;
    }

    formStatus.textContent = message;
    formStatus.dataset.state = state;
  };

  const handleContactFormSubmit = async (event) => {
    event.preventDefault();

    if (!contactForm) {
      return;
    }

    const submitButton = contactForm.querySelector('[type="submit"]');
    const originalLabel = submitButton ? submitButton.textContent : "";
    const formData = new FormData(contactForm);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
    setFormStatus("Sending your message...", "pending");

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method || "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }

      contactForm.reset();
      setFormStatus("Thanks. Your message has been sent.", "success");
      window.location.assign("thank-you?source=form");
    } catch (error) {
      setFormStatus(
        "I could not send your message right now. Please try again or email me directly.",
        "error"
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  };

  const setupContactForm = () => {
    if (!contactForm) {
      return;
    }

    contactForm.addEventListener("submit", handleContactFormSubmit);
  };

  const isCalendlyMessage = (event) => {
    if (!event || typeof event.data !== "object" || !event.data) {
      return false;
    }

    return typeof event.data.event === "string" && event.data.event.startsWith("calendly.");
  };

  const setCalendlyStatus = (message, state = "") => {
    if (!calendlyStatus) {
      return;
    }

    calendlyStatus.textContent = message;
    calendlyStatus.dataset.state = state;
  };

  const loadCalendlyWidget = async () => {
    if (!calendlyShell || !calendlyInlineHost) {
      return;
    }

    if (calendlyInlineHost.dataset.ready === "true") {
      return;
    }

    if (!calendlyLoadPromise) {
      calendlyLoadPromise = (async () => {
        const bookingUrl = calendlyShell.dataset.url;
        if (!bookingUrl) {
          throw new Error("Calendly URL is missing.");
        }

        if (calendlyLoadButton) {
          calendlyLoadButton.disabled = true;
          calendlyLoadButton.textContent = "Loading calendar...";
        }
        setCalendlyStatus("Loading available times...", "pending");

        await loadStylesheet("https://assets.calendly.com/assets/external/widget.css");
        await loadScript("https://assets.calendly.com/assets/external/widget.js", { async: true });

        if (!window.Calendly || typeof window.Calendly.initInlineWidget !== "function") {
          throw new Error("Calendly did not initialize.");
        }

        window.Calendly.initInlineWidget({
          url: bookingUrl,
          parentElement: calendlyInlineHost,
          resize: true
        });

        calendlyInlineHost.dataset.ready = "true";
        calendlyShell.classList.add("is-loaded");
        setCalendlyStatus("The booking calendar is ready.", "success");
        if (calendlyLoadButton) {
          calendlyLoadButton.remove();
        }
      })().catch((error) => {
        calendlyLoadPromise = undefined;
        if (calendlyLoadButton) {
          calendlyLoadButton.disabled = false;
          calendlyLoadButton.textContent = "Load booking calendar";
        }
        setCalendlyStatus(
          "I could not load the calendar right now. Please try again or open Calendly in a new tab.",
          "error"
        );
        throw error;
      });
    }

    return calendlyLoadPromise;
  };

  const setupCalendlyRedirect = () => {
    if (pageId !== "contact") {
      return;
    }

    if (calendlyLoadButton) {
      calendlyLoadButton.addEventListener("click", () => {
        loadCalendlyWidget().catch(() => {
          // The UI already shows the error state.
        });
      });
    }

    window.addEventListener("message", (event) => {
      if (hasRedirectedAfterBooking) {
        return;
      }

      if (!["https://calendly.com", "https://assets.calendly.com"].includes(event.origin)) {
        return;
      }

      if (!isCalendlyMessage(event) || event.data.event !== "calendly.event_scheduled") {
        return;
      }

      hasRedirectedAfterBooking = true;
      window.location.assign("thank-you?source=calendly");
    });
  };

  const setupThankYouPage = () => {
    if (pageId !== "thank-you") {
      return;
    }

    const titleNode = document.querySelector("[data-thank-you-title]");
    const messageNode = document.querySelector("[data-thank-you-message]");
    const detailNode = document.querySelector("[data-thank-you-detail]");
    const params = new URLSearchParams(window.location.search);
    const source = params.get("source");

    const contentBySource = {
      calendly: {
        title: "Your consultation is booked",
        message: "Your meeting is confirmed. You should receive a calendar confirmation email shortly.",
        detail:
          "If you would like me to prepare in advance, feel free to reply with your website, current tools, or the main bottleneck you want to solve first."
      },
      form: {
        title: "Your message is on its way",
        message: "Thanks for reaching out. I will review your message and come back with practical next steps.",
        detail:
          "If your request is time-sensitive, you can also send a WhatsApp message and mention that you already submitted the contact form."
      }
    };

    const content = contentBySource[source] || {
      title: "Thank you",
      message: "Your enquiry has been received.",
      detail: "You can return to the site or book a consultation if you would like to move faster."
    };

    if (titleNode) {
      titleNode.textContent = content.title;
    }

    if (messageNode) {
      messageNode.textContent = content.message;
    }

    if (detailNode) {
      detailNode.textContent = content.detail;
    }
  };

  const setMenuOpen = (isOpen) => {
    if (!siteNav || !menuToggle) {
      return;
    }

    siteNav.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  };

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      setMenuOpen(!siteNav.classList.contains("open"));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("click", (event) => {
      if (!siteNav.classList.contains("open")) {
        return;
      }

      const target = event.target;
      if (
        target instanceof Node &&
        !siteNav.contains(target) &&
        !menuToggle.contains(target)
      ) {
        setMenuOpen(false);
      }
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
      const isCurrentPage = link.dataset.page === pageId;
      link.classList.toggle("active", isCurrentPage);
      if (isCurrentPage) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
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

  cookieSettingsButtons.forEach((button) => {
    button.addEventListener("click", () => openConsentBanner({ moveFocus: true }));
  });

  setupContactForm();
  setupCalendlyRedirect();
  setupThankYouPage();

  const storedConsent = readConsent();
  if (storedConsent === "granted" || storedConsent === "denied") {
    applyClarityConsent(storedConsent);
  } else {
    applyClarityConsent("denied");
    openConsentBanner();
  }
})();
