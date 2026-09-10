/**
 * KoylaSetu - Mine Manager Synthetic Demo Dataset
 * Coal India Limited / Western Coalfields Limited (WCL)
 * Mine: Kamptee Colliery (Nagpur Area)
 * Manager: Amit Sharma (MGR-001)
 */

export const mockMineDetails = {
  id: "MINE-WCL-004",
  name: "Kamptee Colliery",
  subsidiary: "WCL - Western Coalfields Limited",
  area: "Nagpur Area",
  state: "Maharashtra",
  type: "Mixed (Opencast & Underground)",
  capacity: "3.20 MTPA",
  currentProductionRate: "2.85 MTPA",
  workforceTotal: 840,
  workforcePresent: 806,
  complianceScore: 86,
  overallRiskScore: 72,
  riskLevel: "High",
  manager: {
    id: "MGR-001",
    name: "Amit Sharma",
    designation: "Mine Manager (First Class Mines Manager Certificate)",
    subsidiary: "WCL",
    mine: "Kamptee Colliery",
    email: "amit.sharma@wcl.coalindia.in",
    phone: "+91 94221 88320",
    experience: "16 Years in Coal Operations",
    statutoryCertificate: "DGMS-FCC-2012-4418"
  }
};

export const mockExecutiveKPIs = {
  complianceScore: 86,
  complianceStatus: "At Risk", // Healthy / At Risk
  highRiskIssues: 8,
  openCorrectiveActions: 12,
  overdueActions: 3,
  pendingInspections: 5,
  activeIncidents: 2,
  workforcePresentPct: 96,
  totalWorkforce: 840,
  presentWorkforce: 806,
  lastShiftProduction: "8,450 Tonnes",
  productionTargetPct: 94
};

export const mockAttentionItems = [
  {
    id: "ATTN-01",
    priority: "HIGH RISK",
    severity: "Critical",
    badgeColor: "bg-red-100 text-red-700 border-red-200",
    what: "Recurring ventilation velocity deficiency & sensor drift",
    where: "Pit 4, Tailgate Face 4B (Underground Seam III)",
    why: "Dual optical sensors detected 8.2 m³/s airflow (DGMS standard >= 12.0 m³/s). AI identified 3 recurring duct degradation flags in 30 days.",
    who: "Rajesh Sonwane (Ventilation Tech Lead)",
    when: "Detected 4 hours ago",
    whatNext: "Inspect duct joint integrity and review submitted repair evidence for ACT-884.",
    actionType: "action_review",
    relatedActionId: "ACT-884",
    relatedInspectionId: "INS-2024-WCL-44",
    relatedAiId: "AI-VENT-01"
  },
  {
    id: "ATTN-02",
    priority: "OVERDUE",
    severity: "High",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    what: "Corrective Action ACT-881 pending rope recapping",
    where: "Winch 3 Haulage Drift",
    why: "Winding rope nondestructive testing (NDT) overdue by 48 hours. Risk of mechanical brake seizure.",
    who: "Dinesh Kulkarni (Mechanical Foreman)",
    when: "Due 2 days ago (2026-09-08)",
    whatNext: "Escalate to Area Mechanical Engineer and restrict man-riding hoist operation.",
    actionType: "escalate",
    relatedActionId: "ACT-881"
  },
  {
    id: "ATTN-03",
    priority: "COMPLIANCE",
    severity: "High",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    what: "Quarterly Statutory Airborne Respirable Dust Survey approaching DGMS deadline",
    where: "Coal Handling Plant (CHP-1) & Transfer Chutes",
    why: "DGMS Circular 04/2024 mandates quarterly gravimetric dust sampling submission by 15th September.",
    who: "Dr. Anjali Joshi (Environmental & Safety Officer)",
    when: "Due in 4 days",
    whatNext: "Review preliminary particulate matter readings and sign off Form XI return.",
    actionType: "document_review",
    relatedDocId: "DOC-DGMS-04"
  },
  {
    id: "ATTN-04",
    priority: "ACTIVE INCIDENT",
    severity: "Medium",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    what: "Conveyor Belt #3 Idler Roller Overheating (INC-2024-09)",
    where: "Coal Handling Plant (CHP-1) Transfer Tower",
    why: "Infrared pyrometer detected 88°C surface temperature on return idler roller.",
    who: "Sunil Verma (Safety Officer) & Shift A Maintenance",
    when: "Reported today at 07:15 AM",
    whatNext: "Verify thermal imaging cool-down check and sign off incident closure report.",
    actionType: "incident_review",
    relatedIncidentId: "INC-2024-09"
  }
];

