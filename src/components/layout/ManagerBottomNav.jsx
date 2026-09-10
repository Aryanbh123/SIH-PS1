import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, ClipboardCheck, Clock3, ShieldCheck, User } from 'lucide-react';
import { useManager } from '../../context/ManagerContext';

const ManagerBottomNav = () => {
  const { kpis, attentionItems } = useManager();
  const pendingActions = attentionItems?.length || 3;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        {/* Home Tab */}
        <NavLink 
          to="/manager"
          end
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-[#003366] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`
          }
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </NavLink>
        
        {/* Operations / Shifts Tab */}
        <NavLink 
          to="/manager/shifts"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-[#003366] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`
          }
        >
          <Clock3 className="w-5 h-5" />
          <span className="text-[10px]">Operations</span>
        </NavLink>
        
        {/* Inspections Tab with Badge */}
        <NavLink 
          to="/manager/inspections"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 relative transition-colors ${
              isActive ? 'text-[#003366] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`
          }
        >
          <div className="relative">
            <ClipboardCheck className="w-5 h-5" />
            {pendingActions > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-amber-500 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                {pendingActions}
              </span>
            )}
          </div>
          <span className="text-[10px]">Inspections</span>
        </NavLink>
        
        {/* Safety & DGMS Tab */}
        <NavLink 
          to="/manager/compliance"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-[#003366] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`
          }
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px]">Safety</span>
        </NavLink>
        
        {/* Profile Tab */}
        <NavLink 
          to="/manager/profile"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-[#003366] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`
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
