export const projects = [
  {
    id: 1,
    title: 'Ecossistema Digital — Prodacom',
    description:
      'Site institucional da Prodacom (controle de ponto e acesso) com geração de orçamentos, painel de atendimento interno em tempo real e backend com WebSockets para o chat direto com o cliente.',
    tags: ['React', 'Node.js', 'TypeScript', 'Socket.io', 'MongoDB'],
    repoUrl: 'https://github.com/Luisgustavopk/projeto-prodacom',
    image: '../../public/images/prodacom-projeto.gif', 
  },
  {
    id: 2,
    title: 'Ordem RPG Manager',
    description:
      'Backend para gerenciar fichas de personagem do RPG de mesa Ordem Paranormal — personagens, classes, trilhas, perícias, rituais e inventário, com autenticação via JWT. Front-end ainda não iniciado.',
    tags: ['Java', 'Spring Boot', 'MySQL', 'JWT'],
    repoUrl: 'https://github.com/Luisgustavopk/Ordem-rpg-manager',
    image: '../../public/images/rpg-manager.gif', 
  },
  {
    id: 3,
    title: 'Automação de Inadimplência (Efí)',
    description:
      'Automação que monitora cobranças (boleto, PIX e cartão) em tempo real via webhook da Efí e avisa clientes inadimplentes automaticamente por WhatsApp (API oficial da Meta), uma vez por dia.',
    tags: ['Python', 'Flask', 'API'],
    repoUrl: '',
    image: '../../public/images/automacao-efi.png',
  },
  {
    id: 4,
    title: 'Automação do Plano de Estudos',
    description:
      'Automação do próprio plano de estudos da faculdade, integrando Notion, Canvas LMS e IA generativa (Gemini/Claude) via n8n — sincronização de prazos, resumos automáticos e alertas de tarefas. Em desenvolvimento.',
    tags: ['n8n', 'Notion API', 'Automação'],
    repoUrl: 'https://github.com/Luisgustavopk/Automacao-Plano-De-Estudos',
    image: '../../public/images/n8n-estudos.png',
  },
]