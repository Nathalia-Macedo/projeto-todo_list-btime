import React from 'react';

const WelcomeModal = ({ onClose, darkMode }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* Backdrop com Luzes de Fundo */}
      <div 
        className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose} 
      >
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* Container do Modal - Adicionado max-h e overflow-y-auto */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[32px] sm:rounded-[40px] shadow-2xl border border-white/20 dark:border-white/5 overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* Header - Altura reduzida no mobile (h-32) e flex-shrink-0 */}
        <div className="relative h-32 sm:h-56 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-6 sm:p-12 flex flex-col justify-end flex-shrink-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/10 text-white/80 hover:text-white transition-all backdrop-blur-md z-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative">
            <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-bold uppercase tracking-widest mb-2 backdrop-blur-md">
              Versão 2.0 ✨
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-none">
              Bem-vindo ao 
              <span className="inline-flex items-baseline ml-1.5">
                Kanban
                <span className="bg-gradient-to-b from-[#f8fafc] via-[#94a3b8] to-[#475569] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
                  Pro
                </span>
              </span>
            </h2>
          </div>
        </div>

        {/* Conteúdo Body - Scroll interno se necessário */}
        <div className="p-6 sm:p-12 overflow-y-auto custom-scrollbar space-y-6 sm:space-y-8">
          <div className="grid gap-5 sm:gap-8">
            
            {/* Item 1 */}
            <div className="group flex gap-4 sm:gap-5 items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white leading-tight">Alta Performance</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Interface otimizada para velocidade e foco total.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="group flex gap-4 sm:gap-5 items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white leading-tight">Mobile First</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Use botões de ação rápida para mover cards com um toque.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="group flex gap-4 sm:gap-5 items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white leading-tight">Sincronização Cloud</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Tarefas sincronizadas em tempo real com backend Elixir.</p>
              </div>
            </div>
          </div>
          {/* Aviso Humano - API Wake up */}
<div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-4 flex gap-4 items-center">
  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
    <span className="text-xl animate-bounce">☕</span>
  </div>
  <div className="flex-1">
    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
      <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Só um instantinho...</span>
      Como estamos usando um servidor gratuito, nossa API tira uma soneca quando não está em uso. Ela está <strong>preparando um café</strong> agora e deve acordar em uns 50 segundos para carregar suas tarefas.
    </p>
  </div>
</div>

          {/* Botão de Ação - flex-shrink-0 para não ser comprimido */}
          <div className="pt-2 sm:pt-4 flex-shrink-0">
            <button 
              onClick={onClose}
              className="w-full py-3.5 sm:py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base active:scale-95 transition-all duration-300"
            >
              Começar agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;