export const employerWorkers = [
  { id: "SECL-W-10452", name: "Rajesh Kumar", role: "Mining Worker", dept: "Operations", mine: "Gevra Open Cast", shift: "General", status: "Active", attendance: "Present", joinDate: "2023-01-15", phone: "+91 9876543210" },
  { id: "SECL-W-10453", name: "Sunil Verma", role: "Heavy Machine Operator", dept: "Transport", mine: "Gevra Open Cast", shift: "Night", status: "Active", attendance: "Present", joinDate: "2022-05-10", phone: "+91 9876543211" },
  { id: "SECL-W-10454", name: "Amit Desai", role: "Drill Operator", dept: "Operations", mine: "Dipka Project", shift: "Morning", status: "Active", attendance: "Absent", joinDate: "2021-11-20", phone: "+91 9876543212" },
  { id: "SECL-W-10455", name: "Prakash Patel", role: "Maintenance Tech", dept: "Maintenance", mine: "Kusmunda Area", shift: "General", status: "Active", attendance: "Present", joinDate: "2020-03-05", phone: "+91 9876543213" },
  { id: "SECL-W-10456", name: "Suresh Patil", role: "Blaster", dept: "Operations", mine: "Gevra Open Cast", shift: "Morning", status: "Active", attendance: "Leave", joinDate: "2019-08-14", phone: "+91 9876543214" },
  { id: "SECL-W-10457", name: "Vikram Singh", role: "Electrician", dept: "Maintenance", mine: "Dipka Project", shift: "Night", status: "Active", attendance: "Present", joinDate: "2022-02-28", phone: "+91 9876543215" },
  { id: "SECL-W-10458", name: "Anil Sharma", role: "Surveyor", dept: "Planning", mine: "Kusmunda Area", shift: "General", status: "Active", attendance: "Present", joinDate: "2021-06-12", phone: "+91 9876543216" },
  { id: "SECL-W-10459", name: "Ramesh Yadav", role: "Pump Operator", dept: "Operations", mine: "Gevra Open Cast", shift: "Night", status: "Active", attendance: "Present", joinDate: "2023-04-01", phone: "+91 9876543217" },
  { id: "SECL-W-10460", name: "Kishore Kumar", role: "Belt Conveyor Operator", dept: "Transport", mine: "Dipka Project", shift: "Morning", status: "Active", attendance: "Half Day", joinDate: "2020-12-10", phone: "+91 9876543218" },
  { id: "SECL-W-10461", name: "Manoj Tiwari", role: "Safety Assistant", dept: "Safety", mine: "Gevra Open Cast", shift: "General", status: "Active", attendance: "Present", joinDate: "2021-09-05", phone: "+91 9876543219" }
];

export const employerAttendance = [
  { id: 1, date: "2026-09-10", present: 940, absent: 45, leave: 30, halfDay: 15, total: 1030 },
  { id: 2, date: "2026-09-09", present: 955, absent: 35, leave: 28, halfDay: 12, total: 1030 },
  { id: 3, date: "2026-09-08", present: 930, absent: 50, leave: 35, halfDay: 15, total: 1030 },
  { id: 4, date: "2026-09-07", present: 960, absent: 30, leave: 30, halfDay: 10, total: 1030 },
  { id: 5, date: "2026-09-06", present: 950, absent: 40, leave: 25, halfDay: 15, total: 1030 }
];

export const employerTasks = [
  { id: "TSK-001", title: "Inspect Section 4 Roof", assignee: "Rajesh Kumar", priority: "High", due: "2026-09-10", status: "Pending" },
  { id: "TSK-002", title: "Replace Pump Valve", assignee: "Prakash Patel", priority: "Medium", due: "2026-09-11", status: "In Progress" },
  { id: "TSK-003", title: "Monthly Safety Audit prep", assignee: "Manoj Tiwari", priority: "High", due: "2026-09-12", status: "Pending" },
  { id: "TSK-004", title: "Clear rubble at Bay 2", assignee: "Amit Desai", priority: "Low", due: "2026-09-09", status: "Completed" },
  { id: "TSK-005", title: "Calibrate Gas Sensors", assignee: "Vikram Singh", priority: "Critical", due: "2026-09-08", status: "Overdue" }
];

export const employerTraining = [
  { id: 1, course: "Mine Safety Induction", completed: 1015, pending: 15, deadline: "2026-10-01" },
  { id: 2, course: "PPE Usage Refresher", completed: 850, pending: 180, deadline: "2026-09-30" },
  { id: 3, course: "Emergency Evacuation", completed: 920, pending: 110, deadline: "2026-09-15" },
  { id: 4, course: "First Aid Basics", completed: 450, pending: 580, deadline: "2026-11-01" },
  { id: 5, course: "Heavy Machinery Ops", completed: 200, pending: 5, deadline: "2026-09-20" }
];

