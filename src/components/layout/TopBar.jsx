import React from 'react';
import { Bell, Search, Menu, ChevronDown } from 'lucide-react';
import { currentUser } from '../../data/mockData';

const TopBar = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
      
      <div className="flex items-center flex-1 gap-4">
        <button className="text-slate-500 hover:text-slate-700 lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Global Search */}
        <div className="relative w-96 hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-1.5 border border-slate-300 rounded-md leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0f4c81] focus:ring-1 focus:ring-[#0f4c81] sm:text-sm transition-colors"
            placeholder="Search inspections, actions, mines (e.g. INS-1042)"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button className="relative text-slate-500 hover:text-[#0f4c81] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
            3
          </span>
        </button>

        {/* User Profile Dropdown Simulator */}
        <div className="flex items-center gap-3 pl-5 border-l border-slate-200 cursor-pointer hover:bg-slate-50 p-1.5 rounded transition-colors">
          <img 
            src={currentUser.avatar} 
            alt="Profile" 
            className="w-8 h-8 rounded-full border border-slate-300"
          />
          <div className="hidden md:block">
            <div className="text-sm font-semibold text-slate-700 leading-tight">{currentUser.name}</div>
            <div className="text-xs text-slate-500">{currentUser.role}</div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
        </div>
      </div>

    </header>
  );
};

export default TopBar;
