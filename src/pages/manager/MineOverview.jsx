import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  Building, Layers, MapPin, Award, Users, 
  Activity, ArrowUpRight, TrendingUp, ShieldCheck 
} from 'lucide-react';

const MineOverview = () => {
  const { mineDetails, kpis } = useManager();

  const seamDetails = [
    { seam: "Seam I (Upper)", thickness: "4.2 m", depth: "85 m", method: "Opencast Dragline", reserves: "18.4 MT", status: "Active Extraction" },
    { seam: "Seam II (Middle)", thickness: "3.8 m", depth: "140 m", method: "Continuous Miner", reserves: "24.6 MT", status: "Development" },
    { seam: "Seam III (Deep / Pit 4)", thickness: "5.6 m", depth: "220 m", method: "Longwall / Bord & Pillar", reserves: "38.2 MT", status: "High Alert / Active" }
  ];

  const equipmentFleet = [
    { name: "Komatsu 100T Dumpers", active: 24, maintenance: 2, total: 26, status: "92% Operational" },
    { name: "P&H 10m³ Electric Shovels", active: 3, maintenance: 0, total: 3, status: "100% Operational" },
    { name: "Continuous Miner Fleet (Pit 4)", active: 2, maintenance: 1, total: 3, status: "67% Operational" },
    { name: "Rotary Blast-Hole Drills", active: 4, maintenance: 1, total: 5, status: "80% Operational" },
    { name: "Main Ventilation Exhaust Fans", active: 2, maintenance: 0, total: 2, status: "100% Operational (Dual Redundancy)" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#0f4c81]">
            <Building className="w-4 h-4" />
            <span>Colliery Technical Infrastructure & Seam Profile</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {mineDetails.name} — Operational Profile
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {mineDetails.subsidiary} · {mineDetails.area} · Maharashtra State
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rated Capacity</span>
            <span className="text-sm font-bold text-slate-900">{mineDetails.capacity}</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Current Production</span>
            <span className="text-sm font-bold text-emerald-800">{mineDetails.currentProductionRate}</span>
          </div>
        </div>
      </div>

      {/* Seam Profiles & Extraction Methodology */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0f4c81]" />
            <h2 className="text-sm font-bold text-slate-900">Stratigraphic Seam Details & Reserves</h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">Total Proved Reserves: 81.2 MT</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-y border-slate-200/70">
              <tr>
                <th className="py-2.5 px-4">Coal Seam</th>
                <th className="py-2.5 px-4">Thickness</th>
                <th className="py-2.5 px-4">Working Depth</th>
                <th className="py-2.5 px-4">Extraction Method</th>
                <th className="py-2.5 px-4">Proved Reserves</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {seamDetails.map((seam, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{seam.seam}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{seam.thickness}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{seam.depth}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{seam.method}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{seam.reserves}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      seam.status.includes('High Alert') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {seam.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Equipment Fleet Status */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0f4c81]" />
            <h2 className="text-sm font-bold text-slate-900">Heavy Earth Moving Machinery (HEMM) Availability</h2>
          </div>
          <span className="text-xs font-semibold text-emerald-700">Fleet Availability: 88.4%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {equipmentFleet.map((eq, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
              <div className="font-bold text-xs text-slate-900 leading-snug">{eq.name}</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{eq.active} deployed / {eq.total} total</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {eq.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MineOverview;
