import React from 'react';
import { HardHat } from 'lucide-react';

const PlaceholderModule = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center h-full">
      <div className="bg-slate-200 p-6 rounded-full mb-6 text-slate-400">
        <HardHat className="w-16 h-16" />
      </div>
      <h1 className="text-3xl font-bold text-[#0f4c81] mb-3">{title}</h1>
      <p className="text-slate-500 max-w-lg mb-8">
        {description || "This module is part of the architectural design but has not been fully implemented in the current prototype iteration."}
      </p>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm font-semibold max-w-md">
        This is a placeholder for the Smart India Hackathon (SIH) prototype.
      </div>
    </div>
  );
};

export default PlaceholderModule;
