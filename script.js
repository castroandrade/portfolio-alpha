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
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observa todos os elementos com data-animate
document.querySelectorAll("[data-animate]").forEach((el) => {
  observer.observe(el);
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
