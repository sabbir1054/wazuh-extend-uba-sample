export type AlertSeverity = "critical" | "high" | "medium" | "low";

export interface UserLog {
  id: string;
  timestamp: string;
  userId: string;
  username: string;
  action: string;
  sourceIP: string;
  location: string;
  device: string;
  status: "success" | "failure" | "blocked";
  riskScore: number;
  details: string;
}

export interface Alert {
  id: string;
  timestamp: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  userId: string;
  username: string;
  status: "open" | "investigating" | "resolved";
  riskScore: number;
}

export interface UserProfile {
  userId: string;
  username: string;
  email: string;
  department: string;
  riskScore: number;
  totalEvents: number;
  failedLogins: number;
  lastActive: string;
  status: "normal" | "watchlist" | "suspended";
}

export interface TimelineData {
  time: string;
  events: number;
  alerts: number;
  anomalies: number;
}

export const userLogs: UserLog[] = [
  {
    id: "LOG-001",
    timestamp: "2026-03-16T08:23:14Z",
    userId: "USR-1001",
    username: "john.carter",
    action: "Login",
    sourceIP: "192.168.1.45",
    location: "New York, US",
    device: "Windows 11 - Chrome",
    status: "success",
    riskScore: 12,
    details: "Standard login from known device",
  },
  {
    id: "LOG-002",
    timestamp: "2026-03-16T08:25:42Z",
    userId: "USR-1002",
    username: "sarah.mitchell",
    action: "File Access",
    sourceIP: "10.0.0.88",
    location: "London, UK",
    device: "macOS - Safari",
    status: "success",
    riskScore: 8,
    details: "Accessed /finance/quarterly-report.xlsx",
  },
  {
    id: "LOG-003",
    timestamp: "2026-03-16T08:31:05Z",
    userId: "USR-1003",
    username: "mike.ross",
    action: "Login",
    sourceIP: "203.45.67.89",
    location: "Moscow, RU",
    device: "Linux - Firefox",
    status: "failure",
    riskScore: 78,
    details: "Login attempt from unusual geolocation - 6 failed attempts",
  },
  {
    id: "LOG-004",
    timestamp: "2026-03-16T08:35:18Z",
    userId: "USR-1004",
    username: "emily.zhang",
    action: "Privilege Escalation",
    sourceIP: "172.16.0.22",
    location: "San Francisco, US",
    device: "Windows 10 - Edge",
    status: "blocked",
    riskScore: 92,
    details: "Attempted admin access without authorization",
  },
  {
    id: "LOG-005",
    timestamp: "2026-03-16T08:42:33Z",
    userId: "USR-1001",
    username: "john.carter",
    action: "File Download",
    sourceIP: "192.168.1.45",
    location: "New York, US",
    device: "Windows 11 - Chrome",
    status: "success",
    riskScore: 25,
    details: "Bulk download of 47 files from /shared/projects",
  },
  {
    id: "LOG-006",
    timestamp: "2026-03-16T08:48:51Z",
    userId: "USR-1005",
    username: "alex.kumar",
    action: "Login",
    sourceIP: "10.0.0.55",
    location: "Mumbai, IN",
    device: "Android - Chrome Mobile",
    status: "success",
    riskScore: 15,
    details: "VPN login from registered mobile device",
  },
  {
    id: "LOG-007",
    timestamp: "2026-03-16T09:02:14Z",
    userId: "USR-1003",
    username: "mike.ross",
    action: "Login",
    sourceIP: "203.45.67.89",
    location: "Moscow, RU",
    device: "Linux - Firefox",
    status: "failure",
    riskScore: 85,
    details: "Continued brute force attempt - 12 failed attempts total",
  },
  {
    id: "LOG-008",
    timestamp: "2026-03-16T09:15:27Z",
    userId: "USR-1006",
    username: "rachel.green",
    action: "Data Export",
    sourceIP: "192.168.2.100",
    location: "Chicago, US",
    device: "macOS - Chrome",
    status: "success",
    riskScore: 65,
    details: "Exported 2.3GB from customer database outside business hours",
  },
  {
    id: "LOG-009",
    timestamp: "2026-03-16T09:22:45Z",
    userId: "USR-1004",
    username: "emily.zhang",
    action: "Account Modification",
    sourceIP: "172.16.0.22",
    location: "San Francisco, US",
    device: "Windows 10 - Edge",
    status: "blocked",
    riskScore: 88,
    details: "Attempted to modify service account permissions",
  },
  {
    id: "LOG-010",
    timestamp: "2026-03-16T09:30:00Z",
    userId: "USR-1007",
    username: "david.wilson",
    action: "Login",
    sourceIP: "10.0.1.15",
    location: "Austin, US",
    device: "Windows 11 - Chrome",
    status: "success",
    riskScore: 5,
    details: "Routine morning login from office network",
  },
  {
    id: "LOG-011",
    timestamp: "2026-03-16T09:45:12Z",
    userId: "USR-1002",
    username: "sarah.mitchell",
    action: "Login",
    sourceIP: "85.120.33.44",
    location: "Bucharest, RO",
    device: "Windows 10 - Chrome",
    status: "success",
    riskScore: 72,
    details: "Login from new location - impossible travel detected (London to Bucharest in 80 min)",
  },
  {
    id: "LOG-012",
    timestamp: "2026-03-16T10:05:38Z",
    userId: "USR-1008",
    username: "lisa.chen",
    action: "File Access",
    sourceIP: "192.168.1.78",
    location: "Seattle, US",
    device: "macOS - Safari",
    status: "success",
    riskScore: 10,
    details: "Accessed /engineering/codebase documentation",
  },
  {
    id: "LOG-013",
    timestamp: "2026-03-16T10:18:55Z",
    userId: "USR-1006",
    username: "rachel.green",
    action: "USB Device",
    sourceIP: "192.168.2.100",
    location: "Chicago, US",
    device: "macOS - Chrome",
    status: "blocked",
    riskScore: 80,
    details: "Attempted to copy data to unauthorized USB device",
  },
  {
    id: "LOG-014",
    timestamp: "2026-03-16T10:32:20Z",
    userId: "USR-1005",
    username: "alex.kumar",
    action: "API Access",
    sourceIP: "10.0.0.55",
    location: "Mumbai, IN",
    device: "Postman Client",
    status: "success",
    riskScore: 45,
    details: "500+ API calls in 10 minutes - unusual rate pattern",
  },
  {
    id: "LOG-015",
    timestamp: "2026-03-16T10:48:10Z",
    userId: "USR-1009",
    username: "tom.bradley",
    action: "Login",
    sourceIP: "192.168.3.20",
    location: "Boston, US",
    device: "Windows 11 - Firefox",
    status: "success",
    riskScore: 8,
    details: "Standard login from corporate network",
  },
];

