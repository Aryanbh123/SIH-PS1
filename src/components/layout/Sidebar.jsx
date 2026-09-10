import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, ShieldCheck, ClipboardList, AlertTriangle, Map, 
  Settings, HardHat, FileText, Bell, MessageSquare, BrainCircuit,
  CheckSquare, PlusCircle, Activity, Wifi, Users, BarChart3, TrendingUp,
  Globe, Search, FileBadge, FolderOpen
} from 'lucide-react';

const Sidebar = () => {
  const { currentUser } = useAuth();

  const getNavItems = (role) => {
    switch (role) {
      case 'manager':
        return [
          { heading: 'Governance Modules' },
          { name: 'Dashboard', path: '/', icon: LayoutDashboard },
          { name: 'Compliance', path: '/compliance', icon: ShieldCheck },
          { name: 'Inspections', path: '/inspections', icon: ClipboardList },
          { name: 'Violations', path: '/violations', icon: AlertTriangle },
          { name: 'Corrective Actions', path: '/actions', icon: CheckSquare },
          { name: 'Contractors', path: '/contractors', icon: HardHat },
          { name: 'Alerts', path: '/alerts', icon: Bell },
          { name: 'Grievances', path: '/grievances', icon: MessageSquare },
          { name: 'Reports', path: '/reports', icon: FileText },
          { name: 'AI Insights', path: '/ai-insights', icon: BrainCircuit },
        ];
      case 'safety_officer':
        return [
          { heading: 'Governance Modules' },
          { name: 'Today\'s Tasks', path: '/', icon: CheckSquare },
          { name: 'Inspections', path: '/inspections', icon: ClipboardList },
          { name: 'Safety Observations', path: '/observations', icon: Search },
          { name: 'Incidents', path: '/incidents', icon: AlertTriangle },
          { name: 'Violations', path: '/violations', icon: AlertTriangle },
          { name: 'Corrective Actions', path: '/actions', icon: CheckSquare },
          { name: 'Alerts', path: '/alerts', icon: Bell },
          { name: 'Grievances', path: '/grievances', icon: MessageSquare },
        ];
      case 'employee': // Field Inspector
        return [
          { heading: 'Governance Modules' },
          { name: 'Today\'s Tasks', path: '/', icon: CheckSquare },
          { name: 'New Inspection', path: '/inspections/new', icon: PlusCircle },
          { name: 'Quick Report', path: '/quick-report', icon: AlertTriangle },
          { name: 'My Status', path: '/my-status', icon: Activity },
          { name: 'Grievances', path: '/grievances', icon: MessageSquare },
          { name: 'Sync Status', path: '/sync-status', icon: Wifi },
        ];
      case 'subsidiary_gm':
        return [
          { heading: 'Governance Modules' },
          { name: 'Executive Dashboard', path: '/', icon: LayoutDashboard },
          { name: 'Mine Comparison', path: '/comparison', icon: BarChart3 },
          { name: 'Risk Heatmap', path: '/heatmap', icon: Map },
          { name: 'Violations', path: '/violations', icon: AlertTriangle },
          { name: 'Escalations', path: '/escalations', icon: Bell },
          { name: 'AI Insights', path: '/ai-insights', icon: BrainCircuit },
          { name: 'Cross-Mine Analytics', path: '/analytics', icon: TrendingUp },
          { name: 'Reports', path: '/reports', icon: FileText },
        ];
      case 'cil_hq_director':
        return [
          { heading: 'Governance Modules' },
          { name: 'Enterprise Dashboard', path: '/', icon: Globe },
          { name: 'Subsidiaries', path: '/subsidiaries', icon: Users },
          { name: 'Cross-Mine Analytics', path: '/analytics', icon: TrendingUp },
          { name: 'Systemic Risks', path: '/systemic-risks', icon: AlertTriangle },
          { name: 'AI Insights', path: '/ai-insights', icon: BrainCircuit },
          { name: 'Trends', path: '/trends', icon: BarChart3 },
          { name: 'Reports', path: '/reports', icon: FileText },
        ];
      case 'ministry': // DGMS Regulator
        return [
          { heading: 'Governance Modules' },
          { name: 'Regulator Dashboard', path: '/', icon: LayoutDashboard },
          { name: 'Mines', path: '/mines', icon: Map },
          { name: 'Compliance', path: '/compliance', icon: ShieldCheck },
          { name: 'Violations', path: '/violations', icon: AlertTriangle },
          { name: 'Inspections', path: '/inspections', icon: ClipboardList },
          { name: 'Evidence', path: '/evidence', icon: FolderOpen },
          { name: 'Audit Trail', path: '/audit-trail', icon: Search },
          { name: 'Reports', path: '/reports', icon: FileText },
        ];
      case 'contractor':
        return [
          { heading: 'Governance Modules' },
          { name: 'Dashboard', path: '/', icon: LayoutDashboard },
          { name: 'Compliance', path: '/compliance', icon: ShieldCheck },
          { name: 'Licences', path: '/licences', icon: FileBadge },
          { name: 'Training', path: '/training', icon: Users },
          { name: 'Tasks', path: '/tasks', icon: CheckSquare },
          { name: 'Corrective Actions', path: '/actions', icon: AlertTriangle },
          { name: 'Documents', path: '/documents', icon: FolderOpen },
        ];
      case 'worker':
        return [
          { heading: 'OVERVIEW' },
          { name: 'Dashboard', path: '/', icon: LayoutDashboard },
          { heading: 'MY WORK' },
          { name: 'My Tasks', path: '/worker/tasks', icon: CheckSquare },
          { name: 'My Reports', path: '/worker/reports', icon: FileText },
          { name: 'My Corrective Actions', path: '/worker/actions', icon: AlertTriangle },
          { heading: 'ATTENDANCE' },
          { name: 'Attendance', path: '/worker/attendance', icon: ClipboardList },
          { name: 'My Shifts', path: '/worker/shifts', icon: HardHat },
          { heading: 'COMPLIANCE & DEVELOPMENT' },
          { name: 'My Compliance', path: '/worker/compliance', icon: ShieldCheck },
          { name: 'Training', path: '/worker/training', icon: FileBadge },
          { name: 'Documents', path: '/worker/documents', icon: FolderOpen },
          { heading: 'SERVICES' },
          { name: 'Requests / Grievances', path: '/worker/grievances', icon: MessageSquare },
          { name: 'Notifications', path: '/worker/notifications', icon: Bell },
          { heading: 'ACTIVITY' },
          { name: 'History', path: '/worker/history', icon: Activity },
          { heading: 'ACCOUNT' },
          { name: 'My Profile', path: '/worker/profile', icon: Users },
          { name: 'Settings', path: '/settings', icon: Settings },
        ];
      default:
        return [
          { heading: 'Governance Modules' },
          { name: 'Dashboard', path: '/', icon: LayoutDashboard }
        ];
    }
  };

  if (!currentUser) return null;

  const navItems = getNavItems(currentUser.role);

  return (
    <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col h-screen fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 bg-[#0f4c81] text-white font-bold text-xl tracking-wider shadow-md">
        <span className="text-yellow-400 mr-2">⚒</span> KoylaSetu
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="flex flex-col space-y-1 px-3">
          {navItems.map((item, idx) => {
            if (item.heading) {
              return (
                <div key={`heading-${idx}`} className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 mt-5 first:mt-0">
                  {item.heading}
                </div>
              );
            }
            
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActive && item.path === window.location.pathname
                      ? 'bg-slate-800 text-white border-l-4 border-yellow-400' 
                      : 'hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                  }`
                }
              >
                <Icon className="w-4 h-4 mr-3" />
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 bg-slate-900 text-xs border-t border-slate-800">
        <div className="flex justify-between items-center text-slate-500 mb-1">
          <span>System Status</span>
          <span className="flex items-center text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-1 animate-pulse"></span> Online</span>
        </div>
        <div className="text-[10px] text-slate-600">
          Last sync: Just now
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
