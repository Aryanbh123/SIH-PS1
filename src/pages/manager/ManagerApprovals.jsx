import React, { useState } from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  FileCheck, CheckCircle2, XCircle, Clock, 
  ShieldCheck, AlertTriangle, ArrowRight, Stamp 
} from 'lucide-react';

const ManagerApprovals = () => {
  const { approvals, approveRequest, openActionDetail } = useManager();
  const [filter, setFilter] = useState('all');

  const filteredApprovals = approvals.filter(app => {
    if (filter === 'all') return true;
    return app.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#0f4c81]">
            <FileCheck className="w-4 h-4" />
            <span>Statutory Authorizations & Mine Manager Sign-Offs</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manager Approvals Center
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Mandatory First-Class Manager sign-offs for action closures, deep blasting permits, and environmental filings.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl text-xs font-bold">
          {['all', 'pending', 'approved'].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
                filter === st ? 'bg-[#0f4c81] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        {filteredApprovals.map((app) => (
          <div key={app.id} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-[#0f4c81] bg-blue-50 px-2.5 py-1 rounded-md">
                  {app.id}
                </span>
                <h3 className="text-base font-bold text-slate-900">{app.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  app.priority === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                }`}>
                  {app.priority} Priority
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {app.status}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-600 font-medium">
              <span className="text-slate-400 block text-[10px] uppercase">Submitted By</span>
              <span className="font-bold text-slate-800">{app.submittedBy} · {app.timestamp}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-700 leading-relaxed font-medium">
              {app.summary}
            </div>

            {/* Decision Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-medium">
                Authorization Type: <strong>{app.type}</strong>
              </span>

              {app.status === 'Pending' ? (
                <div className="flex items-center gap-2">
                  {app.id === 'APP-101' ? (
                    <button
                      onClick={() => openActionDetail('ACT-884')}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#0f4c81] hover:bg-[#0b3b60] rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Stamp className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Inspect Proofs & Verify</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => approveRequest(app.id)}
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Authorize Sign-off</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Statutory Endorsement Complete</span>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ManagerApprovals;
