import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  X, BrainCircuit, ShieldAlert, CheckCircle2, ArrowRight, 
  AlertTriangle 
} from 'lucide-react';

const AiExplanationModal = () => {
  const { 
    activeModal, 
    selectedAiInsight, 
    closeModals, 
    openActionDetail 
  } = useManager();

  if (activeModal !== 'ai_explanation' || !selectedAiInsight) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0a3560] to-[#0f4c81] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">AI Governance Explanation & Evidence</h2>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Transparency Mode
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Model: KoylaSetu Negative-Space & Recurrent Hazard Engine v2.4
              </p>
            </div>
          </div>
          <button 
            onClick={closeModals}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800 flex-1">
          
          {/* Top Status Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                selectedAiInsight.riskLevel === 'High' 
                  ? 'bg-red-100 text-red-700 border border-red-200' 
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {selectedAiInsight.riskLevel} Risk
              </span>
              <span className="text-xs font-semibold text-slate-600">
                {selectedAiInsight.riskCategory}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-500 font-medium">Confidence Score:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {selectedAiInsight.confidenceScore}% High Confidence
              </span>
            </div>
          </div>

          {/* 1. Finding */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              1. AI Finding & Location
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {selectedAiInsight.finding}
            </h3>
            <div className="mt-1 text-xs font-semibold text-[#0f4c81] flex items-center gap-1.5">
              <span>📍 Location:</span>
              <span>{selectedAiInsight.area}</span>
            </div>
          </div>

          {/* 2. Why (Root Cause & Historical Pattern) */}
          <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              2. Why: Root Cause & Pattern Detection
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {selectedAiInsight.reason}
            </p>
          </div>

          {/* 3. Evidence & Sensor Telemetry */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              3. Telemetry Evidence & Sensor Cross-Check
            </div>
            <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 space-y-3">
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                {selectedAiInsight.evidence}
              </p>
              
              {/* Sensor Metric Tiles */}
              {selectedAiInsight.sensorReadings && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
                  {Object.entries(selectedAiInsight.sensorReadings).map(([key, val]) => (
                    <div key={key} className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 text-center">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="text-sm font-bold text-yellow-400 mt-0.5">
                        {val}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 4. Statutory Priority */}
          <div className="flex items-center gap-3 p-3 bg-red-50/60 rounded-xl border border-red-200/80 text-xs">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <span className="font-bold text-red-900">Statutory Regulation Mapping: </span>
              <span className="text-red-700 font-medium">{selectedAiInsight.priority}</span>
            </div>
          </div>

          {/* 5. Recommended Action */}
          <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-xl">
            <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              5. Recommended Management Action
            </div>
            <p className="text-xs text-slate-800 font-semibold leading-relaxed">
              {selectedAiInsight.suggestedAction}
            </p>
          </div>

        </div>

        {/* Modal Footer / Navigation to Related Workflows */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <span>Related Inspection:</span>
            <span className="font-bold text-slate-700">{selectedAiInsight.relatedInspectionId || 'INS-2024-WCL-44'}</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={closeModals}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            {selectedAiInsight.relatedActionId && (
              <button
                onClick={() => openActionDetail(selectedAiInsight.relatedActionId)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0f4c81] hover:bg-[#0b3b60] rounded-lg shadow-sm transition-all"
              >
                <span>Proceed to Action ({selectedAiInsight.relatedActionId})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiExplanationModal;
