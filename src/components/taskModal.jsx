import React from 'react';

const TaskModal = ({ task, onClose, onMove }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6 flex justify-between items-start border-b dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{task.title}</h2>
            <p className="text-xs text-blue-600 font-bold mt-1 uppercase tracking-widest">{task.status}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Descrição do Projeto</label>
            <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{task.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['todo', 'doing', 'done'].filter(s => s !== task.status).map(status => (
              <button key={status} onClick={() => onMove(task.id, status)} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-blue-600 hover:text-white dark:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                Mover para {status}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-slate-900/50 flex justify-end">
          <button onClick={onClose} className="px-8 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:opacity-90 transition-all">Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;