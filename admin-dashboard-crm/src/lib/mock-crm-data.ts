export type StatusTone = "active" | "warm" | "cool" | "closed" | "risk";

export type Contact = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "Customer" | "Qualified" | "Prospect" | "At Risk";
  owner: string;
  region: string;
  lastContact: string;
  value: number;
  notes: string;
};

export type DealStage = "Lead" | "Qualified" | "Proposal" | "Closed";

export type Deal = {
  id: string;
  title: string;
  company: string;
  contact: string;
  stage: DealStage;
  value: number;
  probability: number;
  owner: string;
  updatedAt: string;
  source: "Inbound" | "Referral" | "Outbound" | "Partner";
};

export type ActivityItem = {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  tone: StatusTone;
};

export type DashboardStat = {
  label: string;
  value: string;
  delta: string;
  tone: StatusTone;
};

export type RevenuePoint = {
  month: string;
  revenue: number;
  pipeline: number;
};

export type ReportSource = {
  name: "Inbound" | "Referral" | "Outbound" | "Partner";
  value: number;
};

export type TeamUser = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Sales" | "Support";
  status: "Active" | "Pending" | "Suspended";
  lastSeen: string;
};

export type AuditEntry = {
  id: string;
  timestamp: string;
  user: string;
  actionType: "User" | "Deal" | "Contact" | "Settings";
  action: string;
};

export const dashboardStats: DashboardStat[] = [
  { label: "Revenue", value: "$1.48M", delta: "+18.2%", tone: "active" },
  { label: "Active Users", value: "12,840", delta: "+6.4%", tone: "warm" },
  { label: "Deals", value: "184", delta: "+11 new", tone: "cool" },
  { label: "Conversion Rate", value: "24.8%", delta: "+2.1 pts", tone: "closed" },
];

export const revenueSeries: RevenuePoint[] = [
  { month: "Jan", revenue: 128000, pipeline: 172000 },
  { month: "Feb", revenue: 142000, pipeline: 186000 },
  { month: "Mar", revenue: 156000, pipeline: 210000 },
  { month: "Apr", revenue: 149000, pipeline: 202000 },
  { month: "May", revenue: 173000, pipeline: 228000 },
  { month: "Jun", revenue: 188000, pipeline: 246000 },
  { month: "Jul", revenue: 202000, pipeline: 264000 },
  { month: "Aug", revenue: 214000, pipeline: 278000 },
  { month: "Sep", revenue: 226000, pipeline: 291000 },
  { month: "Oct", revenue: 239000, pipeline: 308000 },
  { month: "Nov", revenue: 251000, pipeline: 324000 },
  { month: "Dec", revenue: 268000, pipeline: 341000 },
];

export const reportRevenueSeries = revenueSeries.map((point) => ({
  month: point.month,
  revenue: Math.round(point.revenue / 1000),
}));

export const reportSources: ReportSource[] = [
  { name: "Inbound", value: 38 },
  { name: "Referral", value: 24 },
  { name: "Outbound", value: 21 },
  { name: "Partner", value: 17 },
];

export const activities: ActivityItem[] = [
  { id: "a1", user: "Maya Chen", action: "closed proposal", target: "Northstar Bank", time: "8m ago", tone: "closed" },
  { id: "a2", user: "Andre Silva", action: "updated forecast", target: "Q2 pipeline", time: "23m ago", tone: "cool" },
  { id: "a3", user: "Noah Patel", action: "added contact", target: "Sienna Medical", time: "41m ago", tone: "active" },
  { id: "a4", user: "Leah Brooks", action: "assigned lead", target: "Atlas Freight", time: "1h ago", tone: "warm" },
  { id: "a5", user: "Ops Bot", action: "flagged churn risk", target: "Vertex Retail", time: "2h ago", tone: "risk" },
  { id: "a6", user: "Maya Chen", action: "sent renewal deck", target: "Harbor Cloud", time: "3h ago", tone: "closed" },
];

