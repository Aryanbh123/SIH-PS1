import React from 'react';
import { useAuth } from '../context/AuthContext';
import MineManagerDashboard from '../components/dashboards/MineManagerDashboard';
import SafetyOfficerDashboard from '../components/dashboards/SafetyOfficerDashboard';
import FieldInspectorDashboard from '../components/dashboards/FieldInspectorDashboard';
import SubsidiaryGMDashboard from '../components/dashboards/SubsidiaryGMDashboard';
import CILHQDashboard from '../components/dashboards/CILHQDashboard';
import RegulatorDashboard from '../components/dashboards/RegulatorDashboard';
import ContractorDashboard from '../components/dashboards/ContractorDashboard';
import EmployerDashboard from '../components/dashboards/EmployerDashboard';

const DashboardRouter = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  switch (currentUser.role) {
    case 'manager':
      return <MineManagerDashboard />;
    case 'safety_officer':
      return <SafetyOfficerDashboard />;
    case 'employee': // Field Inspector
      return <FieldInspectorDashboard />;
    case 'subsidiary_gm':
      return <SubsidiaryGMDashboard />;
    case 'cil_hq_director':
      return <CILHQDashboard />;
    case 'ministry': // DGMS Regulator
      return <RegulatorDashboard />;
    case 'contractor':
      return <ContractorDashboard />;
    case 'employer':
      return <EmployerDashboard />;
    default:
      // Fallback
      return <MineManagerDashboard />;
  }
};

export default DashboardRouter;
