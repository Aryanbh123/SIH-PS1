import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, ClipboardList, Clock, Shield, User } from 'lucide-react';
import { useWorker } from '../../context/WorkerContext';

const WorkerBottomNav = () => {
  const workerContext = useWorker();
  const unreadNotifications = workerContext?.notifications?.filter(n => !n.read).length || 0;
  const pendingTasks = workerContext?.tasks?.filter(t => t.status !== 'completed').length || 0;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 bg-white/95 backdrop-blur border-t border-slate-200/80 px-4 py-2">
      <div className="flex items-center justify-around">
        <NavLink 
          to="/"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'text-[#136c4b]' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </NavLink>
        
        <NavLink 
          to="/worker/tasks"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 relative ${isActive ? 'text-[#136c4b]' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <ClipboardList className="w-5 h-5" />
          <span className="text-[10px] font-medium">My Work</span>
          {pendingTasks > 0 && (
            <span className="absolute -top-1 right-1 w-3.5 h-3.5 bg-[#136c4b] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {pendingTasks}
            </span>
          )}
        </NavLink>
        
        <NavLink 
          to="/worker/attendance"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'text-[#136c4b]' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px] font-medium">Attendance</span>
        </NavLink>
        
        <NavLink 
          to="/worker/compliance"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'text-[#136c4b]' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <Shield className="w-5 h-5" />
          <span className="text-[10px] font-medium">Safety</span>
        </NavLink>
        
        <NavLink 
          to="/worker/profile"
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'text-[#136c4b]' : 'text-slate-400 hover:text-slate-600'}`
          }
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default WorkerBottomNav;
