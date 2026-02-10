import React, { useState, useEffect } from 'react';
import { initialTasks } from '../data/tasks';
import TaskCard from '../components/taskCard';
import TaskModal from '../components/taskModal';
import SkeletonCard from '../components/skeletonCard';

function App() {
  // 1. Inicialização de Estado com Persistência
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanban-pro-data');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("todas");
  const [filterToday, setFilterToday] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Lógica do Dashboard Master (Calculada a cada renderização)
  const stats = {
    total: tasks.length,
    critical: tasks.filter(t => t.priority === 'crítica' && t.status !== 'done').length,
    todo: tasks.filter(t => t.status === 'todo').length,
    doing: tasks.filter(t => t.status === 'doing').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  // 3. Efeitos (Simulação de Load, Persistência e Dark Mode)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban-pro-data', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Título Dinâmico: Mostra no navegador o status das tarefas
useEffect(() => {
  const totalPending = stats.todo + stats.doing;
  if (totalPending > 0) {
    document.title = `(${totalPending}) KanbanPro | Gestão de Fluxo`;
  } else {
    document.title = "KanbanPro | Tudo em dia!";
  }
}, [stats.todo, stats.doing]);

  // 4. Funções de Manipulação
  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e) => { e.preventDefault(); };

  const handleDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    moveTask(Number(taskId), newStatus);
  };

  // 5. Lógica de Filtragem
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = filterPriority === "todas" || task.priority === filterPriority;
    
    const todayStr = new Date().toISOString().split('T')[0];
    const matchesToday = !filterToday || task.date === todayStr;

    return matchesSearch && matchesPriority && matchesToday;
  });

  const completedPercentage = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100)
    : 0;

  const columns = [
    { id: 'todo', title: 'A Fazer' },
    { id: 'doing', title: 'Em Andamento' },
    { id: 'done', title: 'Concluído' }
  ];

  // 6. Sub-componente Interno para o Dashboard
  const DashboardHeader = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-6xl mx-auto">
      {[
        { label: 'Pendentes', value: stats.todo + stats.doing, color: 'text-blue-600', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { label: 'Críticas', value: stats.critical, color: 'text-rose-600', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
        { label: 'Em Curso', value: stats.doing, color: 'text-amber-600', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { label: 'Finalizadas', value: stats.done, color: 'text-emerald-600', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      ].map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gray-50 dark:bg-slate-800 ${item.color}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">{item.label}</p>
              <p className="text-xl font-black">{isLoading ? '...' : item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-500 p-4 md:p-8 font-sans">
        
        <header className="max-w-6xl mx-auto mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-black tracking-tighter flex items-center gap-2">
              <span className="bg-blue-600 text-white p-1.5 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              </span>
              Kanban<span className="text-blue-600">Pro</span>
            </h1>
            
            <button onClick={() => setDarkMode(!darkMode)} className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
              {darkMode ? (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>

          <div className="mb-8 max-w-md">
            <div className="flex justify-between text-[10px] font-bold uppercase mb-2 text-gray-400 tracking-widest">
              <span>Performance da Sprint</span>
              <span>{completedPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full transition-all duration-1000 shadow-[0_0_8px_rgba(37,99,235,0.4)]" style={{ width: `${completedPercentage}%` }}></div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl border border-gray-200 dark:border-slate-800">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Pesquisar tarefas..." className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setFilterToday(!filterToday)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${filterToday ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-500'}`}
              >
                Hoje
              </button>
              
              <select className="p-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm font-medium" onChange={(e) => setFilterPriority(e.target.value)}>
                <option value="todas">Prioridades</option>
                <option value="baixa">Baixa</option>
                <option value="alta">Alta</option>
                <option value="crítica">Crítica</option>
              </select>
            </div>
          </div>
        </header>

        {/* Renderização do Dashboard Master */}
        <DashboardHeader />

        <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map(col => {
            const columnTasks = filteredTasks.filter(t => t.status === col.id);
            
            return (
              <div key={col.id} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, col.id)} className="flex flex-col bg-gray-100/50 dark:bg-slate-900/30 p-5 rounded-3xl border border-gray-200/50 dark:border-slate-800 min-h-[600px] transition-all">
                <div className="flex justify-between items-center mb-6 px-1">
                  <h2 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-[0.2em]">{col.title}</h2>
                  <span className="text-[10px] font-bold bg-gray-200 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    {isLoading ? "..." : columnTasks.length}
                  </span>
                </div>
                
                <div className="space-y-3 h-full">
                  {isLoading ? (
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  ) : columnTasks.length > 0 ? (
                    columnTasks.map(task => (
                      <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} onDragStart={handleDragStart} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-2xl opacity-40">
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="text-[11px] font-medium text-center">Sem tarefas</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </main>

        {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} onMove={moveTask} />}
      </div>
    </div>
  );
}

export default App;