import prisma from "../prisma";

export interface BehaviourMetrics {
  loginCount: number;
  auditCommandCount: number;
  networkChanges: number;
  malwareEvents: number;
}

/**
 * Calculate behavior metrics for a specific agent based on their alerts.
 */
export async function calculateBehaviourMetrics(
  agentId: string
): Promise<BehaviourMetrics> {
  const alerts = await prisma.alert.findMany({
    where: { agentId },
    select: { eventType: true, category: true, location: true },
  });

  const metrics: BehaviourMetrics = {
    loginCount: 0,
    auditCommandCount: 0,
    networkChanges: 0,
    malwareEvents: 0,
  };

  for (const alert of alerts) {
    if (alert.eventType === "authentication") {
      metrics.loginCount++;
    }

    if (alert.category === "rootcheck") {
      metrics.malwareEvents++;
    }

    if (alert.category === "audit" || alert.category === "audit_selinux") {
      metrics.auditCommandCount++;
    }

    if (alert.location === "netstat listening ports") {
      metrics.networkChanges++;
    }
  }

  return metrics;
}

/**
 * Save behaviour metrics to the database.
 */
export async function saveBehaviourMetrics(
  agentId: string,
  metrics: BehaviourMetrics
) {
  return prisma.behaviourMetric.create({
    data: {
      agentId,
      loginCount: metrics.loginCount,
      auditCommandCount: metrics.auditCommandCount,
      networkChanges: metrics.networkChanges,
      malwareEvents: metrics.malwareEvents,
    },
  });
}
