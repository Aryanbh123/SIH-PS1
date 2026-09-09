import React from 'react';
import { PlusCircle, Search, Clock, Camera } from 'lucide-react';

const FieldInspectorDashboard = () => {
  return (
    <div className="space-y-6 max-w-md mx-auto pb-20">
      <div className="bg-[#0f4c81] -mx-4 -mt-4 p-6 pt-8 pb-12 text-white">
        <h1 className="text-2xl font-bold">Good Morning, Inspector</h1>
        <p className="text-sky-200 text-sm mt-1">You have 3 inspections scheduled today.</p>
      </div>
      
      <div className="-mt-8 grid grid-cols-2 gap-4 relative z-10 px-2">
        <button className="bg-white p-4 rounded-xl shadow-md border border-slate-100 flex flex-col items-center justify-center text-center hover:bg-slate-50">
          <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full mb-3">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="font-bold text-slate-700 text-sm">New Inspection</span>
        </button>
        <button className="bg-white p-4 rounded-xl shadow-md border border-slate-100 flex flex-col items-center justify-center text-center hover:bg-slate-50">
          <div className="bg-amber-100 text-amber-600 p-3 rounded-full mb-3">
            <Camera className="w-6 h-6" />
          </div>
          <span className="font-bold text-slate-700 text-sm">Quick Report</span>
        </button>
      </div>

      <div className="px-2 mt-6">
        <h2 className="font-bold text-slate-800 mb-3">Today's Schedule</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-3 border-l-4 border-l-[#0f4c81]">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-slate-800">Sector 4 Structural Check</h3>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold">10:00 AM</span>
          </div>
          <p className="text-sm text-slate-500 mb-3">Check roof bolts based on recent AI insight alert.</p>
          <button className="w-full bg-slate-100 text-slate-700 font-bold text-sm py-2 rounded-lg">Start Inspection</button>
        </div>
      </div>
    </div>
  );
};

export default FieldInspectorDashboard;
