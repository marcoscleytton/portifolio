import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const KPICard = ({ title, value, change, isPositive, icon: Icon, color }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-opacity-10 ${color.bg} ${color.text}`}>
          <Icon size={24} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${isPositive ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}%
        </div>
      </div>
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold dark:text-white">{value}</h3>
      </div>
    </div>
  );
};

export default KPICard;
