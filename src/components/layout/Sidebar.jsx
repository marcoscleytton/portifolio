import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Users, 
  Store, 
  TrendingUp,
  LogOut
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SidebarItem = ({ icon: Icon, label, active = false }) => (
  <div className={cn(
    "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group",
    active 
      ? "bg-orange-500 text-white shadow-lg shadow-orange-200 dark:shadow-none" 
      : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
  )}>
    <Icon size={20} className={cn(
      "transition-colors",
      active ? "text-white" : "group-hover:text-orange-500"
    )} />
    <span className="font-medium">{label}</span>
  </div>
);

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col z-50">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200 dark:shadow-none">
          <TrendingUp size={24} strokeWidth={2.5} />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
          TradeAnalytics
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
        <SidebarItem icon={BarChart3} label="Reports" />
        <SidebarItem icon={Store} label="PDVs" />
        <SidebarItem icon={Users} label="Team" />
        <SidebarItem icon={Settings} label="Settings" />
      </nav>

      <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-6">
        <SidebarItem icon={LogOut} label="Logout" />
      </div>
    </aside>
  );
};

export default Sidebar;
