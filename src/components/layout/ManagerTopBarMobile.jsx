import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Monitor, Globe, LogOut, ChevronDown, Building2, MapPin, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useManager } from '../../context/ManagerContext';
import { languages } from '../../data/translations';

const subsidiariesList = [
  "WCL - Western Coalfields Limited",
  "SECL - South Eastern Coalfields Limited",
  "MCL - Mahanadi Coalfields Limited",
  "NCL - Northern Coalfields Limited",
  "ECL - Eastern Coalfields Limited"
];

const minesBySubsidiary = {
  "WCL": ["Kamptee Colliery", "Inder Colliery", "Gondegaon Open Cast", "Umrer Open Cast"],
  "SECL": ["Gevra Open Cast Project", "Dipka Project", "Kusmunda Area"],
  "ECL": ["Jhanjra Project", "Raniganj Underground"],
  "NCL": ["Nigahi Project", "Jayant Open Cast"]
};

const ManagerTopBarMobile = () => {
  const navigate = useNavigate();
  const { currentUser, logout, language, setLanguage, subsidiary, setSubsidiary, activeMine, setActiveMine } = useAuth();
  const { mineDetails, notifications, markAllNotificationsRead } = useManager();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMinePicker, setShowMinePicker] = useState(false);

  const unreadCount = notifications?.filter(n => !n.read).length || 4;
  const currentSubCode = (subsidiary || 'WCL').split(' - ')[0];
  const availableMines = minesBySubsidiary[currentSubCode] || ["Kamptee Colliery", "Inder Colliery"];

  const handleMineSelect = (mine) => {
    setActiveMine(mine);
    setShowMinePicker(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-5 py-3 flex items-center justify-between shadow-xs">
        {/* User Info with Avatar Ring */}
        <div 
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden shadow-xs shrink-0 flex items-center justify-center bg-[#003366] text-white font-black text-sm">
            AS
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold text-slate-900 leading-tight">
                {mineDetails?.manager?.name || currentUser?.name || 'Amit Sharma'}
              </h1>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition" />
            </div>
            <p className="text-[11px] font-medium text-slate-500">
              Mine Manager · {mineDetails?.name?.split(' ')[0] || 'Kamptee'}
            </p>
          </div>
        </div>

        {/* Right Actions: Notification Bell + Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Mine Badge Button */}
          <button 
            onClick={() => setShowMinePicker(!showMinePicker)}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
          >
            <MapPin className="w-3 h-3 text-[#003366]" />
            <span className="truncate max-w-[100px]">{mineDetails?.name || 'Kamptee'}</span>
          </button>

          {/* Notifications Button */}
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Profile & Settings Dropdown Drawer */}
      {showMenu && (
        <div className="fixed inset-0 z-50 flex justify-center bg-slate-900/40 backdrop-blur-xs animate-in fade-in" onClick={() => setShowMenu(false)}>
          <div 
            className="w-full max-w-xl bg-white rounded-b-3xl shadow-2xl p-5 space-y-4 border-b border-slate-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#003366] text-white font-black text-lg flex items-center justify-center border-2 border-amber-400">
                  AS
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{mineDetails?.manager?.name || 'Amit Sharma'}</h3>
                  <p className="text-xs text-slate-500">DGMS Cert: FCC-10842 · Mine Manager</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMenu(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Switchers & Links */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate('/manager/command-center');
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-[#003366] font-bold text-sm transition"
              >
                <div className="flex items-center gap-2.5">
                  <Monitor className="w-4 h-4 text-blue-600" />
                  <span>Desktop Command Center</span>
                </div>
                <span className="text-xs bg-blue-200/80 px-2 py-0.5 rounded-full font-medium">Switch View</span>
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowMinePicker(true);
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium text-sm transition"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-[#003366]" />
                  <span>Active Mine: <strong>{mineDetails?.name}</strong></span>
                </div>
                <span className="text-xs text-slate-400">Change</span>
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  logout();
                }}
                className="w-full flex items-center gap-2.5 p-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-sm transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Drawer */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex justify-center bg-slate-900/40 backdrop-blur-xs animate-in fade-in" onClick={() => setShowNotifications(false)}>
          <div 
            className="w-full max-w-xl bg-white rounded-b-3xl shadow-2xl p-5 space-y-3 max-h-[75vh] flex flex-col border-b border-slate-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#003366]" />
                <h3 className="font-bold text-slate-900 text-base">Statutory & Mine Alerts</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={markAllNotificationsRead}
                  className="text-xs text-[#003366] font-bold hover:underline"
                >
                  Mark read
                </button>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
              {notifications?.slice(0, 5).map((n) => (
                <div 
                  key={n.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {n.category || 'Statutory'}
                    </span>
                    <span className="text-[10px] text-slate-400">{n.time || '10m ago'}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mine Selector Popup */}
      {showMinePicker && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-slate-900/50 backdrop-blur-xs p-4" onClick={() => setShowMinePicker(false)}>
          <div 
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-5 space-y-3 border border-slate-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Select Active Mine</h3>
              <button onClick={() => setShowMinePicker(false)} className="p-1 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1.5 max-h-60 overflow-y-auto">
              {availableMines.map(mine => (
                <button
                  key={mine}
                  onClick={() => handleMineSelect(mine)}
                  className={`w-full text-left p-3 rounded-2xl text-xs font-bold flex items-center justify-between transition ${
                    mine === (mineDetails?.name || activeMine)
                      ? 'bg-[#003366] text-white'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span>{mine}</span>
                  {mine === (mineDetails?.name || activeMine) && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagerTopBarMobile;
