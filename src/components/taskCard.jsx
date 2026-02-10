import React from 'react';

const TaskCard = ({ task, onClick, onDragStart }) => {
  // Cores sólidas para a lateral e versões suaves para o hover
  const theme = {
    baixa: {
      accent: "bg-emerald-500",
      glow: "group-hover:shadow-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400"
    },
    alta: {
      accent: "bg-amber-500",
      glow: "group-hover:shadow-amber-500/10",
      text: "text-amber-600 dark:text-amber-400"
    },
    crítica: {
      accent: "bg-rose-500",
      glow: "group-hover:shadow-rose-500/10",
      text: "text-rose-600 dark:text-rose-400"
    }
  };

  const isUrgent = (date) => {
    const today = new Date();
    const taskDate = new Date(date);
    const diffDays = Math.ceil((taskDate - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const urgent = isUrgent(task.date) && task.status !== 'done';
  const currentTheme = theme[task.priority] || theme.baixa;

  return (
    <div 
      draggable 
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={() => onClick(task)}
      className={`group relative overflow-hidden bg-white dark:bg-slate-900 p-0 rounded-2xl border border-gray-100 dark:border-white/5 cursor-grab active:cursor-grabbing transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl ${currentTheme.glow}`}
    >
      {/* A "Borda" Lateral Sólida - Ocupa 100% da altura do lado esquerdo */}
      <div className={`absolute left-0 top-0 bottom-0 w-3 ${currentTheme.accent}`} />

      {/* Conteúdo com Padding para não encostar na barra lateral */}
      <div className="pl-7 pr-5 py-5">
        <div className="flex justify-between items-start mb-2">
          <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${currentTheme.text}`}>
            {task.priority}
          </span>
          
          {urgent && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          )}
        </div>

        <h3 className="font-bold text-gray-800 dark:text-slate-100 text-[15px] leading-snug mb-4 group-hover:text-blue-500 transition-colors">
          {task.title}
        </h3>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-white/5">
          {/* Badge de Localização Minimalista */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800/50 px-2 py-1 rounded-lg">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="text-[10px] font-semibold text-gray-500 dark:text-slate-400">
              {task.location}
            </span>
          </div>

          <div className={`text-[10px] font-bold flex items-center gap-1 ${urgent ? 'text-rose-500' : 'text-gray-400'}`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {new Date(task.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
          </div>
        </div>
      </div>

      {/* Efeito de Overlay no Hover para profundidade */}
      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/[0.02] dark:group-hover:bg-white/[0.02] transition-colors pointer-events-none" />
    </div>
  );
};

export default TaskCard;