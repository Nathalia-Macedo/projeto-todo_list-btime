# KanbanPro | Interface de Gerenciamento de Fluxo de Trabalho

Este projeto é a interface que desenvolvi para um sistema de gerenciamento de tarefas focado em alta performance. Meu objetivo principal foi criar uma experiência corporativa fluida, usando comunicação assíncrona com GraphQL e processamento de estado em tempo real.

## Arquitetura e Decisões que Tomei

### 1. Integração GraphQL
Optei por GraphQL em vez de REST para reduzir o tráfego de rede. Criei um motor de busca assíncrono que faz todo o mapeamento dos dados que vêm do backend em Elixir (snake_case) para o formato que uso no React (camelCase).

### 2. Dashboard com Métricas em Tempo Real
Implementei uma lógica de agregação que processa o estado das tarefas diretamente no frontend. Assim consigo extrair métricas como tarefas críticas e taxas de conclusão sem precisar sobrecarregar o servidor com esses cálculos.

### 3. Design System Visual
Criei um sistema de barras laterais coloridas (Emerald, Amber e Rose) para substituir elementos visuais genéricos. Cada card tem uma barra sólida que indica a prioridade da tarefa, permitindo que o usuário identifique rapidamente o que precisa de atenção só com a visão periférica.

### 4. Gerenciamento de Estado
Usei hooks como useCallback e useEffect de forma estratégica para garantir que as chamadas à API não disparem renderizações desnecessárias. Isso mantém a performance estável mesmo quando a quantidade de dados cresce.

## Tecnologias que Utilizei

- **React 18**: Aproveitei os hooks mais avançados e a renderização otimizada
- **Tailwind CSS**: Para criar um design system consistente e implementar o Dark Mode
- **GraphQL**: Para fazer consultas eficientes e buscar exatamente os dados que preciso
- **SVGs Inline**: Desenvolvi um sistema de ícones vetoriais personalizado

## Funcionalidades que Implementei

- **Drag and Drop Nativo**: Usei a API nativa do HTML5 para manipular o estado das tarefas
- **Skeleton Loaders**: Criei loaders que evitam o Layout Shift enquanto os dados carregam
- **Notificação Passiva**: O título da página se atualiza dinamicamente mostrando quantas tarefas estão pendentes

## Como Rodar o Projeto
Para rodar em desenvolvimento:
npm start

Primeiro, instale as dependências:
```bash
npm install
