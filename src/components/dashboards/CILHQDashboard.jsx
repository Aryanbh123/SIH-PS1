import React from 'react';
import { Globe, Users, TrendingUp } from 'lucide-react';

const CILHQDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Enterprise Dashboard (CIL HQ)</h1>
          <p className="text-slate-500 text-sm mt-1">High-level enterprise overview of all subsidiaries.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Globe className="text-blue-600" />
          National Compliance Overview
        </h2>
        <p className="text-slate-600">The CIL HQ dashboard implementation goes here. Focuses on national trends, subsidiary rankings, and major systemic risks.</p>
      </div>
    </div>
  );
};

export default CILHQDashboard;
