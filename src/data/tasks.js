export const initialTasks = [
  {
    id: 1,
    title: "Refatorar Componentes React",
    date: "2026-02-12",
    location: "São Paulo, BR",
    priority: "crítica",
    status: "todo",
    description: "Aplicar o princípio de responsabilidade única nos componentes de UI e melhorar a performance com useMemo.",
    attachments: ["clean_code.pdf", "performance_audit.xlsx"]
  },
  {
    id: 2,
    title: "Configurar API Elixir",
    date: "2026-02-13",
    location: "Remoto",
    priority: "alta",
    status: "doing",
    description: "Integrar o endpoint de autenticação com o frontend e tratar erros de token expirado.",
    attachments: ["swagger_doc.json"]
  },
  {
    id: 3,
    title: "Reunião de Alinhamento",
    date: "2026-02-10",
    location: "Google Meet",
    priority: "baixa",
    status: "done",
    description: "Definição de prazos para a Sprint 01 e divisão de tarefas entre o time de design e dev.",
    attachments: []
  },
  {
    id: 4,
    title: "Ajustar Responsividade",
    date: "2026-02-14",
    location: "Home Office",
    priority: "alta",
    status: "todo",
    description: "Garantir que o Kanban funcione perfeitamente em dispositivos móveis e tablets (breakpoints do Tailwind).",
    attachments: ["print_erro.png"]
  },
  {
    id: 5,
    title: "Implementar Testes Unitários",
    date: "2026-02-16",
    location: "Remoto",
    priority: "crítica",
    status: "todo",
    description: "Criar cobertura de testes para os Hooks customizados e componentes de Modal usando Jest.",
    attachments: ["test_plan.md"]
  },
  {
    id: 6,
    title: "Revisão de Pull Request",
    date: "2026-02-10",
    location: "Slack / GitHub",
    priority: "baixa",
    status: "doing",
    description: "Revisar o código da feature de filtros avançados enviada pelo time de backend.",
    attachments: []
  },
  {
    id: 7,
    title: "Documentação do README",
    date: "2026-02-11",
    location: "VS Code",
    priority: "alta",
    status: "doing",
    description: "Escrever as instruções de instalação, decisões técnicas e bibliotecas utilizadas no projeto.",
    attachments: ["draft_readme.txt"]
  },
  {
    id: 8,
    title: "Otimizar Assets de Imagem",
    date: "2026-02-09",
    location: "Home Office",
    priority: "baixa",
    status: "done",
    description: "Reduzir o tamanho das imagens da landing page para melhorar o Core Web Vitals.",
    attachments: ["compressed_assets.zip"]
  },
  {
    id: 9,
    title: "Daily Scrum",
    date: "2026-02-10",
    location: "Discord",
    priority: "baixa",
    status: "done",
    description: "Sincronização diária para reportar impedimentos e progresso das tasks.",
    attachments: []
  },
  {
    id: 10,
    title: "Deploy em Staging",
    date: "2026-02-15",
    location: "Vercel / AWS",
    priority: "crítica",
    status: "todo",
    description: "Configurar as variáveis de ambiente e realizar o deploy da versão beta para o cliente testar.",
    attachments: ["ci_cd_logs.log"]
  }
];