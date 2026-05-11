import React from 'react';
import { Search, Bell, Moon, Sun, User } from 'lucide-react';

const Header = ({ isDark, toggleDark }) => {
  return (
    <header className="sticky top-0 right-0 left-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-20 flex items-center justify-between px-8 z-40">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search analytics..." 
          className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-orange-500/20 dark:text-white transition-all outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDark}
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-all"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 relative transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white dark:border-slate-900" />
        </button>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right">
            <p className="text-sm font-semibold dark:text-white">Marcos Lisboa</p>
            <p className="text-xs text-slate-500">Trade Manager</p>
          </div>
          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
