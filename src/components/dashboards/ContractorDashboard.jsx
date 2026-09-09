import React from 'react';
import { HardHat, CheckSquare, FileBadge } from 'lucide-react';

const ContractorDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Contractor Portal</h1>
          <p className="text-slate-500 text-sm mt-1">Manage compliance, licences, and assigned tasks.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <HardHat className="text-amber-600" />
          Contractor Compliance Status
        </h2>
        <p className="text-slate-600">The Contractor dashboard implementation goes here. Focuses on uploading licences, responding to corrective actions, and viewing site access status.</p>
      </div>
    </div>
  );
};

export default ContractorDashboard;
