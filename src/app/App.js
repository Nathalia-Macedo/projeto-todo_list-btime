import React, { useState, useEffect, useCallback } from 'react';
import TaskCard from '../components/taskCard';
import TaskModal from '../components/taskModal';
import SkeletonCard from '../components/skeletonCard';
import AddTaskModal from '../components/addTaskModal';

const API_URL = "https://api-elixir-btime.onrender.com/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("todas");
  const [filterToday, setFilterToday] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- FUNÇÕES DE API (GRAPHQL) ---

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              list_tasks {
                id
                title
                description
                status
                priority
                location
                due_date
              }
            }
          `
        })
      });

      const json = await response.json();
      if (json.data && json.data.list_tasks) {
        const mappedTasks = json.data.list_tasks.map(t => ({
          ...t,
          date: t.due_date 
        }));
        setTasks(mappedTasks);
      }
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteTask = async (taskId) => {
    if (!window.confirm("Tem certeza que deseja apagar esta tarefa?")) return;

    const mutation = `
      mutation {
        delete_task(id: "${taskId}") {
          id
        }
      }
    `;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
      });

      const result = await response.json();
      if (result.errors) {
        console.error("Erro ao apagar:", result.errors);
      } else {
        setTasks(prev => prev.filter(t => t.id !== taskId));
      }
    } catch (error) {
      console.error("Erro de conexão ao apagar:", error);
    }
  };

  const addTask = async (taskData) => {
    const priorityMap = {
      'baixa': 'low',
      'alta': 'high',
      'crítica': 'critical'
    };

    const translatedPriority = priorityMap[taskData.priority.toLowerCase()] || 'low';

    const mutation = `
      mutation {
        create_task(
          title: "${taskData.title}",
          description: "${taskData.description || ""}",
          priority: "${translatedPriority}",
          location: "${taskData.location}",
          due_date: "${taskData.date}",
          status: "todo"
        ) {
          id
          title
        }
      }
    `;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
      });
      
      const result = await response.json();
      
      if (result.errors) {
        console.error("Erro detalhado do servidor:", result.errors);
      } else {
        setIsAddModalOpen(false);
        fetchTasks();
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    }
  };

  const moveTask = async (taskId, newStatus) => {
    // Ajustado para 'update_task' conforme padrão snake_case do seu backend Elixir
    const mutation = `
      mutation {
        update_task(id: "${taskId}", status: "${newStatus}") {
          id
          status
        }
      }
    `;

    try {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
      
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
      });
      setSelectedTask(null);
    } catch (error) {
      console.error("Erro ao mover tarefa:", error);
      fetchTasks();
    }
  };

  // --- EFEITOS ---

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- LÓGICA DE DASHBOARD ---

  const stats = {
    total: tasks.length,
    critical: tasks.filter(t => t.priority === 'crítica' && t.status !== 'done').length,
    todo: tasks.filter(t => t.status === 'todo').length,
    doing: tasks.filter(t => t.status === 'doing').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  useEffect(() => {
    const totalPending = stats.todo + stats.doing;
    document.title = totalPending > 0 ? `(${totalPending}) KanbanPro` : "KanbanPro | Tudo em dia!";
  }, [stats.todo, stats.doing]);

  // --- DRAG AND DROP ---

  const handleDragStart = (e, taskId) => { e.dataTransfer.setData("taskId", taskId); };
  const handleDragOver = (e) => { e.preventDefault(); };
  const handleDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    moveTask(taskId, newStatus);
  };

  // --- FILTRAGEM ---

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "todas" || task.priority === filterPriority;
    const todayStr = new Date().toISOString().split('T')[0];
    const matchesToday = !filterToday || task.date === todayStr;
    return matchesSearch && matchesPriority && matchesToday;
  });

  const columns = [
    { id: 'todo', title: 'A Fazer' },
    { id: 'doing', title: 'Em Andamento' },
    { id: 'done', title: 'Concluído' }
  ];

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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
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

          <div className="flex flex-col md:flex-row gap-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl border border-gray-200 dark:border-slate-800 items-center justify-between">
            <div className="relative flex-1 w-full">
              <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Pesquisar tarefas..." className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <button onClick={() => setFilterToday(!filterToday)} className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all border ${filterToday ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-500'}`}>Hoje</button>
              <select className="flex-1 md:flex-none p-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl outline-none text-sm font-medium" onChange={(e) => setFilterPriority(e.target.value)}>
                <option value="todas">Prioridades</option>
                <option value="baixa">Baixa</option>
                <option value="alta">Alta</option>
                <option value="crítica">Crítica</option>
              </select>
            </div>
          </div>
        </header>

        <DashboardHeader />

        <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map(col => {
            const columnTasks = filteredTasks.filter(t => t.status === col.id);
            return (
              <div key={col.id} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, col.id)} className="flex flex-col bg-gray-100/50 dark:bg-slate-900/30 p-5 rounded-3xl border border-gray-200/50 dark:border-slate-800 min-h-[600px]">
                <div className="flex justify-between items-center mb-6 px-1">
                  <h2 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{col.title}</h2>
                  <span className="text-[10px] font-bold bg-gray-200 dark:bg-slate-800 px-2 py-0.5 rounded-md">{isLoading ? "..." : columnTasks.length}</span>
                </div>
                
                <div className="space-y-3 h-full">
                  {isLoading ? (
                    <><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
                  ) : columnTasks.length > 0 ? (
                    columnTasks.map(task => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        onClick={() => setSelectedTask(task)} 
                        onDragStart={handleDragStart}
                        onDelete={deleteTask} // <--- CORREÇÃO APLICADA AQUI
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-2xl opacity-40">
                      <p className="text-[11px] font-medium">Sem tarefas</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </main>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
        >
          <svg className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        </button>

        {isAddModalOpen && <AddTaskModal onClose={() => setIsAddModalOpen(false)} onAdd={addTask} />}
        {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} onMove={moveTask} />}
      </div>
    </div>
  );
}

export default App;