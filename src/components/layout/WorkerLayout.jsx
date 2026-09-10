import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import WorkerBottomNav from './WorkerBottomNav';
import WorkerTopBar from './WorkerTopBar';

const WorkerLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-200 font-sans text-slate-900 antialiased justify-center">
      {/* Mobile App Container */}
      <div className="w-full max-w-xl flex flex-col min-h-screen bg-slate-50 relative shadow-2xl border-x border-slate-300">
        <WorkerTopBar />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto pb-20">
          <Outlet />
        </main>
        
        <WorkerBottomNav />
      </div>
    </div>
  );
};

export default WorkerLayout;
