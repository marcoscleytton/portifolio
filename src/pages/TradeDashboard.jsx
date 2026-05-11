import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import KPICard from '../components/dashboard/KPICard';
import { GrowthChart } from '../components/dashboard/Charts';
import DataTable from '../components/dashboard/DataTable';
import { 
  DollarSign, 
  Users, 
  Target, 
  Package, 
  Store, 
  Percent 
} from 'lucide-react';

const TradeDashboard = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const kpis = [
    { title: 'Total Sales', value: 'R$ 1.2M', change: 12.5, isPositive: true, icon: DollarSign, color: { bg: 'bg-orange-500', text: 'text-orange-500' } },
    { title: 'New PDVs', value: '48', change: 8.2, isPositive: true, icon: Store, color: { bg: 'bg-blue-500', text: 'text-blue-500' } },
    { title: 'Stockout Rate', value: '0.56%', change: 2.4, isPositive: false, icon: Percent, color: { bg: 'bg-rose-500', text: 'text-rose-500' } },
    { title: 'Market Share', value: '24.8%', change: 5.1, isPositive: true, icon: Target, color: { bg: 'bg-emerald-500', text: 'text-emerald-500' } },
    { title: 'Active Items', value: '2.7k', change: 0.8, isPositive: true, icon: Package, color: { bg: 'bg-purple-500', text: 'text-purple-500' } },
    { title: 'Field Team', value: '12', change: 0, isPositive: true, icon: Users, color: { bg: 'bg-indigo-500', text: 'text-indigo-500' } },
  ];

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      <Sidebar />
      
      <main className="flex-1 ml-64 min-h-screen">
        <Header isDark={isDark} toggleDark={toggleDark} />
        
        <div className="p-10 max-w-[1600px] mx-auto space-y-10">
          {/* Welcome Section */}
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                Good morning, Marcos! 👋
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Here's what's happening with your trade operations today.
              </p>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-orange-200 dark:shadow-none transition-all flex items-center gap-2">
              Generate Report
            </button>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {kpis.map((kpi, idx) => (
              <KPICard key={idx} {...kpi} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-10">
            <GrowthChart isDark={isDark} />
          </div>

          {/* Data Table Section */}
          <DataTable />
        </div>
      </main>
    </div>
  );
};

export default TradeDashboard;
