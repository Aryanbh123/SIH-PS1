import React, { useState } from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  CheckCircle, Clock, AlertTriangle, UserCheck, 
  UserPlus, Plus, Search, Filter 
} from 'lucide-react';

const TeamTasks = () => {
  const [tasks, setTasks] = useState([
    { id: "TSK-401", title: "Conduct Pre-Shift Hydraulic Prop Load Test", assignedTo: "Rajesh Sonwane", role: "Ventilation & Strata Lead", priority: "High", due: "Today 02:00 PM", status: "In Progress" },
    { id: "TSK-402", title: "Calibrate Fixed Optical Methane Sensors in District 2", assignedTo: "Ramesh Tiwari", role: "Instrumentation Engineer", priority: "High", due: "Today 04:00 PM", status: "Pending" },
    { id: "TSK-403", title: "Inspect Tailgate Return Airway Water Drainage", assignedTo: "Vijay Shinde", role: "Civil Foreman", priority: "Medium", due: "Tomorrow", status: "Pending" },
    { id: "TSK-404", title: "Supervise Overburden Bench 3 Berm Reconstruction", assignedTo: "M. P. Singh", role: "Shift Supervisor", priority: "High", due: "2026-09-08", status: "Overdue" },
    { id: "TSK-405", title: "Review Weekly Respirable Dust Gravimetric Sample Filters", assignedTo: "Dr. Anjali Joshi", role: "Environmental Officer", priority: "Medium", due: "2026-09-12", status: "In Progress" },
    { id: "TSK-406", title: "Conduct Statutory Fire Drill at Central Workshop", assignedTo: "Sunil Verma", role: "Safety Officer", priority: "Low", due: "2026-09-07", status: "Completed" }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    return t.status.toLowerCase() === filter.toLowerCase();
  });

  const handleFollowUp = (taskId) => {
    alert(`Follow-up notification sent to assignee for task ${taskId}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#0f4c81]">
            <CheckCircle className="w-4 h-4" />
            <span>Operational Delegation & Team Execution Tracking</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Team Management Tasks
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manager oversight of technical assignments, safety work orders, and deadline compliance.
          </p>
        </div>

        {/* Quick Task Stats */}
        <div className="flex items-center gap-2">
          <div className="bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Overdue</span>
            <span className="text-lg font-bold text-amber-900">
              {tasks.filter(t => t.status === 'Overdue').length}
            </span>
          </div>
          <div className="bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] font-bold text-[#0f4c81] uppercase tracking-wider block">In Progress</span>
            <span className="text-lg font-bold text-[#0f4c81]">
              {tasks.filter(t => t.status === 'In Progress').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold">
          {['all', 'in progress', 'pending', 'overdue', 'completed'].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
                filter === st ? 'bg-[#0f4c81] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          {filteredTasks.length} Team Assignments
        </span>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-y border-slate-200/70">
              <tr>
                <th className="py-2.5 px-4">Task ID</th>
                <th className="py-2.5 px-4">Work Order Title</th>
                <th className="py-2.5 px-4">Assigned Personnel</th>
                <th className="py-2.5 px-4">Due Date / Time</th>
                <th className="py-2.5 px-4">Priority</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0f4c81]">{task.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-sm">{task.title}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{task.assignedTo}</div>
                    <div className="text-[10px] text-slate-400">{task.role}</div>
                  </td>
                  <td className={`py-3.5 px-4 font-semibold ${
                    task.status === 'Overdue' ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    {task.due}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      task.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      task.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      task.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleFollowUp(task.id)}
                      className="px-3 py-1 text-xs font-bold text-[#0f4c81] bg-slate-100 hover:bg-[#0f4c81] hover:text-white rounded-md transition-colors cursor-pointer"
                    >
                      Follow Up
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

export default TeamTasks;
