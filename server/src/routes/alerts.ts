import { Router, Request, Response } from "express";
import prisma from "../prisma";

const router = Router();

/**
 * GET /api/alerts/summary
 *
 * Return a summary count of alerts grouped by severity.
 */
router.get("/summary", async (_req: Request, res: Response) => {
  try {
    const totalAlerts = await prisma.alert.count();

    // Wazuh severity levels:
    // 0-3: low, 4-7: medium, 8+: high
    const [highSeverity, mediumSeverity, lowSeverity] = await Promise.all([
      prisma.alert.count({ where: { severity: { gte: 8 } } }),
      prisma.alert.count({ where: { severity: { gte: 4, lt: 8 } } }),
      prisma.alert.count({ where: { severity: { lt: 4 } } }),
    ]);

    // Group by event type
    const byEventType = await prisma.alert.groupBy({
      by: ["eventType"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    });

    // Recent alerts (last 10)
    const recentAlerts = await prisma.alert.findMany({
      include: {
        agent: { select: { name: true, ip: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const formattedRecent = recentAlerts.map((a) => ({
      id: a.id,
      device: a.agent.name,
      ip: a.agent.ip,
      eventType: a.eventType,
      description: a.description,
      severity: a.severity,
      category: a.category,
      timestamp: a.createdAt.toISOString(),
    }));

    res.json({
      totalAlerts,
      highSeverity,
      mediumSeverity,
      lowSeverity,
      byEventType: byEventType.map((e) => ({
        eventType: e.eventType,
        count: e._count.id,
      })),
      recentAlerts: formattedRecent,
    });
  } catch (error) {
    console.error("[Alerts] Error:", error);
    res.status(500).json({ error: "Failed to fetch alert summary" });
  }
});

export default router;