export const contacts: Contact[] = [
  { id: "c1", name: "Olivia Harper", company: "Northstar Bank", email: "olivia.harper@northstarbank.com", phone: "(555) 981-1022", status: "Customer", owner: "Maya Chen", region: "North America", lastContact: "2026-03-20", value: 124000, notes: "Expansion motion for fraud analytics seats in Q2." },
  { id: "c2", name: "Liam Carter", company: "Atlas Freight", email: "liam.carter@atlasfreight.io", phone: "(555) 314-8821", status: "Qualified", owner: "Andre Silva", region: "North America", lastContact: "2026-03-19", value: 88000, notes: "Needs API security review before proposal sign-off." },
  { id: "c3", name: "Amelia Stone", company: "Sienna Medical", email: "amelia.stone@siennamedical.com", phone: "(555) 421-1150", status: "Prospect", owner: "Leah Brooks", region: "EMEA", lastContact: "2026-03-18", value: 54000, notes: "High product fit, budget opens next month." },
  { id: "c4", name: "James Walker", company: "Harbor Cloud", email: "j.walker@harborcloud.dev", phone: "(555) 238-7714", status: "Customer", owner: "Maya Chen", region: "North America", lastContact: "2026-03-17", value: 162000, notes: "Renewal and add-on modules under review by procurement." },
  { id: "c5", name: "Sophia Reed", company: "Vertex Retail", email: "sophia.reed@vertexretail.co", phone: "(555) 740-0062", status: "At Risk", owner: "Noah Patel", region: "APAC", lastContact: "2026-03-16", value: 97000, notes: "Escalated due to low weekly active seats and delayed QBR." },
  { id: "c6", name: "Benjamin Hall", company: "Cinder Energy", email: "b.hall@cinderenergy.com", phone: "(555) 813-2511", status: "Qualified", owner: "Andre Silva", region: "North America", lastContact: "2026-03-15", value: 111000, notes: "Legal approved data residency terms." },
  { id: "c7", name: "Mia Foster", company: "Pinnacle Legal", email: "mia.foster@pinnaclelegal.com", phone: "(555) 563-7880", status: "Prospect", owner: "Leah Brooks", region: "EMEA", lastContact: "2026-03-15", value: 46000, notes: "Security questionnaire completed." },
  { id: "c8", name: "Lucas Bennett", company: "Arcbyte Systems", email: "lucas.bennett@arcbyte.ai", phone: "(555) 102-6629", status: "Qualified", owner: "Maya Chen", region: "North America", lastContact: "2026-03-14", value: 73000, notes: "Decision committee meets next Thursday." },
  { id: "c9", name: "Charlotte Price", company: "Solace Health", email: "charlotte.price@solacehealth.com", phone: "(555) 937-4418", status: "Customer", owner: "Noah Patel", region: "North America", lastContact: "2026-03-13", value: 145000, notes: "Promoter account, candidate for case study." },
  { id: "c10", name: "Henry Perry", company: "Bluepeak Telecom", email: "henry.perry@bluepeak.net", phone: "(555) 882-3971", status: "Prospect", owner: "Andre Silva", region: "APAC", lastContact: "2026-03-12", value: 52000, notes: "Re-engaged through partner channel." },
  { id: "c11", name: "Evelyn Hughes", company: "Monarch Capital", email: "evelyn.hughes@monarchcap.com", phone: "(555) 244-6659", status: "Qualified", owner: "Maya Chen", region: "North America", lastContact: "2026-03-11", value: 136000, notes: "Procurement requests annual billing incentive." },
  { id: "c12", name: "Daniel Ward", company: "Kepler Manufacturing", email: "daniel.ward@keplermfg.com", phone: "(555) 706-1198", status: "Customer", owner: "Leah Brooks", region: "EMEA", lastContact: "2026-03-11", value: 91000, notes: "Preparing plant-level rollout plan." },
  { id: "c13", name: "Ava Diaz", company: "Nimbus Logistics", email: "ava.diaz@nimbuslogistics.com", phone: "(555) 332-0081", status: "Prospect", owner: "Andre Silva", region: "North America", lastContact: "2026-03-10", value: 43000, notes: "Inbound lead from webinar campaign." },
  { id: "c14", name: "Michael Ross", company: "Quartz Bio", email: "michael.ross@quartzbio.io", phone: "(555) 699-7742", status: "Qualified", owner: "Noah Patel", region: "EMEA", lastContact: "2026-03-09", value: 69000, notes: "Needs sandbox extension for technical validation." },
  { id: "c15", name: "Harper Long", company: "Beacon Insurance", email: "harper.long@beaconins.com", phone: "(555) 921-5521", status: "Customer", owner: "Maya Chen", region: "North America", lastContact: "2026-03-08", value: 156000, notes: "Upsell opportunity in claims ops team." },
  { id: "c16", name: "Elijah Scott", company: "Foundry Works", email: "elijah.scott@foundryworks.com", phone: "(555) 113-9914", status: "At Risk", owner: "Leah Brooks", region: "APAC", lastContact: "2026-03-08", value: 61000, notes: "Open support escalations impacting renewal confidence." },
  { id: "c17", name: "Ella Barnes", company: "Meridian Foods", email: "ella.barnes@meridianfoods.com", phone: "(555) 648-4503", status: "Qualified", owner: "Andre Silva", region: "North America", lastContact: "2026-03-07", value: 78000, notes: "Champion requested rollout timeline and SLA." },
  { id: "c18", name: "Logan Powell", company: "Strata Ventures", email: "logan.powell@stratavc.com", phone: "(555) 867-5592", status: "Prospect", owner: "Maya Chen", region: "North America", lastContact: "2026-03-06", value: 58000, notes: "Strong executive interest after investor portfolio demo." },
  { id: "c19", name: "Grace Kelly", company: "Apex Mobility", email: "grace.kelly@apexmobility.com", phone: "(555) 219-3307", status: "Customer", owner: "Noah Patel", region: "EMEA", lastContact: "2026-03-05", value: 132000, notes: "Cross-sell into regional support team planned for May." },
  { id: "c20", name: "Jack Morris", company: "Delta Hospitality", email: "jack.morris@deltahospitality.com", phone: "(555) 775-2034", status: "Qualified", owner: "Leah Brooks", region: "APAC", lastContact: "2026-03-04", value: 84000, notes: "Proposal pending finance review." },
];

