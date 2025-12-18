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
document
  .querySelectorAll('header .nav-link[href^="#"], .hero-buttons a[href^="#"]')
  .forEach((anchor) => {
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
      // Remove a classe primeiro para resetar a animação
      entry.target.classList.remove("animate");
      entry.target.style.animation = "none";

      // Pequeno delay para garantir que o reset seja processado
      setTimeout(() => {
        entry.target.style.animation = "";
        entry.target.classList.add("animate");

        // Adiciona delay escalonado para cards em grid
        if (
          entry.target.classList.contains("project-card") ||
          entry.target.classList.contains("skill-card")
        ) {
          const siblings = Array.from(entry.target.parentElement.children);
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.15}s`;
        }
      }, 10);
    } else {
      // Remove a classe quando sai da viewport para poder animar novamente
      entry.target.classList.remove("animate");
      entry.target.style.transitionDelay = "0s";
      entry.target.style.animation = "none";
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
        // Remove primeiro para resetar
        entry.target.classList.remove("section-enter");
        entry.target.style.animation = "none";

        // Pequeno delay para garantir que o reset seja processado
        setTimeout(() => {
          entry.target.style.animation = "";
          entry.target.classList.add("section-enter");
        }, 10);
      } else {
        // Remove quando sai da viewport
        entry.target.classList.remove("section-enter");
        entry.target.style.animation = "none";
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
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

// Os dados são carregados do arquivo data/projects-data.js

// MODAL DE PROJETO
const modal = document.getElementById("project-modal");
const modalClose = document.querySelector(".modal-close");
const modalOverlay = document.querySelector(".modal-overlay");
const carouselTrack = document.getElementById("carousel-track");
const carouselIndicators = document.getElementById("carousel-indicators");
const carouselPrev = document.querySelector(".carousel-prev");
const carouselNext = document.querySelector(".carousel-next");

let currentImageIndex = 0;
let currentProjectId = null;

window.addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (!card) return;

  // Não abrir se clicar em um link dentro do card
  if (e.target.closest("a")) return;

  const projectId = card.getAttribute("data-project");
  openModal(projectId);
});

// Fechar modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
  currentImageIndex = 0;
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// Fechar com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

// Abrir modal
function openModal(projectId) {
  const project = projectsData[projectId];
  if (!project) return;

  currentProjectId = projectId;
  currentImageIndex = 0;

  // Atualizar conteúdo do modal
  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-description-text").textContent =
    project.description;
  document.getElementById("modal-github").href = project.github;

  // Atualizar tecnologias
  const techStack = document.getElementById("modal-tech-stack");
  techStack.innerHTML = "";
  project.technologies.forEach((tech) => {
    const badge = document.createElement("span");
    badge.className = "tech-badge";
    badge.textContent = tech;
    techStack.appendChild(badge);
  });

  // Criar carrossel de imagens
  carouselTrack.innerHTML = "";
  carouselIndicators.innerHTML = "";

  project.images.forEach((imagePath, index) => {
    // Slide
    const slide = document.createElement("div");
    slide.className = "carousel-slide";

    // Se for string (caminho de imagem), criar img tag
    // Se for número, usar placeholder
    if (typeof imagePath === "string") {
      const img = document.createElement("img");
      img.src = imagePath;
      img.alt = `${project.title} - Imagem ${index + 1}`;
      slide.appendChild(img);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "project-placeholder";
      slide.appendChild(placeholder);
    }

    carouselTrack.appendChild(slide);

    // Indicador
    const indicator = document.createElement("div");
    indicator.className = "carousel-indicator";
    if (index === 0) indicator.classList.add("active");
    indicator.addEventListener("click", () => goToImage(index));
    carouselIndicators.appendChild(indicator);
  });

  // Mostrar modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  updateCarousel();
}

// Navegação do carrossel
function goToImage(index) {
  const project = projectsData[currentProjectId];
  if (!project || index < 0 || index >= project.images.length) return;

  currentImageIndex = index;
  updateCarousel();
}

function nextImage() {
  const project = projectsData[currentProjectId];
  if (!project) return;

  currentImageIndex = (currentImageIndex + 1) % project.images.length;
  updateCarousel();
}

function prevImage() {
  const project = projectsData[currentProjectId];
  if (!project) return;

  currentImageIndex =
    currentImageIndex === 0 ? project.images.length - 1 : currentImageIndex - 1;
  updateCarousel();
}

function updateCarousel() {
  const project = projectsData[currentProjectId];
  if (!project) return;

  // Mover carrossel
  carouselTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;

  // Atualizar indicadores
  const indicators = carouselIndicators.querySelectorAll(".carousel-indicator");
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentImageIndex);
  });
}

carouselNext.addEventListener("click", nextImage);
carouselPrev.addEventListener("click", prevImage);

// Navegação com teclado
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("active")) return;

  if (e.key === "ArrowLeft") {
    prevImage();
  } else if (e.key === "ArrowRight") {
    nextImage();
  }
});

// Renderizar cards de projetos a partir de projectsData
function renderProjectCards() {
  if (typeof projectsData === "undefined") return;

  const grid = document.querySelector(".projects-grid");
  if (!grid) return;

  grid.innerHTML = "";

  Object.entries(projectsData).forEach(([projectId, project]) => {
    const card = document.createElement("article");
    card.className = "card project-card";
    card.setAttribute("data-animate", "");
    card.setAttribute("data-project", projectId);

    const projectImage = document.createElement("div");
    projectImage.className = "project-image";
    projectImage.setAttribute("data-clickable", "");

    const placeholder = document.createElement("div");
    placeholder.className = "project-placeholder";

    // Imagem de capa do card (primeira imagem do projeto)
    if (Array.isArray(project.images) && project.images[0]) {
      placeholder.style.backgroundImage = `url(${project.images[0]})`;
      placeholder.style.backgroundSize = "cover";
      placeholder.style.backgroundPosition = "center";
      placeholder.style.backgroundRepeat = "no-repeat";
    }

    const overlay = document.createElement("div");
    overlay.className = "project-overlay";

    const viewBtn = document.createElement("span");
    viewBtn.className = "view-project-btn";
    viewBtn.textContent = "Ver Detalhes";

    overlay.appendChild(viewBtn);
    projectImage.appendChild(placeholder);
    projectImage.appendChild(overlay);

    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";

    const titleEl = document.createElement("h3");
    titleEl.textContent = project.title;

    const linksEl = document.createElement("div");
    linksEl.className = "project-links";

    const githubLink = document.createElement("a");
    githubLink.href = project.github || "#";
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";
    githubLink.setAttribute("aria-label", "Ver código no GitHub");
    githubLink.onclick = (e) => e.stopPropagation();

    const githubIcon = document.createElement("i");
    githubIcon.className = "ph ph-github-logo";

    githubLink.appendChild(githubIcon);
    linksEl.appendChild(githubLink);

    cardHeader.appendChild(titleEl);
    cardHeader.appendChild(linksEl);

    const descriptionEl = document.createElement("p");
    descriptionEl.textContent = project.shortDescription || project.description;

    const techStackEl = document.createElement("div");
    techStackEl.className = "tech-stack";

    if (Array.isArray(project.technologies)) {
      project.technologies.forEach((tech) => {
        const span = document.createElement("span");
        span.className = "tech-badge";
        span.textContent = tech;
        techStackEl.appendChild(span);
      });
    }

    card.appendChild(projectImage);
    card.appendChild(cardHeader);
    card.appendChild(descriptionEl);
    card.appendChild(techStackEl);

    grid.appendChild(card);

    // Garantir que o IntersectionObserver anime os novos cards
    if (typeof observer !== "undefined") {
      observer.observe(card);
    }
  });
}

// Garantir que os cards sejam renderizados após o carregamento da página
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderProjectCards);
} else {
  renderProjectCards();
}
