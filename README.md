# 📌 KanbanPro | Task Management System

Este projeto não é apenas um quadro de tarefas; é uma aplicação de gerenciamento de fluxo de trabalho de alta performance desenvolvida para demonstrar conceitos de **UX avançada**, **persistência de estado** e **performance percebida** no ecossistema React.

Desenvolvi o **KanbanPro** com foco em uma interface limpa, corporativa e livre de dependências externas desnecessárias, priorizando a API nativa do navegador e CSS utilitário.

---

## 🚀 Diferenciais de Engenharia (Onde foquei meu tempo)

Em vez de focar apenas no visual, priorizei decisões técnicas que resolvem problemas reais de aplicações modernas:

### 1. Inteligência de Dados (Dashboard Analytics)
Implementei um motor de agregação que processa o estado global das tarefas em tempo real. O sistema extrai métricas de produtividade e saúde do projeto (como o contador de tarefas críticas), transformando dados brutos em uma camada de BI (Business Intelligence) simplificada.

### 2. Design de Blocos de Acentuação (Visual Cues)
Diferente de badges comuns, utilizei uma abordagem de **Zonas de Acentuação Lateral**. Cada card possui uma barra sólida que ocupa 100% da lateral esquerda, permitindo a identificação da prioridade via visão periférica, otimizando o escaneamento visual do usuário.

### 3. UX & Performance Percebida (Skeleton Loaders)
Utilizei **Skeleton Screens** customizados que simulam a anatomia dos cards durante o carregamento. Isso melhora o FCP (*First Contentful Paint*) e elimina o "layout shift", proporcionando uma experiência fluida.

### 4. Persistência de Dados (Browser Storage)
Estratégia de **Lazy State Initialization** com o `localStorage`. O app recupera automaticamente tarefas e preferências de tema, garantindo que o progresso nunca seja perdido ao fechar o navegador.

### 5. Arquitetura Mobile-First
A aplicação foi construída com um sistema de **Grid Adaptável**. No mobile, as colunas são empilhadas de forma inteligente, enquanto no desktop utilizam o espaço horizontal total, garantindo 100% de responsividade sem perda de funcionalidade.

---

## 🧠 Resolução de Problemas e Lógica de Implementação

### 1. Agregação de Estados para o Dashboard
**Problema:** Listas longas dificultam a visão macro do projeto.
**Lógica:** Criei um objeto de computação derivado (`stats`) que utiliza métodos de alta performance em arrays (`filter`). Ao centralizar esses cálculos, a interface reage instantaneamente a qualquer mudança de status nos cards, atualizando os indicadores sem necessidade de requisições extras.

### 2. Persistência e Hidratação de Dados
**Problema:** Perda de dados ao atualizar a página (F5).
**Lógica:** - **Leitura:** O estado inicial é definido por uma função anônima que acessa o disco apenas uma vez na montagem (Lazy Init).
- **Escrita:** Um `useEffect` monitora o array de `tasks`. Qualquer alteração dispara uma sincronização atômica com o `localStorage` via `JSON.stringify`.

### 3. Sistema de Drag & Drop Nativo
**Problema:** Evitar bibliotecas pesadas para manter a performance e reduzir o bundle size.
**Lógica:** - Implementado via **HTML5 Drag and Drop API**. No `onDragStart`, o ID da tarefa é persistido no objeto `dataTransfer`.
- No `onDrop`, interceptamos o evento na coluna de destino e executamos uma atualização imutável via `tasks.map()`, alterando apenas a propriedade `status` da tarefa correspondente.

### 4. Gestão de Datas e Filtragem Dinâmica
**Problema:** Identificar rapidamente o que vence hoje ou tarefas urgentes.
**Lógica:** - Utilizei a classe `Date` para gerar um *timestamp* comparativo.
- A filtragem é "multi-layer": o app cruza simultaneamente busca textual (`includes`), nível de prioridade e urgência temporal antes de renderizar a lista final.

### 5. Dark Mode Nativo (Tailwind Strategy)
**Problema:** Implementar temas sem duplicar arquivos CSS.
**Lógica:** Manipulação direta do `classList` do `document.documentElement`. O React atua como a ponte de estado para injetar a classe `.dark`, permitindo que o Tailwind aplique os estilos condicionais instantaneamente através de modificadores de classe.

---

## 🛠️ Stack Tecnológica

* **React 18:** Hooks avançados (`useState`, `useEffect`, `memo`) e otimização de renderização.
* **Tailwind CSS:** Design System responsivo, Glassmorphism e Dark Mode nativo.
* **SVGs Inline:** Ícones vetoriais customizados para garantir performance e escalabilidade.
* **JavaScript (ES6+):** Manipulação extensiva de arrays e lógica de objetos.

---

## 🧠 Minhas Decisões de Design

* **Visual Enterprise:** Uso de ícones técnicos e barras laterais sólidas em vez de emojis para manter o tom profissional e corporativo.
* **Feedback de Interface:** *Empty States* (Estados Vazios) com ilustrações em SVG para guiar o usuário quando não houver tarefas.
* **Acessibilidade de Cores:** Sistema semântico baseado em tokens (Emerald para Baixa, Amber para Alta, Rose para Crítica).

---

## 🏗️ Como rodar o projeto

1.  **Clone este repositório:**
    ```bash
    git clone [https://github.com/Nathalia-Macedo/projeto-todo_list-btime.git]
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    ```

---

## 👤 Autor

**Nath**

> Desenvolvido com foco em código limpo, escalabilidade e, acima de tudo, na experiência do usuário final.

---