export const mockAiGovernanceInsights = [
  {
    id: "AI-VENT-01",
    riskCategory: "Ventilation & Statutory Gas Safety",
    riskLevel: "High",
    confidenceScore: 94,
    finding: "Recurring Compliance Pattern: Negative-Space Airflow Anomaly in Pit 4",
    area: "Pit 4, Tailgate Face 4B (Underground Seam III)",
    reason: "Historical correlation across INS-2024-WCL-44 and last month's logs: intake duct flexible couplings suffer pressure drops during high-humidity night shifts. Methane sensor CH4 elevated to 0.82% (statutory limit 0.75% for alerting).",
    evidence: "Continuous Airflow Sensor FLW-04 recorded 8.2 m³/s (normal range: 12.5–14.0 m³/s). Optical methane detector SN-994 drifts +0.08% under duct vibration.",
    priority: "Critical (DGMS Coal Mines Regulations 2017, Regulation 153)",
    suggestedAction: "Complete coupling seal replacement, execute 0-100% calibration of dual methane sensors, and log manager sign-off.",
    relatedInspectionId: "INS-2024-WCL-44",
    relatedActionId: "ACT-884",
    sensorReadings: {
      ch4: "0.82%",
      airflow: "8.2 m³/s",
      co: "4.0 ppm",
      temp: "29.4°C"
    }
  },
  {
    id: "AI-HAUL-02",
    riskCategory: "Heavy Machinery & Proximity Safety",
    riskLevel: "Medium",
    confidenceScore: 89,
    finding: "Predictive Alert: Heavy Hauler Speed Exceedance on Ramp B",
    area: "Opencast Bench 3 to Haul Road B Gradient",
    reason: "GPS telematics detected 4 loaded 100T dumpers traveling at 28 km/h on a 1:16 downward incline (max allowed: 20 km/h) between 02:30 AM and 04:15 AM.",
    evidence: "Telematics telemetry cluster from 3 dumpers (WD-104, WD-108, WD-112); RFID near-miss alert with light utility vehicle UV-09.",
    priority: "High (DGMS Circular No. 02 of 2019 on Dump Truck Safety)",
    suggestedAction: "Enforce dynamic speed retarder check and conduct mandatory speed briefing with contractor driver shifts.",
    relatedInspectionId: "INS-2024-WCL-46",
    relatedActionId: "ACT-886",
    sensorReadings: {
      speed: "28 km/h",
      limit: "20 km/h",
      nearMisses: "3 recorded",
      slopeGradient: "1 in 16"
    }
  },
  {
    id: "AI-CONT-03",
    riskCategory: "Contractor Compliance & Statutory Permits",
    riskLevel: "High",
    confidenceScore: 91,
    finding: "Contractor Risk Intelligence: Deccan Blasting Ltd Safety Profile Degradation",
    area: "South Quarry Blasting Zone",
    reason: "Statutory explosives magazine custodian license expires in 5 calendar days. Blasting log discrepancies in ground vibration peak particle velocity (PPV) recorded on Seismograph S-3.",
    evidence: "Form E explosive stock register discrepancy of 25kg bulk ANFO; missing renewal endorsement from Controller of Explosives (PESO).",
    priority: "High (Mines Act Section 22A & Explosives Rules 2008)",
    suggestedAction: "Withhold approval for next week's deep-hole blasting permits until valid PESO endorsement is uploaded.",
    relatedInspectionId: "INS-2024-WCL-48",
    relatedActionId: "ACT-885",
    sensorReadings: {
      peakPPV: "12.8 mm/s",
      ppvLimit: "10.0 mm/s",
      permitExpiry: "5 Days remaining",
      complianceScore: "74%"
    }
  },
  {
    id: "AI-SLOPE-04",
    riskCategory: "Ground Stability & Geotechnical Intelligence",
    riskLevel: "High",
    confidenceScore: 87,
    finding: "Synthetic Aperture Radar (InSAR) Micro-Displacement Alert",
    area: "Overburden Dump 2 (East Flank)",
    reason: "Interferometric satellite processing combined with piezometer PZ-04 indicates 4.8mm cumulative slope crest subsidence after 38mm precipitation.",
    evidence: "Pore pressure elevated to 142 kPa; radar coherence loss along Bench 5 berm toe.",
    priority: "High (DGMS Circular 01 of 2010 on Dump Stability)",
    suggestedAction: "Order immediate suspension of waste dumping on Bench 5 and mobilize geotechnical survey crew.",
    relatedInspectionId: "INS-2024-WCL-46",
    relatedActionId: "ACT-883",
    sensorReadings: {
      displacement: "4.8 mm / 72h",
      porePressure: "142 kPa",
      rainfall: "38 mm",
      safetyFactor: "1.18 (Warning < 1.25)"
    }
  }
];

