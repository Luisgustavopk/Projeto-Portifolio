# Portfólio — Luis Gustavo

Website de portfólio profissional desenvolvido para a disciplina de **Laboratório de Desenvolvimento de Software** (PUC Minas — Engenharia de Software, Prof. Glender Brás). O objetivo é apresentar trajetória, habilidades, projetos e formas de contato de maneira moderna e acessível.

> [!TIP]
> **Acesso rápido:** o site já está publicado, sem necessidade de instalação local.
> Acesse em: **[https://luis-gustavo-portifolio.vercel.app/](https://luis-gustavo-portifolio.vercel.app/)**


## Sobre o projeto

O site é dividido em **2 páginas**, cobrindo as 4 seções exigidas pelo laboratório sem a necessidade de uma rota por seção:

| Página | Rota | Seções |
|---|---|---|
| Home | `/` | Hero, robô 3D (opcional), Stack tecnológica, **Projetos**, **Contato** |
| Sobre | `/sobre` | **Sobre Mim** (PT/EN), **Experiências**, Interesses & Objetivos |

### Níveis de acesso (Sprint 2)

O navbar tem um seletor de perfil — **Visitante**, **Recrutador** ou **Técnico**. A escolha fica salva no navegador e muda a **ordem/prioridade** do conteúdo em ambas as páginas (nada é escondido, só reorganizado):

- **Recrutador** → banner com a experiência mais recente logo após o Hero; seção de Experiências vem primeiro na página Sobre; botão principal do Hero leva direto pra lá.
- **Técnico** → Projetos aparecem antes da faixa de stack na Home; botão principal do Hero foca em repositórios.
- **Visitante** → ordem padrão, visão equilibrada.

Documentação completa (requisitos, user stories e diagrama de casos de uso) em [`docs/requisitos-niveis-acesso.md`](./docs/requisitos-niveis-acesso.md).

### Detalhes de identidade visual

- **Stack tecnológica**: faixa em marquee contínuo (loop suave), com os logos de cada tecnologia puxados via hotlink de [logos.lndev.me](https://logos.lndev.me/) e forçados pra monocromático via CSS — funciona independente da cor original de cada marca.
- **Fundo reativo**: `TopoField` (campo topográfico em WebGL) e `AmbientGlow` reagem ao volume da música tocando, via Web Audio API (`AnalyserNode`).
- **Música (popover do disco de vinil)**: toca de verdade, baixinho. **Importante**: as 3 faixas (Baldur's Gate 3, Resident Evil, One Piece) são música comercial licenciada — os arquivos `.mp3` precisam ser colocados manualmente em `codigo/public/audio/` (não vêm no repositório).
- **Cards de projeto**: efeito de brilho que segue o cursor ao passar o mouse (`useSpotlight`).
- **Robô 3D de mesa** (`src/three/`): personagem original em Three.js/React Three Fiber — olhos que seguem o cursor, pisca periodicamente e reage à música (grave/agudo via `PlayerContext`). Aparece só no desktop, através de um botão de toggle no navbar (ativado por padrão desligado). Carregado sob demanda (`React.lazy`) pra não pesar no celular, onde nem chega a ser baixado.

## Tecnologias utilizadas

- [React](https://react.dev/) — biblioteca de interface
- [Vite](https://vitejs.dev/) — build tool e dev server
- [React Router DOM](https://reactrouter.com/) — navegação entre páginas
- [Framer Motion](https://www.framer.com/motion/) — transições de página e animações
- [Tailwind CSS](https://tailwindcss.com/) — estilização utilitária
- [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) + [postprocessing](https://github.com/pmndrs/react-postprocessing) — robô 3D interativo
- [lucide-react](https://lucide.dev/) / [react-icons](https://react-icons.github.io/react-icons/) — ícones de interface
- Fontes: [Inter](https://fonts.google.com/specimen/Inter) (texto) e [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (elementos mono/terminal)
- [Formspree](https://formspree.io/) — envio do formulário de contato sem backend próprio
- [Web Audio API](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Audio_API) — análise de frequência do áudio em tempo real (reatividade visual)

## Estrutura do repositório

O repositório separa **documentação** do **código-fonte** em pastas próprias na raiz:

```
Projeto-Portifolio/
├── README.md
├── docs/
│   ├── wireframe/                     # prints dos wireframes (Figma, média fidelidade)
│   ├── uml/
│   │   └── diagrama-casos-de-uso.svg  # diagrama UML dos níveis de acesso
│   └── requisitos-niveis-acesso.md    # requisitos + user stories (Sprint 2)
└── codigo/                            # aplicação React + Vite
    ├── index.html
    ├── vercel.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    ├── package.json
    ├── public/
    │   └── audio/                       # coloque aqui os .mp3 das faixas (ver README dessa pasta)
    └── src/
        ├── main.jsx
        ├── App.jsx                     # rotas (/ e /sobre) + RobotProvider + transição de página
        ├── index.css
        ├── context/
        │   ├── RoleContext.jsx          # perfil selecionado (níveis de acesso)
        │   ├── PlayerContext.jsx        # player de música + análise de frequência
        │   └── RobotContext.jsx         # visibilidade do robô 3D (toggle no navbar)
        ├── hooks/
        │   ├── useHashScroll.js         # scroll suave até âncoras
        │   ├── useSpotlight.js          # brilho que segue o cursor nos cards
        │   └── useIsDesktop.js          # detecta desktop (gate do robô 3D)
        ├── pages/
        │   ├── Home.jsx
        │   └── Sobre.jsx
        ├── components/
        │   ├── layout/
        │   │   ├── Layout.jsx
        │   │   ├── Navbar.jsx            # navegação + seletor de perfil + música + toggle do robô
        │   │   ├── AmbientGlow.jsx        # reage ao volume da música
        │   │   └── TopoField.jsx          # campo topográfico WebGL
        │   ├── sections/
        │   │   ├── Hero.jsx
        │   │   ├── RobotShowcase.jsx      # host do robô 3D (animado, controlado por RobotContext)
        │   │   ├── TechStack.jsx
        │   │   ├── Projects.jsx           # carrossel de projetos
        │   │   ├── ProjectCard.jsx
        │   │   ├── Contact.jsx
        │   │   ├── RecruiterHighlight.jsx
        │   │   ├── SobreMim.jsx
        │   │   ├── Experiencia.jsx
        │   │   └── Interesses.jsx
        │   └── ui/
        │       └── icons.jsx
        ├── three/
        │   ├── RobotCanvas.jsx           # <Canvas> do react-three-fiber
        │   ├── RobotPet.jsx               # geometria, animação e reatividade do robô
        │   ├── RobotEyes.jsx
        │   └── AntennaEffects.jsx
        └── data/
            ├── projects.js                # projetos reais (GitHub)
            ├── experiences.js             # experiência profissional real
            ├── profile.js                 # bio PT/EN, área de atuação, interesses reais
            ├── techStack.js               # tecnologias do marquee
            └── tracks.js                  # trilhas do popover de música
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

### Configurando o envio do formulário de contato

O formulário usa o [Formspree](https://formspree.io/):

1. Crie uma conta gratuita em [formspree.io](https://formspree.io/) e crie um formulário novo.
2. Copie o ID gerado (algo como `xy_zabc123`).
3. Cole em `codigo/src/components/sections/Contact.jsx`, na constante `FORM_ENDPOINT`, no lugar de `seu-id-aqui`.



## Protótipos (Figma)

Wireframes de média fidelidade da Home e da página Sobre:

![Wireframe da Home — hero, stack tecnológica e início da seção de projetos](./docs/wireframe/wireframe_home_page_1.jpg)

![Wireframe da Home — projetos em destaque e seção de contato](./docs/wireframe/wireframe_home_page_2.jpg)

![Wireframe da página Sobre Mim](./docs/wireframe/wireframe_sobre_mim.jpg)

Link do protótipo no Figma: `_a adicionar_`

## Diagrama de casos de uso

![Diagrama de casos de uso — níveis de acesso](./docs/uml/diagrama-casos-de-uso.svg)

Detalhes, requisitos e user stories em [`docs/requisitos-niveis-acesso.md`](./docs/requisitos-niveis-acesso.md).

## Deploy (Sprint 3)

Publicado na Vercel: **[luis-gustavo-portifolio.vercel.app](https://luis-gustavo-portifolio.vercel.app/)**

Passo a passo usado pra publicar:

1. Crie uma conta em [vercel.com](https://vercel.com/) (dá pra logar direto com GitHub).
2. "Add New Project" → importe o repositório `Projeto-Portifolio`.
3. Em **Root Directory**, aponte para `codigo` (o repositório tem `docs/` na raiz também, então a Vercel precisa saber que a aplicação fica em `codigo/`).
4. Framework preset: Vite (a Vercel detecta automaticamente). Build command `npm run build`, output `dist` — já vêm certos por padrão.
5. Deploy. O `vercel.json` já está configurado com o rewrite necessário pra rota `/sobre` não dar 404 ao recarregar a página.

Link do site publicado: **https://luis-gustavo-portifolio.vercel.app/**

## Roadmap das sprints

- [x] **Lab01S01** — Repositório + README inicial, wireframes, protótipo do front-end, navegação e layout principal
- [x] **Lab01S02** — Layout e estrutura das páginas Sobre Mim (PT/EN), Projetos (timeline), Experiências e Contato (formulário funcional com validação); níveis de acesso modelados e implementados; conteúdo real preenchido
  - [ ] Imagens/GIFs dos projetos (ver [Conteúdo pendente](#conteúdo-pendente))
- [ ] **Lab01S03** — Deploy, ajustes finais de UI/UX e imagens/GIFs reais dos projetos