export const deals: Deal[] = [
  { id: "d1", title: "Fraud Analytics Expansion", company: "Northstar Bank", contact: "Olivia Harper", stage: "Closed", value: 124000, probability: 100, owner: "Maya Chen", updatedAt: "2026-03-20", source: "Referral" },
  { id: "d2", title: "Fleet Visibility Rollout", company: "Atlas Freight", contact: "Liam Carter", stage: "Proposal", value: 88000, probability: 72, owner: "Andre Silva", updatedAt: "2026-03-19", source: "Outbound" },
  { id: "d3", title: "Clinical Ops Workspace", company: "Sienna Medical", contact: "Amelia Stone", stage: "Qualified", value: 54000, probability: 46, owner: "Leah Brooks", updatedAt: "2026-03-18", source: "Inbound" },
  { id: "d4", title: "Renewal + AI Scoring", company: "Harbor Cloud", contact: "James Walker", stage: "Proposal", value: 162000, probability: 81, owner: "Maya Chen", updatedAt: "2026-03-17", source: "Referral" },
  { id: "d5", title: "Churn Recovery Plan", company: "Vertex Retail", contact: "Sophia Reed", stage: "Lead", value: 97000, probability: 24, owner: "Noah Patel", updatedAt: "2026-03-16", source: "Partner" },
  { id: "d6", title: "Grid Security Modernization", company: "Cinder Energy", contact: "Benjamin Hall", stage: "Qualified", value: 111000, probability: 54, owner: "Andre Silva", updatedAt: "2026-03-15", source: "Inbound" },
  { id: "d7", title: "Matter Intake Automation", company: "Pinnacle Legal", contact: "Mia Foster", stage: "Lead", value: 46000, probability: 21, owner: "Leah Brooks", updatedAt: "2026-03-15", source: "Outbound" },
  { id: "d8", title: "SOC Workflow Deployment", company: "Arcbyte Systems", contact: "Lucas Bennett", stage: "Qualified", value: 73000, probability: 58, owner: "Maya Chen", updatedAt: "2026-03-14", source: "Inbound" },
  { id: "d9", title: "Enterprise Care Upgrade", company: "Solace Health", contact: "Charlotte Price", stage: "Closed", value: 145000, probability: 100, owner: "Noah Patel", updatedAt: "2026-03-13", source: "Referral" },
  { id: "d10", title: "Carrier Command Center", company: "Bluepeak Telecom", contact: "Henry Perry", stage: "Lead", value: 52000, probability: 18, owner: "Andre Silva", updatedAt: "2026-03-12", source: "Partner" },
  { id: "d11", title: "Portfolio Risk Engine", company: "Monarch Capital", contact: "Evelyn Hughes", stage: "Proposal", value: 136000, probability: 77, owner: "Maya Chen", updatedAt: "2026-03-11", source: "Inbound" },
  { id: "d12", title: "Plant Intelligence Hub", company: "Kepler Manufacturing", contact: "Daniel Ward", stage: "Closed", value: 91000, probability: 100, owner: "Leah Brooks", updatedAt: "2026-03-11", source: "Outbound" },
  { id: "d13", title: "Demand Forecast Console", company: "Nimbus Logistics", contact: "Ava Diaz", stage: "Lead", value: 43000, probability: 29, owner: "Andre Silva", updatedAt: "2026-03-10", source: "Inbound" },
  { id: "d14", title: "Lab Workflow AI", company: "Quartz Bio", contact: "Michael Ross", stage: "Qualified", value: 69000, probability: 49, owner: "Noah Patel", updatedAt: "2026-03-09", source: "Partner" },
  { id: "d15", title: "Claims Ops Expansion", company: "Beacon Insurance", contact: "Harper Long", stage: "Proposal", value: 156000, probability: 84, owner: "Maya Chen", updatedAt: "2026-03-08", source: "Referral" },
];

