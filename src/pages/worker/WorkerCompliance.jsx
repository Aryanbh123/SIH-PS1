import React from 'react';
import { useWorker } from '../../context/WorkerContext';
import { ShieldCheck, XCircle, AlertCircle } from 'lucide-react';

const WorkerCompliance = () => {
  const { complianceStatus } = useWorker();

  const isCompliant = complianceStatus === 'Compliant';

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Compliance Status</h1>
          <p className="text-slate-500 text-sm mt-1">Check your personal compliance and clearance for work.</p>
        </div>
      </div>

      <div className={`rounded-xl shadow-sm border p-8 flex flex-col items-center justify-center text-center ${
        isCompliant ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
      }`}>
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-sm ${
          isCompliant ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
        }`}>
          {isCompliant ? <ShieldCheck className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
        </div>
        <h2 className={`text-3xl font-black mb-2 ${isCompliant ? 'text-emerald-800' : 'text-red-800'}`}>
          {complianceStatus}
        </h2>
        <p className={`text-lg font-medium ${isCompliant ? 'text-emerald-600' : 'text-red-600'}`}>
          {isCompliant ? 'You are cleared for all mining operations.' : 'Your compliance is currently suspended or incomplete.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-[#0f4c81]" /> Requirements Checklist
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="font-medium text-slate-700">Initial Medical Examination (IME)</span>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase tracking-wider">Valid</span>
            </li>
            <li className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="font-medium text-slate-700">Vocational Training</span>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase tracking-wider">Valid</span>
            </li>
            <li className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="font-medium text-slate-700">Background Verification</span>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase tracking-wider">Cleared</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-medium text-slate-700">Aadhaar Linkage</span>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase tracking-wider">Verified</span>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center items-center text-center">
           <ShieldCheck className="w-16 h-16 text-slate-300 mb-4" />
           <h3 className="font-bold text-slate-800 mb-2">Need to update compliance?</h3>
           <p className="text-slate-500 text-sm mb-6">If your compliance status is incorrect, please contact your safety officer or HR representative immediately.</p>
           <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-bold transition-colors">
             Contact Support
           </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerCompliance;
