import cron from "node-cron";
import prisma from "../prisma";
import { fetchWazuhAlerts } from "../services/wazuhService";
import { parseAlert } from "../services/alertParser";
import {
  calculateBehaviourMetrics,
  saveBehaviourMetrics,
} from "../services/metricsService";
import {
  generateRiskScore,
  saveDeviceRisk,
  updateSystemStats,
} from "../services/riskService";

const SYNC_CRON = process.env.SYNC_CRON || "*/1 * * * *";

/**
 * Main sync pipeline:
 * 1. Fetch latest alerts from Wazuh OpenSearch
 * 2. Parse and store new alerts (skip duplicates by wazuhId)
 * 3. Upsert agents
 * 4. Recalculate behaviour metrics per affected agent
 * 5. Update risk scores
 * 6. Update system stats
 */
async function syncAlerts() {
  console.log(`[Sync] Starting alert sync at ${new Date().toISOString()}`);

  // 1. Fetch from Wazuh
  const rawAlerts = await fetchWazuhAlerts(100);

  if (rawAlerts.length === 0) {
    console.log("[Sync] No alerts fetched from Wazuh");
    return;
  }

  console.log(`[Sync] Fetched ${rawAlerts.length} alerts from Wazuh`);

  // 2. Parse alerts
  const parsed = rawAlerts.map(parseAlert);

  // Track which agents were affected
  const affectedAgentIds = new Set<string>();
  let newAlertCount = 0;

  for (const alert of parsed) {
    // 3. Upsert agent
    await prisma.agent.upsert({
      where: { id: alert.agentId },
      update: {
        name: alert.agentName,
        ip: alert.agentIp,
        manager: alert.managerName,
      },
      create: {
        id: alert.agentId,
        name: alert.agentName,
        ip: alert.agentIp,
        manager: alert.managerName,
      },
    });

    // 4. Insert alert (skip if wazuhId already exists)
    const exists = await prisma.alert.findUnique({
      where: { wazuhId: alert.wazuhId },
    });

    if (!exists) {
      await prisma.alert.create({
        data: {
          wazuhId: alert.wazuhId,
          agentId: alert.agentId,
          eventType: alert.eventType,
          description: alert.description,
          severity: alert.severity,
          category: alert.category,
          location: alert.location,
          sourceIp: alert.sourceIp,
          username: alert.username,
          rawLog: alert.rawLog || undefined,
          createdAt: alert.timestamp,
        },
      });
      newAlertCount++;
      affectedAgentIds.add(alert.agentId);
    }
  }

  console.log(
    `[Sync] Stored ${newAlertCount} new alerts. Affected agents: ${affectedAgentIds.size}`
  );

  // 5. Recalculate metrics and risk for affected agents
  for (const agentId of affectedAgentIds) {
    const metrics = await calculateBehaviourMetrics(agentId);
    await saveBehaviourMetrics(agentId, metrics);

    const risk = generateRiskScore(metrics);
    await saveDeviceRisk(agentId, risk);

    console.log(
      `[Sync] Agent ${agentId}: score=${risk.riskScore} level=${risk.riskLevel}`
    );
  }

  // 6. Update system stats
  await updateSystemStats();

  console.log(`[Sync] Sync complete at ${new Date().toISOString()}`);
}

export function startSyncJob() {
  console.log(`[Cron] Scheduling alert sync: ${SYNC_CRON}`);

  cron.schedule(SYNC_CRON, async () => {
    try {
      await syncAlerts();
    } catch (error) {
      console.error("[Cron] Sync failed:", error);
    }
  });

  // Run once immediately on startup
  syncAlerts().catch((err) => console.error("[Sync] Initial sync failed:", err));
}
