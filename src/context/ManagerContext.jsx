import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  mockMineDetails,
  mockExecutiveKPIs,
  mockAttentionItems,
  mockAiGovernanceInsights,
  mockRiskCategories,
  mockComplianceHealth,
  mockInspections,
  mockCorrectiveActions,
  mockIncidents,
  mockWorkforceData,
  mockContractors,
  mockGisMineZones,
  mockApprovals,
  mockDocuments,
  mockAuditHistory
} from '../data/mockManagerData';

const ManagerContext = createContext(null);

export const useManager = () => {
  const context = useContext(ManagerContext);
  if (!context) {
    throw new Error('useManager must be used within a ManagerProvider');
  }
  return context;
};

export const ManagerProvider = ({ children }) => {
  const [mineDetails, setMineDetails] = useState(mockMineDetails);
  const [kpis, setKpis] = useState(mockExecutiveKPIs);
  const [attentionItems, setAttentionItems] = useState(mockAttentionItems);
  const [aiInsights, setAiInsights] = useState(mockAiGovernanceInsights);
  const [riskCategories, setRiskCategories] = useState(mockRiskCategories);
  const [complianceHealth, setComplianceHealth] = useState(mockComplianceHealth);
  const [inspections, setInspections] = useState(mockInspections);
  const [correctiveActions, setCorrectiveActions] = useState(mockCorrectiveActions);
  const [incidents, setIncidents] = useState(mockIncidents);
  const [workforceData, setWorkforceData] = useState(mockWorkforceData);
  const [contractors, setContractors] = useState(mockContractors);
  const [gisZones, setGisZones] = useState(mockGisMineZones);
  const [approvals, setApprovals] = useState(mockApprovals);
  const [documents, setDocuments] = useState(mockDocuments);
  const [auditHistory, setAuditHistory] = useState(mockAuditHistory);

  // Modal & Drawer State for Demo Flows
  const [activeModal, setActiveModal] = useState(null); // 'ai_explanation' | 'action_detail' | 'site_drawer' | null
  const [selectedAiInsight, setSelectedAiInsight] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: "NOTIF-1", title: "New Evidence Submitted", message: "Rajesh Sonwane uploaded calibration log for ACT-884", time: "10 mins ago", read: false, type: "action" },
    { id: "NOTIF-2", title: "Airflow Warning", message: "Pit 4 intake sensor FLW-04 below 9 m³/s", time: "45 mins ago", read: false, type: "sensor" },
    { id: "NOTIF-3", title: "Shift A Handover", message: "Shift A attendance recorded 96.8% coverage", time: "2 hours ago", read: true, type: "shift" }
  ]);

  // Open AI Explanation Modal
  const openAiExplanation = (insightOrId) => {
    const insight = typeof insightOrId === 'string'
      ? aiInsights.find(ai => ai.id === insightOrId) || aiInsights[0]
      : insightOrId;
    setSelectedAiInsight(insight);
    setActiveModal('ai_explanation');
  };

  // Open Corrective Action Modal
  const openActionDetail = (actionOrId) => {
    const action = typeof actionOrId === 'string'
      ? correctiveActions.find(ca => ca.id === actionOrId) || correctiveActions[0]
      : actionOrId;
    setSelectedAction(action);
    setActiveModal('action_detail');
  };

  // Open Site Drawer (for GIS map)
  const openSiteDrawer = (zoneOrId) => {
    const zone = typeof zoneOrId === 'string'
      ? gisZones.find(z => z.id === zoneOrId) || gisZones[0]
      : zoneOrId;
    setSelectedZone(zone);
    setActiveModal('site_drawer');
  };

  const closeModals = () => {
    setActiveModal(null);
  };

  // Primary Demo Workflow: Verify & Close Action
  const verifyAndCloseAction = (actionId, verificationNotes = "Verified airflow restored to 12.4 m³/s. Dual methane sensor calibrated against standard test gas. Approved.") => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Update Corrective Action Status
    setCorrectiveActions(prev => prev.map(ca => {
      if (ca.id === actionId) {
        return {
          ...ca,
          status: "Closed",
          verificationLog: {
            verifiedBy: mineDetails.manager.name,
            designation: mineDetails.manager.designation,
            verifiedAt: `${timeStr} Today`,
            notes: verificationNotes,
            certificateNo: mineDetails.manager.statutoryCertificate
          }
        };
      }
      return ca;
    }));

    // Update selected action if modal is open
    setSelectedAction(prev => prev && prev.id === actionId ? {
      ...prev,
      status: "Closed",
      verificationLog: {
        verifiedBy: mineDetails.manager.name,
        designation: mineDetails.manager.designation,
        verifiedAt: `${timeStr} Today`,
        notes: verificationNotes,
        certificateNo: mineDetails.manager.statutoryCertificate
      }
    } : prev);

    // 2. Decrement Open & High Risk Actions in Executive KPIs, improve compliance
    setKpis(prev => ({
      ...prev,
      openCorrectiveActions: Math.max(0, prev.openCorrectiveActions - 1),
      highRiskIssues: Math.max(0, prev.highRiskIssues - 1),
      complianceScore: Math.min(100, prev.complianceScore + 2),
      complianceStatus: prev.highRiskIssues <= 5 ? "Healthy" : "At Risk"
    }));

    // 3. Mark Attention Item as Resolved / update
    setAttentionItems(prev => prev.filter(item => item.relatedActionId !== actionId));

    // 4. Update Pending Approval
    setApprovals(prev => prev.map(app => {
      if (app.id === "APP-101" || app.title.includes(actionId)) {
        return { ...app, status: "Approved" };
      }
      return app;
    }));

    // 5. Append to Audit History (Section 28)
    const newAuditEntry = {
      id: `AUD-${Date.now()}`,
      time: timeStr,
      date: "Today",
      actor: mineDetails.manager.name,
      role: "Mine Manager",
      action: `Verified evidence and authorized closure for Corrective Action ${actionId}`,
      category: "Action Verification"
    };
    setAuditHistory(prev => [newAuditEntry, ...prev]);

    // 6. Update notification
    setNotifications(prev => [
      {
        id: `NOTIF-${Date.now()}`,
        title: "Action Verified & Closed",
        message: `${actionId} signed off by ${mineDetails.manager.name}`,
        time: "Just now",
        read: false,
        type: "success"
      },
      ...prev
    ]);
  };

  // Escalate Action
  const escalateAction = (actionId) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCorrectiveActions(prev => prev.map(ca => {
      if (ca.id === actionId) {
        return { ...ca, priority: "Critical", status: "Escalated to Area GM" };
      }
      return ca;
    }));

    const newAuditEntry = {
      id: `AUD-${Date.now()}`,
      time: timeStr,
      date: "Today",
      actor: mineDetails.manager.name,
      role: "Mine Manager",
      action: `Escalated overdue Corrective Action ${actionId} to Area General Manager`,
      category: "Escalation"
    };
    setAuditHistory(prev => [newAuditEntry, ...prev]);
  };

  // Approve Request
  const approveRequest = (approvalId, remark = "Approved per statutory verification") => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setApprovals(prev => prev.map(app => 
      app.id === approvalId ? { ...app, status: "Approved" } : app
    ));

    const newAuditEntry = {
      id: `AUD-${Date.now()}`,
      time: timeStr,
      date: "Today",
      actor: mineDetails.manager.name,
      role: "Mine Manager",
      action: `Approved requisition ${approvalId}: ${remark}`,
      category: "Manager Approval"
    };
    setAuditHistory(prev => [newAuditEntry, ...prev]);
  };

  // Switch Mine Selection
  const switchMine = (newMineName) => {
    setMineDetails(prev => ({
      ...prev,
      name: newMineName
    }));
  };

  // Mark all notifications read
  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const value = {
    mineDetails,
    setMineDetails,
    kpis,
    setKpis,
    attentionItems,
    setAttentionItems,
    aiInsights,
    setAiInsights,
    riskCategories,
    setRiskCategories,
    complianceHealth,
    setComplianceHealth,
    inspections,
    setInspections,
    correctiveActions,
    setCorrectiveActions,
    incidents,
    setIncidents,
    workforceData,
    setWorkforceData,
    contractors,
    setContractors,
    gisZones,
    setGisZones,
    approvals,
    setApprovals,
    documents,
    setDocuments,
    auditHistory,
    setAuditHistory,
    notifications,
    markAllNotificationsRead,
    // Modals
    activeModal,
    selectedAiInsight,
    selectedAction,
    selectedZone,
    openAiExplanation,
    openActionDetail,
    openSiteDrawer,
    closeModals,
    // Actions
    verifyAndCloseAction,
    escalateAction,
    approveRequest,
    switchMine
  };

  return (
    <ManagerContext.Provider value={value}>
      {children}
    </ManagerContext.Provider>
  );
};
