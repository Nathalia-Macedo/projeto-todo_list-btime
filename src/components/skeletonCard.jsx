import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 animate-pulse">
      {/* Badge de prioridade fake */}
      <div className="h-4 w-16 bg-gray-200 dark:bg-slate-700 rounded mb-4"></div>
      
      {/* Título fake */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
      </div>

      {/* Infos de rodapé fake */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded w-full"></div>
        <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;