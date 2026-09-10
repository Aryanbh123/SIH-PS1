import React, { useState } from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  CheckSquare, Filter, Clock, AlertTriangle, 
  CheckCircle, ArrowRight, Stamp, Search, ShieldCheck 
} from 'lucide-react';

const CorrectiveActionCenter = () => {
  const { correctiveActions, openActionDetail } = useManager();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const statuses = ['all', 'Awaiting Verification', 'In Progress', 'Open', 'Overdue', 'Closed'];

  const filteredActions = correctiveActions.filter(ca => {
    const matchesStatus = selectedStatus === 'all' || ca.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch = !searchQuery || ca.title.toLowerCase().includes(searchQuery.toLowerCase()) || ca.id.toLowerCase().includes(searchQuery.toLowerCase()) || ca.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#0f4c81]">
            <CheckSquare className="w-4 h-4" />
            <span>Remediation Lifecycle & Verification Center</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Corrective Actions Governance
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Statutory tracking from inspection observations to engineer evidence and Manager verification closure.
          </p>
        </div>

        {/* Quick Summary Badges */}
        <div className="flex items-center gap-2">
          <div className="bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Awaiting Verification</span>
            <span className="text-lg font-bold text-amber-900">
              {correctiveActions.filter(ca => ca.status === 'Awaiting Verification').length}
            </span>
          </div>
          <div className="bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">Total Active</span>
            <span className="text-lg font-bold text-[#0f4c81]">
              {correctiveActions.filter(ca => ca.status !== 'Closed').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search action ID, title, engineer..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-[#0f4c81] outline-none text-slate-800"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            {statuses.map(st => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-md capitalize transition-colors cursor-pointer ${
                  selectedStatus === st ? 'bg-white text-[#0f4c81] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <strong>{filteredActions.length}</strong> items
        </div>
      </div>

      {/* Corrective Actions Table */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-y border-slate-200/70">
              <tr>
                <th className="py-2.5 px-4">Action ID</th>
                <th className="py-2.5 px-4">Title & Issue</th>
                <th className="py-2.5 px-4">Area</th>
                <th className="py-2.5 px-4">Assigned To</th>
                <th className="py-2.5 px-4">Deadline</th>
                <th className="py-2.5 px-4">Priority</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredActions.map((action) => (
                <tr key={action.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0f4c81]">{action.id}</td>
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="font-bold text-slate-900 leading-snug">{action.title}</div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">{action.description}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{action.mineArea}</td>
                  <td className="py-3.5 px-4 text-slate-700 font-semibold">{action.assignedTo}</td>
                  <td className={`py-3.5 px-4 font-semibold ${
                    action.status === 'Overdue' ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    {action.deadline}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      action.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {action.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      action.status === 'Closed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      action.status === 'Awaiting Verification' ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse' :
                      action.status === 'Overdue' ? 'bg-red-100 text-red-700 border border-red-300' :
                      'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {action.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => openActionDetail(action.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        action.status === 'Awaiting Verification'
                          ? 'bg-[#0f4c81] text-white hover:bg-[#0b3b60] shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {action.status === 'Awaiting Verification' ? 'Verify' : 'Details'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default CorrectiveActionCenter;
