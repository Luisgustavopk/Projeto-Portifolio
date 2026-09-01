# Requisitos — Níveis de Acesso (Sprint 2)

Documentação da funcionalidade adicionada na Sprint 2: modelagem de diferentes níveis de acesso (perfis de visualização), conforme anotado em quadro na aula.

Diagrama de casos de uso relacionado: [`docs/uml/diagrama-casos-de-uso.svg`](./uml/diagrama-casos-de-uso.svg)

## Contexto

O portfólio recebe visitas de públicos diferentes — recrutadores avaliando trajetória profissional, colegas/técnicos avaliando código e arquitetura, e visitantes em geral. Em vez de um site único que trata todo mundo igual, a pessoa escolhe **quem ela é** logo no navbar, e o conteúdo se reorganiza pra priorizar o que aquele perfil mais quer ver — sem esconder nada, só mudando a ordem/destaque.

## Perfis (atores)

| Perfil | O que é priorizado |
|---|---|
| **Visitante** (padrão) | Visão geral equilibrada — ordem padrão de todas as seções. |
| **Recrutador** | Experiências e trajetória profissional em destaque; CTA do Hero leva direto pra seção de Experiências. |
| **Técnico** | Stack tecnológica, projetos e repositórios em destaque; CTA do Hero leva direto pros repositórios. |

`Recrutador` e `Técnico` são especializações de `Visitante`: herdam todos os casos de uso comuns (ver Home, Sobre Mim, enviar mensagem, redes sociais) e adicionam prioridade sobre um subconjunto específico — ver diagrama.

## Requisitos funcionais

- **RF01** — O sistema deve permitir que a pessoa selecione seu perfil de visualização (Visitante, Recrutador ou Técnico) a partir de um controle visível no navbar, em qualquer página.
- **RF02** — O perfil selecionado deve ser lembrado entre páginas e recarregamentos (persistência local no navegador).
- **RF03** — Na Home, a ordem das seções abaixo do Hero deve mudar conforme o perfil: Técnico vê Projetos antes da faixa de stack; Recrutador vê um banner com a experiência mais recente logo após o Hero.
- **RF04** — Na página Sobre, a ordem das seções (Sobre Mim, Experiências, Interesses) deve mudar conforme o perfil: Recrutador vê Experiências primeiro.
- **RF05** — O texto e o destino do botão principal do Hero devem mudar conforme o perfil (ex: Recrutador → "Ver Experiências" linkando para `/sobre#experiencias`).
- **RF06** — Nenhum conteúdo é ocultado entre perfis — a mudança é sempre de **ordem/prioridade**, nunca de acesso restrito.

## User stories

- **US01** — Como **visitante**, quero ver uma visão geral equilibrada do portfólio, para entender rapidamente quem é o Luis Gustavo e o que ele faz.
- **US02** — Como **recrutador**, quero ver as experiências profissionais em destaque, para avaliar a trajetória sem precisar procurar em várias seções.
- **US03** — Como **técnico**, quero ver a stack tecnológica e os projetos em destaque, para avaliar rapidamente o nível técnico e o código.
- **US04** — Como usuário de qualquer perfil, quero que minha escolha seja lembrada ao navegar entre páginas, para não precisar selecionar de novo toda hora.

## Casos de uso (resumo)

Ver o diagrama completo em [`docs/uml/diagrama-casos-de-uso.svg`](./uml/diagrama-casos-de-uso.svg). Casos de uso principais:

1. Selecionar perfil de visualização
2. Visualizar Home
3. Visualizar Sobre Mim (PT/EN)
4. Visualizar Projetos (timeline)
5. Visualizar Experiências *(priorizado para Recrutador)*
6. Visualizar stack tecnológica *(priorizado para Técnico)*
7. Acessar repositório no GitHub *(estende "Visualizar Projetos", priorizado para Técnico)*
8. Enviar mensagem de contato
9. Acessar redes sociais

## Implementação (referência técnica)

- `src/context/RoleContext.jsx` — estado global do perfil selecionado (`visitante | recrutador | tecnico`), com persistência em `localStorage`.
- `src/components/layout/Navbar.jsx` — seletor de perfil (popover no navbar).
- `src/pages/Home.jsx` e `src/pages/Sobre.jsx` — arrays `*_ORDER` que definem a ordem das seções por perfil.
- `src/components/sections/RecruiterHighlight.jsx` — banner exclusivo do perfil Recrutador na Home.
