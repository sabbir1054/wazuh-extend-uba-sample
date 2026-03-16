import { Router, Request, Response } from "express";
import prisma from "../prisma";

const router = Router();

/**
 * GET /api/devices/risk
 *
 * Return risk scores for all devices.
 */
router.get("/risk", async (_req: Request, res: Response) => {
  try {
    const devices = await prisma.deviceRisk.findMany({
      include: {
        agent: {
          select: { name: true, ip: true, manager: true },
        },
      },
      orderBy: { riskScore: "desc" },
    });

    const formatted = devices.map((d) => ({
      agentId: d.agentId,
      device: d.agent.name,
      ip: d.agent.ip,
      manager: d.agent.manager,
      riskScore: d.riskScore,
      riskLevel: d.riskLevel,
      lastUpdated: d.lastUpdated.toISOString(),
    }));

    res.json(formatted);
  } catch (error) {
    console.error("[Devices] Error:", error);
    res.status(500).json({ error: "Failed to fetch device risks" });
  }
});

/**
 * GET /api/devices/risk/:agentId
 *
 * Return detailed risk info for a single device including history and metrics.
 */
router.get("/risk/:agentId", async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;

    const [agent, risk, metrics, history, alertCount] = await Promise.all([
      prisma.agent.findUnique({ where: { id: agentId } }),
      prisma.deviceRisk.findUnique({ where: { agentId } }),
      prisma.behaviourMetric.findFirst({
        where: { agentId },
        orderBy: { calculatedAt: "desc" },
      }),
      prisma.riskHistory.findMany({
        where: { agentId },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      prisma.alert.count({ where: { agentId } }),
    ]);

    if (!agent) {
      res.status(404).json({ error: "Agent not found" });
      return;
    }

    res.json({
      agent: {
        id: agent.id,
        name: agent.name,
        ip: agent.ip,
        manager: agent.manager,
      },
      risk: risk
        ? {
            riskScore: risk.riskScore,
            riskLevel: risk.riskLevel,
            lastUpdated: risk.lastUpdated.toISOString(),
          }
        : null,
      metrics: metrics
        ? {
            loginCount: metrics.loginCount,
            auditCommandCount: metrics.auditCommandCount,
            networkChanges: metrics.networkChanges,
            malwareEvents: metrics.malwareEvents,
            calculatedAt: metrics.calculatedAt.toISOString(),
          }
        : null,
      totalAlerts: alertCount,
      riskHistory: history.map((h) => ({
        riskScore: h.riskScore,
        riskLevel: h.riskLevel,
        createdAt: h.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("[Devices] Error:", error);
    res.status(500).json({ error: "Failed to fetch device risk details" });
  }
});

/**
 * GET /api/devices
 *
 * Return all monitored agents/devices.
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const agents = await prisma.agent.findMany({
      include: {
        riskScore: {
          select: { riskScore: true, riskLevel: true, lastUpdated: true },
        },
        _count: { select: { alerts: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = agents.map((a) => ({
      id: a.id,
      name: a.name,
      ip: a.ip,
      manager: a.manager,
      totalAlerts: a._count.alerts,
      riskScore: a.riskScore?.riskScore ?? 0,
      riskLevel: a.riskScore?.riskLevel ?? "LOW",
      lastUpdated: a.riskScore?.lastUpdated?.toISOString() ?? null,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("[Devices] Error:", error);
    res.status(500).json({ error: "Failed to fetch devices" });
  }
});

export default router;