export const mockRiskCategories = [
  { id: "RC-01", name: "Ventilation & Gas Dynamics", score: 88, level: "High", trend: "Worsening (+6%)", count: 3, criticalArea: "Pit 4 Seam III" },
  { id: "RC-02", name: "Slope & Ground Stability", score: 76, level: "High", trend: "Elevated (+4%)", count: 2, criticalArea: "Overburden Dump 2" },
  { id: "RC-03", name: "Contractor Compliance", score: 74, level: "High", trend: "Worsening (+8%)", count: 2, criticalArea: "Deccan Blasting Zone" },
  { id: "RC-04", name: "Heavy Haulage & Mobile Machinery", score: 58, level: "Medium", trend: "Stable (0%)", count: 1, criticalArea: "Haul Road B Ramp" },
  { id: "RC-05", name: "Electrical & High Voltage Distribution", score: 32, level: "Low", trend: "Improving (-4%)", count: 0, criticalArea: "Substation 33kV" },
  { id: "RC-06", name: "Environmental & Dust Suppression", score: 44, level: "Medium", trend: "Stable (-1%)", count: 1, criticalArea: "Washery CHP Area" }
];

export const mockComplianceHealth = [
  { id: "CMP-01", regulation: "DGMS CMR 2017 Reg 153 (Ventilation Quantity)", category: "Ventilation", status: "At Risk", lastAudit: "2026-09-08", dueDate: "2026-09-15", officer: "R. Sonwane" },
  { id: "CMP-02", regulation: "DGMS CMR 2017 Reg 113 (Ground Control Plan)", category: "Strata Control", status: "Compliant", lastAudit: "2026-09-01", dueDate: "2026-10-01", officer: "A. Sharma" },
  { id: "CMP-03", regulation: "Mines Act 1952 Sec 28 (Workforce Daily Rest)", category: "Labour", status: "Compliant", lastAudit: "2026-09-09", dueDate: "2026-09-30", officer: "HR Dept" },
  { id: "CMP-04", regulation: "Water (P&CP) Act Consent to Operate (CTO)", category: "Environment", status: "Compliant", lastAudit: "2026-08-15", dueDate: "2026-12-31", officer: "Dr. A. Joshi" },
  { id: "CMP-05", regulation: "PESO Explosives Rules 2008 Magazine License", category: "Contractor", status: "Non-Compliant", lastAudit: "2026-09-04", dueDate: "2026-09-15", officer: "Deccan Blasting" },
  { id: "CMP-06", regulation: "DGMS Tech Circular 04/2024 Dust Suppression", category: "Occupational Health", status: "Due Soon", lastAudit: "2026-06-12", dueDate: "2026-09-14", officer: "Dr. A. Joshi" },
  { id: "CMP-07", regulation: "Central Electricity Authority (CEA) Safety Regs", category: "Electrical", status: "Compliant", lastAudit: "2026-09-05", dueDate: "2026-11-05", officer: "H. Pillai" },
  { id: "CMP-08", regulation: "DGMS Form B/C Statutory Attendance Digitization", category: "Governance", status: "Compliant", lastAudit: "2026-09-10", dueDate: "Continuous", officer: "A. Sharma" }
];

export const mockInspections = [
  {
    id: "INS-2024-WCL-44",
    title: "Pit 4 Underground Ventilation & Gas Safety Audit",
    mineId: "MINE-WCL-004",
    location: "Pit 4, Seam III Tailgate",
    inspector: "R. K. Mahapatra (DGMS Senior Inspector)",
    date: "2026-09-08",
    status: "Completed",
    severity: "High",
    observationsCount: 3,
    findings: [
      "Flexible ducting joint clamp leakage in Sector 4B reduced airflow velocity to 8.2 m³/s.",
      "Dual optical methane sensor SN-994 required zero-point recalibration.",
      "Auxiliary fan starter box earthing resistance exceeded 2.0 ohms (measured 2.8 ohms)."
    ],
    relatedActionId: "ACT-884"
  },
  {
    id: "INS-2024-WCL-45",
    title: "CHP-1 Transfer Tower Fire Suppression & Pyrometer Audit",
    mineId: "MINE-WCL-004",
    location: "Coal Handling Plant (CHP-1)",
    inspector: "Sunil Verma (Safety Officer)",
    date: "2026-09-09",
    status: "In Progress",
    severity: "Medium",
    observationsCount: 1,
    findings: [
      "Water mist spray nozzles at Chute 2 partially clogged with coal fines."
    ],
    relatedActionId: "ACT-890"
  },
  {
    id: "INS-2024-WCL-46",
    title: "Opencast Bench 3 & Haul Road Berm Stability Survey",
    mineId: "MINE-WCL-004",
    location: "Haul Road B & Bench 3",
    inspector: "Amit Desai (Field Inspector)",
    date: "2026-09-10",
    status: "Scheduled",
    severity: "Medium",
    observationsCount: 0,
    findings: []
  },
  {
    id: "INS-2024-WCL-47",
    title: "Substation 33kV Main Transformer Protection Relay Check",
    mineId: "MINE-WCL-004",
    location: "Central Substation",
    inspector: "Vikramaditya Rao (Electrical Executive)",
    date: "2026-09-05",
    status: "Completed",
    severity: "Low",
    observationsCount: 1,
    findings: [
      "Secondary CT ratio check completed within permissible error band."
    ]
  },
  {
    id: "INS-2024-WCL-48",
    title: "Contractor Explosives Magazine & Blasting Crew Inspection",
    mineId: "MINE-WCL-004",
    location: "South Quarry Magazine",
    inspector: "Anil Sharma (Assistant Manager Mines)",
    date: "2026-09-04",
    status: "Overdue",
    severity: "High",
    observationsCount: 2,
    findings: [
      "License renewal certificate pending from PESO Nagpur office.",
      "Lightning conductor earth pit test record not signed for Q3."
    ],
    relatedActionId: "ACT-885"
  }
];

