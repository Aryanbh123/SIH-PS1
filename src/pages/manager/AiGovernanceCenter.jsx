import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  BrainCircuit, ShieldAlert, CheckCircle2, 
  ArrowRight, Eye, Sparkles, Activity, Layers 
} from 'lucide-react';

const AiGovernanceCenter = () => {
  const { aiInsights, openAiExplanation, openActionDetail } = useManager();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a3560] to-[#0f4c81] rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-yellow-400">
            <BrainCircuit className="w-4 h-4" />
            <span>AI Governance & Predictive Compliance Center</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            AI Governance Command Center
          </h1>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Negative-space anomaly detection, recurring violation correlations, sensor drift analysis, and geotechnical alerts.
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 px-4 py-2.5 rounded-xl text-center">
          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Active AI Models</span>
          <span className="text-sm font-bold text-white">4 Models Active</span>
        </div>
      </div>

      {/* AI Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiInsights.map((insight) => (
          <div 
            key={insight.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    insight.riskLevel === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {insight.riskLevel} Risk
                  </span>
                  <span className="text-xs font-bold text-[#0f4c81]">{insight.riskCategory}</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {insight.confidenceScore}% Confidence
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {insight.finding}
                </h3>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  Location: <strong>{insight.area}</strong>
                </div>
              </div>

              {/* Reason */}
              <div className="p-3 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-lg text-xs text-slate-700 leading-relaxed font-medium">
                <strong className="text-amber-900 block mb-0.5">Why (Root Cause & Recurrent Pattern):</strong>
                {insight.reason}
              </div>

              {/* Evidence */}
              <div className="p-3 bg-slate-900 text-white rounded-xl space-y-2 text-xs">
                <strong className="text-yellow-400 block text-[11px] uppercase tracking-wider">
                  Telemetry Evidence:
                </strong>
                <p className="text-slate-300 leading-relaxed font-medium">{insight.evidence}</p>

                {/* Sensors */}
                {insight.sensorReadings && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-center">
                    {Object.entries(insight.sensorReadings).map(([k, v]) => (
                      <div key={k} className="bg-slate-800 p-2 rounded">
                        <div className="text-[9px] uppercase font-bold text-slate-400">{k.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-xs font-bold text-yellow-300 mt-0.5">{v}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Statutory Priority */}
              <div className="text-xs font-semibold text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200">
                <strong>Statutory Standard:</strong> {insight.priority}
              </div>

              {/* Action */}
              <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Recommended Action:</strong> {insight.suggestedAction}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => openAiExplanation(insight.id)}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Explanatory Evidence</span>
              </button>
              {insight.relatedActionId && (
                <button
                  onClick={() => openActionDetail(insight.relatedActionId)}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#0f4c81] hover:bg-[#0b3b60] rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Resolve ({insight.relatedActionId})</span>
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

export default AiGovernanceCenter;
