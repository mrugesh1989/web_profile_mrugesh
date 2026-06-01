(function () {
  const header = document.getElementById("header");
  const nav = document.querySelector(".nav-links");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll("section[id]");
  const reveals = document.querySelectorAll(".reveal");
  const heroRotate = document.getElementById("hero-rotate");

  const phrases = [
    "intelligent systems",
    "lakehouse platforms",
    "LLM applications",
    "model pipelines",
  ];
  let phraseIndex = 0;

  if (heroRotate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      heroRotate.style.opacity = "0";
      heroRotate.style.transform = "translateY(8px)";
      setTimeout(() => {
        heroRotate.textContent = phrases[phraseIndex];
        heroRotate.style.opacity = "1";
        heroRotate.style.transform = "translateY(0)";
      }, 280);
    }, 3200);
    heroRotate.style.transition = "opacity 0.28s ease, transform 0.28s ease";
  }

  const onScroll = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }

    const scrollY = window.scrollY + 140;
    let current = "";

    sections.forEach((section) => {
      if (scrollY >= section.offsetTop) {
        current = section.getAttribute("id");
      }
    });

    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseInt(el.getAttribute("data-count"), 10);
    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const suffix = el.textContent.includes("+") ? "+" : "";
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          return;
        }
        const duration = 1200;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.floor(eased * target);
          el.textContent = (value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value) + suffix;

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = (target >= 1000 ? `${target / 1000}K` : target) + suffix;
          }
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
  });
})();