export const employerAlerts = [
  { id: "ALT-101", severity: "HIGH", location: "Gevra - Section B", time: "2026-09-10 09:30", desc: "Unsafe roof condition reported. Evacuation required.", read: false },
  { id: "ALT-102", severity: "MEDIUM", location: "Dipka - Sector 4", time: "2026-09-09 14:15", desc: "Heavy vehicle movement detected near pedestrian zone.", read: true },
  { id: "ALT-103", severity: "LOW", location: "Kusmunda - Pit 1", time: "2026-09-08 16:00", desc: "Scheduled blasting at 4:00 PM tomorrow.", read: true },
  { id: "ALT-104", severity: "HIGH", location: "Gevra - Section A", time: "2026-09-07 11:20", desc: "Gas levels nearing safety threshold.", read: true }
];

export const employerReports = [
  { id: "RPT-001", type: "Incident", date: "2026-09-09", location: "Gevra Section C", desc: "Minor slip and fall near wash area", status: "Under Review", reportedBy: "Rajesh Kumar" },
  { id: "RPT-002", type: "Hazard", date: "2026-09-08", location: "Dipka Main Road", desc: "Potholes causing water logging", status: "Resolved", reportedBy: "Sunil Verma" },
  { id: "RPT-003", type: "Hazard", date: "2026-09-10", location: "Kusmunda Pit", desc: "Exposed electrical wiring near pump", status: "Submitted", reportedBy: "Vikram Singh" },
  { id: "RPT-004", type: "Incident", date: "2026-09-05", location: "Gevra Workshop", desc: "Tool dropped from height, no injury", status: "Investigation", reportedBy: "Prakash Patel" }
];

export const employerGrievances = [
  { id: "GRV-001", subject: "Delayed Overtime Payment", date: "2026-09-05", status: "Under Review", worker: "Amit Desai" },
  { id: "GRV-002", subject: "Poor Quality Safety Boots", date: "2026-09-01", status: "In Progress", worker: "Suresh Patil" },
  { id: "GRV-003", subject: "Canteen Food Quality", date: "2026-08-28", status: "Resolved", worker: "Rajesh Kumar" },
  { id: "GRV-004", subject: "Shift Allocation Issue", date: "2026-09-09", status: "Submitted", worker: "Anil Sharma" }
];

export const employerDocuments = [
  { id: "DOC-001", worker: "Rajesh Kumar", type: "Medical Fitness Certificate", issueDate: "2026-01-10", expiryDate: "2027-01-10", status: "Valid" },
  { id: "DOC-002", worker: "Sunil Verma", type: "Heavy Vehicle License", issueDate: "2023-05-15", expiryDate: "2026-10-15", status: "Expiring Soon" },
  { id: "DOC-003", worker: "Amit Desai", type: "Drill Operation Skill Cert", issueDate: "2024-02-20", expiryDate: "2029-02-20", status: "Valid" },
  { id: "DOC-004", worker: "Prakash Patel", type: "Vocational Training Cert", issueDate: "2020-03-10", expiryDate: "2025-03-10", status: "Valid" },
  { id: "DOC-005", worker: "Suresh Patil", type: "Blaster Certificate", issueDate: "2019-09-01", expiryDate: "2024-09-01", status: "Expired" }
];

export const employerNotifications = [
  { id: 1, text: "Safety Alert: Heavy rain forecast for Dipka project. Secure loose equipment.", time: "2 hours ago", unread: true },
  { id: 2, text: "Grievance GRV-001 has been escalated to HR.", time: "5 hours ago", unread: true },
  { id: 3, text: "Task TSK-004 completed by Amit Desai.", time: "1 day ago", unread: false },
  { id: 4, text: "15 workers have pending Mine Safety Induction.", time: "2 days ago", unread: false }
];

export const employerShifts = [
  { id: 1, name: "Morning Shift", time: "06:00 AM - 02:00 PM", workerCount: 345, supervisor: "R. K. Singh" },
  { id: 2, name: "General Shift", time: "09:00 AM - 05:00 PM", workerCount: 410, supervisor: "M. L. Verma" },
  { id: 3, name: "Evening Shift", time: "02:00 PM - 10:00 PM", workerCount: 310, supervisor: "A. K. Sharma" },
  { id: 4, name: "Night Shift", time: "10:00 PM - 06:00 AM", workerCount: 183, supervisor: "P. N. Tiwari" }
];
