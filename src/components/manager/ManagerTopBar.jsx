import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useManager } from '../../context/ManagerContext';
import { languages, t } from '../../data/translations';
import { 
  Search, Bell, Globe, ChevronDown, LogOut, User, 
  Settings, Building2, MapPin, Check, Menu, X 
} from 'lucide-react';

const subsidiariesList = [
  "WCL - Western Coalfields Limited",
  "SECL - South Eastern Coalfields Limited",
  "MCL - Mahanadi Coalfields Limited",
  "NCL - Northern Coalfields Limited",
  "ECL - Eastern Coalfields Limited",
  "CCL - Central Coalfields Limited",
  "BCCL - Bharat Coking Coal Limited"
];

const minesBySubsidiary = {
  "WCL": ["Kamptee Colliery", "Inder Colliery", "Gondegaon Open Cast", "Umrer Open Cast"],
  "SECL": ["Gevra Open Cast Project", "Dipka Project", "Kusmunda Area"],
  "ECL": ["Jhanjra Project", "Raniganj Underground"],
  "NCL": ["Nigahi Project", "Jayant Open Cast"]
};

const ManagerTopBar = ({ onToggleMobileNav, isMobileNavOpen }) => {
  const { logout, language, setLanguage, subsidiary, setSubsidiary, activeMine, setActiveMine } = useAuth();
  const { mineDetails, switchMine, notifications, markAllNotificationsRead, openActionDetail } = useManager();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMineMenu, setShowMineMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentSubCode = (subsidiary || 'WCL').split(' - ')[0];
  const availableMines = minesBySubsidiary[currentSubCode] || ["Kamptee Colliery", "Gevra OC"];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSubChange = (newSub) => {
    setSubsidiary(newSub);
    const subCode = newSub.split(' - ')[0];
    const firstMine = (minesBySubsidiary[subCode] && minesBySubsidiary[subCode][0]) || "Kamptee Colliery";
    setActiveMine(firstMine);
    switchMine(firstMine);
    setShowSubMenu(false);
  };

  const handleMineChange = (mine) => {
    setActiveMine(mine);
    switchMine(mine);
    setShowMineMenu(false);
  };

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs px-4 lg:px-6 flex items-center justify-between gap-4">
      
      {/* Left Area: Mobile Menu Toggle & Brand Indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileNav}
          className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden transition-colors"
          aria-label="Toggle Navigation"
        >
          {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Subsidiary & Mine Pickers (Desktop) */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Subsidiary Pill */}
          <div className="relative">
            <button
              onClick={() => { setShowSubMenu(!showSubMenu); setShowMineMenu(false); setShowLangMenu(false); }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-[#0f4c81]" />
              <span>{currentSubCode}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {showSubMenu && (
              <div className="absolute left-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Select Subsidiary
                </div>
                {subsidiariesList.map(sub => (
                  <button
                    key={sub}
                    onClick={() => handleSubChange(sub)}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0f4c81] flex items-center justify-between"
                  >
                    <span>{sub}</span>
                    {subsidiary === sub && <Check className="w-3.5 h-3.5 text-[#0f4c81]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mine Pill */}
          <div className="relative">
            <button
              onClick={() => { setShowMineMenu(!showMineMenu); setShowSubMenu(false); setShowLangMenu(false); }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200/80 rounded-lg text-xs font-bold text-[#0f4c81] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0f4c81]" />
              <span>{mineDetails.name || activeMine}</span>
              <ChevronDown className="w-3 h-3 text-[#0f4c81]" />
            </button>
            {showMineMenu && (
              <div className="absolute left-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Active Colliery Site
                </div>
                {availableMines.map(m => (
                  <button
                    key={m}
                    onClick={() => handleMineChange(m)}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0f4c81] flex items-center justify-between"
                  >
                    <span>{m}</span>
                    {(mineDetails.name === m || activeMine === m) && <Check className="w-3.5 h-3.5 text-[#0f4c81]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Center Area: Global Search */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(language, 'searchPlaceholder')}
            className="w-full pl-9 pr-3 py-1.5 text-xs font-medium bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-[#0f4c81] rounded-lg transition-colors outline-none text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Right Area: Status, Language, Notifications, Manager Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Status Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{t(language, 'online')}</span>
        </div>

        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => { setShowLangMenu(!showLangMenu); setShowMineMenu(false); setShowSubMenu(false); }}
            className="flex items-center gap-1 p-2 sm:px-2.5 sm:py-1.5 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#0f4c81]" />
            <span className="hidden sm:inline">{currentLangObj.native}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          {showLangMenu && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 max-h-64 overflow-y-auto animate-in fade-in zoom-in-95">
              <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Select Language
              </div>
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLanguage(l.code); setShowLangMenu(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-[#0f4c81] flex items-center justify-between"
                >
                  <span>{l.name} — {l.native}</span>
                  {language === l.code && <Check className="w-3.5 h-3.5 text-[#0f4c81]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95">
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Operational Alerts & Updates</span>
                <button 
                  onClick={markAllNotificationsRead}
                  className="text-[10px] font-semibold text-[#0f4c81] hover:underline"
                >
                  Mark all read
                </button>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div 
                    key={n.id}
                    onClick={() => {
                      if (n.type === 'action') openActionDetail('ACT-884');
                      setShowNotifications(false);
                    }}
                    className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${!n.read ? 'bg-blue-50/40' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-slate-600 mt-1 text-[11px] leading-snug">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Manager Avatar & Identity */}
        <div className="relative pl-2 border-l border-slate-200">
          <button
            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-50 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full bg-[#0f4c81] text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-white overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
                alt="Amit Sharma"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden xl:block">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {mineDetails.manager.name}
              </div>
              <div className="text-[10px] font-medium text-slate-500 leading-tight">
                {mineDetails.manager.designation.split(' (')[0]} · {currentSubCode}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95">
              <div className="p-3.5 bg-slate-50 border-b border-slate-100">
                <div className="font-bold text-xs text-slate-900">{mineDetails.manager.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{mineDetails.manager.email}</div>
                <div className="mt-2 text-[10px] font-bold text-[#0f4c81] bg-blue-50 px-2 py-0.5 rounded inline-block">
                  Cert: {mineDetails.manager.statutoryCertificate}
                </div>
              </div>
              <div className="p-1">
                <a
                  href="/manager/profile"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{t(language, 'profile')}</span>
                </a>
                <a
                  href="/manager/settings"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>{t(language, 'settings')}</span>
                </a>
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t(language, 'logout')}</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};

export default ManagerTopBar;
