/**
 * KoylaSetu - Manager Service Layer
 * Simulates asynchronous enterprise service calls.
 * Future API Ready: can be swapped for REST / GraphQL backend APIs without changing UI components.
 */

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

const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

export const managerService = {
  async getMineDetails() {
    await delay();
    return { ...mockMineDetails };
  },

  async getExecutiveKPIs() {
    await delay();
    return { ...mockExecutiveKPIs };
  },

  async getAttentionItems() {
    await delay();
    return [...mockAttentionItems];
  },

  async getAiGovernanceInsights() {
    await delay();
    return [...mockAiGovernanceInsights];
  },

  async getAiInsightById(id) {
    await delay();
    return mockAiGovernanceInsights.find(item => item.id === id) || null;
  },

  async getRiskCategories() {
    await delay();
    return [...mockRiskCategories];
  },

  async getComplianceHealth(filterCategory = 'all') {
    await delay();
    if (filterCategory === 'all') return [...mockComplianceHealth];
    return mockComplianceHealth.filter(c => c.category.toLowerCase() === filterCategory.toLowerCase());
  },

  async getInspections(status = 'all') {
    await delay();
    if (status === 'all') return [...mockInspections];
    return mockInspections.filter(ins => ins.status.toLowerCase() === status.toLowerCase());
  },

  async getInspectionById(id) {
    await delay();
    return mockInspections.find(ins => ins.id === id) || null;
  },

  async getCorrectiveActions(status = 'all') {
    await delay();
    if (status === 'all') return [...mockCorrectiveActions];
    return mockCorrectiveActions.filter(ca => ca.status.toLowerCase() === status.toLowerCase());
  },

  async getCorrectiveActionById(id) {
    await delay();
    return mockCorrectiveActions.find(ca => ca.id === id) || null;
  },

  async getIncidents() {
    await delay();
    return [...mockIncidents];
  },

  async getWorkforceData() {
    await delay();
    return { ...mockWorkforceData };
  },

  async getContractors() {
    await delay();
    return [...mockContractors];
  },

  async getGisMineZones() {
    await delay();
    return [...mockGisMineZones];
  },

  async getApprovals() {
    await delay();
    return [...mockApprovals];
  },

  async getDocuments() {
    await delay();
    return [...mockDocuments];
  },

  async getAuditHistory() {
    await delay();
    return [...mockAuditHistory];
  }
};
