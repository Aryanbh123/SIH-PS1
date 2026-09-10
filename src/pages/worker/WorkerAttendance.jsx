import React from 'react';
import { useWorker } from '../../context/WorkerContext';
import { Calendar, Check, X, Clock } from 'lucide-react';

const WorkerAttendance = () => {
  const { attendance, shifts } = useWorker();

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.find(a => a.date === today);
  const currentShift = shifts.find(s => s.status === 'Current');

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">Attendance</h1>
          <p className="text-slate-500 text-sm mt-1">View your attendance records and check-in status.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Today's Status</h2>
              <div className="text-3xl font-black text-slate-800">{today}</div>
            </div>
            {todayAttendance ? (
              <div className="text-right">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800">
                  <Check className="w-4 h-4 mr-1" /> Checked In
                </div>
                <div className="text-sm font-medium text-slate-500 mt-2">Shift: {currentShift?.time}</div>
              </div>
            ) : (
              <div className="text-right">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-slate-100 text-slate-600">
                  Not Checked In
                </div>
              </div>
            )}
          </div>
          {!todayAttendance && (
             <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between">
               <span className="text-sm font-medium text-blue-800">Ready to start your shift?</span>
               <button className="bg-[#136c4b] hover:bg-[#0e5239] text-white px-6 py-2 rounded-lg font-bold shadow-sm transition-colors">
                 Check In Now
               </button>
             </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center flex flex-col justify-center">
          <Calendar className="w-8 h-8 text-[#0f4c81] mx-auto mb-3" />
          <div className="text-3xl font-black text-slate-800 mb-1">92%</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance Rate</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-bold text-slate-800">Recent Records</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
            <tr>
              <th className="px-6 py-4 border-b border-slate-200">Date</th>
              <th className="px-6 py-4 border-b border-slate-200">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {attendance.map((record, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-800 font-medium">{record.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    record.status === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                    record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {record.status === 'Present' && <Check className="w-3 h-3 mr-1" />}
                    {record.status === 'Absent' && <X className="w-3 h-3 mr-1" />}
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerAttendance;
