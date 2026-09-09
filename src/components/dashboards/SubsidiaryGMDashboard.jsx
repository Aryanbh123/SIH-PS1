import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

const SubsidiaryGMDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Subsidiary Executive Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Cross-mine comparison and systemic risk tracking for the subsidiary.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <BarChart3 className="text-purple-600" />
          Mine Performance Comparison
        </h2>
        <p className="text-slate-600">The GM dashboard implementation goes here. Focuses on aggregating data across multiple mines within the subsidiary, highlighting underperforming areas.</p>
      </div>
    </div>
  );
};

export default SubsidiaryGMDashboard;
