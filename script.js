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
  const contactForm = document.querySelector("[data-formspree-form]");
  const formStatus = document.querySelector("[data-form-status]");
  let consentBanner;
  let hasRedirectedAfterBooking = false;

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
      consentBanner.remove();
      consentBanner = null;
    }
  };

  const openConsentBanner = () => {
    if (!consentBanner) {
      createConsentBanner();
    }

    if (!consentBanner) {
      return;
    }

    consentBanner.hidden = false;
  };

  const createConsentBanner = () => {
    if (consentBanner) {
      return;
    }

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

    consentBanner.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-consent-action]");
      if (!trigger) {
        return;
      }

      setConsent(trigger.dataset.consentAction === "grant" ? "granted" : "denied");
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
      window.location.assign("thank-you.html?source=form");
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

  const setupCalendlyRedirect = () => {
    if (pageId !== "contact") {
      return;
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
      window.location.assign("thank-you.html?source=calendly");
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

  createCookieSettingsButton();
  setupContactForm();
  setupCalendlyRedirect();
  setupThankYouPage();

  const storedConsent = readConsent();
  if (storedConsent === "granted" || storedConsent === "denied") {
    applyClarityConsent(storedConsent);
  } else {
    openConsentBanner();
  }
})();
