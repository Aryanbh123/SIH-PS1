import React from 'react';
import { useWorker } from '../../context/WorkerContext';
import { FileBadge, Award, Calendar, AlertTriangle } from 'lucide-react';

const WorkerTraining = () => {
  const { training } = useWorker();

  const dueTraining = training.filter(t => t.status === 'Due');
  const completedTraining = training.filter(t => t.status === 'Completed');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Safety Training</h1>
          <p className="text-slate-500 text-sm mt-1">Access your mandatory safety courses and certificates.</p>
        </div>
      </div>

      {dueTraining.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden mb-6">
          <div className="p-5 border-b border-amber-100 bg-amber-50 flex items-center justify-between">
            <h2 className="font-bold text-amber-800 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" /> Action Required: Training Due
            </h2>
          </div>
          <div className="divide-y divide-amber-50">
            {dueTraining.map(tr => (
              <div key={tr.id} className="p-5 flex justify-between items-center bg-white">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{tr.course}</h3>
                  <p className="text-sm text-slate-500 mt-1">Due by: <span className="font-bold text-red-600">{tr.due}</span></p>
                </div>
                <button className="px-6 py-2 bg-[#136c4b] hover:bg-[#0e5239] text-white rounded-lg font-bold shadow-sm transition-colors">
                  Start Course
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-bold text-slate-800 flex items-center">
            <Award className="w-5 h-5 mr-2 text-[#0f4c81]" /> Completed Certifications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          {completedTraining.map(tr => (
            <div key={tr.id} className="border border-slate-200 rounded-xl p-5 hover:border-[#0f4c81] transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-full -z-10 group-hover:bg-blue-50 transition-colors"></div>
              <FileBadge className="w-8 h-8 text-slate-400 group-hover:text-[#0f4c81] mb-3 transition-colors" />
              <h3 className="font-bold text-slate-800">{tr.course}</h3>
              <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>Completed: {tr.completedOn}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Valid</span>
                <button className="text-[#0f4c81] text-xs font-bold hover:underline">Download Certificate</button>
              </div>
            </div>
          ))}
          {completedTraining.length === 0 && (
            <div className="col-span-2 text-center py-8 text-slate-500">No completed training records found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerTraining;
