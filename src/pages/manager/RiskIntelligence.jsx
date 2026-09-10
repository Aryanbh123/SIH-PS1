import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  ShieldAlert, TrendingUp, AlertTriangle, MapPin, 
  BrainCircuit, ArrowRight, Activity, Layers, CheckCircle2 
} from 'lucide-react';

const RiskIntelligence = () => {
  const { riskCategories, aiInsights, openAiExplanation, openActionDetail } = useManager();

  const highRiskZones = [
    { zone: "Pit 4 (Underground Face 4B)", risk: 88, category: "Ventilation Deficiency", hazard: "Recurring duct air velocity loss & methane sensor drift", actionId: "ACT-884", aiId: "AI-VENT-01" },
    { zone: "Overburden Dump 2 (East Flank)", risk: 78, category: "Slope Stability", hazard: "InSAR radar settlement 4.8mm & pore pressure rise", actionId: "ACT-883", aiId: "AI-SLOPE-04" },
    { zone: "South Quarry Blasting Area", risk: 74, category: "Contractor Compliance", hazard: "Deccan Blasting statutory magazine license expiring", actionId: "ACT-885", aiId: "AI-CONT-03" },
    { zone: "Haul Road B (South Ramp Gradient)", risk: 58, category: "Heavy Haulage", hazard: "100T dumpers speed exceedance & RFID proximity near-misses", actionId: "ACT-886", aiId: "AI-HAUL-02" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-red-600">
            <ShieldAlert className="w-4 h-4" />
            <span>Operational Risk Intelligence & Hazard Prioritization</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Colliery Comprehensive Risk Center
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time multi-dimensional risk scoring combining sensor telemetry, inspection observations, and AI pattern models.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 px-5 py-3 rounded-xl flex items-center gap-4">
          <div>
            <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">Aggregate Mine Risk</span>
            <span className="text-2xl font-bold text-red-700">72 / 100</span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-600 text-white uppercase">
            Elevated
          </span>
        </div>
      </div>

      {/* Category Risk Matrix */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0f4c81]" />
            Risk Breakdown by Operational Category
          </h2>
          <span className="text-xs font-semibold text-slate-400">6 Monitored Domains</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {riskCategories.map((cat) => (
            <div key={cat.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">{cat.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  cat.level === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                }`}>
                  {cat.level} Risk
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Score: {cat.score}%</span>
                  <span className="text-[11px] font-medium text-slate-500">{cat.trend}</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      cat.score >= 70 ? 'bg-red-500' : cat.score >= 50 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-xs flex items-center justify-between text-slate-500">
                <span>Critical Zone: <strong>{cat.criticalArea}</strong></span>
                <span className="font-semibold text-slate-700">{cat.count} Open Flags</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Mine Zones & Active Interventions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600" />
            High-Risk Mine Locations & Active Interventions
          </h2>
          <span className="text-xs font-semibold text-slate-400">4 Active Priority Zones</span>
        </div>

        <div className="space-y-3">
          {highRiskZones.map((hz, idx) => (
            <div key={idx} className="p-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">{hz.zone}</span>
                  <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-red-100 text-red-700">
                    Risk {hz.risk}/100
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{hz.hazard}</p>
                <div className="text-[11px] text-slate-400 font-medium">
                  Category: <span className="text-slate-700 font-semibold">{hz.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openAiExplanation(hz.aiId)}
                  className="px-3 py-1.5 text-xs font-bold text-[#0f4c81] bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>AI Reason</span>
                </button>
                <button
                  onClick={() => openActionDetail(hz.actionId)}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0f4c81] hover:bg-[#0b3b60] rounded-lg shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Action ({hz.actionId})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default RiskIntelligence;
