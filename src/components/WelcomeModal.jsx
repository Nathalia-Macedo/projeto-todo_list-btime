import React from 'react';

const WelcomeModal = ({ onClose, darkMode }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop com Blur Profundo e Luzes de Fundo */}
      <div 
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-xl animate-in fade-in duration-500" 
        onClick={onClose} 
      >
        {/* Luzes de fundo com opacidade alta para profundidade */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-600/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-violet-500/10 dark:bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Container do Modal */}
      <div className="relative w-full max-w-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[40px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_-15px_rgba(0,0,0,0.6)] border border-white/20 dark:border-white/5 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        
        {/* Header com Gradiente Animado */}
        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-8 sm:p-12 flex flex-col justify-end overflow-hidden">
          {/* Círculos Decorativos */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-blue-400/20 rounded-full blur-2xl" />
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white/80 hover:text-white transition-all backdrop-blur-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
              Versão 2.0 ✨
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
              Bem-vindo ao 
              <span className="inline-flex items-baseline ml-2">
                Kanban
                <span className="bg-gradient-to-b from-[#f8fafc] via-[#94a3b8] to-[#475569] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
                  Pro
                </span>
              </span>
            </h2>
          </div>
        </div>

        {/* Conteúdo Body */}
        <div className="p-8 sm:p-12 space-y-8">
          <div className="grid gap-6 sm:gap-8">
            
            {/* Item 1 */}
            <div className="group flex gap-5 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Alta Performance</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Gerencie fluxos de trabalho complexos com uma interface otimizada para velocidade e foco total.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="group flex gap-5 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Mobile First</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Não apenas adaptado, mas pensado para o seu smartphone. Use os botões de ação rápida para mover cards com um toque.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="group flex gap-5 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Segurança & Cloud</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Suas tarefas são sincronizadas em tempo real com nosso backend Elixir de alta disponibilidade.
                </p>
              </div>
            </div>
          </div>

          {/* Botão de Ação */}
          <div className="pt-4">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[20px] font-bold text-base hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-white/10 active:scale-95 transition-all duration-300"
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