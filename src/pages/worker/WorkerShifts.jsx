import React from 'react';
import { useWorker } from '../../context/WorkerContext';
import { HardHat, MapPin, Users } from 'lucide-react';

const WorkerShifts = () => {
  const { shifts } = useWorker();

  const currentShift = shifts.find(s => s.status === 'Current');
  const upcomingShifts = shifts.filter(s => s.status === 'Upcoming');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">My Shifts</h1>
          <p className="text-slate-500 text-sm mt-1">View your current and upcoming roster.</p>
        </div>
      </div>

      {currentShift && (
        <div className="bg-gradient-to-br from-[#0f4c81] to-[#1e3a5f] rounded-xl shadow-lg border border-[#0f4c81] p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <HardHat className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/30 backdrop-blur-sm">
              Current Shift
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-5xl font-black mb-2">{currentShift.time}</div>
                <div className="text-blue-200 text-lg">{currentShift.date}</div>
              </div>
              <div className="space-y-3 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-lg">
                  <MapPin className="w-5 h-5 text-blue-300" />
                  <span className="font-semibold">{currentShift.location}</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <Users className="w-5 h-5 text-blue-300" />
                  <span>Supervisor: <strong className="font-semibold">{currentShift.supervisor}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-bold text-slate-800">Upcoming Shifts</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {upcomingShifts.map((shift, index) => (
            <div key={index} className="p-5 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">{shift.date}</h3>
                <div className="text-slate-500 font-medium">{shift.time}</div>
              </div>
              <div className="flex flex-col md:items-end gap-1">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4" /> {shift.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="w-4 h-4" /> Supervisor: {shift.supervisor}
                </div>
              </div>
            </div>
          ))}
          {upcomingShifts.length === 0 && (
            <div className="p-8 text-center text-slate-500">No upcoming shifts scheduled.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerShifts;
