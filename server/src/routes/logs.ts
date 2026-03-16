import { Router, Request, Response } from "express";
import prisma from "../prisma";

const router = Router();

/**
 * GET /api/logs
 *
 * Return paginated logs stored in the database.
 * Query params: page, limit, agentId, eventType, severity
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;

    // Filters
    const where: Record<string, unknown> = {};

    if (req.query.agentId) {
      where.agentId = req.query.agentId;
    }

    if (req.query.eventType) {
      where.eventType = req.query.eventType;
    }

    if (req.query.severity) {
      where.severity = parseInt(req.query.severity as string);
    }

    if (req.query.category) {
      where.category = req.query.category;
    }

    const [logs, total] = await Promise.all([
      prisma.alert.findMany({
        where,
        include: {
          agent: {
            select: { name: true, ip: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.alert.count({ where }),
    ]);

    const formatted = logs.map((log) => ({
      id: log.id,
      device: log.agent.name,
      ip: log.agent.ip,
      eventType: log.eventType,
      description: log.description,
      severity: log.severity,
      category: log.category,
      location: log.location,
      username: log.username,
      timestamp: log.createdAt.toISOString(),
    }));

    res.json({
      logs: formatted,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[Logs] Error:", error);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

export default router;
