import React from 'react';
import { ShieldAlert, AlertTriangle, Search, Activity } from 'lucide-react';
import { alerts, aiInsights } from '../../data/mockData';

const SafetyOfficerDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Safety Officer Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Focusing on compliance, incidents, and daily safety tasks.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <ShieldAlert className="text-emerald-600" />
          Today's Priority Safety Tasks
        </h2>
        <p className="text-slate-600">The safety dashboard implementation goes here. Focuses heavily on observations, active incidents, and enforcing immediate corrective actions on site.</p>
      </div>
    </div>
  );
};

export default SafetyOfficerDashboard;
