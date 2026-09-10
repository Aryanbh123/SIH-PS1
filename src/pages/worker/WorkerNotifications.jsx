import React from 'react';
import { useWorker } from '../../context/WorkerContext';
import { Bell, Check } from 'lucide-react';

const WorkerNotifications = () => {
  const { notifications, markNotificationsRead } = useWorker();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Notifications</h1>
          <p className="text-slate-500 text-sm mt-1">Updates and alerts regarding your work.</p>
        </div>
        <button 
          onClick={markNotificationsRead}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center transition-colors"
        >
          <Check className="w-4 h-4 mr-2" /> Mark All Read
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {notifications.map(n => (
            <div key={n.id} className={`p-5 flex gap-4 ${!n.read ? 'bg-blue-50/30' : 'hover:bg-slate-50'} transition-colors`}>
              <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                !n.read ? 'bg-blue-100 text-[#0f4c81]' : 'bg-slate-100 text-slate-400'
              }`}>
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-base ${!n.read ? 'font-bold text-slate-800' : 'font-medium text-slate-700'}`}>{n.title}</h3>
                  <span className="text-xs font-semibold text-slate-400 whitespace-nowrap ml-4">{n.time}</span>
                </div>
                <p className="text-sm text-slate-600">{n.message}</p>
                {!n.read && (
                  <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-bold bg-[#0f4c81] text-white uppercase tracking-wider">
                    New
                  </span>
                )}
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="p-8 text-center text-slate-500">You have no notifications.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerNotifications;