export const teamUsers: TeamUser[] = [
  { id: "u1", name: "Maya Chen", email: "maya@k2digitalmedia.com", role: "Admin", status: "Active", lastSeen: "2m ago" },
  { id: "u2", name: "Andre Silva", email: "andre@k2digitalmedia.com", role: "Manager", status: "Active", lastSeen: "14m ago" },
  { id: "u3", name: "Leah Brooks", email: "leah@k2digitalmedia.com", role: "Sales", status: "Active", lastSeen: "32m ago" },
  { id: "u4", name: "Noah Patel", email: "noah@k2digitalmedia.com", role: "Sales", status: "Pending", lastSeen: "Yesterday" },
  { id: "u5", name: "Iris Gomez", email: "iris@k2digitalmedia.com", role: "Support", status: "Suspended", lastSeen: "4d ago" },
];

export const auditEntries: AuditEntry[] = [
  { id: "l1", timestamp: "2026-03-21 09:44", user: "Maya Chen", actionType: "Deal", action: "Marked Fraud Analytics Expansion as won" },
  { id: "l2", timestamp: "2026-03-21 09:18", user: "Andre Silva", actionType: "Contact", action: "Updated Atlas Freight contact status to Qualified" },
  { id: "l3", timestamp: "2026-03-21 08:55", user: "System", actionType: "Settings", action: "Notification digest schedule changed to daily" },
  { id: "l4", timestamp: "2026-03-21 08:11", user: "Leah Brooks", actionType: "User", action: "Invited noah@k2digitalmedia.com to workspace" },
  { id: "l5", timestamp: "2026-03-20 17:47", user: "Noah Patel", actionType: "Deal", action: "Moved Lab Workflow AI from Lead to Qualified" },
  { id: "l6", timestamp: "2026-03-20 16:22", user: "Maya Chen", actionType: "Settings", action: "Updated company headquarters address" },
  { id: "l7", timestamp: "2026-03-20 15:59", user: "Andre Silva", actionType: "Contact", action: "Added Meridian Foods as a new prospect" },
  { id: "l8", timestamp: "2026-03-20 14:04", user: "System", actionType: "User", action: "Revoked Iris Gomez access after role suspension" },
];
