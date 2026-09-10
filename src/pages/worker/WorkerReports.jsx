import React, { useState } from 'react';
import { useWorker } from '../../context/WorkerContext';
import { FileText, Plus, AlertTriangle } from 'lucide-react';

const WorkerReports = () => {
  const { reports, submitReport } = useWorker();
  const [showModal, setShowModal] = useState(false);
  const [reportType, setReportType] = useState('Safety Observation');
  const [location, setLocation] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReport({ type: reportType, location, desc });
    setShowModal(false);
    setLocation('');
    setDesc('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">My Reports</h1>
          <p className="text-slate-500 text-sm mt-1">Submit and track your safety observations and incident reports.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#136c4b] hover:bg-[#0e5239] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" /> New Report
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
            <tr>
              <th className="px-6 py-4 border-b border-slate-200">ID</th>
              <th className="px-6 py-4 border-b border-slate-200">Type</th>
              <th className="px-6 py-4 border-b border-slate-200">Date</th>
              <th className="px-6 py-4 border-b border-slate-200">Location</th>
              <th className="px-6 py-4 border-b border-slate-200">Description</th>
              <th className="px-6 py-4 border-b border-slate-200">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map(r => (
              <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-slate-500">{r.id}</td>
                <td className="px-6 py-4 font-bold text-slate-700">{r.type}</td>
                <td className="px-6 py-4 text-slate-600">{r.date}</td>
                <td className="px-6 py-4 text-slate-600">{r.location}</td>
                <td className="px-6 py-4 text-slate-800 truncate max-w-[200px]">{r.desc}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    r.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                    r.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No reports submitted yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* New Report Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="font-bold text-lg text-slate-800">Submit New Report</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <AlertTriangle className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Report Type</label>
                <select 
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-800 focus:bg-white focus:border-[#0f4c81] focus:outline-none"
                >
                  <option value="Safety Observation">Safety Observation</option>
                  <option value="Incident">Incident</option>
                  <option value="Hazard">Hazard</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  placeholder="e.g. Pit 3 Main Road"
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-800 focus:bg-white focus:border-[#0f4c81] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                <textarea 
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe the observation or incident..."
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-800 focus:bg-white focus:border-[#0f4c81] focus:outline-none"
                ></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-bold text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#136c4b] text-white rounded-lg font-bold text-sm shadow-sm hover:bg-[#0e5239]">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerReports;
