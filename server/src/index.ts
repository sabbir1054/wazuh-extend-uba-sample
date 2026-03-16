import express from "express";
import cors from "cors";
import prisma from "./prisma";
import logsRouter from "./routes/logs";
import alertsRouter from "./routes/alerts";
import devicesRouter from "./routes/devices";
import { startSyncJob } from "./jobs/syncAlerts";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/logs", logsRouter);
app.use("/api/alerts", alertsRouter);
app.use("/api/devices", devicesRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

async function main() {
  await prisma.$connect();
  console.log("[DB] PostgreSQL connected via Prisma");

  // Start the cron job to sync Wazuh alerts
  startSyncJob();

  app.listen(PORT, () => {
    console.log(`[Server] UBA Backend running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("[Server] Failed to start:", err);
  process.exit(1);
});