export const mockCorrectiveActions = [
  {
    id: "ACT-884",
    title: "Replace damaged intake duct seals in Pit 4 & calibrate dual optical methane detector",
    observationId: "OBS-884",
    inspectionId: "INS-2024-WCL-44",
    mineArea: "Pit 4, Underground Face 4B",
    assignedTo: "Rajesh Sonwane",
    assignedRole: "Ventilation Tech Lead",
    deadline: "2026-09-10",
    status: "Awaiting Verification", // Open, In Progress, Overdue, Awaiting Verification, Closed
    priority: "High",
    severity: "Critical",
    description: "Replace 3 sets of 800mm neoprene duct coupling seals between Ring 42 and 45. Re-zero dual methane detector SN-994 against certified 1.0% CH4 calibration gas cylinder. Verify face velocity >= 12.0 m³/s.",
    evidence: {
      type: "Photo & Test Certificate",
      uploadedAt: "2026-09-10 11:40 AM",
      submittedBy: "Rajesh Sonwane",
      documents: [
        { name: "Duct_Sealing_Pit4_Completed.jpg", size: "2.4 MB", type: "image" },
        { name: "Methane_Sensor_Calib_Certificate.pdf", size: "640 KB", type: "pdf" }
      ],
      fieldNotes: "Neoprene seals replaced and pressure tested to 1.8 kPa without leakage. Anemometer test confirmed 12.4 m³/s face airflow. Methane sensor calibrated: Zero error 0.00%, Span reading 0.99% on 1.00% standard gas. Ready for Manager verification."
    },
    verificationLog: null
  },
  {
    id: "ACT-881",
    title: "Replace worn haulage rope on Winch 3 & conduct NDT test",
    observationId: "OBS-881",
    inspectionId: "INS-2024-WCL-43",
    mineArea: "Winch 3 Haulage Drift",
    assignedTo: "Dinesh Kulkarni",
    assignedRole: "Mechanical Foreman",
    deadline: "2026-09-08",
    status: "Overdue",
    priority: "High",
    severity: "High",
    description: "Recap and inspect 26mm haulage wire rope after 6 months cyclic duty per CMR Reg 92.",
    evidence: null
  },
  {
    id: "ACT-882",
    title: "Recalibrate continuous dust monitoring sensor at Coal Washery exit",
    observationId: "OBS-882",
    inspectionId: "INS-2024-WCL-42",
    mineArea: "Coal Handling Plant / Washery",
    assignedTo: "Ramesh Tiwari",
    assignedRole: "Instrumentation Engineer",
    deadline: "2026-09-12",
    status: "In Progress",
    priority: "Medium",
    severity: "Medium",
    description: "Clean optical lenses and recalibrate PM10/PM2.5 scatter sensors.",
    evidence: null
  },
  {
    id: "ACT-883",
    title: "Clear drainage channel blockage and berm regrading along Haul Road Sector 2",
    observationId: "OBS-883",
    inspectionId: "INS-2024-WCL-41",
    mineArea: "Haul Road B",
    assignedTo: "Vijay Shinde",
    assignedRole: "Civil Foreman",
    deadline: "2026-09-15",
    status: "In Progress",
    priority: "Low",
    severity: "Low",
    description: "Excavate accumulated slurry from toe drains to prevent embankment softening.",
    evidence: null
  },
  {
    id: "ACT-885",
    title: "Obtain endorsed PESO Explosives Magazine renewal license & test earth pit",
    observationId: "OBS-885",
    inspectionId: "INS-2024-WCL-48",
    mineArea: "South Quarry Magazine",
    assignedTo: "Manoj Gaikwad",
    assignedRole: "Contractor Liaison Officer",
    deadline: "2026-09-07",
    status: "Overdue",
    priority: "High",
    severity: "High",
    description: "Submit renewed license copy from Controller of Explosives and test lightning conductor resistance (< 10 ohms).",
    evidence: null
  },
  {
    id: "ACT-886",
    title: "Conduct mandatory safety induction for 14 new L&T contractor dumper operators",
    observationId: "OBS-886",
    inspectionId: "INS-2024-WCL-40",
    mineArea: "Vocational Training Centre (VTC)",
    assignedTo: "Sunita Rao",
    assignedRole: "VTC Training Officer",
    deadline: "2026-09-11",
    status: "In Progress",
    priority: "Medium",
    severity: "Medium",
    description: "Complete 3-day surface mine safety module and simulator test for heavy vehicle drivers.",
    evidence: null
  },
  {
    id: "ACT-887",
    title: "Repair damaged earthing strip on 3.3kV Face Transformer #2",
    observationId: "OBS-887",
    inspectionId: "INS-2024-WCL-39",
    mineArea: "Underground District 2",
    assignedTo: "Harish Pillai",
    assignedRole: "Electrical Engineer",
    deadline: "2026-09-13",
    status: "Open",
    priority: "High",
    severity: "High",
    description: "Replace corroded copper earthing tape and verify neutral ground resistance.",
    evidence: null
  },
  {
    id: "ACT-888",
    title: "Submit quarterly effluent treatment plant (ETP) water test report to SPCB",
    observationId: "OBS-888",
    inspectionId: "INS-2024-WCL-38",
    mineArea: "Environmental Lab",
    assignedTo: "Dr. Anjali Joshi",
    assignedRole: "Environmental Officer",
    deadline: "2026-09-06",
    status: "Overdue",
    priority: "Medium",
    severity: "Medium",
    description: "Upload certified NABL test results for TSS, pH, and oil/grease levels to State Pollution Control Board portal.",
    evidence: null
  },
  {
    id: "ACT-889",
    title: "Install additional hydraulic support props at Pit 4 Tailgate junction",
    observationId: "OBS-889",
    inspectionId: "INS-2024-WCL-44",
    mineArea: "Pit 4 Junction",
    assignedTo: "Rajesh Sonwane",
    assignedRole: "Ventilation & Strata Lead",
    deadline: "2026-09-14",
    status: "Open",
    priority: "High",
    severity: "High",
    description: "Install 8 high-tonnage hydraulic props with tell-tale convergence indicators at the intersection.",
    evidence: null
  },
  {
    id: "ACT-890",
    title: "Service automatic deluge fire system at CHP-1 Transfer Tower",
    observationId: "OBS-890",
    inspectionId: "INS-2024-WCL-45",
    mineArea: "Coal Handling Plant (CHP-1)",
    assignedTo: "Dinesh Kulkarni",
    assignedRole: "Mechanical Foreman",
    deadline: "2026-09-16",
    status: "Open",
    priority: "High",
    severity: "High",
    description: "Flush deluge piping, clean spray nozzles, and verify pressure switch actuation.",
    evidence: null
  },
  {
    id: "ACT-891",
    title: "Replace retroreflective night hazard signage on North Haul Ramp",
    observationId: "OBS-891",
    inspectionId: "INS-2024-WCL-37",
    mineArea: "North Ramp",
    assignedTo: "Vijay Shinde",
    assignedRole: "Civil Foreman",
    deadline: "2026-09-18",
    status: "Open",
    priority: "Low",
    severity: "Low",
    description: "Install high-intensity prismatic warning signs for sharp curve and steep descent.",
    evidence: null
  },
  {
    id: "ACT-892",
    title: "Inspect and certify 24 portable CO & dry powder fire extinguishers across Central Workshop",
    observationId: "OBS-892",
    inspectionId: "INS-2024-WCL-36",
    mineArea: "Central Workshop",
    assignedTo: "Suresh K.",
    assignedRole: "Safety Inspector",
    deadline: "2026-09-19",
    status: "Open",
    priority: "Medium",
    severity: "Medium",
    description: "Hydraulic pressure testing of cylinders and replace expired CO cartridges.",
    evidence: null
  }
];

