// Theme Toggle
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const icon = themeToggleBtn.querySelector("i");

// Verifica se o usuário já tem preferência salva
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.classList.add(savedTheme);
  updateIcon();
}

themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  updateIcon();

  // Salva a preferência no navegador
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.removeItem("theme");
  }
});

function updateIcon() {
  if (body.classList.contains("dark")) {
    icon.classList.remove("ph-moon");
    icon.classList.add("ph-sun");
  } else {
    icon.classList.remove("ph-sun");
    icon.classList.add("ph-moon");
  }
}

// Scroll Suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Intersection Observer para animações ao scroll
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -80px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");

      // Adiciona delay escalonado para cards em grid
      if (
        entry.target.classList.contains("project-card") ||
        entry.target.classList.contains("skill-card")
      ) {
        const siblings = Array.from(entry.target.parentElement.children);
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
      }
    }
  });
}, observerOptions);

// Observa todos os elementos com data-animate
document.querySelectorAll("[data-animate]").forEach((el) => {
  observer.observe(el);
});

// Observer para seções completas
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-enter");
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  }
);

// Observa todas as seções
document.querySelectorAll("section").forEach((section) => {
  sectionObserver.observe(section);
});

// Highlight de seção ativa no menu
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function highlightActiveSection() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Atualiza a seção ativa ao rolar
window.addEventListener("scroll", highlightActiveSection);

// Atualiza na carga inicial
highlightActiveSection();

// Efeito Parallax nas formas de background
let ticking = false;

function updateParallax() {
  const scrollY = window.pageYOffset;
  const shapes = document.querySelectorAll(".shape");

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.2;
    const yPos = -(scrollY * speed);
    const xPos = Math.sin(scrollY * 0.0008) * 30 * (index + 1);

    // Mantém a animação CSS base e adiciona parallax
    if (shape.classList.contains("shape-3")) {
      shape.style.transform = `translate(calc(-50% + ${xPos}px), calc(-50% + ${yPos}px))`;
    } else {
      shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
  });

  ticking = false;
}

function requestParallaxTick() {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener("scroll", requestParallaxTick, { passive: true });

// Inicializa parallax
updateParallax();
