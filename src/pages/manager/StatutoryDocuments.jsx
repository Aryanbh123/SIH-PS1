import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  FolderOpen, FileText, Download, ShieldCheck, 
  Clock, AlertTriangle, Eye, Check 
} from 'lucide-react';

const StatutoryDocuments = () => {
  const { documents } = useManager();

  const handleDownloadDoc = (title) => {
    alert(`Downloading statutory document copy: ${title}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#0f4c81]">
            <FolderOpen className="w-4 h-4" />
            <span>Statutory Registers & Mining Compliance Records</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Statutory Documents & Registers
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Mandatory registers maintained under Mines Act 1952, Mines Rules 1955, and Coal Mines Regulations 2017.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl text-center">
          <span className="text-[10px] font-bold text-[#0f4c81] uppercase tracking-wider block">Digitized Registers</span>
          <span className="text-base font-bold text-[#0f4c81]">{documents.length} Active Records</span>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-y border-slate-200/70">
              <tr>
                <th className="py-2.5 px-4">Document ID</th>
                <th className="py-2.5 px-4">Statutory Register / Title</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4">Statutory Authority</th>
                <th className="py-2.5 px-4">Last Verified</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0f4c81]">{doc.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-sm">{doc.title}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{doc.category}</td>
                  <td className="py-3.5 px-4 text-slate-700 font-semibold">{doc.authority}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">{doc.lastUpdated}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      doc.compliance === '100%' || doc.compliance === '98%' ? 'bg-emerald-100 text-emerald-800' :
                      doc.compliance === 'Overdue' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDownloadDoc(doc.title)}
                      className="px-3 py-1 text-xs font-bold text-[#0f4c81] bg-slate-100 hover:bg-[#0f4c81] hover:text-white rounded-md transition-colors cursor-pointer"
                    >
                      View
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

export default StatutoryDocuments;
