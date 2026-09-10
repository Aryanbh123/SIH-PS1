import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  AlertTriangle, Clock, MapPin, CheckCircle, 
  ShieldAlert, User, ArrowRight, Activity 
} from 'lucide-react';

const IncidentManagement = () => {
  const { incidents, openActionDetail } = useManager();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-amber-600">
            <AlertTriangle className="w-4 h-4" />
            <span>Operational Safety Incidents & Failure Investigations</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Incident Management & Root Cause Analysis
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Tracking active mine incidents, immediate response measures, investigation findings, and statutory remediation.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl text-center">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Active Incidents</span>
          <span className="text-xl font-bold text-amber-900">{incidents.length} Active</span>
        </div>
      </div>

      {/* Incidents Timeline Cards */}
      <div className="space-y-4">
        {incidents.map((inc) => (
          <div key={inc.id} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                  {inc.id}
                </span>
                <h3 className="text-base font-bold text-slate-900">{inc.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  inc.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                }`}>
                  {inc.severity} Severity
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                  {inc.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div>
                <strong className="text-slate-400 block text-[10px] uppercase">Incident Timestamp</strong>
                <span className="font-semibold text-slate-800">{inc.timestamp}</span>
              </div>
              <div>
                <strong className="text-slate-400 block text-[10px] uppercase">Colliery Location</strong>
                <span className="font-semibold text-slate-800">{inc.location}</span>
              </div>
              <div>
                <strong className="text-slate-400 block text-[10px] uppercase">Reported By</strong>
                <span className="font-semibold text-slate-800">{inc.reportedBy}</span>
              </div>
            </div>

            {/* Response & Root Cause Details */}
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <strong className="text-slate-900 block mb-1">Immediate Containment & Response:</strong>
                <p className="text-slate-700 font-medium leading-relaxed">{inc.response}</p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70">
                <strong className="text-amber-900 block mb-1">Preliminary Root Cause Analysis (RCA):</strong>
                <p className="text-slate-700 font-medium leading-relaxed">{inc.rootCause}</p>
              </div>
            </div>

            {/* Footer with Corrective Action Link */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-medium">
                Closure Target: <strong>{inc.closureTarget}</strong>
              </span>
              {inc.correctiveActionId && (
                <button
                  onClick={() => openActionDetail(inc.correctiveActionId)}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0f4c81] hover:bg-[#0b3b60] rounded-lg shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Open Remedial Action ({inc.correctiveActionId})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default IncidentManagement;
