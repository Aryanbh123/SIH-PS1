import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  X, MapPin, AlertTriangle, ShieldCheck, Activity, 
  Users, Thermometer, Wind, Gauge, ArrowRight, CheckCircle2 
} from 'lucide-react';

const SiteDetailDrawer = () => {
  const { 
    activeModal, 
    selectedZone, 
    closeModals, 
    openActionDetail, 
    openAiExplanation 
  } = useManager();

  if (activeModal !== 'site_drawer' || !selectedZone) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0a3560] to-[#0f4c81] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-yellow-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">{selectedZone.name}</h3>
              <p className="text-[11px] text-slate-300">{selectedZone.type} · GIS Node</p>
            </div>
          </div>
          <button 
            onClick={closeModals}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-slate-800 flex-1">
          
          {/* Status & Risk Banner */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Zone Risk Score</span>
              <div className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>{selectedZone.riskScore}</span>
                <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              selectedZone.riskLevel === 'High'
                ? 'bg-red-100 text-red-700 border border-red-200'
                : selectedZone.riskLevel === 'Medium'
                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              {selectedZone.riskLevel} Risk
            </span>
          </div>

          {/* Operational Status */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Operating Status</span>
            <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-200/70 text-xs font-semibold text-blue-900 flex items-center justify-between">
              <span>{selectedZone.status}</span>
              <span className="flex items-center gap-1 text-[11px] text-slate-600">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                {selectedZone.activeWorkers} Personnel Active
              </span>
            </div>
          </div>

          {/* Telemetry Sensors */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-[#0f4c81]" />
              Live Telemetry & Sensors
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(selectedZone.sensors).map(([sensorKey, val]) => (
                <div key={sensorKey} className="p-2.5 bg-slate-900 text-white rounded-lg border border-slate-800">
                  <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                    {sensorKey.replace(/([A-Z])/g, ' $1')}
                  </div>
                  <div className="text-sm font-bold text-yellow-400 mt-0.5 font-mono">
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Hazards */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Active Hazards Identified
            </span>
            <ul className="space-y-1.5">
              {selectedZone.hazards.map((hazard, idx) => (
                <li key={idx} className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs font-medium text-amber-900 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{hazard}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Open Corrective Actions in this Site */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Related Governance Actions ({selectedZone.openActions.length})
            </span>
            <div className="space-y-2">
              {selectedZone.openActions.map(actionId => (
                <div 
                  key={actionId}
                  onClick={() => openActionDetail(actionId)}
                  className="p-3 bg-white border border-slate-200 hover:border-[#0f4c81] rounded-xl cursor-pointer transition-all hover:shadow-sm group flex items-center justify-between"
                >
                  <div>
                    <div className="font-mono text-xs font-bold text-[#0f4c81] group-hover:underline">
                      {actionId}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {actionId === 'ACT-884' ? 'Replace duct seals & calibrate sensor' : 'Strata support reinforcement'}
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#0f4c81] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={() => openAiExplanation('AI-VENT-01')}
            className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-[#0f4c81] hover:bg-[#0b3b60] shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>View Predictive AI Risk Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SiteDetailDrawer;