export const mockIncidents = [
  {
    id: "INC-2024-09",
    title: "Conveyor Belt #3 Idler Roller Overheating & Smoke Alarm Trigger",
    severity: "High",
    location: "Coal Handling Plant (CHP-1) Transfer Chute 2",
    timestamp: "2026-09-10 07:15 AM",
    status: "Under Investigation",
    reportedBy: "K. R. Rao (Shift A CHP Operator)",
    response: "Emergency pull-cord tripped conveyor. Shift A mechanical crew dispatched. Fire water mist activated. Roller bearing seizure identified; replaced within 45 minutes.",
    rootCause: "Accumulation of fine coal dust causing bearing friction heating without adequate grease seal lubrication.",
    correctiveActionId: "ACT-890",
    closureTarget: "2026-09-11"
  },
  {
    id: "INC-2024-07",
    title: "Haul Road Berm Slumping after 40mm Monsoon Rainfall",
    severity: "Medium",
    location: "South Haul Ramp Km 1.4",
    timestamp: "2026-09-08 02:30 PM",
    status: "Remediation Active",
    reportedBy: "M. P. Singh (Opencast Shift Supervisor)",
    response: "Ramp lane restricted to one-way traffic. Wheel dozer deployed to rebuild 1.8m earthen safety berm. Traffic flagmen stationed.",
    rootCause: "Blocked toe drain led to sub-base water saturation under repeated 100T dumper cycles.",
    correctiveActionId: "ACT-883",
    closureTarget: "2026-09-12"
  }
];

