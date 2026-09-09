import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PlaceholderModule from './components/ui/PlaceholderModule';

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
        
        {/* Core Modules */}
        <Route path="compliance" element={<PlaceholderModule title="Compliance Module" />} />
        <Route path="inspections" element={<PlaceholderModule title="Inspections Module" />} />
        <Route path="inspections/new" element={<PlaceholderModule title="New Inspection" />} />
        <Route path="violations" element={<PlaceholderModule title="Violations Module" />} />
        <Route path="actions" element={<PlaceholderModule title="Corrective Actions Module" />} />
        <Route path="contractors" element={<PlaceholderModule title="Contractors Module" />} />
        <Route path="alerts" element={<PlaceholderModule title="Alerts & Escalations" />} />
        <Route path="grievances" element={<PlaceholderModule title="Grievance Management" />} />
        <Route path="reports" element={<PlaceholderModule title="Reporting Center" />} />
        <Route path="ai-insights" element={<PlaceholderModule title="AI Analytics Center" />} />
        
        {/* Specific Role Views */}
        <Route path="observations" element={<PlaceholderModule title="Safety Observations" />} />
        <Route path="incidents" element={<PlaceholderModule title="Incident Reporting" />} />
        <Route path="quick-report" element={<PlaceholderModule title="Quick Report (Mobile)" />} />
        <Route path="my-status" element={<PlaceholderModule title="My Status" />} />
        <Route path="sync-status" element={<PlaceholderModule title="Offline Sync Status" />} />
        
        {/* GM / Director Views */}
        <Route path="comparison" element={<PlaceholderModule title="Mine Comparison" />} />
        <Route path="heatmap" element={<PlaceholderModule title="Risk Heatmap" />} />
        <Route path="escalations" element={<PlaceholderModule title="Escalation Center" />} />
        <Route path="analytics" element={<PlaceholderModule title="Cross-Mine Analytics" />} />
        <Route path="subsidiaries" element={<PlaceholderModule title="Subsidiary Comparison" />} />
        <Route path="systemic-risks" element={<PlaceholderModule title="Systemic Risk Detection" />} />
        <Route path="trends" element={<PlaceholderModule title="Strategic Analytics & Trends" />} />
        
        {/* Regulator Views */}
        <Route path="mines" element={<PlaceholderModule title="Mines Directory" />} />
        <Route path="evidence" element={<PlaceholderModule title="Evidence Viewer" />} />
        <Route path="audit-trail" element={<PlaceholderModule title="Audit Trail" />} />
        
        {/* Contractor Views */}
        <Route path="licences" element={<PlaceholderModule title="Licence Management" />} />
        <Route path="training" element={<PlaceholderModule title="Training Records" />} />
        <Route path="tasks" element={<PlaceholderModule title="Pending Tasks" />} />
        <Route path="documents" element={<PlaceholderModule title="Document Uploads" />} />
        
        {/* Employer Views */}
        <Route path="employees" element={<PlaceholderModule title="Employee Management" />} />
        <Route path="attendance" element={<PlaceholderModule title="Worker Attendance" />} />
        <Route path="employee-compliance" element={<PlaceholderModule title="Employee Compliance Status" />} />
        <Route path="compliance-history" element={<PlaceholderModule title="Compliance History" />} />
        
        <Route path="map" element={<PlaceholderModule title="GIS Map Module" />} />
        <Route path="settings" element={<PlaceholderModule title="Settings Module" />} />
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
