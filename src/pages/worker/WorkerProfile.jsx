import React from 'react';
import { useWorker } from '../../context/WorkerContext';
import { User, Phone, Mail, MapPin, Briefcase, Award } from 'lucide-react';

const WorkerProfile = () => {
  const { profile } = useWorker();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">My Profile</h1>
          <p className="text-slate-500 text-sm mt-1">View your personal and employment details.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 border-b border-slate-200 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-[#0f4c81] text-white rounded-full flex items-center justify-center text-4xl font-black shadow-lg">
            {profile.name.charAt(0)}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-800">{profile.name}</h2>
            <p className="text-lg text-[#0f4c81] font-bold">{profile.designation}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 flex items-center">
                <Briefcase className="w-3 h-3 mr-1" /> {profile.department}
              </span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 flex items-center">
                <MapPin className="w-3 h-3 mr-1" /> {profile.location}
              </span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 flex items-center">
                <Award className="w-3 h-3 mr-1" /> {profile.subsidiary}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-6">Employment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-8">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Employee ID</p>
              <p className="font-semibold text-slate-800 font-mono text-lg">{profile.id}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date of Joining</p>
              <p className="font-semibold text-slate-800 text-lg">12 Mar 2021</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Emergency Contact</p>
              <p className="font-semibold text-slate-800 text-lg">+91 98765 43210</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Blood Group</p>
              <p className="font-semibold text-red-600 text-lg">O+</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-6">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                <Phone className="w-3 h-3 mr-1" /> Phone Number
              </p>
              <p className="font-semibold text-slate-800 text-lg">+91 91234 56789</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
                <Mail className="w-3 h-3 mr-1" /> Email Address
              </p>
              <p className="font-semibold text-slate-800 text-lg">rahul.sharma@wcl.coalindia.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
