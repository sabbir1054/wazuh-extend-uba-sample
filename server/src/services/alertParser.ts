import type { WazuhAlert } from "./wazuhService";

export interface ParsedAlert {
  wazuhId: string;
  agentId: string;
  agentName: string;
  agentIp: string;
  managerName: string | null;
  eventType: string;
  description: string;
  severity: number;
  category: string;
  location: string;
  sourceIp: string | null;
  username: string | null;
  rawLog: Record<string, unknown> | null;
  timestamp: Date;
}

/**
 * Determine the event type based on alert data and rule groups.
 *
 * Mapping from ApiDoc:
 *   windows_application → windows_event
 *   pam                 → authentication
 *   audit_selinux       → security_audit
 *   rootcheck           → malware_detection
 *   sca                 → security_compliance
 *   ossec               → host_monitoring
 */
function classifyEventType(alert: WazuhAlert["_source"]): {
  eventType: string;
  category: string;
} {
  const groups = alert.rule.groups || [];

  // Windows event
  if (alert.data?.win || groups.includes("windows_application")) {
    return { eventType: "windows_event", category: "windows_application" };
  }

  // Authentication (PAM)
  if (groups.includes("pam") || groups.includes("authentication_success")) {
    return { eventType: "authentication", category: "pam" };
  }

  // Malware detection (rootcheck)
  if (groups.includes("rootcheck")) {
    return { eventType: "malware_detection", category: "rootcheck" };
  }

  // Security audit
  if (
    groups.includes("audit") ||
    groups.includes("audit_selinux")
  ) {
    return { eventType: "security_audit", category: "audit" };
  }

  // Security compliance (SCA)
  if (groups.includes("sca")) {
    return { eventType: "security_compliance", category: "sca" };
  }

  // Host monitoring (ossec - default)
  if (groups.includes("ossec")) {
    return { eventType: "host_monitoring", category: "ossec" };
  }

  // Fallback
  return { eventType: "other", category: groups[0] || "unknown" };
}

/**
 * Extract username from alert data if available.
 */
function extractUsername(alert: WazuhAlert["_source"]): string | null {
  if (alert.data?.dstuser) return String(alert.data.dstuser);
  if (alert.data?.srcuser) return String(alert.data.srcuser);
  if (alert.predecoder?.program_name) return alert.predecoder.program_name;
  return null;
}

/**
 * Parse a raw Wazuh alert into our normalized format.
 */
export function parseAlert(raw: WazuhAlert): ParsedAlert {
  const source = raw._source;
  const { eventType, category } = classifyEventType(source);

  return {
    wazuhId: source.id || raw._id,
    agentId: source.agent.id,
    agentName: source.agent.name,
    agentIp: source.agent.ip,
    managerName: source.manager?.name || null,
    eventType,
    description: source.rule.description,
    severity: source.rule.level,
    category,
    location: source.location,
    sourceIp: source.agent.ip,
    username: extractUsername(source),
    rawLog: source.full_log ? { full_log: source.full_log } : null,
    timestamp: new Date(source["@timestamp"]),
  };
}
