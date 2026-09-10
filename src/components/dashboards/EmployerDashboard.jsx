import React, { useState } from 'react';
import { 
  Users, AlertTriangle, FileBadge, CheckCircle, ClipboardList, 
  Clock, ShieldAlert, FileText, MessageSquare, Briefcase, 
  Activity, Bell, Search, Filter, Plus, ChevronRight
} from 'lucide-react';
import { 
  employerWorkers, employerAttendance, employerTasks, 
  employerTraining, employerAlerts, employerReports, 
  employerGrievances, employerDocuments, employerShifts,
  employerNotifications 
} from '../../data/mockEmployerData';

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    { name: 'Overview', icon: Activity },
    { name: 'Employees', icon: Users },
    { name: 'Attendance', icon: Clock },
    { name: 'Shifts', icon: Briefcase },
    { name: 'Tasks', icon: CheckCircle },
    { name: 'Training', icon: FileBadge },
    { name: 'Alerts', icon: ShieldAlert },
    { name: 'Reports', icon: FileText },
    { name: 'Grievances', icon: MessageSquare },
    { name: 'Documents', icon: ClipboardList }
  ];

  // Helper components for tabs
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Total Employees</div>
              <div className="text-3xl font-bold text-slate-800">{employerWorkers.length}</div>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Attendance Today</div>
              <div className="text-3xl font-bold text-slate-800">91%</div>
            </div>
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Active Alerts</div>
              <div className="text-3xl font-bold text-slate-800">{employerAlerts.filter(a => !a.read).length}</div>
            </div>
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <ShieldAlert className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Pending Tasks</div>
              <div className="text-3xl font-bold text-slate-800">{employerTasks.filter(t => t.status !== 'Completed').length}</div>
            </div>
            <div className="p-3 rounded-full bg-amber-100 text-amber-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-[#0f4c81]" />
            Recent Notifications
          </h3>
          <div className="space-y-4">
            {employerNotifications.map(n => (
              <div key={n.id} className={`p-4 rounded-lg border ${n.unread ? 'bg-blue-50/50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
                <p className={`text-sm ${n.unread ? 'font-bold text-slate-800' : 'text-slate-600'}`}>{n.text}</p>
                <p className="text-xs text-slate-400 mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-[#0f4c81]" />
            Recent Reports
          </h3>
          <div className="space-y-4">
            {employerReports.map(r => (
              <div key={r.id} className="flex justify-between items-center p-3 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-semibold text-sm text-slate-800">{r.desc}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{r.location} • By {r.reportedBy}</p>
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                  r.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                  r.status === 'Under Review' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmployees = () => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search employees..." 
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#0f4c81]"
          />
        </div>
        <button className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-sm">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
            <tr>
              <th className="px-6 py-4 border-b border-slate-200">Employee</th>
              <th className="px-6 py-4 border-b border-slate-200">Role & Dept</th>
              <th className="px-6 py-4 border-b border-slate-200">Mine</th>
              <th className="px-6 py-4 border-b border-slate-200">Shift</th>
              <th className="px-6 py-4 border-b border-slate-200">Status</th>
              <th className="px-6 py-4 border-b border-slate-200"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employerWorkers.map(w => (
              <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{w.name}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{w.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-800">{w.role}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{w.dept}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">{w.mine}</td>
                <td className="px-6 py-4 text-slate-600">{w.shift}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {w.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#0f4c81] hover:text-blue-800 font-medium text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="text-slate-500 text-xs font-bold uppercase mb-1">Present Today</div>
          <div className="text-2xl font-bold text-emerald-600">940</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="text-slate-500 text-xs font-bold uppercase mb-1">Absent Today</div>
          <div className="text-2xl font-bold text-red-600">45</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="text-slate-500 text-xs font-bold uppercase mb-1">On Leave</div>
          <div className="text-2xl font-bold text-amber-600">30</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="text-slate-500 text-xs font-bold uppercase mb-1">Half Day</div>
          <div className="text-2xl font-bold text-blue-600">15</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800">Recent Attendance History</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
            <tr>
              <th className="px-6 py-4 border-b border-slate-200">Date</th>
              <th className="px-6 py-4 border-b border-slate-200">Present</th>
              <th className="px-6 py-4 border-b border-slate-200">Absent</th>
              <th className="px-6 py-4 border-b border-slate-200">Leave</th>
              <th className="px-6 py-4 border-b border-slate-200">Half Day</th>
              <th className="px-6 py-4 border-b border-slate-200">Total Workforce</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employerAttendance.map(a => (
              <tr key={a.id}>
                <td className="px-6 py-4 font-medium text-slate-800">{a.date}</td>
                <td className="px-6 py-4 text-emerald-600 font-medium">{a.present}</td>
                <td className="px-6 py-4 text-red-600 font-medium">{a.absent}</td>
                <td className="px-6 py-4 text-amber-600 font-medium">{a.leave}</td>
                <td className="px-6 py-4 text-blue-600 font-medium">{a.halfDay}</td>
                <td className="px-6 py-4 text-slate-600 font-medium">{a.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderShifts = () => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-slate-800">Shift Schedule</h3>
        <button className="flex items-center text-sm font-bold text-white bg-[#0f4c81] px-4 py-2 rounded-lg shadow-sm hover:bg-[#0c3e6a]">
          <Plus className="w-4 h-4 mr-2" /> Assign Shift
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employerShifts.map(s => (
          <div key={s.id} className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors bg-slate-50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-slate-800 text-lg">{s.name}</h4>
                <p className="text-[#0f4c81] font-medium text-sm mt-1">{s.time}</p>
              </div>
              <span className="bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-bold text-slate-600 shadow-sm">
                {s.workerCount} Workers
              </span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <span className="font-semibold text-slate-700 mr-2">Supervisor:</span> {s.supervisor}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h3 className="font-bold text-slate-800">Task Management</h3>
        <button className="flex items-center text-sm font-bold text-white bg-[#0f4c81] px-4 py-2 rounded-lg shadow-sm hover:bg-[#0c3e6a]">
          <Plus className="w-4 h-4 mr-2" /> New Task
        </button>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
          <tr>
            <th className="px-6 py-4 border-b border-slate-200">Task ID</th>
            <th className="px-6 py-4 border-b border-slate-200">Title</th>
            <th className="px-6 py-4 border-b border-slate-200">Assignee</th>
            <th className="px-6 py-4 border-b border-slate-200">Priority</th>
            <th className="px-6 py-4 border-b border-slate-200">Due Date</th>
            <th className="px-6 py-4 border-b border-slate-200">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {employerTasks.map(t => (
            <tr key={t.id}>
              <td className="px-6 py-4 text-xs font-mono text-slate-500">{t.id}</td>
              <td className="px-6 py-4 font-semibold text-slate-800">{t.title}</td>
              <td className="px-6 py-4 text-slate-600">{t.assignee}</td>
              <td className="px-6 py-4">
                <span className={`text-xs font-bold ${
                  t.priority === 'Critical' ? 'text-red-600' :
                  t.priority === 'High' ? 'text-orange-600' :
                  t.priority === 'Medium' ? 'text-amber-600' : 'text-slate-600'
                }`}>{t.priority}</span>
              </td>
              <td className="px-6 py-4 text-slate-600">{t.due}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  t.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                  t.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                  t.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-slate-100 text-slate-800'
                }`}>
                  {t.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTraining = () => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h3 className="font-bold text-lg text-slate-800 mb-6">Mandatory Safety Training Status</h3>
      <div className="space-y-6">
        {employerTraining.map(t => {
          const total = t.completed + t.pending;
          const percent = Math.round((t.completed / total) * 100);
          return (
            <div key={t.id}>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h4 className="font-semibold text-slate-800">{t.course}</h4>
                  <p className="text-xs text-slate-500">Deadline: {t.deadline}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#0f4c81]">{percent}%</span>
                  <span className="text-xs text-slate-500 ml-1">({t.completed}/{total})</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${percent === 100 ? 'bg-emerald-500' : percent > 50 ? 'bg-[#0f4c81]' : 'bg-amber-500'}`} 
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="font-bold text-slate-800">Safety Alerts</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {employerAlerts.map(a => (
          <div key={a.id} className={`p-4 flex gap-4 ${!a.read ? 'bg-red-50/30' : ''}`}>
            <div className="flex-shrink-0 mt-1">
              {a.severity === 'HIGH' ? <ShieldAlert className="w-6 h-6 text-red-600" /> :
               a.severity === 'MEDIUM' ? <AlertTriangle className="w-6 h-6 text-amber-500" /> :
               <Bell className="w-6 h-6 text-blue-500" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  a.severity === 'HIGH' ? 'bg-red-100 text-red-700' :
                  a.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                }`}>{a.severity}</span>
                <span className="text-xs font-semibold text-slate-500">{a.location}</span>
                <span className="text-xs text-slate-400">• {a.time}</span>
              </div>
              <p className={`text-sm ${!a.read ? 'font-bold text-slate-800' : 'text-slate-600'}`}>{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="font-bold text-slate-800">Submitted Reports</h3>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
          <tr>
            <th className="px-6 py-4 border-b border-slate-200">ID</th>
            <th className="px-6 py-4 border-b border-slate-200">Type</th>
            <th className="px-6 py-4 border-b border-slate-200">Description</th>
            <th className="px-6 py-4 border-b border-slate-200">Reported By</th>
            <th className="px-6 py-4 border-b border-slate-200">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {employerReports.map(r => (
            <tr key={r.id}>
              <td className="px-6 py-4 text-xs font-mono text-slate-500">{r.id}</td>
              <td className="px-6 py-4 font-semibold text-slate-700">{r.type}</td>
              <td className="px-6 py-4 text-slate-800">{r.desc}</td>
              <td className="px-6 py-4 text-slate-600">{r.reportedBy}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  r.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                  r.status === 'Investigation' ? 'bg-red-100 text-red-800' :
                  r.status === 'Under Review' ? 'bg-amber-100 text-amber-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderGrievances = () => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="font-bold text-slate-800">Worker Grievances</h3>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
          <tr>
            <th className="px-6 py-4 border-b border-slate-200">ID</th>
            <th className="px-6 py-4 border-b border-slate-200">Subject</th>
            <th className="px-6 py-4 border-b border-slate-200">Worker</th>
            <th className="px-6 py-4 border-b border-slate-200">Date</th>
            <th className="px-6 py-4 border-b border-slate-200">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {employerGrievances.map(g => (
            <tr key={g.id}>
              <td className="px-6 py-4 text-xs font-mono text-slate-500">{g.id}</td>
              <td className="px-6 py-4 font-semibold text-slate-800">{g.subject}</td>
              <td className="px-6 py-4 text-slate-600">{g.worker}</td>
              <td className="px-6 py-4 text-slate-600">{g.date}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  g.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                  g.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {g.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderDocuments = () => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="font-bold text-slate-800">Worker Documents & Certificates</h3>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
          <tr>
            <th className="px-6 py-4 border-b border-slate-200">Doc ID</th>
            <th className="px-6 py-4 border-b border-slate-200">Worker</th>
            <th className="px-6 py-4 border-b border-slate-200">Document Type</th>
            <th className="px-6 py-4 border-b border-slate-200">Expiry Date</th>
            <th className="px-6 py-4 border-b border-slate-200">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {employerDocuments.map(d => (
            <tr key={d.id}>
              <td className="px-6 py-4 text-xs font-mono text-slate-500">{d.id}</td>
              <td className="px-6 py-4 font-semibold text-slate-800">{d.worker}</td>
              <td className="px-6 py-4 text-slate-600">{d.type}</td>
              <td className="px-6 py-4 text-slate-600">{d.expiryDate}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  d.status === 'Valid' ? 'bg-emerald-100 text-emerald-800' :
                  d.status === 'Expired' ? 'bg-red-100 text-red-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {d.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return renderOverview();
      case 'Employees': return renderEmployees();
      case 'Attendance': return renderAttendance();
      case 'Shifts': return renderShifts();
      case 'Tasks': return renderTasks();
      case 'Training': return renderTraining();
      case 'Alerts': return renderAlerts();
      case 'Reports': return renderReports();
      case 'Grievances': return renderGrievances();
      case 'Documents': return renderDocuments();
      default: return null;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Employer Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your workforce, track compliance, and view incident reports.</p>
        </div>
        <div className="text-xs font-semibold text-[#136c4b] bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200 shadow-sm flex items-center">
          <CheckCircle className="w-3 h-3 mr-1" /> Prototype Mode Active
        </div>
      </div>
      
      {/* Horizontal Tabs Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
        <div className="flex p-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center px-4 py-2.5 rounded-md text-sm font-medium transition-all mr-1 ${
                  isActive 
                    ? 'bg-[#0f4c81] text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[500px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default EmployerDashboard;
