import React from 'react';
import { Users, AlertTriangle, FileBadge, CheckCircle, ClipboardList } from 'lucide-react';

const EmployerDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Employer Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your workforce, track compliance, and view incident reports.</p>
        </div>
        <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">
          Data simulated for SIH prototype
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Total Employees</div>
              <div className="text-3xl font-bold text-slate-800">1,248</div>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Compliance Rate</div>
              <div className="text-3xl font-bold text-slate-800">92%</div>
            </div>
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Active Incidents</div>
              <div className="text-3xl font-bold text-slate-800">4</div>
            </div>
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Pending Tasks</div>
              <div className="text-3xl font-bold text-slate-800">18</div>
            </div>
            <div className="p-3 rounded-full bg-amber-100 text-amber-600">
              <ClipboardList className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <FileBadge className="text-purple-600" />
          Workforce Compliance Status
        </h2>
        <p className="text-slate-600">The Employer dashboard implementation goes here. Focuses on aggregating employee compliance, managing worker certifications, addressing safety observations, and submitting grievances.</p>
      </div>
    </div>
  );
};

export default EmployerDashboard;
