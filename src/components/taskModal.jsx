import React from 'react';

const TaskModal = ({ task, onClose, onMove }) => {
  if (!task) return null;

  // Mapeamento para tradução amigável
  const statusLabels = {
    todo: "A Fazer",
    doing: "Em Andamento",
    done: "Concluído"
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Header do Modal */}
        <div className="p-6 flex justify-between items-start border-b dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{task.title}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md font-black uppercase tracking-widest">
                {statusLabels[task.status]}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">•</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{task.location}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6 space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-3">
              Descrição da Tarefa
            </label>
            <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed bg-gray-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
              {task.description || "Nenhuma descrição fornecida para esta tarefa."}
            </p>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-3">
              Mover para Coluna
            </label>
            <div className="flex flex-wrap gap-3">
              {['todo', 'doing', 'done']
                .filter(s => s !== task.status)
                .map(status => (
                  <button 
                    key={status} 
                    onClick={() => onMove(task.id, status)} 
                    className="flex-1 min-w-[140px] px-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-blue-600 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 group"
                  >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    {statusLabels[status]}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Footer do Modal */}
        <div className="p-6 bg-gray-50 dark:bg-slate-900/50 flex justify-end">
          <button 
            onClick={onClose} 
            className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-gray-900/10 dark:shadow-none"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;