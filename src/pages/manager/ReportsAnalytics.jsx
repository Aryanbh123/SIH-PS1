import React, { useState } from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  BarChart3, Download, FileText, TrendingUp, 
  ShieldCheck, Calendar, Filter, ArrowUpRight 
} from 'lucide-react';

const ReportsAnalytics = () => {
  const { mineDetails, kpis } = useManager();
  const [selectedReportType, setSelectedReportType] = useState('compliance');

  const statutoryReports = [
    { title: "Quarterly DGMS CMR Safety & Ventilation Audit Report", period: "Q2 2026 (Apr - Jun)", date: "2026-07-10", size: "4.8 MB", format: "PDF", status: "Submitted to DGMS" },
    { title: "Monthly Airborne Respirable Dust & SPM Gravimetric Survey", period: "August 2026", date: "2026-09-05", size: "2.1 MB", format: "PDF", status: "Approved" },
    { title: "Comprehensive Mines Act 1952 Form B & C Digitized Muster Return", period: "August 2026", date: "2026-09-02", size: "3.4 MB", format: "XLSX", status: "Verified" },
    { title: "State Pollution Control Board Quarterly Effluent Water Report", period: "Q2 2026", date: "2026-08-15", size: "1.9 MB", format: "PDF", status: "Submitted to MPCB" },
    { title: "Annual Ground Control Management Plan (GCMP) Strata Audit", period: "FY 2025-26", date: "2026-04-20", size: "8.6 MB", format: "PDF", status: "CIL HQ Endorsed" }
  ];

  const complianceMonthlyTrend = [
    { month: "Apr", score: 82, target: 85 },
    { month: "May", score: 84, target: 85 },
    { month: "Jun", score: 83, target: 85 },
    { month: "Jul", score: 85, target: 85 },
    { month: "Aug", score: 88, target: 85 },
    { month: "Sep (Current)", score: 86, target: 85 }
  ];

  const handleDownload = (title) => {
    alert(`Downloading statutory export: ${title}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#0f4c81]">
            <BarChart3 className="w-4 h-4" />
            <span>Governance Intelligence & Statutory Returns Export</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Reports & Operational Analytics
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Official DGMS compliance returns, environmental statements, and risk trends for {mineDetails.name}.
          </p>
        </div>

        <button
          onClick={() => handleDownload("Colliery_Monthly_Governance_Summary_Sep2026.pdf")}
          className="px-4 py-2.5 text-xs font-bold text-white bg-[#0f4c81] hover:bg-[#0b3b60] rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-yellow-400" />
          <span>Export Monthly Executive Dossier</span>
        </button>
      </div>

      {/* Compliance Trend Chart Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Six-Month Compliance Trajectory (%)</h2>
            <p className="text-xs text-slate-500">Benchmark target set at 85% statutory threshold</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Average: 84.6%
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="grid grid-cols-6 gap-3 pt-4 items-end h-44">
          {complianceMonthlyTrend.map((m, idx) => (
            <div key={idx} className="flex flex-col items-center h-full justify-end group">
              <div className="text-[11px] font-bold text-slate-700 mb-1">{m.score}%</div>
              <div className="w-full max-w-[48px] bg-slate-100 rounded-t-lg overflow-hidden flex flex-col justify-end h-28">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    m.score >= 85 ? 'bg-[#0f4c81] group-hover:bg-[#0b3b60]' : 'bg-amber-500 group-hover:bg-amber-600'
                  }`}
                  style={{ height: `${(m.score / 100) * 100}%` }}
                />
              </div>
              <div className="text-[11px] font-semibold text-slate-500 mt-2">{m.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Reports Library */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#0f4c81]" />
            Official Statutory Filings & Return Submissions
          </h2>
          <span className="text-xs font-semibold text-slate-400">DGMS & State Pollution Board Verified</span>
        </div>

        <div className="space-y-3">
          {statutoryReports.map((rep, idx) => (
            <div key={idx} className="p-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <h3 className="font-bold text-xs text-slate-900">{rep.title}</h3>
                <div className="text-[11px] text-slate-500 font-medium">
                  Period: <strong>{rep.period}</strong> · Published: {rep.date} · {rep.size}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                  {rep.status}
                </span>
                <button
                  onClick={() => handleDownload(rep.title)}
                  className="px-3 py-1.5 text-xs font-bold text-[#0f4c81] bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {rep.format}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ReportsAnalytics;
