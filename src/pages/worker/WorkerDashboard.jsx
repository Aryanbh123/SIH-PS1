import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWorker } from '../../context/WorkerContext';
import { 
  Clock, AlertTriangle, Wrench, CheckSquare, 
  MapPin, AlertCircle, Award, ChevronRight,
  ShieldCheck, Activity, BookOpen, Clock3
} from 'lucide-react';

const WorkerDashboard = () => {
  const { profile, tasks, attendance, shifts, correctiveActions, notifications } = useWorker();
  const [timeLeft, setTimeLeft] = useState('04h 42m left');

  // Calculate summaries
  const pendingTasks = tasks?.filter(t => t.status !== 'Completed').length || 0;
  const urgentTasks = tasks?.filter(t => t.status !== 'Completed' && t.priority === 'High').length || 0;
  const openActions = correctiveActions?.filter(ca => ca.status !== 'Closed').length || 0;

  const currentShift = shifts?.find(s => s.status === 'Current') || { name: 'Morning Shift', time: '06:00 - 14:00' };
  const todayAttendance = attendance?.find(a => a.date === new Date().toISOString().split('T')[0]);
  const recentActivities = notifications?.slice(0, 3) || [];

  // Simulate a live countdown for the shift
  useEffect(() => {
    const interval = setInterval(() => {}, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-4 pt-6 pb-28 space-y-8 lg:px-8">
      
      {/* GREETING & STATUS */}
      <div className="space-y-5">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Good morning, {profile?.name?.split(' ')[0] || 'Rahul'}
          </h2>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Online
            </span>
          </div>
        </div>

        {/* SHIFT CARD */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white border-b-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#136c4b]"></div>
          
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#136c4b] flex items-center justify-center shadow-md shrink-0 transition-transform group-hover:scale-105">
                <Clock className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  CURRENT SHIFT
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  {currentShift?.time}
                </div>
                <div className="text-sm font-bold text-slate-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#136c4b]" /> {profile?.location || 'Mining Area A'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="text-sm font-black text-amber-500 flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
              <Clock3 className="w-4 h-4" /> {timeLeft}
            </div>
            <div className="text-xs font-bold px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
              On Schedule
            </div>
          </div>
        </div>
      </div>

      {/* MY DAY OVERVIEW */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest pl-1">My Day</h3>
        
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]">
            <ShieldCheck className="w-7 h-7 text-emerald-500 mb-3" />
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Attendance</span>
            <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
              {todayAttendance ? 'Present' : 'Pending'}
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]">
            <Clock3 className="w-7 h-7 text-[#136c4b] mb-3" />
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Shift</span>
            <div className="text-sm sm:text-base font-black text-slate-900 mt-1 truncate w-full">
              {currentShift?.name}
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]">
            {urgentTasks > 0 && (
              <div className="absolute top-0 right-0 w-10 h-10 bg-red-50 rounded-bl-2xl flex items-start justify-end p-2 border-b border-l border-red-100">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
              </div>
            )}
            <CheckSquare className="w-7 h-7 text-amber-500 mb-3" />
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Tasks</span>
            <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
              {pendingTasks} Pending
            </div>
          </div>
        </div>
      </div>

      {/* MY PRIORITIES */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest pl-1">My Priorities</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Training Priority Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] border border-white border-b-slate-200 flex flex-col transition-all hover:-translate-y-1">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="pt-1 flex-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">TRAINING</div>
                <h4 className="text-lg font-black text-slate-900 leading-tight">Safety Refresher</h4>
                <div className="inline-flex items-center mt-2 text-[11px] font-bold text-amber-700 bg-amber-100/50 px-2.5 py-1 rounded-lg border border-amber-200/50">
                  Due Today
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mb-6 mt-auto">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Module Progress</span>
                <span>80%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-amber-400 rounded-full w-4/5 shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
              </div>
            </div>
            
            <Link to="/worker/training" className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all focus:ring-2 focus:ring-slate-200">
              Continue
            </Link>
          </div>

          {/* Corrective Action Priority Card */}
          {openActions > 0 && correctiveActions?.slice(0, 1).map(ca => (
            <div key={ca.id} className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] border border-white border-b-slate-200 flex flex-col transition-all hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#136c4b] flex items-center justify-center shrink-0">
                  <Wrench className="w-6 h-6" />
                </div>
                <div className="pt-1 flex-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">CORRECTIVE ACTION</div>
                  <h4 className="text-lg font-black text-slate-900 leading-snug">{ca.issue}</h4>
                  <p className="text-xs text-slate-500 font-bold mt-2 flex items-center gap-1.5">
                    <Clock3 className="w-4 h-4 text-slate-400" /> Due {ca.due}
                  </p>
                </div>
              </div>
              
              <Link to="/worker/actions" className="mt-auto w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(15,76,129,0.39)] text-sm font-bold text-white bg-[#136c4b] hover:bg-[#0b3b68] hover:shadow-[0_6px_20px_rgba(15,76,129,0.23)] hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-[#136c4b]">
                Open Task
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest pl-1">Quick Actions</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <Link to="/worker/tasks" className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-white border-b-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center gap-3 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all">
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 text-[#136c4b] flex items-center justify-center shadow-sm">
              <CheckSquare className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">My Tasks</span>
          </Link>
          
          <Link to="/worker/attendance" className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-white border-b-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center gap-3 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all">
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 text-emerald-600 flex items-center justify-center shadow-sm">
              <Clock3 className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">Attendance</span>
          </Link>
          
          <Link to="/worker/reports" className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-white border-b-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center gap-3 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all">
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 text-red-500 flex items-center justify-center shadow-sm">
              <AlertCircle className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">Report</span>
          </Link>
          
          <Link to="/worker/training" className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-white border-b-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center gap-3 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all">
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 text-amber-500 flex items-center justify-center shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">Training</span>
          </Link>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-widest pl-1">Recent Activity</h3>
        
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white border-b-slate-200">
          {recentActivities.map((activity, idx) => (
            <Link 
              key={activity.id || idx} 
              to="/worker/notifications"
              className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition group"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 border border-slate-200 group-hover:border-slate-300 group-hover:text-slate-500 transition-colors">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">{activity.title || activity.message}</h4>
                <p className="text-[11px] font-semibold text-slate-400 truncate mt-0.5 tracking-wide uppercase">{activity.time || 'Recently'}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
            </Link>
          ))}
          {recentActivities.length === 0 && (
            <div className="p-6 text-center text-sm font-bold text-slate-400">
              No recent activity
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default WorkerDashboard;