export const alerts: Alert[] = [
  {
    id: "ALR-001",
    timestamp: "2026-03-16T08:31:05Z",
    severity: "high",
    title: "Brute Force Attack Detected",
    description:
      "Multiple failed login attempts from foreign IP for user mike.ross. 12 attempts from Moscow, RU.",
    userId: "USR-1003",
    username: "mike.ross",
    status: "investigating",
    riskScore: 85,
  },
  {
    id: "ALR-002",
    timestamp: "2026-03-16T08:35:18Z",
    severity: "critical",
    title: "Unauthorized Privilege Escalation",
    description:
      "User emily.zhang attempted to escalate to admin privileges without proper authorization. Account flagged.",
    userId: "USR-1004",
    username: "emily.zhang",
    status: "open",
    riskScore: 92,
  },
  {
    id: "ALR-003",
    timestamp: "2026-03-16T09:15:27Z",
    severity: "high",
    title: "Anomalous Data Exfiltration",
    description:
      "User rachel.green exported 2.3GB from customer database during off-hours. Unusual data volume for this role.",
    userId: "USR-1006",
    username: "rachel.green",
    status: "open",
    riskScore: 80,
  },
  {
    id: "ALR-004",
    timestamp: "2026-03-16T09:45:12Z",
    severity: "critical",
    title: "Impossible Travel Detected",
    description:
      "User sarah.mitchell logged in from Bucharest, RO — 80 minutes after a London, UK session. Possible credential compromise.",
    userId: "USR-1002",
    username: "sarah.mitchell",
    status: "investigating",
    riskScore: 72,
  },
  {
    id: "ALR-005",
    timestamp: "2026-03-16T10:18:55Z",
    severity: "medium",
    title: "Unauthorized USB Device",
    description:
      "User rachel.green attempted to connect an unauthorized USB storage device. Action was blocked by endpoint policy.",
    userId: "USR-1006",
    username: "rachel.green",
    status: "resolved",
    riskScore: 65,
  },
  {
    id: "ALR-006",
    timestamp: "2026-03-16T10:32:20Z",
    severity: "medium",
    title: "Unusual API Activity",
    description:
      "User alex.kumar made 500+ API calls in 10 minutes, significantly above baseline of 20 calls/10min.",
    userId: "USR-1005",
    username: "alex.kumar",
    status: "open",
    riskScore: 45,
  },
  {
    id: "ALR-007",
    timestamp: "2026-03-16T08:42:33Z",
    severity: "low",
    title: "Bulk File Download",
    description:
      "User john.carter downloaded 47 files from shared projects directory. Verify if authorized.",
    userId: "USR-1001",
    username: "john.carter",
    status: "resolved",
    riskScore: 25,
  },
];

