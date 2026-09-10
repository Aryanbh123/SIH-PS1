import React, { useState } from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  X, CheckCircle, Clock, AlertTriangle, ShieldCheck, 
  FileText, UserCheck, Check, Calendar, ArrowRight, Stamp, 
  Camera, Award, ExternalLink 
} from 'lucide-react';

const ActionDetailModal = () => {
  const { 
    activeModal, 
    selectedAction, 
    closeModals, 
    verifyAndCloseAction,
    mineDetails
  } = useManager();

  const [verificationNotes, setVerificationNotes] = useState(
    "Inspected repair evidence and gas calibration records. Airflow restored to statutory limit (12.4 m³/s). Dual methane sensor re-zeroed. Action verified and closed under CMR 2017 Regulation 153."
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  if (activeModal !== 'action_detail' || !selectedAction) return null;

  const isClosed = selectedAction.status === 'Closed';

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      verifyAndCloseAction(selectedAction.id, verificationNotes);
      setIsVerifying(false);
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    }, 400);
  };

  const steps = [
    { label: "1. Hazard Observed", status: "completed", date: "Sep 08, 2026" },
    { label: "2. Action Assigned", status: "completed", date: "Sep 08, 2026" },
    { label: "3. Repairs Underway", status: "completed", date: "Sep 09, 2026" },
    { label: "4. Evidence Submitted", status: "completed", date: "Sep 10, 11:40 AM" },
    { 
      label: "5. Manager Verification", 
      status: isClosed ? "completed" : "current", 
      date: isClosed ? "Today" : "Pending Sign-off" 
    },
    { 
      label: "6. Closed", 
      status: isClosed ? "completed" : "upcoming", 
      date: isClosed ? "Completed" : "Target: Today" 
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0a3560] to-[#0f4c81] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">Corrective Action Lifecycle</h2>
                <span className="font-mono text-xs font-bold bg-white/20 px-2 py-0.5 rounded text-amber-300">
                  {selectedAction.id}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Statutory Governance & Compliance Tracking Center
              </p>
            </div>
          </div>
          <button 
            onClick={closeModals}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 flex-1">

          {/* Lifecycle Progress Bar */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              Action Progression Lifecycle
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-all ${
                    step.status === 'completed'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : step.status === 'current'
                      ? 'bg-amber-500 text-white animate-pulse ring-4 ring-amber-100'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step.status === 'completed' ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 leading-tight">
                    {step.label}
                  </span>
                  <span className="text-[9px] text-slate-400 mt-0.5">
                    {step.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Details Card */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Subject Issue
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedAction.title}
                </h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isClosed
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : selectedAction.status === 'Awaiting Verification'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                  : 'bg-blue-100 text-blue-800 border border-blue-300'
              }`}>
                {isClosed ? "Verified & Closed" : selectedAction.status}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {selectedAction.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                <span className="text-slate-400 font-bold uppercase text-[9px] block">Location</span>
                <span className="font-semibold text-slate-800">{selectedAction.mineArea}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                <span className="text-slate-400 font-bold uppercase text-[9px] block">Assigned Engineer</span>
                <span className="font-semibold text-slate-800">{selectedAction.assignedTo}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                <span className="text-slate-400 font-bold uppercase text-[9px] block">Due Deadline</span>
                <span className="font-semibold text-slate-800">{selectedAction.deadline}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                <span className="text-slate-400 font-bold uppercase text-[9px] block">Related Inspection</span>
                <span className="font-semibold text-[#0f4c81]">{selectedAction.inspectionId || 'INS-2024-WCL-44'}</span>
              </div>
            </div>
          </div>

          {/* Submitted Evidence Section */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#0f4c81]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Engineer Field Evidence & Verification Proofs
                </h4>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Submitted 11:40 AM by Rajesh Sonwane
              </span>
            </div>

            {selectedAction.evidence ? (
              <>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                  <span className="font-bold text-slate-900 block mb-1">Field Implementation Notes:</span>
                  {selectedAction.evidence.fieldNotes}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {selectedAction.evidence.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                      <div className="flex items-center gap-2 text-xs">
                        <FileText className="w-4 h-4 text-[#0f4c81] shrink-0" />
                        <div>
                          <div className="font-semibold text-slate-800 truncate max-w-[180px]">{doc.name}</div>
                          <div className="text-[10px] text-slate-400">{doc.size} · Certified Upload</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#0f4c81] bg-blue-50 px-2 py-1 rounded">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-4 text-center text-xs text-slate-500 bg-white rounded-lg border border-dashed border-slate-300">
                No electronic evidence submitted yet by field supervisor.
              </div>
            )}
          </div>

          {/* Manager Sign-off & Verification Box */}
          {isClosed ? (
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <Stamp className="w-5 h-5 text-emerald-700" />
                <span>Statutory Closure Sign-Off Complete</span>
              </div>
              <p className="text-xs text-emerald-800 font-medium">
                "{selectedAction.verificationLog?.notes || verificationNotes}"
              </p>
              <div className="pt-2 border-t border-emerald-200/60 flex flex-wrap items-center justify-between text-[11px] text-emerald-800 font-medium">
                <div>
                  <strong>Verified By:</strong> {selectedAction.verificationLog?.verifiedBy || mineDetails.manager.name} ({mineDetails.manager.designation})
                </div>
                <div>
                  <strong>FCC No:</strong> {selectedAction.verificationLog?.certificateNo || mineDetails.manager.statutoryCertificate}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50/60 border border-amber-300 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-amber-700" />
                  Manager Statutory Verification & Sign-Off
                </label>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                  {mineDetails.manager.statutoryCertificate}
                </span>
              </div>
              
              <textarea
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                rows={3}
                className="w-full text-xs font-medium text-slate-800 bg-white border border-amber-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#0f4c81] focus:border-transparent outline-none transition-all leading-relaxed"
                placeholder="Enter statutory inspection remarks and authorization rationale..."
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <div className="text-[11px] text-slate-500 font-medium">
                  Signing as: <strong>{mineDetails.manager.name}</strong> · {mineDetails.manager.designation}
                </div>
                <button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#0f4c81] hover:bg-[#0b3b60] shadow-md hover:shadow transition-all disabled:opacity-75 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4 text-yellow-400" />
                  <span>{isVerifying ? "Verifying & Signing..." : "Verify & Authorize Closure"}</span>
                </button>
              </div>
            </div>
          )}

          {showSuccessToast && (
            <div className="bg-emerald-600 text-white p-3 rounded-lg text-xs font-bold flex items-center justify-between shadow-lg animate-in slide-in-from-top duration-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Action {selectedAction.id} closed! Executive KPI counts and audit log updated.</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            KoylaSetu Governance Log: Immutable Trail Active
          </div>
          <button
            onClick={closeModals}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close Dialog
          </button>
        </div>

      </div>
    </div>
  );
};

export default ActionDetailModal;
