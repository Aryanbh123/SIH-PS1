import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

// Protected Route wrapper to ensure user is logged in before accessing dashboard
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="compliance" element={<div className="p-10 text-slate-500 font-semibold">Compliance Module (Placeholder)</div>} />
        <Route path="inspections" element={<div className="p-10 text-slate-500 font-semibold">Inspections Module (Placeholder)</div>} />
        <Route path="actions" element={<div className="p-10 text-slate-500 font-semibold">Corrective Actions Module (Placeholder)</div>} />
        <Route path="map" element={<div className="p-10 text-slate-500 font-semibold">GIS Map Module (Placeholder)</div>} />
        <Route path="contractors" element={<div className="p-10 text-slate-500 font-semibold">Contractors Module (Placeholder)</div>} />
        <Route path="settings" element={<div className="p-10 text-slate-500 font-semibold">Settings Module (Placeholder)</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
