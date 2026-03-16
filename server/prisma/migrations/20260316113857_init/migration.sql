-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "manager" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "wazuhId" TEXT,
    "agentId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" INTEGER NOT NULL,
    "category" TEXT,
    "location" TEXT,
    "sourceIp" TEXT,
    "username" TEXT,
    "rawLog" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BehaviourMetric" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "loginCount" INTEGER NOT NULL DEFAULT 0,
    "auditCommandCount" INTEGER NOT NULL DEFAULT 0,
    "networkChanges" INTEGER NOT NULL DEFAULT 0,
    "malwareEvents" INTEGER NOT NULL DEFAULT 0,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BehaviourMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceRisk" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "riskLevel" "RiskLevel" NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceRisk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskHistory" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "riskLevel" "RiskLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiskHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemStat" (
    "id" TEXT NOT NULL,
    "totalAlerts" INTEGER NOT NULL,
    "highRisk" INTEGER NOT NULL,
    "mediumRisk" INTEGER NOT NULL,
    "lowRisk" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Agent_name_idx" ON "Agent"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Alert_wazuhId_key" ON "Alert"("wazuhId");

-- CreateIndex
CREATE INDEX "Alert_agentId_idx" ON "Alert"("agentId");

-- CreateIndex
CREATE INDEX "Alert_severity_idx" ON "Alert"("severity");

-- CreateIndex
CREATE INDEX "Alert_eventType_idx" ON "Alert"("eventType");

-- CreateIndex
CREATE INDEX "BehaviourMetric_agentId_idx" ON "BehaviourMetric"("agentId");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceRisk_agentId_key" ON "DeviceRisk"("agentId");

-- CreateIndex
CREATE INDEX "DeviceRisk_riskLevel_idx" ON "DeviceRisk"("riskLevel");

-- CreateIndex
CREATE INDEX "RiskHistory_agentId_idx" ON "RiskHistory"("agentId");

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviourMetric" ADD CONSTRAINT "BehaviourMetric_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceRisk" ADD CONSTRAINT "DeviceRisk_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskHistory" ADD CONSTRAINT "RiskHistory_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
