const projectsData = {
  1: {
    title: "Sistema de Gestão Patrimonial com Rastreamento RFID via IoT",
    shortDescription:
      "Aplicação web para gestão de ativos corporativos com automação via IoT e leitura de tags RFID.",
    description:
      "Aplicação web para o gerenciamento de ativos corporativos, focada na automação através de IoT. O sistema permite o cadastro, movimentação e baixa de bens patrimoniais de forma automatizada através da leitura de tags RFID.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "Django",
      "SQLite",
      "RFID",
      "IoT",
      "ChartJS",
      "MQTT",
      "Django Bootstrap",
    ],
    images: [
      "assets/images/projects/rfid-django/logo.png",
      "assets/images/projects/rfid-django/dashboard.png",
      "assets/images/projects/rfid-django/CRUD.png",
    ],
    github:
      "https://github.com/castroandrade/Sistema-Web-para-Gestao-de-Patrimonio-com-Django",
  },
  2: {
    title: "iLearn - Sistema de Aprendizagem Online",
    shortDescription:
      "Sistema completo de E-learning (LMS) com catálogo de cursos, carrinho de compras e integração real de pagamentos via Mercado Pago.",
    description:
      "O iLearn é uma plataforma robusta de ensino a distância desenvolvida para gerenciar todo o ciclo de vida do aprendizado online. O sistema oferece uma experiência de e-commerce completa, permitindo que usuários naveguem por categorias, adicionem cursos ao carrinho e realizem pagamentos seguros através da API do Mercado Pago., com integração de APIs, gerenciamento de estado e otimizações de performance. A arquitetura foi pensada para escalabilidade e manutenibilidade.",
    technologies: [
      "Python",
      "Django",
      "PostgreSQL",
      "REST API",
      "Html",
      "CSS",
      "JavaScript",
    ],
    images: [
      "assets/images/projects/ilearn/logo.png",
      "assets/images/projects/ilearn/login.png",
      "assets/images/projects/ilearn/checkout.png",
      "assets/images/projects/ilearn/catalogo.png",
    ],
    github: "https://github.com/castroandrade/ilearn-django",
  },
  3: {
    title: "Refil Sustentável - ESC 2025",
    shortDescription:
      "Solução IoT de Vending Machine para líquidos a granel. Integra hardware (BitDogLab) e pagamentos via Pix em tempo real para automação de dispensers.",
    description:
      "Projeto desenvolvido para a Embedded Systems Competition (ESC) 2025. Trata-se de um sistema completo para automação de venda de produtos a granel (como produtos de limpeza), visando a redução de plásticos. O sistema opera em arquitetura multitarefa (não-bloqueante) no microcontrolador Raspberry Pi Pico W.",
    technologies: ["C++", "Arduino", "Raspberry Pi", "HTML", "CSS", "API"],
    images: [
      "assets/images/projects/refil-sustentavel/logo.png",
      "assets/images/projects/refil-sustentavel/menu.png",
    ],
    github: "https://github.com/castroandrade/Refil-Sustentavel-ESC2025",
  },
  4: {
    title: "Segmentação de Clientes com K-Means",
    shortDescription:
      "Aplicação de Machine Learning não supervisionado para agrupar clientes em perfis de consumo, permitindo estratégias de marketing personalizadas baseadas em renda e pontuação de gastos.",
    description:
      "Este projeto utiliza técnicas de Data Science e Machine Learning Não Supervisionado para transformar dados brutos de um shopping center em insights estratégicos. Através do algoritmo K-Means (otimizado via Método do Cotovelo), identifiquei 5 clusters comportamentais distintos baseados na relação entre Renda Anual e Score de Gastos.",
    technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "K-Means"],
    images: [
      "assets/images/projects/kmeans-clients/logo.png",
    ],
    github: "https://github.com/castroandrade/segmentacao-clientes-kmeans",
  },
};
