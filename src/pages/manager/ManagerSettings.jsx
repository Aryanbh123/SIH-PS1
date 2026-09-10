import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useManager } from '../../context/ManagerContext';
import { languages } from '../../data/translations';
import { Settings, Globe, Bell, Sliders, Shield, Save, Check } from 'lucide-react';

const ManagerSettings = () => {
  const { language, setLanguage } = useAuth();
  const [aiThreshold, setAiThreshold] = useState('standard');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsCritical, setSmsCritical] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#0f4c81]">
            <Settings className="w-4 h-4" />
            <span>Colliery Command Preferences & Alerts</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manager Control Settings
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Configure threshold sensitivity, global language, and statutory notification escalations.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 text-xs font-bold text-white bg-[#0f4c81] hover:bg-[#0b3b60] rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>

      {savedToast && (
        <div className="bg-emerald-600 text-white p-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Manager preferences updated successfully!</span>
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-4">
        
        {/* Language Selection */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <Globe className="w-4 h-4 text-[#0f4c81]" />
            <h2 className="text-sm font-bold text-slate-900">System Language Selection</h2>
          </div>
          <p className="text-xs text-slate-500">
            Selected language persists across the entire Manager application experience and reports.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {languages.slice(0, 8).map(l => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                  language === l.code
                    ? 'border-[#0f4c81] bg-blue-50/70 text-[#0f4c81] ring-2 ring-[#0f4c81]/20'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="text-[10px] text-slate-400 font-medium">{l.name}</div>
                <div className="text-sm font-bold mt-0.5">{l.native}</div>
              </button>
            ))}
          </div>
        </div>

        {/* AI Model Sensitivity */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <Sliders className="w-4 h-4 text-[#0f4c81]" />
            <h2 className="text-sm font-bold text-slate-900">AI Predictive Sensitivity</h2>
          </div>
          <div className="space-y-2">
            {[
              { id: 'strict', label: 'High Sensitivity (Early Anomaly Alerting)', desc: 'Flags sensor deviations over 5% and micro-vibration alerts immediately.' },
              { id: 'standard', label: 'Standard Governance Mode (Recommended)', desc: 'Correlates multiple sensor drift events with historical inspection patterns.' },
              { id: 'relaxed', label: 'High-Tolerance Mode', desc: 'Triggers alerts only upon statutory regulatory threshold breaches.' }
            ].map(mode => (
              <label 
                key={mode.id}
                className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                  aiThreshold === mode.id ? 'bg-blue-50/60 border-[#0f4c81]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <input 
                  type="radio" 
                  name="aiSens" 
                  checked={aiThreshold === mode.id}
                  onChange={() => setAiThreshold(mode.id)}
                  className="mt-0.5" 
                />
                <div>
                  <div className="font-bold text-slate-900">{mode.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{mode.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <Bell className="w-4 h-4 text-[#0f4c81]" />
            <h2 className="text-sm font-bold text-slate-900">Notification & Escalation Channels</h2>
          </div>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <div>
                <div className="font-bold text-slate-900">Immediate SMS for Critical Hazards</div>
                <div className="text-slate-500 text-[11px]">Send direct SMS for Level-3 ventilation and slope alerts</div>
              </div>
              <input 
                type="checkbox" 
                checked={smsCritical} 
                onChange={(e) => setSmsCritical(e.target.checked)}
                className="w-4 h-4 text-[#0f4c81] rounded" 
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <div>
                <div className="font-bold text-slate-900">Email Dossier on Evidence Submission</div>
                <div className="text-slate-500 text-[11px]">Notify whenever field engineers upload repair certificates</div>
              </div>
              <input 
                type="checkbox" 
                checked={emailAlerts} 
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-[#0f4c81] rounded" 
              />
            </label>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ManagerSettings;
