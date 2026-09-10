import React from 'react';
import { useWorker } from '../../context/WorkerContext';
import { Activity, Clock, CheckCircle, FileText, Briefcase } from 'lucide-react';

const WorkerHistory = () => {
  const { history } = useWorker();

  const getIcon = (type) => {
    switch(type) {
      case 'Task': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'Report': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'Shift': return <Briefcase className="w-5 h-5 text-amber-500" />;
      case 'Training': return <Activity className="w-5 h-5 text-purple-500" />;
      default: return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">My History</h1>
          <p className="text-slate-500 text-sm mt-1">Timeline of your recent activities and system events.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="relative border-l-2 border-slate-100 ml-3 md:ml-6 space-y-8">
          {history.map((item, index) => (
            <div key={item.id} className="relative pl-6 md:pl-8">
              <span className="absolute -left-[11px] bg-white border-2 border-white rounded-full">
                {getIcon(item.type)}
              </span>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 shadow-sm hover:border-slate-200 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-800 text-sm">{item.text}</h3>
                  <span className="text-xs font-semibold text-slate-400 whitespace-nowrap ml-4">{item.time}</span>
                </div>
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-slate-200 text-slate-500 uppercase tracking-wider">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
          {history.length === 0 && (
            <div className="pl-8 text-slate-500 text-sm">No activity recorded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerHistory;
