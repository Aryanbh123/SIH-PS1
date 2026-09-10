import React from 'react';
import { useWorker } from '../../context/WorkerContext';
import { MessageSquare, Plus } from 'lucide-react';

const WorkerGrievances = () => {
  const { grievances } = useWorker();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Requests & Grievances</h1>
          <p className="text-slate-500 text-sm mt-1">Submit HR requests or report workplace grievances.</p>
        </div>
        <button className="bg-[#136c4b] hover:bg-[#0e5239] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center transition-colors">
          <Plus className="w-4 h-4 mr-2" /> New Request
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
            <tr>
              <th className="px-6 py-4 border-b border-slate-200">ID</th>
              <th className="px-6 py-4 border-b border-slate-200">Type</th>
              <th className="px-6 py-4 border-b border-slate-200">Subject</th>
              <th className="px-6 py-4 border-b border-slate-200">Date Filed</th>
              <th className="px-6 py-4 border-b border-slate-200">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {grievances.map(g => (
              <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-slate-500">{g.id}</td>
                <td className="px-6 py-4 font-bold text-slate-700">{g.type}</td>
                <td className="px-6 py-4 text-slate-800">{g.subject}</td>
                <td className="px-6 py-4 text-slate-600">{g.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    g.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                    g.status === 'In Review' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {g.status}
                  </span>
                </td>
              </tr>
            ))}
            {grievances.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No requests or grievances filed.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerGrievances;
