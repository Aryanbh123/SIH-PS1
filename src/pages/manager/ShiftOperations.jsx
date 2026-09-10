import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  Clock, Users, CheckCircle, AlertTriangle, 
  Calendar, ShieldCheck, UserCheck 
} from 'lucide-react';

const ShiftOperations = () => {
  const { workforceData } = useManager();

  const shiftExceptions = [
    { shift: "Shift A (Morning)", exception: "2 Haul Truck Operators late due to local transit roadblock", impact: "Mitigated by standby relief pool", status: "Resolved" },
    { shift: "Shift C (Night)", exception: "Auxiliary fan electrical maintenance crew scheduled 01:00 - 03:00", impact: "Face 4B ventilation bypass active", status: "Planned" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#0f4c81]">
            <Clock className="w-4 h-4" />
            <span>Shift Scheduling & Frontline Roster Operations</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Shift Operations & Manning Schedule
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time shift coverage, supervisor accountability, and roster compliance.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl text-center">
          <span className="text-[10px] font-bold text-[#0f4c81] uppercase tracking-wider block">Current Operating Shift</span>
          <span className="text-base font-bold text-[#0f4c81]">Shift A · 06:00 to 14:00</span>
        </div>
      </div>

      {/* Shifts Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workforceData.shifts.map((shift) => (
          <div key={shift.id} className={`bg-white rounded-2xl p-5 border shadow-xs space-y-4 ${
            shift.active ? 'border-[#0f4c81] ring-1 ring-[#0f4c81]' : 'border-slate-200/90'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{shift.name}</h3>
                  {shift.active && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white animate-pulse">
                      Active Shift
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">{shift.time}</div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-slate-900">{shift.coverage}</span>
                <span className="text-[10px] text-slate-400 block">Coverage</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <strong className="text-slate-400 text-[10px] uppercase block">Shift In-Charge</strong>
                <span className="font-bold text-slate-800">{shift.supervisor}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <strong className="text-slate-400 text-[10px] uppercase block">Manning Strength</strong>
                <span className="font-bold text-slate-800">{shift.present || shift.scheduled} / {shift.target} Personnel</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Operational Exceptions & Handover Notes */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Shift Operational Exceptions & Safety Handover
          </h2>
          <span className="text-xs font-semibold text-slate-400">DGMS Logged Handover</span>
        </div>

        <div className="space-y-3">
          {shiftExceptions.map((exc, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{exc.shift}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                  {exc.status}
                </span>
              </div>
              <p className="text-slate-700 font-medium">{exc.exception}</p>
              <div className="text-[11px] text-slate-500 font-medium">
                <strong>Mitigation:</strong> {exc.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ShiftOperations;