export const mockWorkforceData = {
  totalStrength: 840,
  presentToday: 806,
  attendancePct: 96,
  onLeave: 34,
  shifts: [
    { id: "S-A", name: "Shift A (Morning)", time: "06:00 - 14:00", active: true, supervisor: "A. K. Verma", present: 310, target: 320, coverage: "96.8%" },
    { id: "S-B", name: "Shift B (Afternoon)", time: "14:00 - 22:00", active: false, supervisor: "M. P. Singh", scheduled: 290, target: 300, coverage: "96.6%" },
    { id: "S-C", name: "Shift C (Night)", time: "22:00 - 06:00", active: false, supervisor: "R. C. Yadav", scheduled: 180, target: 190, coverage: "94.7%" },
    { id: "S-G", name: "General Shift", time: "09:00 - 17:30", active: true, supervisor: "Dr. Anjali Joshi", present: 56, target: 60, coverage: "93.3%" }
  ],
  departments: [
    { name: "Coal Extraction & Faces", count: 340, present: 328, complianceRate: "98%" },
    { name: "Safety & Mine Ventilation", count: 120, present: 118, complianceRate: "100%" },
    { name: "Heavy Earth Moving Machinery (HEMM)", count: 190, present: 182, complianceRate: "95%" },
    { name: "Coal Handling & Washery", count: 110, present: 104, complianceRate: "94%" },
    { name: "Survey, Geology & Civil", count: 80, present: 74, complianceRate: "96%" }
  ],
  skillCertifications: {
    gasTestingCertified: 84,
    firstClassManagers: 3,
    secondClassManagers: 8,
    overmenForemen: 42,
    miningSirdars: 68,
    firstAiders: 140
  }
};

export const mockContractors = [
  {
    id: "CONT-01",
    name: "L&T Heavy Mining Services",
    workScope: "Overburden Stripping & Haulage Operations",
    activePersonnel: 140,
    complianceScore: 92,
    riskLevel: "Low",
    aiRiskSummary: "High operational discipline; zero statutory safety violations in last 90 days. Minor maintenance log delay on Dumper #12.",
    permitsActive: 6,
    openActions: 1,
    leadContact: "S. K. Nambiar (Project Director)"
  },
  {
    id: "CONT-02",
    name: "Deccan Blasting & Drilling Ltd",
    workScope: "Deep-Hole Production Blasting & Explosives Handling",
    activePersonnel: 45,
    complianceScore: 74,
    riskLevel: "High",
    aiRiskSummary: "Magazine custodian license expiring in 5 days. Vibration sensor exceedance flagged on 2026-09-04 blast.",
    permitsActive: 2,
    openActions: 2,
    leadContact: "R. V. Deshmukh (Chief Blasting Engineer)"
  },
  {
    id: "CONT-03",
    name: "Shiva Earthmovers & Transport Co",
    workScope: "Coal Dispatch & Haulage to Washery",
    activePersonnel: 85,
    complianceScore: 84,
    riskLevel: "Medium",
    aiRiskSummary: "Near-miss proximity alert recorded on Haul Road B. Driver fatigue monitoring recommended for night shift.",
    permitsActive: 3,
    openActions: 1,
    leadContact: "Mahesh Agarwal (Operations Lead)"
  },
  {
    id: "CONT-04",
    name: "BEML Fleet Technical Services",
    workScope: "HEMM Maintenance & Shovel Overhaul",
    activePersonnel: 30,
    complianceScore: 96,
    riskLevel: "Low",
    aiRiskSummary: "Consistent compliance with DGMS mechanical testing protocols and OEM maintenance schedules.",
    permitsActive: 4,
    openActions: 0,
    leadContact: "K. G. Nair (Regional Service Manager)"
  }
];

