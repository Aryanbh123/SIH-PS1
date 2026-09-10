import React, { useState } from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  ShieldCheck, Filter, AlertTriangle, CheckCircle, 
  Clock, ArrowRight, Search, FileText, Check 
} from 'lucide-react';

const ComplianceHealth = () => {
  const { complianceHealth, openActionDetail } = useManager();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = complianceHealth.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || item.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch = !searchQuery || item.regulation.toLowerCase().includes(searchQuery.toLowerCase()) || item.officer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-emerald-600">
            <ShieldCheck className="w-4 h-4" />
            <span>Statutory Compliance & Legal Adherence Monitoring</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Compliance Health Center
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Tracking DGMS Coal Mines Regulations 2017, Mines Act 1952, and Environmental Cleared Mandates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Overall Score</span>
            <span className="text-xl font-bold text-emerald-700">86%</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">At Risk</span>
            <span className="text-xl font-bold text-amber-700">2 Regs</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter regulation or officer..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-[#0f4c81] outline-none text-slate-800"
            />
          </div>

          {/* Category Filter */}
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-700 outline-none"
          >
            <option value="all">All Categories</option>
            <option value="ventilation">Ventilation</option>
            <option value="strata control">Strata Control</option>
            <option value="environment">Environment</option>
            <option value="contractor">Contractor</option>
            <option value="electrical">Electrical</option>
          </select>

          {/* Status Filter */}
          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-700 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="compliant">Compliant</option>
            <option value="at risk">At Risk</option>
            <option value="non-compliant">Non-Compliant</option>
            <option value="due soon">Due Soon</option>
          </select>

        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <strong>{filteredItems.length}</strong> statutory items
        </div>
      </div>

      {/* Compliance Register Table */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-y border-slate-200/70">
              <tr>
                <th className="py-2.5 px-4">Statutory Regulation</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4">Responsible Officer</th>
                <th className="py-2.5 px-4">Last Audit</th>
                <th className="py-2.5 px-4">Next Deadline</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-sm">
                    {item.regulation}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{item.category}</td>
                  <td className="py-3.5 px-4 text-slate-700 font-semibold">{item.officer}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">{item.lastAudit}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{item.dueDate}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'Compliant' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      item.status === 'At Risk' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      item.status === 'Non-Compliant' ? 'bg-red-100 text-red-800 border border-red-200' :
                      'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => openActionDetail('ACT-884')}
                      className="px-3 py-1 text-xs font-bold text-[#0f4c81] bg-slate-100 hover:bg-[#0f4c81] hover:text-white rounded-md transition-colors cursor-pointer"
                    >
                      Audit
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

export default ComplianceHealth;
