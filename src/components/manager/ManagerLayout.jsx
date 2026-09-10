import React from 'react';
import { Outlet } from 'react-router-dom';
import ManagerTopBarMobile from '../layout/ManagerTopBarMobile';
import ManagerBottomNav from '../layout/ManagerBottomNav';
import AiExplanationModal from './AiExplanationModal';
import ActionDetailModal from './ActionDetailModal';
import SiteDetailDrawer from './SiteDetailDrawer';

const ManagerLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-200 font-sans text-slate-900 antialiased justify-center">
      {/* Mobile Android App Container */}
      <div className="w-full max-w-xl flex flex-col min-h-screen bg-slate-50 relative shadow-2xl border-x border-slate-300">
        <ManagerTopBarMobile />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto pb-16">
          <Outlet />
        </main>
        
        <ManagerBottomNav />
      </div>

      {/* Global Interactive Modals for Demo Flows */}
      <AiExplanationModal />
      <ActionDetailModal />
      <SiteDetailDrawer />
    </div>
  );
};

export default ManagerLayout;