export const mockGisMineZones = [
  {
    id: "ZONE-PIT-4",
    name: "Pit 4 (Underground Deep Seam III)",
    type: "Underground District",
    coordinates: { x: 310, y: 170 },
    riskScore: 88,
    riskLevel: "High",
    status: "Active Production (High Alert)",
    activeWorkers: 64,
    sensors: {
      methaneCH4: "0.82%",
      carbonMonoxideCO: "4.0 ppm",
      airVelocity: "8.2 m³/s",
      temperature: "29.4°C",
      humidity: "86%"
    },
    activeInspections: ["INS-2024-WCL-44"],
    openActions: ["ACT-884", "ACT-889"],
    hazards: ["Recurring ventilation duct leakage", "Elevated methane accumulation risk", "Tailgate strata convergence"]
  },
  {
    id: "ZONE-HAUL-B",
    name: "Haul Road B (South Ramp Gradient 1:16)",
    type: "Haulage Arterial",
    coordinates: { x: 260, y: 310 },
    riskScore: 58,
    riskLevel: "Medium",
    status: "Active Traffic (Caution Speed Zone)",
    activeWorkers: 28,
    sensors: {
      averageSpeed: "26.4 km/h",
      dustPM10: "142 µg/m³",
      surfaceVibration: "Normal"
    },
    activeInspections: ["INS-2024-WCL-46"],
    openActions: ["ACT-883", "ACT-886"],
    hazards: ["Heavy dumper speed exceedance", "Slurry accumulation in toe drain"]
  },
  {
    id: "ZONE-CHP-1",
    name: "Coal Handling Plant (CHP-1 & Chutes)",
    type: "Processing Infrastructure",
    coordinates: { x: 440, y: 280 },
    riskScore: 64,
    riskLevel: "Medium",
    status: "Active Sorting & Crushing",
    activeWorkers: 82,
    sensors: {
      dustPM10: "210 µg/m³",
      pyrometerBearingTemp: "72°C (Cooling from 88°C)",
      waterMistPressure: "4.2 bar"
    },
    activeInspections: ["INS-2024-WCL-45"],
    openActions: ["ACT-890", "ACT-882"],
    hazards: ["Idler roller dust friction", "Airborne coal dust dispersion"]
  },
  {
    id: "ZONE-DUMP-2",
    name: "Overburden Dump 2 (East Flank)",
    type: "Waste Embankment",
    coordinates: { x: 490, y: 140 },
    riskScore: 78,
    riskLevel: "High",
    status: "Dumping Restricted (Geotechnical Survey)",
    activeWorkers: 12,
    sensors: {
      inSarDisplacement: "4.8 mm / 72h",
      piezometerPorePressure: "142 kPa",
      slopeAngle: "36.5°"
    },
    activeInspections: ["INS-2024-WCL-46"],
    openActions: ["ACT-883"],
    hazards: ["Crest settlement after rainfall", "Toe pore water buildup"]
  },
  {
    id: "ZONE-BLAST-S",
    name: "South Quarry Blasting Area",
    type: "Opencast Extraction",
    coordinates: { x: 160, y: 390 },
    riskScore: 74,
    riskLevel: "High",
    status: "Shot-Firing Standby",
    activeWorkers: 34,
    sensors: {
      seismographPPV: "8.4 mm/s",
      noiseLevel: "94 dBA",
      flyrockBufferRadius: "500 m"
    },
    activeInspections: ["INS-2024-WCL-48"],
    openActions: ["ACT-885"],
    hazards: ["Statutory magazine permit expiry", "Excessive ground vibration on Face 2"]
  },
  {
    id: "ZONE-PIT-1-2",
    name: "Pit 1 & 2 Opencast Main Cut",
    type: "Opencast Pit",
    coordinates: { x: 190, y: 220 },
    riskScore: 42,
    riskLevel: "Low",
    status: "Normal Extraction Operations",
    activeWorkers: 142,
    sensors: {
      benchConvergence: "0.2 mm (Stable)",
      groundWaterInflow: "18 m³/h",
      airQualityIndex: "78 (Satisfactory)"
    },
    activeInspections: [],
    openActions: ["ACT-891"],
    hazards: ["Routine heavy equipment traffic"]
  }
];