export const userProfiles: UserProfile[] = [
  {
    userId: "USR-1001",
    username: "john.carter",
    email: "john.carter@corp.com",
    department: "Engineering",
    riskScore: 25,
    totalEvents: 145,
    failedLogins: 0,
    lastActive: "2026-03-16T08:42:33Z",
    status: "normal",
  },
  {
    userId: "USR-1002",
    username: "sarah.mitchell",
    email: "sarah.mitchell@corp.com",
    department: "Finance",
    riskScore: 72,
    totalEvents: 89,
    failedLogins: 0,
    lastActive: "2026-03-16T09:45:12Z",
    status: "watchlist",
  },
  {
    userId: "USR-1003",
    username: "mike.ross",
    email: "mike.ross@corp.com",
    department: "Legal",
    riskScore: 85,
    totalEvents: 34,
    failedLogins: 12,
    lastActive: "2026-03-16T09:02:14Z",
    status: "suspended",
  },
  {
    userId: "USR-1004",
    username: "emily.zhang",
    email: "emily.zhang@corp.com",
    department: "Operations",
    riskScore: 92,
    totalEvents: 67,
    failedLogins: 2,
    lastActive: "2026-03-16T09:22:45Z",
    status: "suspended",
  },
  {
    userId: "USR-1005",
    username: "alex.kumar",
    email: "alex.kumar@corp.com",
    department: "Engineering",
    riskScore: 45,
    totalEvents: 312,
    failedLogins: 1,
    lastActive: "2026-03-16T10:32:20Z",
    status: "watchlist",
  },
  {
    userId: "USR-1006",
    username: "rachel.green",
    email: "rachel.green@corp.com",
    department: "Sales",
    riskScore: 80,
    totalEvents: 56,
    failedLogins: 0,
    lastActive: "2026-03-16T10:18:55Z",
    status: "watchlist",
  },
  {
    userId: "USR-1007",
    username: "david.wilson",
    email: "david.wilson@corp.com",
    department: "HR",
    riskScore: 5,
    totalEvents: 78,
    failedLogins: 0,
    lastActive: "2026-03-16T09:30:00Z",
    status: "normal",
  },
  {
    userId: "USR-1008",
    username: "lisa.chen",
    email: "lisa.chen@corp.com",
    department: "Engineering",
    riskScore: 10,
    totalEvents: 203,
    failedLogins: 0,
    lastActive: "2026-03-16T10:05:38Z",
    status: "normal",
  },
  {
    userId: "USR-1009",
    username: "tom.bradley",
    email: "tom.bradley@corp.com",
    department: "Marketing",
    riskScore: 8,
    totalEvents: 42,
    failedLogins: 0,
    lastActive: "2026-03-16T10:48:10Z",
    status: "normal",
  },
];

export const timelineData: TimelineData[] = [
  { time: "06:00", events: 12, alerts: 0, anomalies: 0 },
  { time: "07:00", events: 34, alerts: 0, anomalies: 1 },
  { time: "08:00", events: 89, alerts: 3, anomalies: 4 },
  { time: "09:00", events: 156, alerts: 2, anomalies: 6 },
  { time: "10:00", events: 134, alerts: 2, anomalies: 3 },
  { time: "11:00", events: 98, alerts: 0, anomalies: 2 },
  { time: "12:00", events: 45, alerts: 0, anomalies: 1 },
  { time: "13:00", events: 67, alerts: 1, anomalies: 2 },
  { time: "14:00", events: 112, alerts: 0, anomalies: 1 },
  { time: "15:00", events: 89, alerts: 0, anomalies: 0 },
  { time: "16:00", events: 76, alerts: 0, anomalies: 1 },
  { time: "17:00", events: 43, alerts: 0, anomalies: 0 },
];

export const severityDistribution = [
  { name: "Critical", value: 2, fill: "#ef4444" },
  { name: "High", value: 2, fill: "#f97316" },
  { name: "Medium", value: 2, fill: "#eab308" },
  { name: "Low", value: 1, fill: "#22c55e" },
];
