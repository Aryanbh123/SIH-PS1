import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, AlertTriangle, CheckSquare, Users, User } from 'lucide-react';
import { useManager } from '../../context/ManagerContext';

const ManagerBottomNav = () => {
  const { correctiveActions, attentionItems } = useManager();
  
  const pendingActions = correctiveActions?.filter(a => a.status === 'open' || a.status === 'in_progress')?.length || 0;
  const criticalAlerts = attentionItems?.filter(item => item.severity === 'critical')?.length || 0;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        <NavLink 
          to="/manager" 
          end
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#003366] font-bold' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px]">Overview</span>
        </NavLink>
        
        <NavLink 
          to="/manager/risk"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 relative transition-colors ${isActive ? 'text-[#003366] font-bold' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <AlertTriangle className="w-5 h-5" />
          <span className="text-[10px]">Risk Intel</span>
          {criticalAlerts > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {criticalAlerts}
            </span>
          )}
        </NavLink>
        
        <NavLink 
          to="/manager/actions"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 relative transition-colors ${isActive ? 'text-[#003366] font-bold' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <CheckSquare className="w-5 h-5" />
          <span className="text-[10px]">Actions</span>
          {pendingActions > 0 && (
            <span className="absolute -top-1 right-1 w-3.5 h-3.5 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {pendingActions}
            </span>
          )}
        </NavLink>
        
        <NavLink 
          to="/manager/workforce"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#003366] font-bold' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px]">Workforce</span>
        </NavLink>
        
        <NavLink 
          to="/manager/profile"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#003366] font-bold' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default ManagerBottomNav;
