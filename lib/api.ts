const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000/api";

export async function apiFetch<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
  const url = new URL(`${API_BASE}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        url.searchParams.set(key, String(val));
      }
    });
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// ---- Response types matching backend ----

export interface LogEntry {
  id: string;
  device: string;
  ip: string;
  eventType: string;
  description: string;
  severity: number;
  category: string | null;
  location: string | null;
  username: string | null;
  timestamp: string;
}

export interface LogsResponse {
  logs: LogEntry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AlertSummary {
  totalAlerts: number;
  highSeverity: number;
  mediumSeverity: number;
  lowSeverity: number;
  byEventType: { eventType: string; count: number }[];
  recentAlerts: LogEntry[];
}

export interface DeviceRisk {
  agentId: string;
  device: string;
  ip: string;
  manager: string | null;
  riskScore: number;
  riskLevel: "HIGH" | "MEDIUM" | "LOW";
  lastUpdated: string;
}

export interface Device {
  id: string;
  name: string;
  ip: string;
  manager: string | null;
  totalAlerts: number;
  riskScore: number;
  riskLevel: "HIGH" | "MEDIUM" | "LOW";
  lastUpdated: string | null;
}

export interface DeviceDetail {
  agent: { id: string; name: string; ip: string; manager: string | null };
  risk: { riskScore: number; riskLevel: string; lastUpdated: string } | null;
  metrics: {
    loginCount: number;
    auditCommandCount: number;
    networkChanges: number;
    malwareEvents: number;
    calculatedAt: string;
  } | null;
  totalAlerts: number;
  riskHistory: { riskScore: number; riskLevel: string; createdAt: string }[];
}
