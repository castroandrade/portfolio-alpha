# Portfólio Minimalista - José Henrique

Portfólio pessoal desenvolvido com foco em **minimalismo**, **boa tipografia** e **experiência de usuário**, utilizando apenas **HTML**, **CSS puro** e **JavaScript**.

O objetivo é apresentar meus projetos, habilidades e formas de contato de maneira clara, responsiva e agradável visualmente.

---

## 🚀 Tecnologias Utilizadas

- **HTML5** – Estrutura semântica das páginas
- **CSS3** – Layout responsivo, animações e tema claro/escuro
- **JavaScript (vanilla)** – Interatividade, modais, carrossel e geração dinâmica dos cards
- **Phosphor Icons** – Ícones da interface
- **Google Fonts (Inter)** – Tipografia principal

---

## ✨ Principais Funcionalidades

- **Tema Claro/Escuro (Dark Mode)**

  - Botão no header que alterna o tema
  - Preferência salva em `localStorage`

- **Seções da Página**

  - **Home (Hero)**: apresentação, texto de resumo e botões de ação
  - **Sobre Mim**: texto mais detalhado + foto com efeito visual
  - **Projetos**: cards gerados dinamicamente a partir de um arquivo de dados
  - **Habilidades**: agrupadas por áreas (Frontend, Backend, Data Science, IoT, DevOps etc.)
  - **Contato**: formulário integrado ao Formspree (basta ajustar a action)
  - **Footer**: links para GitHub, LinkedIn e Instagram

- **Projetos Dinâmicos**

  - Os cards de projeto são gerados via JavaScript com base em `data/projects-data.js`
  - Cada projeto possui:
    - Título
    - Descrição curta e longa
    - Tecnologias utilizadas (array)
    - Lista de imagens
    - Link do GitHub

- **Modal de Detalhes do Projeto**

  - Ao clicar em um card, abre um modal com:
    - Título
    - Descrição detalhada
    - Carrossel de imagens do projeto
    - Tecnologias utilizadas
    - Link para o repositório no GitHub
  - Navegação por:
    - Botões anterior/próximo
    - Indicadores (bolinhas)
    - Teclado (setas esquerda/direita, ESC para fechar)

- **Animações e UX**
  - Scroll suave entre seções
  - Animações de entrada (fade/slide) com Intersection Observer
  - Efeitos de hover em cards, botões, fotos e ícones sociais
  - Efeito de **background** com shapes e parallax leve

---

## 📁 Estrutura do Projeto

```text
portfolio/
├── index.html          # Estrutura principal da página
├── style.css           # Estilos globais, layout e animações
├── script.js           # Lógica de tema, animações, projetos e modal
├── data/
│   └── projects-data.js    # Fonte de dados dos projetos exibidos na seção "Projetos"
├── assets/
│   └── images/
│       └── projects/       # Imagens dos projetos (organizadas por pasta)
│       └── profile/        # Fotos usadas no Hero e Sobre Mim
└── README.md          # Este arquivo
```

---

## 🔧 Como Rodar o Projeto Localmente

1. Clone o repositório:

```bash
git clone https://github.com/castroandrade/portfolio-alpha.git
cd portfolio-alpha
```

2. Abra o arquivo `index.html` diretamente no navegador
   - Clique duas vezes no arquivo **ou**
   - Use uma extensão de "Live Server" no VS Code / Cursor (opcional, mas recomendado)

Não há dependências de build: **apenas HTML, CSS e JS puro**.

---

## 🧩 Como Cadastrar / Editar Projetos

Os projetos exibidos na seção **Projetos** vêm do arquivo `data/projects-data.js`.

Exemplo de entrada:

```js
const projectsData = {
  1: {
    title: "Sistema de Gestão Patrimonial com Rastreamento RFID via IoT",
    shortDescription:
      "Aplicação web para gestão de ativos com automação via IoT e leitura de tags RFID.",
    description:
      "Aplicação web para o gerenciamento de ativos corporativos, focada na automação através de IoT. ...",
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
    ],
    images: [
      "assets/images/projects/projeto-1/image-1.jpg",
      "assets/images/projects/projeto-1/image-2.jpg",
      "assets/images/projects/projeto-1/image-3.jpg",
    ],
    github: "https://github.com/usuario/repositorio",
  },
  // ...
};
```

Para adicionar um novo projeto:

1. Crie uma pasta para o projeto em `assets/images/projects/SEU-PROJETO/`
2. Adicione as imagens do projeto nessa pasta
3. Adicione um novo objeto no `projectsData` com:
   - `title`
   - `shortDescription`
   - `description`
   - `technologies` (array de strings)
   - `images` (array de caminhos das imagens)
   - `github` (URL do repositório)

O card será criado **automaticamente** na interface.

---

## 👤 Fotos (Hero e Sobre Mim)

As fotos usadas na Hero e na seção Sobre Mim são referenciadas assim:

- Hero:

```html
<img src="assets/images/profile/hero-photo.jpg" alt="Foto de José Henrique" />
```

- Sobre Mim:

```html
<img
  src="assets/images/profile/about-photo.jpg"
  alt="José Henrique em ambiente de trabalho"
/>
```

Basta você criar a pasta e colocar as imagens:

```text
assets/images/profile/
├── hero-photo.jpg
└── about-photo.jpg
```

---

## 🌗 Tema Claro/Escuro

- O botão no header (`id="theme-toggle"`) alterna a classe `dark` no `body`
- As cores são todas baseadas em variáveis CSS (`:root` e `body.dark`)
- A preferência é salva em `localStorage` (`theme = "dark"`), então o tema é mantido entre visitas

---

## 💡 Possíveis Melhorias Futuras

- Internacionalização (PT-BR / EN)
- Seção de blog ou artigos técnicos
- Validação mais rica do formulário de contato

---

## 📄 Licença

Projeto criado para uso pessoal como portfólio.  
Sinta-se à vontade para se inspirar na estrutura e nas ideias, mas adapte o conteúdo (textos, imagens e dados) para a sua realidade antes de reutilizar.
