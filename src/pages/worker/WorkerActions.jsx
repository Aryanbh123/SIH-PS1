import React from 'react';
import { useWorker } from '../../context/WorkerContext';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

const WorkerActions = () => {
  const { correctiveActions } = useWorker();

  const openActions = correctiveActions.filter(ca => ca.status !== 'Closed');
  const closedActions = correctiveActions.filter(ca => ca.status === 'Closed');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Corrective Actions</h1>
          <p className="text-slate-500 text-sm mt-1">Actions assigned to you to fix safety or compliance issues.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Open Actions ({openActions.length})</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {openActions.map(action => (
            <div key={action.id} className="p-5 hover:bg-slate-50 transition-colors flex justify-between items-start">
              <div className="flex gap-4">
                <div className="mt-1">
                  {action.priority === 'High' ? <AlertTriangle className="w-5 h-5 text-red-500" /> : <Clock className="w-5 h-5 text-amber-500" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{action.issue}</h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                    <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{action.id}</span>
                    <span>Assigned: {action.assignedDate}</span>
                    <span className="font-semibold text-red-600">Due: {action.due}</span>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 border border-orange-200">
                {action.status}
              </span>
            </div>
          ))}
          {openActions.length === 0 && (
            <div className="p-8 text-center text-slate-500">No open corrective actions.</div>
          )}
        </div>
      </div>

      {closedActions.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden opacity-75">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-bold text-slate-800">Closed Actions ({closedActions.length})</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {closedActions.map(action => (
              <div key={action.id} className="p-5 flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-600 line-through">{action.issue}</h3>
                    <div className="text-xs text-slate-400 mt-1">Closed on: {action.due}</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500">
                  Closed
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerActions;
