import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  HardHat, ShieldAlert, ShieldCheck, Users, 
  FileText, ArrowRight, BrainCircuit, AlertTriangle 
} from 'lucide-react';

const ContractorIntelligence = () => {
  const { contractors, openAiExplanation, openActionDetail } = useManager();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#0f4c81]">
            <HardHat className="w-4 h-4" />
            <span>Third-Party Mining Agency & Vendor Governance</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Contractor Risk & Compliance Intelligence
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time compliance monitoring, statutory work permits, and predictive risk scoring for outsourced colliery operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Contractors</span>
            <span className="text-lg font-bold text-slate-800">{contractors.length} Active</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">High Risk</span>
            <span className="text-lg font-bold text-amber-900">
              {contractors.filter(c => c.riskLevel === 'High').length}
            </span>
          </div>
        </div>
      </div>

      {/* Contractor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contractors.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{c.workScope}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  c.riskLevel === 'High' ? 'bg-red-100 text-red-700 border border-red-200' :
                  c.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  {c.riskLevel} Risk
                </span>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Compliance</span>
                  <span className="text-base font-bold text-emerald-700">{c.complianceScore}%</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Personnel</span>
                  <span className="text-base font-bold text-slate-800">{c.activePersonnel}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Open Actions</span>
                  <span className={`text-base font-bold ${c.openActions > 0 ? 'text-amber-600' : 'text-slate-700'}`}>
                    {c.openActions}
                  </span>
                </div>
              </div>

              {/* AI Risk Profile */}
              <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0f4c81]">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>AI Risk Profile & Intelligence Summary</span>
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {c.aiRiskSummary}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Lead: {c.leadContact}</span>
              <div className="flex items-center gap-2">
                {c.riskLevel === 'High' && (
                  <button
                    onClick={() => openAiExplanation('AI-CONT-03')}
                    className="px-3 py-1.5 text-xs font-bold text-[#0f4c81] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    AI Audit
                  </button>
                )}
                <button
                  onClick={() => openActionDetail('ACT-885')}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0f4c81] hover:bg-[#0b3b60] rounded-lg shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Permits ({c.permitsActive})</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ContractorIntelligence;
