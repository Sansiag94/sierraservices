(() => {
    const navbar = document.getElementById("navbar");
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const navAnchors = Array.from(document.querySelectorAll(".nav-link, .mobile-nav-link"));

    const setMenuState = (isOpen) => {
        if (!mobileMenuButton || !mobileMenu) {
            return;
        }

        mobileMenu.classList.toggle("open", isOpen);
        document.body.classList.toggle("menu-open", isOpen && window.innerWidth < 768);
        mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
        mobileMenuButton.innerHTML = isOpen
            ? '<i class="fas fa-times text-2xl"></i>'
            : '<i class="fas fa-bars text-2xl"></i>';
    };

    if (mobileMenuButton && mobileMenu) {
        setMenuState(false);
        mobileMenuButton.addEventListener("click", () => {
            setMenuState(!mobileMenu.classList.contains("open"));
        });
    }

    document.addEventListener("click", (e) => {
        if (!mobileMenu || !mobileMenuButton || !navbar) {
            return;
        }

        if (mobileMenu.classList.contains("open") && !navbar.contains(e.target)) {
            setMenuState(false);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            setMenuState(false);
        }
    });

    const setActiveNav = () => {
        if (!navbar) {
            return;
        }

        const sections = Array.from(document.querySelectorAll("section[id]"));
        if (sections.length === 0) {
            return;
        }

        const scrollMark = window.scrollY + navbar.offsetHeight + 120;
        let activeId = sections[0].id;

        sections.forEach((section) => {
            if (scrollMark >= section.offsetTop) {
                activeId = section.id;
            }
        });

        navAnchors.forEach((anchor) => {
            const href = anchor.getAttribute("href");
            if (!href) {
                return;
            }

            const url = new URL(href, window.location.href);
            const isSamePage = url.pathname === window.location.pathname;
            const isActive = isSamePage && url.hash === `#${activeId}`;
            anchor.classList.toggle("active", isActive);
        });
    };

    document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const href = anchor.getAttribute("href");
            if (!href || href === "#") {
                return;
            }

            const url = new URL(href, window.location.href);
            const isSamePage = url.pathname === window.location.pathname;
            const hash = url.hash;

            if (isSamePage && hash.length > 1) {
                const targetElement = document.getElementById(hash.slice(1));
                if (targetElement && navbar) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - navbar.offsetHeight,
                        behavior: "smooth"
                    });
                }
            }

            if (window.innerWidth < 768) {
                setMenuState(false);
            }
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            setMenuState(false);
        }
    });

    const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (revealElements.length > 0) {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            revealElements.forEach((el) => el.classList.add("is-visible"));
        } else {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.18, rootMargin: "0px 0px -30px 0px" }
            );
            revealElements.forEach((el) => observer.observe(el));
        }
    }

    if (navbar) {
        const syncNavbarState = () => {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
            setActiveNav();
        };
        syncNavbarState();
        window.addEventListener("scroll", syncNavbarState);
    }
})();
