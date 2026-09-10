import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  History, Clock, User, ShieldCheck, 
  FileText, Activity, Lock 
} from 'lucide-react';

const AuditHistory = () => {
  const { auditHistory, mineDetails } = useManager();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#0f4c81]">
            <History className="w-4 h-4" />
            <span>Cryptographically Verified Statutory Audit Trail</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Governance & Audit History
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Immutable chronological logging of all managerial authorizations, inspection reviews, evidence submissions, and action sign-offs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
          <Lock className="w-4 h-4" />
          <span>Audit Trail Sealed & Tamper-Proof</span>
        </div>
      </div>

      {/* Timeline List */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-6">
        <div className="relative border-l-2 border-slate-200 ml-4 space-y-6">
          {auditHistory.map((item, idx) => (
            <div key={item.id || idx} className="relative pl-6 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-[#0f4c81] group-hover:border-yellow-400 transition-colors" />
              
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">{item.time}</span>
                  <span className="text-[10px] text-slate-400 font-medium">({item.date})</span>
                  <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {item.action}
                </p>

                <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5 pt-0.5">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>Actor: <strong>{item.actor}</strong> ({item.role})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AuditHistory;
