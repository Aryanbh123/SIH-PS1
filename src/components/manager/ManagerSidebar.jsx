import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useManager } from '../../context/ManagerContext';
import { t } from '../../data/translations';
import {
  LayoutDashboard, Building, ShieldAlert, ShieldCheck, 
  ClipboardList, AlertTriangle, CheckSquare, Users, 
  Clock, CheckCircle, HardHat, BrainCircuit, Map, 
  BarChart3, FileCheck, FolderOpen, Bell, History, 
  User, Settings, LogOut, ExternalLink
} from 'lucide-react';

const ManagerSidebar = ({ onCloseMobileNav }) => {
  const { language, logout } = useAuth();
  const { kpis, mineDetails, attentionItems } = useManager();
  const navigate = useNavigate();

  const navSections = [
    {
      heading: t(language, 'overview'),
      items: [
        { name: t(language, 'dashboard'), path: '/manager', icon: LayoutDashboard },
        { name: t(language, 'mineOverview'), path: '/manager/overview', icon: Building }
      ]
    },
    {
      heading: t(language, 'monitoring'),
      items: [
        { name: t(language, 'riskIntelligence'), path: '/manager/risk', icon: ShieldAlert, badge: kpis.highRiskIssues, badgeColor: "bg-red-500 text-white" },
        { name: t(language, 'compliance'), path: '/manager/compliance', icon: ShieldCheck, badge: `${kpis.complianceScore}%` },
        { name: t(language, 'inspections'), path: '/manager/inspections', icon: ClipboardList, badge: kpis.pendingInspections },
        { name: t(language, 'incidents'), path: '/manager/incidents', icon: AlertTriangle, badge: kpis.activeIncidents, badgeColor: "bg-amber-500 text-white" },
        { name: t(language, 'correctiveActions'), path: '/manager/actions', icon: CheckSquare, badge: kpis.openCorrectiveActions }
      ]
    },
    {
      heading: t(language, 'operations'),
      items: [
        { name: t(language, 'workforce'), path: '/manager/workforce', icon: Users, badge: `${kpis.workforcePresentPct}%` },
        { name: t(language, 'shifts'), path: '/manager/shifts', icon: Clock },
        { name: t(language, 'teamTasks'), path: '/manager/tasks', icon: CheckCircle },
        { name: t(language, 'contractors'), path: '/manager/contractors', icon: HardHat }
      ]
    },
    {
      heading: t(language, 'intelligence'),
      items: [
        { name: t(language, 'aiInsights'), path: '/manager/ai-insights', icon: BrainCircuit, badge: "AI", badgeColor: "bg-yellow-400 text-slate-900 font-bold" },
        { name: t(language, 'mineMapGis'), path: '/manager/gis', icon: Map },
        { name: t(language, 'reportsAnalytics'), path: '/manager/reports', icon: BarChart3 }
      ]
    },
    {
      heading: t(language, 'governance'),
      items: [
        { name: t(language, 'approvals'), path: '/manager/approvals', icon: FileCheck, badge: "3", badgeColor: "bg-blue-500 text-white" },
        { name: t(language, 'documents'), path: '/manager/documents', icon: FolderOpen },
        { name: t(language, 'alertsEscalations'), path: '/manager/alerts', icon: Bell, badge: attentionItems.length, badgeColor: "bg-rose-500 text-white" },
        { name: t(language, 'auditHistory'), path: '/manager/audit', icon: History }
      ]
    },
    {
      heading: t(language, 'account'),
      items: [
        { name: t(language, 'profile'), path: '/manager/profile', icon: User },
        { name: t(language, 'settings'), path: '/manager/settings', icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#0b1b2d] text-slate-300 flex flex-col h-full border-r border-slate-800 shrink-0 select-none">
      
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 bg-gradient-to-r from-[#0a2540] to-[#0f4c81] text-white border-b border-slate-800/80 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-yellow-400 shadow-inner">
            <span className="text-lg font-bold">⚒</span>
          </div>
          <div>
            <div className="font-bold text-base tracking-tight leading-tight flex items-center gap-1.5">
              <span>KoylaSetu</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-yellow-400/20 text-yellow-300 px-1.5 py-0.2 rounded">
                MGR
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-300 leading-tight">
              Coal India Governance System
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5 custom-scrollbar">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {section.heading}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobileNav}
                  end={item.path === '/manager'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-[#0f4c81] text-white shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-white" />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      item.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Colliery Status Footer */}
      <div className="p-3 bg-[#081422] border-t border-slate-800/80 text-xs shrink-0">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-bold text-slate-300 truncate">{mineDetails.name}</span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        </div>
        <div className="text-[10px] text-slate-500 flex items-center justify-between">
          <span>FCC: {mineDetails.manager.statutoryCertificate.split('-')[2] || 'FCC-2012'}</span>
          <button 
            onClick={logout}
            className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1"
            title="Sign Out"
          >
            <LogOut className="w-3 h-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

    </aside>
  );
};

export default ManagerSidebar;
