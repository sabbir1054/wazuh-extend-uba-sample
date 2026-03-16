import { RiskLevel } from "@prisma/client";
import prisma from "../prisma";
import type { BehaviourMetrics } from "./metricsService";

export interface RiskResult {
  riskScore: number;
  riskLevel: RiskLevel;
}

/**
 * Generate risk score from behaviour metrics.
 *
 * Scoring rules (from ApiDoc):
 *   loginCount * 5
 *   auditCommands * 10
 *   networkChanges * 15
 *   malwareEvents * 40
 *
 * Risk levels:
 *   0-40  → LOW
 *   41-70 → MEDIUM
 *   70+   → HIGH
 */
export function generateRiskScore(metrics: BehaviourMetrics): RiskResult {
  let score = 0;

  score += metrics.loginCount * 5;
  score += metrics.auditCommandCount * 10;
  score += metrics.networkChanges * 15;
  score += metrics.malwareEvents * 40;

  // Cap at 100
  score = Math.min(score, 100);

  let riskLevel: RiskLevel = RiskLevel.LOW;
  if (score > 70) riskLevel = RiskLevel.HIGH;
  else if (score > 40) riskLevel = RiskLevel.MEDIUM;

  return { riskScore: score, riskLevel };
}

/**
 * Upsert the device risk score in the database and append to history.
 */
export async function saveDeviceRisk(agentId: string, risk: RiskResult) {
  // Upsert current risk
  await prisma.deviceRisk.upsert({
    where: { agentId },
    update: {
      riskScore: risk.riskScore,
      riskLevel: risk.riskLevel,
    },
    create: {
      agentId,
      riskScore: risk.riskScore,
      riskLevel: risk.riskLevel,
    },
  });

  // Append to risk history
  await prisma.riskHistory.create({
    data: {
      agentId,
      riskScore: risk.riskScore,
      riskLevel: risk.riskLevel,
    },
  });
}

/**
 * Update the system-wide stats snapshot.
 */
export async function updateSystemStats() {
  const totalAlerts = await prisma.alert.count();
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
}
