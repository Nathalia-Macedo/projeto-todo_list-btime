import React, { useState } from 'react';

const AddTaskModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    priority: 'baixa',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 p-6" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-6">Nova Tarefa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Título da tarefa"
            required
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
          <textarea 
            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5 outline-none focus:ring-2 focus:ring-blue-500 h-24"
            placeholder="Descrição"
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <select 
              className="p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5"
              onChange={e => setFormData({...formData, priority: e.target.value})}
            >
              <option value="baixa">Baixa</option>
              <option value="alta">Alta</option>
              <option value="crítica">Crítica</option>
            </select>
            <input 
              type="date"
              className="p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </div>
          <input 
            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5"
            placeholder="Localização (ex: Remoto)"
            onChange={e => setFormData({...formData, location: e.target.value})}
          />
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Cancelar</button>
            <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">Salvar Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;