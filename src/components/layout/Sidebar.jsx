import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  ClipboardList, 
  AlertTriangle, 
  Map, 
  Settings,
  HardHat
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Compliance', path: '/compliance', icon: ShieldCheck },
    { name: 'Inspections', path: '/inspections', icon: ClipboardList },
    { name: 'Incidents & Actions', path: '/actions', icon: AlertTriangle },
    { name: 'GIS Map', path: '/map', icon: Map },
    { name: 'Contractors', path: '/contractors', icon: HardHat },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col h-screen fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 bg-[#0f4c81] text-white font-bold text-xl tracking-wider shadow-md">
        <span className="text-yellow-400 mr-2">⛏️</span> KoylaSetu
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <div className="px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Governance Modules
        </div>
        <nav className="flex flex-col space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-slate-800 text-white border-l-4 border-yellow-400' 
                      : 'hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 bg-slate-900 text-xs border-t border-slate-800">
        <div className="flex justify-between items-center text-slate-500 mb-1">
          <span>System Status</span>
          <span className="flex items-center text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-1 animate-pulse"></span> Online</span>
        </div>
        <div className="text-[10px] text-slate-600">
          Last sync: Just now
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