export const mockApprovals = [
  {
    id: "APP-101",
    type: "Corrective Action Verification",
    title: "Closure Sign-off: Pit 4 Duct Sealing & Methane Sensor Calibration (ACT-884)",
    submittedBy: "Rajesh Sonwane (Ventilation Tech Lead)",
    timestamp: "2026-09-10 11:40 AM",
    priority: "Critical",
    status: "Pending",
    summary: "Neoprene seals replaced, face airflow restored to 12.4 m³/s, zero/span calibration verified. Photo evidence and calibration certificate attached."
  },
  {
    id: "APP-102",
    type: "Blasting Permit Authorization",
    title: "Deep-Hole Production Blast Authorization for South Quarry Cut 3B",
    submittedBy: "R. V. Deshmukh (Deccan Blasting)",
    timestamp: "2026-09-10 09:15 AM",
    priority: "High",
    status: "Pending",
    summary: "Requesting approval for 36-hole controlled blast using 1,800 kg emulsion explosive with NONEL initiation system. Buffer zone clearance confirmed."
  },
  {
    id: "APP-103",
    type: "Environmental Compliance Report",
    title: "SPCB Quarterly Effluent & Stormwater Discharge NABL Certificate",
    submittedBy: "Dr. Anjali Joshi (Environmental Officer)",
    timestamp: "2026-09-09 04:30 PM",
    priority: "Medium",
    status: "Pending",
    summary: "Formal quarterly return under Water (Prevention & Control of Pollution) Act 1974 for mine discharge water quality compliance."
  },
  {
    id: "APP-104",
    type: "Statutory Emergency Requisition",
    title: "Procurement of 500m High-Pressure Flexible Ducting for Pit 4",
    submittedBy: "D. K. Nair (Stores & Purchase Superintendent)",
    timestamp: "2026-09-09 02:15 PM",
    priority: "High",
    status: "Approved",
    summary: "Emergency spare allocation approved under DGMS ventilation contingency reserve."
  }
];

export const mockDocuments = [
  { id: "DOC-01", title: "Form B Statutory Register of Mine Employees", category: "Statutory Register", authority: "Mines Act 1952", lastUpdated: "2026-09-10", status: "Active / Digitized", compliance: "100%" },
  { id: "DOC-02", title: "Form C Daily Attendance & Shift Strength Log", category: "Statutory Register", authority: "Mines Rules 1955", lastUpdated: "2026-09-10 06:15 AM", status: "Active / Verified", compliance: "98%" },
  { id: "DOC-03", title: "Statutory Flame Safety Lamp & Gas Testing Log", category: "Safety Audit", authority: "DGMS CMR 2017 Reg 160", lastUpdated: "2026-09-10 07:00 AM", status: "Compliant", compliance: "100%" },
  { id: "DOC-04", title: "Mine Ventilation Survey & Mechanical Fan Airflow Log", category: "Engineering Survey", authority: "DGMS CMR 2017 Reg 153", lastUpdated: "2026-09-08", status: "At Risk (Pit 4 Review)", compliance: "82%" },
  { id: "DOC-05", title: "Winding Rope NDT Electromagnetic Test Certificate", category: "Machinery Certificate", authority: "DGMS CMR 2017 Reg 92", lastUpdated: "2026-03-08", status: "Overdue Recapping", compliance: "Overdue" },
  { id: "DOC-06", title: "State Pollution Control Board Consent to Operate (CTO)", category: "Environmental Permit", authority: "MPCB / SPCB", lastUpdated: "2026-01-10", status: "Valid (Expires Dec 2026)", compliance: "100%" },
  { id: "DOC-07", title: "PESO Explosives Magazine Storage License #EXP-NGP-441", category: "Explosives Permit", authority: "PESO Nagpur", lastUpdated: "2025-09-15", status: "Expiring in 5 Days", compliance: "Action Needed" }
];

export const mockAuditHistory = [
  { id: "AUD-01", time: "11:40 AM", date: "Today", actor: "Rajesh Sonwane", role: "Ventilation Tech Lead", action: "Submitted repair evidence & calibration test report for ACT-884 (Pit 4 Duct Sealing)", category: "Corrective Action" },
  { id: "AUD-02", time: "10:05 AM", date: "Today", actor: "Amit Sharma", role: "Mine Manager", action: "Assigned high-priority corrective action ACT-884 with 6-hour completion deadline", category: "Task Assignment" },
  { id: "AUD-03", time: "09:20 AM", date: "Today", actor: "Amit Sharma", role: "Mine Manager", action: "Completed formal review of DGMS Inspection Report INS-2024-WCL-44", category: "Inspection Review" },
  { id: "AUD-04", time: "08:15 AM", date: "Today", actor: "A. K. Verma", role: "Shift A Supervisor", action: "Conducted Shift A statutory safety toolbox talk for 310 frontline workers", category: "Shift Operations" },
  { id: "AUD-05", time: "07:15 AM", date: "Today", actor: "K. R. Rao", role: "CHP Operator", action: "Logged thermal pyrometer warning on Conveyor Belt #3 (Incident INC-2024-09)", category: "Incident Reporting" },
  { id: "AUD-06", time: "Yesterday 05:40 PM", date: "2026-09-09", actor: "Sunil Verma", role: "Safety Officer", action: "Conducted fire suppression nozzle flow rate test at CHP Transfer Tower", category: "Safety Audit" },
  { id: "AUD-07", time: "Yesterday 02:15 PM", date: "2026-09-09", actor: "Amit Sharma", role: "Mine Manager", action: "Approved statutory emergency requisition APP-104 for 500m auxiliary ventilation ducting", category: "Manager Approval" }
];
