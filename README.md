# Projeto —  Portfólio 

Website de portfólio profissional desenvolvido para a disciplina de **Laboratório de Desenvolvimento de Software** (PUC Minas — Engenharia de Software, Prof. Glender Brás). O objetivo é apresentar trajetória, habilidades, projetos e formas de contato de maneira moderna e acessível.

> Status atual: **Sprint 1 (Lab01S01)** — planejamento, wireframes e protótipo inicial do front-end.

## Sobre o projeto

O site é dividido em **2 páginas**, cobrindo as 4 seções exigidas pelo laboratório sem a necessidade de uma rota por seção:

| Página | Rota | Seções |
|---|---|---|
| Home | `/` | Hero, Stack tecnológica, **Projetos**, **Contato** |
| Sobre | `/sobre` | **Sobre Mim** (PT/EN), **Experiências** |

Nesta primeira entrega, a página **Home** está implementada com o layout, navegação e componentes principais — ainda com conteúdo de placeholder, que será substituído pelas informações reais nas próximas sprints.

## Tecnologias utilizadas

- [React](https://react.dev/) — biblioteca de interface
- [Vite](https://vitejs.dev/) — build tool e dev server
- [React Router DOM](https://reactrouter.com/) — navegação entre páginas
- [Tailwind CSS](https://tailwindcss.com/) — estilização utilitária
- Fontes: [Inter](https://fonts.google.com/specimen/Inter) (texto) e [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (elementos mono/terminal)

## Estrutura do repositório

O repositório separa **documentação** do **código-fonte** em pastas próprias na raiz:

```
Projeto-Portifolio/
├── README.md
├── docs/
│   └── wireframe/                 # prints dos wireframes (Figma, média fidelidade)
│       ├── wireframe_home_page_1.jpg
│       ├── wireframe_home_page_2.jpg
│       └── wireframe_sobre_mim.jpg
└── codigo/                        # aplicação React + Vite
    ├── index.html
    ├── vercel.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx                # ponto de entrada + BrowserRouter
        ├── App.jsx                 # definição das rotas (/ e /sobre)
        ├── index.css               # diretivas Tailwind + estilos globais
        ├── pages/
        │   ├── Home.jsx             # composição da página inicial
        │   └── Sobre.jsx            # placeholder — Sobre Mim + Experiências
        ├── components/
        │   ├── layout/
        │   │   ├── Navbar.jsx        # navbar flutuante + popover de música
        │   │   └── AmbientGlow.jsx   # glow de fundo reutilizado nas páginas
        │   ├── sections/
        │   │   ├── Hero.jsx
        │   │   ├── TechStack.jsx
        │   │   ├── Projects.jsx
        │   │   ├── ProjectCard.jsx
        │   │   └── Contact.jsx
        │   └── ui/
        │       └── icons.jsx         # ícones SVG usados nas seções
        └── data/
            ├── projects.js           # conteúdo dos cards de projeto (placeholder)
            └── tracks.js             # trilhas do popover de música
```


## Como rodar localmente

```bash
cd codigo
npm install
npm run dev
```

O projeto abre por padrão em `http://localhost:5173`.

Para gerar a versão de produção:

```bash
cd codigo
npm run build
npm run preview
```

## Protótipos (Figma)

Wireframes de média fidelidade da Home e da página Sobre:

![Wireframe da Home — hero, stack tecnológica e início da seção de projetos](./docs/wireframe/wireframe_home_page_1.jpg)

![Wireframe da Home — projetos em destaque e seção de contato](./docs/wireframe/wireframe_home_page_2.jpg)

![Wireframe da página Sobre Mim](./docs/wireframe/wireframe_sobre_mim.jpg)

Link do protótipo no Figma: `_a adicionar_`

## Deploy

Ainda não publicado — previsto para a Sprint 3 (Vercel).

Link do site publicado: `_a adicionar_`

## Roadmap das sprints

- [x] **Lab01S01** — Repositório + README inicial, wireframes, protótipo do front-end, navegação e layout principal
- [ ] **Lab01S02** — Conteúdo real das páginas Sobre Mim (PT/EN), Projetos (timeline dinâmica), Experiências e Contato (formulário funcional)
- [ ] **Lab01S03** — Deploy, ajustes finais de UI/UX e imagens/GIFs reais dos projetos
