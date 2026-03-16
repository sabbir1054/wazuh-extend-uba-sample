import prisma from "./prisma";
import { RiskLevel } from "@prisma/client";

/**
 * Seed the database with realistic demo data based on Wazuh alert patterns.
 * This mirrors the actual data format from ApiDoc.md
 */
async function seed() {
  console.log("[Seed] Clearing existing data...");
  await prisma.riskHistory.deleteMany();
  await prisma.deviceRisk.deleteMany();
  await prisma.behaviourMetric.deleteMany();
  await prisma.systemStat.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.agent.deleteMany();

  console.log("[Seed] Creating agents...");
  const agents = [
    { id: "001", name: "wazuh-server", ip: "10.0.2.1", manager: "kali" },
    { id: "002", name: "laptop1", ip: "192.168.0.186", manager: "kali" },
    { id: "003", name: "kali_laptop", ip: "10.0.2.15", manager: "kali" },
    { id: "004", name: "web-server-01", ip: "192.168.1.50", manager: "kali" },
    { id: "005", name: "db-server-01", ip: "192.168.1.100", manager: "kali" },
  ];

  for (const agent of agents) {
    await prisma.agent.create({ data: agent });
  }

  console.log("[Seed] Creating alerts...");
  const now = new Date();
  const alerts = [
    // kali_laptop - PAM auth events
    {
      agentId: "003",
      wazuhId: "1773640316.3008351",
      eventType: "authentication",
      description: "PAM: Login session opened.",
      severity: 3,
      category: "pam",
      location: "journald",
      username: "lightdm",
      createdAt: new Date(now.getTime() - 1000 * 60 * 5),
    },
    {
      agentId: "003",
      wazuhId: "1773640316.3008793",
      eventType: "authentication",
      description: "PAM: Login session opened.",
      severity: 3,
      category: "pam",
      location: "journald",
      username: "lightdm",
      createdAt: new Date(now.getTime() - 1000 * 60 * 6),
    },
    {
      agentId: "003",
      wazuhId: "1773640316.3009241",
      eventType: "authentication",
      description: "PAM: Login session opened.",
      severity: 3,
      category: "pam",
      location: "journald",
      username: "lightdm",
      createdAt: new Date(now.getTime() - 1000 * 60 * 7),
    },
    // kali_laptop - rootcheck (malware)
    {
      agentId: "003",
      wazuhId: "1773640314.3006226",
      eventType: "malware_detection",
      description: "Host-based anomaly detection event (rootcheck).",
      severity: 7,
      category: "rootcheck",
      location: "rootcheck",
      createdAt: new Date(now.getTime() - 1000 * 60 * 8),
    },
    {
      agentId: "003",
      wazuhId: "1773640314.3006620",
      eventType: "malware_detection",
      description: "Host-based anomaly detection event (rootcheck).",
      severity: 7,
      category: "rootcheck",
      location: "rootcheck",
      createdAt: new Date(now.getTime() - 1000 * 60 * 9),
    },
    // kali_laptop - audit
    {
      agentId: "003",
      wazuhId: "1773640316.3007022",
      eventType: "security_audit",
      description: "Auditd: SELinux permission check.",
      severity: 3,
      category: "audit",
      location: "/var/log/audit/audit.log",
      createdAt: new Date(now.getTime() - 1000 * 60 * 7),
    },
    // kali_laptop - SCA
    {
      agentId: "003",
      wazuhId: "1773640366.3013581",
      eventType: "security_compliance",
      description:
        "SCA summary: CIS Distribution Independent Linux Benchmark v2.0.0.: Score less than 50% (46)",
      severity: 7,
      category: "sca",
      location: "sca",
      createdAt: new Date(now.getTime() - 1000 * 60 * 10),
    },
    {
      agentId: "003",
      wazuhId: "1773640357.3009683",
      eventType: "security_compliance",
      description:
        "CIS Distribution Independent Linux Benchmark v2.0.0.: Ensure XD/NX support is enabled.: Status changed",
      severity: 5,
      category: "sca",
      location: "sca",
      createdAt: new Date(now.getTime() - 1000 * 60 * 11),
    },
    // kali_laptop - host monitoring (ossec netstat)
    {
      agentId: "003",
      wazuhId: "1773640671.3016702",
      eventType: "host_monitoring",
      description:
        "Listened ports status (netstat) changed (new port opened or closed).",
      severity: 7,
      category: "ossec",
      location: "netstat listening ports",
      createdAt: new Date(now.getTime() - 1000 * 60 * 2),
    },
    // laptop1 - Windows events
    {
      agentId: "002",
      wazuhId: "1773640392.3015085",
      eventType: "windows_event",
      description: "Software protection service scheduled successfully.",
      severity: 3,
      category: "windows_application",
      location: "EventChannel",
      createdAt: new Date(now.getTime() - 1000 * 60 * 4),
    },
    {
      agentId: "002",
      wazuhId: "seed-win-002-1",
      eventType: "windows_event",
      description: "Windows Defender scan completed.",
      severity: 3,
      category: "windows_application",
      location: "EventChannel",
      createdAt: new Date(now.getTime() - 1000 * 60 * 15),
    },
    {
      agentId: "002",
      wazuhId: "seed-win-002-2",
      eventType: "authentication",
      description: "Windows logon success.",
      severity: 4,
      category: "pam",
      location: "EventChannel",
      username: "sabbir",
      createdAt: new Date(now.getTime() - 1000 * 60 * 20),
    },
    // web-server-01
    {
      agentId: "004",
      wazuhId: "seed-web-004-1",
      eventType: "authentication",
      description: "PAM: Login session opened.",
      severity: 3,
      category: "pam",
      location: "journald",
      username: "root",
      createdAt: new Date(now.getTime() - 1000 * 60 * 12),
    },
    {
      agentId: "004",
      wazuhId: "seed-web-004-2",
      eventType: "authentication",
      description: "PAM: Multiple failed login attempts.",
      severity: 8,
      category: "pam",
      location: "journald",
      username: "admin",
      createdAt: new Date(now.getTime() - 1000 * 60 * 30),
    },
    {
      agentId: "004",
      wazuhId: "seed-web-004-3",
      eventType: "security_audit",
      description: "Auditd: Command executed by root user.",
      severity: 5,
      category: "audit",
      location: "/var/log/audit/audit.log",
      createdAt: new Date(now.getTime() - 1000 * 60 * 35),
    },
    {
      agentId: "004",
      wazuhId: "seed-web-004-4",
      eventType: "host_monitoring",
      description:
        "Listened ports status (netstat) changed (new port opened or closed).",
      severity: 7,
      category: "ossec",
      location: "netstat listening ports",
      createdAt: new Date(now.getTime() - 1000 * 60 * 40),
    },
    // db-server-01
    {
      agentId: "005",
      wazuhId: "seed-db-005-1",
      eventType: "authentication",
      description: "PAM: Login session opened.",
      severity: 3,
      category: "pam",
      location: "journald",
      username: "postgres",
      createdAt: new Date(now.getTime() - 1000 * 60 * 14),
    },
    {
      agentId: "005",
      wazuhId: "seed-db-005-2",
      eventType: "malware_detection",
      description: "Host-based anomaly detection event (rootcheck).",
      severity: 7,
      category: "rootcheck",
      location: "rootcheck",
      createdAt: new Date(now.getTime() - 1000 * 60 * 50),
    },
    {
      agentId: "005",
      wazuhId: "seed-db-005-3",
      eventType: "security_audit",
      description: "Auditd: Privilege escalation detected.",
      severity: 10,
      category: "audit",
      location: "/var/log/audit/audit.log",
      createdAt: new Date(now.getTime() - 1000 * 60 * 55),
    },
    {
      agentId: "005",
      wazuhId: "seed-db-005-4",
      eventType: "host_monitoring",
      description:
        "Listened ports status (netstat) changed (new port opened or closed).",
      severity: 7,
      category: "ossec",
      location: "netstat listening ports",
      createdAt: new Date(now.getTime() - 1000 * 60 * 60),
    },
    // wazuh-server
    {
      agentId: "001",
      wazuhId: "seed-wazuh-001-1",
      eventType: "authentication",
      description: "PAM: Login session opened.",
      severity: 3,
      category: "pam",
      location: "journald",
      username: "wazuh",
      createdAt: new Date(now.getTime() - 1000 * 60 * 3),
    },
    {
      agentId: "001",
      wazuhId: "seed-wazuh-001-2",
      eventType: "security_audit",
      description: "Auditd: System call audit event.",
      severity: 3,
      category: "audit",
      location: "/var/log/audit/audit.log",
      createdAt: new Date(now.getTime() - 1000 * 60 * 25),
    },
  ];

  for (const alert of alerts) {
    await prisma.alert.create({
      data: {
        wazuhId: alert.wazuhId,
        agentId: alert.agentId,
        eventType: alert.eventType,
        description: alert.description,
        severity: alert.severity,
        category: alert.category,
        location: alert.location,
        sourceIp:
          agents.find((a) => a.id === alert.agentId)?.ip || null,
        username: (alert as Record<string, unknown>).username as string ?? null,
        createdAt: alert.createdAt,
      },
    });
  }

  console.log(`[Seed] Created ${alerts.length} alerts`);

  // Calculate metrics and risk for each agent
  console.log("[Seed] Calculating behaviour metrics and risk scores...");

  for (const agent of agents) {
    const agentAlerts = alerts.filter((a) => a.agentId === agent.id);

    const metrics = {
      loginCount: agentAlerts.filter((a) => a.eventType === "authentication")
        .length,
      auditCommandCount: agentAlerts.filter(
        (a) => a.category === "audit"
      ).length,
      networkChanges: agentAlerts.filter(
        (a) => a.location === "netstat listening ports"
      ).length,
      malwareEvents: agentAlerts.filter(
        (a) => a.category === "rootcheck"
      ).length,
    };

    await prisma.behaviourMetric.create({
      data: {
        agentId: agent.id,
        loginCount: metrics.loginCount,
        auditCommandCount: metrics.auditCommandCount,
        networkChanges: metrics.networkChanges,
        malwareEvents: metrics.malwareEvents,
      },
    });

    // Calculate risk score
    let score =
      metrics.loginCount * 5 +
      metrics.auditCommandCount * 10 +
      metrics.networkChanges * 15 +
      metrics.malwareEvents * 40;
    score = Math.min(score, 100);

    let riskLevel: RiskLevel = RiskLevel.LOW;
    if (score > 70) riskLevel = RiskLevel.HIGH;
    else if (score > 40) riskLevel = RiskLevel.MEDIUM;

    await prisma.deviceRisk.create({
      data: { agentId: agent.id, riskScore: score, riskLevel },
    });

    await prisma.riskHistory.create({
      data: { agentId: agent.id, riskScore: score, riskLevel },
    });

    console.log(
      `  ${agent.name}: logins=${metrics.loginCount} audit=${metrics.auditCommandCount} net=${metrics.networkChanges} malware=${metrics.malwareEvents} → score=${score} (${riskLevel})`
    );
  }

  // System stats
  const totalAlerts = alerts.length;
  const highRisk = await prisma.deviceRisk.count({
    where: { riskLevel: RiskLevel.HIGH },
  });
  const mediumRisk = await prisma.deviceRisk.count({
    where: { riskLevel: RiskLevel.MEDIUM },
  });
  const lowRisk = await prisma.deviceRisk.count({
    where: { riskLevel: RiskLevel.LOW },
  });

  await prisma.systemStat.create({
    data: { totalAlerts, highRisk, mediumRisk, lowRisk },
  });

  console.log("[Seed] Done!");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
