(function () {
  const nav = document.querySelector(".nav-links");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll("section[id]");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const setActive = () => {
    const scrollY = window.scrollY + 120;
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

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
})();
