"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  apiFetch,
  type AlertSummary,
  type DeviceRisk,
} from "@/lib/api";
import {
  ShieldAlert,
  Monitor,
  Activity,
  AlertTriangle,
  Clock,
  Loader2,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

function severityLabel(level: number) {
  if (level >= 8) return "high";
  if (level >= 4) return "medium";
  return "low";
}

const severityColor: Record<string, string> = {
  high: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  medium:
    "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/20",
  low: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20",
};

const riskLevelColor: Record<string, string> = {
  HIGH: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  MEDIUM:
    "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/20",
  LOW: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20",
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function RiskScoreBar({ score }: { score: number }) {
  const color =
    score > 70
      ? "bg-red-500"
      : score > 40
      ? "bg-orange-500"
      : "bg-green-500";

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-16 rounded-full bg-muted">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-medium">{score}</span>
    </div>
  );
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<AlertSummary | null>(null);
  const [devices, setDevices] = useState<DeviceRisk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [s, d] = await Promise.all([
          apiFetch<AlertSummary>("/alerts/summary"),
          apiFetch<DeviceRisk[]>("/devices/risk"),
        ]);
        setSummary(s);
        setDevices(d);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  if (!summary) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Failed to load dashboard data. Is the backend running?
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const highRiskDevices = devices.filter((d) => d.riskLevel === "HIGH").length;

  // Build severity pie chart data
  const severityDistribution = [
    { name: "High (8+)", value: summary.highSeverity, fill: "#ef4444" },
    { name: "Medium (4-7)", value: summary.mediumSeverity, fill: "#f97316" },
    { name: "Low (0-3)", value: summary.lowSeverity, fill: "#22c55e" },
  ];

  // Build event type bar chart data
  const eventTypeData = summary.byEventType.map((e) => ({
    name: e.eventType.replace(/_/g, " "),
    count: e.count,
  }));

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Security Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time user behavior analytics and threat detection
        </p>
      </div>

      {/* Metric Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Total Alerts
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {summary.totalAlerts}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  From all monitored devices
                </p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-3">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  High Severity
                </p>
                <p className="mt-1 text-2xl font-bold text-red-500">
                  {summary.highSeverity}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Severity level 8+
                </p>
              </div>
              <div className="rounded-lg bg-red-500/10 p-3">
                <ShieldAlert className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  High Risk Devices
                </p>
                <p className="mt-1 text-2xl font-bold text-orange-500">
                  {highRiskDevices}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  of {devices.length} monitored
                </p>
              </div>
              <div className="rounded-lg bg-orange-500/10 p-3">
                <Monitor className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Medium Severity
                </p>
                <p className="mt-1 text-2xl font-bold text-yellow-500">
                  {summary.mediumSeverity}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Severity level 4-7
                </p>
              </div>
              <div className="rounded-lg bg-yellow-500/10 p-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Event Type Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Alerts by Event Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventTypeData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={140}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={18}>
                    {eventTypeData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={
                          ["#3b82f6", "#8b5cf6", "#ef4444", "#f97316", "#22c55e", "#06b6d4"][
                            i % 6
                          ]
                        }
                        fillOpacity={0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Alert Severity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-45">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {severityDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {severityDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Recent Alerts + Top Risk Devices */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                Recent Alerts
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {summary.totalAlerts} total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {summary.recentAlerts.map((alert) => {
                const sev = severityLabel(alert.severity);
                return (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="mt-0.5">
                      <ShieldAlert
                        className={`h-4 w-4 ${
                          alert.severity >= 8
                            ? "text-red-500"
                            : alert.severity >= 4
                            ? "text-orange-500"
                            : "text-green-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {alert.description}
                        </span>
                        <Badge className={`text-[10px] ${severityColor[sev]}`}>
                          Level {alert.severity}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {alert.device}
                        </span>
                        <span className="font-mono">{alert.ip}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {alert.eventType.replace(/_/g, " ")}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(alert.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Risk Devices */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              Device Risk Scores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {devices.map((device) => (
                <div
                  key={device.agentId}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${
                        device.riskLevel === "HIGH"
                          ? "bg-red-500"
                          : device.riskLevel === "MEDIUM"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                    >
                      {device.device.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{device.device}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {device.ip}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-[10px] ${riskLevelColor[device.riskLevel]}`}
                    >
                      {device.riskLevel}
                    </Badge>
                    <RiskScoreBar score={device.riskScore} />
                  </div>
                </div>
              ))}
            </div>

            {/* Mini bar chart */}
            {devices.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Risk Distribution
                </p>
                <div className="h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={devices}
                      layout="vertical"
                      margin={{ left: 0, right: 0 }}
                    >
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis
                        type="category"
                        dataKey="device"
                        hide
                        width={0}
                      />
                      <Bar
                        dataKey="riskScore"
                        radius={[0, 4, 4, 0]}
                        barSize={12}
                      >
                        {devices.map((d, i) => (
                          <Cell
                            key={i}
                            fill={
                              d.riskLevel === "HIGH"
                                ? "#ef4444"
                                : d.riskLevel === "MEDIUM"
                                ? "#f97316"
                                : "#22c55e"
                            }
                            fillOpacity={0.8}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
