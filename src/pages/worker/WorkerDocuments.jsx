import React from 'react';
import { useWorker } from '../../context/WorkerContext';
import { FileText, Download, Eye, Upload } from 'lucide-react';

const WorkerDocuments = () => {
  const { documents } = useWorker();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">My Documents</h1>
          <p className="text-slate-500 text-sm mt-1">Access your official IDs, certificates, and employment records.</p>
        </div>
        <button className="bg-white border border-[#0f4c81] text-[#0f4c81] px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center hover:bg-blue-50 transition-colors">
          <Upload className="w-4 h-4 mr-2" /> Upload Document
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
            <tr>
              <th className="px-6 py-4 border-b border-slate-200">Document Name</th>
              <th className="px-6 py-4 border-b border-slate-200">Category</th>
              <th className="px-6 py-4 border-b border-slate-200">Status</th>
              <th className="px-6 py-4 border-b border-slate-200">Expiry</th>
              <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {documents.map((doc, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-[#0f4c81]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">{doc.type}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">{doc.expiry || '-'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-[#0f4c81] transition-colors rounded hover:bg-blue-50">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-[#0f4c81] transition-colors rounded hover:bg-blue-50">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerDocuments;
