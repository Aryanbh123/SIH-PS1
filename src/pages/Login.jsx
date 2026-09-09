import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Briefcase, Building, Eye, EyeOff, Loader2, ShieldAlert, Users, Globe, HardHat, Factory } from 'lucide-react';
import { languages, t } from '../data/translations';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [selectedRole, setSelectedRole] = useState('manager');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 'en' is default language code
  const [language, setLanguage] = useState('en');
  const [subsidiary, setSubsidiary] = useState('SECL - South Eastern Coalfields Limited');

  // We map the roles dynamically so their names translate
  const getRoles = (lang) => [
    { id: 'manager', name: t(lang, 'manager'), icon: Briefcase },
    { id: 'safety_officer', name: t(lang, 'safetyOfficer') || 'Safety Officer', icon: ShieldAlert },
    { id: 'employee', name: t(lang, 'employee'), icon: User },
    { id: 'subsidiary_gm', name: t(lang, 'subsidiaryGM') || 'Subsidiary GM', icon: Users },
    { id: 'cil_hq_director', name: t(lang, 'cilHqDirector') || 'HQ Director', icon: Globe },
    { id: 'ministry', name: t(lang, 'ministry'), icon: Building },
    { id: 'contractor', name: t(lang, 'contractor') || 'Contractor', icon: HardHat },
    { id: 'employer', name: t(lang, 'employer') || 'Employer', icon: Factory }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!userId.trim()) {
      setError(t(language, 'errorUserId'));
      return;
    }
    if (!password.trim()) {
      setError(t(language, 'errorPassword'));
      return;
    }

    setIsLoading(true);
    
    // Attempt login
    const result = await login(userId, password);
    
    if (result.success) {
      setTimeout(() => {
        navigate('/');
      }, 500);
    } else {
      setError(result.message); // This currently comes from context, would need translation for prod
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setError('');
    setUserId(`${roleId}@demo.local`);
    setPassword('demo123');
  };

  const currentRoles = getRoles(language);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6">
          <img 
            src="/koylasetu-logo.jpg" 
            alt="KoylaSetu Logo" 
            className="w-full max-w-[280px] sm:max-w-[320px] object-contain" 
          />
        </div>

        {/* Main Card */}
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-slate-200">
          
          {/* 1. Language Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t(language, 'selectLanguage')}</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full rounded-md border border-slate-300 py-2.5 px-3 text-slate-900 shadow-sm focus:border-[#0f4c81] focus:outline-none focus:ring-1 focus:ring-[#0f4c81] sm:text-sm"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} — {lang.native}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Role Selection Grid */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">{t(language, 'selectRole')}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {currentRoles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleRoleSelect(role.id)}
                    className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg border-2 transition-all ${
                      isSelected 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' 
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className={`text-[11px] leading-tight text-center font-bold ${isSelected ? 'text-emerald-700' : 'text-slate-700'}`}>
                      {role.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Conditional Subsidiary Dropdown */}
          {selectedRole !== 'ministry' && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-1">{t(language, 'selectSubsidiary')}</label>
              <select 
                value={subsidiary}
                onChange={(e) => setSubsidiary(e.target.value)}
                className="block w-full rounded-md border border-slate-300 py-2.5 px-3 text-slate-900 shadow-sm focus:border-[#0f4c81] focus:outline-none focus:ring-1 focus:ring-[#0f4c81] sm:text-sm"
              >
                <option>SECL - South Eastern Coalfields Limited</option>
                <option>MCL - Mahanadi Coalfields Limited</option>
                <option>NCL - Northern Coalfields Limited</option>
                <option>ECL - Eastern Coalfields Limited</option>
                <option>WCL - Western Coalfields Limited</option>
                <option>CCL - Central Coalfields Limited</option>
                <option>BCCL - Bharat Coking Coal Limited</option>
                <option>CMPDI - Central Mine Planning & Design Institute</option>
                <option>CIL HQ - Coal India Limited Headquarters</option>
              </select>
            </div>
          )}

          {/* 4. Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="userId" className="block text-sm font-semibold text-slate-700 mb-1">
                {t(language, 'userId')}
              </label>
              <div className="mt-1">
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="block w-full rounded-md border border-slate-300 py-2.5 px-3 text-slate-900 shadow-sm focus:border-[#0f4c81] focus:outline-none focus:ring-1 focus:ring-[#0f4c81] sm:text-sm"
                  placeholder={`e.g. ${selectedRole}@demo.local`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1">
                {t(language, 'password')}
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-slate-300 py-2.5 pl-3 pr-10 text-slate-900 shadow-sm focus:border-[#0f4c81] focus:outline-none focus:ring-1 focus:ring-[#0f4c81] sm:text-sm"
                  placeholder="demo123"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-slate-400 hover:bg-[#0f4c81] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f4c81] disabled:bg-slate-300 disabled:cursor-not-allowed"
                style={{ backgroundColor: isLoading ? '#94a3b8' : '#0f4c81' }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t(language, 'signingIn')}
                  </>
                ) : (
                  t(language, 'signIn')
                )}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <span className="text-xs text-slate-400 font-medium">{t(language, 'prototypeMsg')}</span>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
