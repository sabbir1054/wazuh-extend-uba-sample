"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  alerts,
  userProfiles,
  timelineData,
  severityDistribution,
  userLogs,
} from "@/data/demo-data";
import type { AlertSeverity } from "@/data/demo-data";
import {
  ShieldAlert,
  Users,
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
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

const severityColor: Record<AlertSeverity, string> = {
  critical: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  high: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/20",
  medium:
    "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  low: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20",
};

const statusColor: Record<string, string> = {
  open: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  investigating:
    "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
  resolved:
    "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20",
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function RiskScoreBar({ score }: { score: number }) {
  const color =
    score >= 75
      ? "bg-red-500"
      : score >= 50
      ? "bg-orange-500"
      : score >= 25
      ? "bg-yellow-500"
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

// Metrics
const totalEvents = userLogs.length;
const activeAlerts = alerts.filter((a) => a.status !== "resolved").length;
const highRiskUsers = userProfiles.filter((u) => u.riskScore >= 70).length;
const blockedActions = userLogs.filter((l) => l.status === "blocked").length;

// Top risky users sorted by risk score
const topRiskUsers = [...userProfiles]
  .sort((a, b) => b.riskScore - a.riskScore)
  .slice(0, 5);

export default function DashboardPage() {
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
                  Total Events
                </p>
                <p className="mt-1 text-2xl font-bold">{totalEvents}</p>
                <p className="mt-1 flex items-center text-xs text-green-600">
                  <ArrowUpRight className="mr-0.5 h-3 w-3" />
                  12% from yesterday
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
                  Active Alerts
                </p>
                <p className="mt-1 text-2xl font-bold">{activeAlerts}</p>
                <p className="mt-1 flex items-center text-xs text-red-600">
                  <ArrowUpRight className="mr-0.5 h-3 w-3" />2 critical
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
                  High Risk Users
                </p>
                <p className="mt-1 text-2xl font-bold">{highRiskUsers}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  of {userProfiles.length} total users
                </p>
              </div>
              <div className="rounded-lg bg-orange-500/10 p-3">
                <Users className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Blocked Actions
                </p>
                <p className="mt-1 text-2xl font-bold">{blockedActions}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Threats prevented today
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
        {/* Activity Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Activity Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient
                      id="colorEvents"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorAnomalies"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#ef4444"
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />
                  <XAxis
                    dataKey="time"
                    className="text-xs"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  />
                  <YAxis
                    className="text-xs"
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
                  <Area
                    type="monotone"
                    dataKey="events"
                    stroke="#3b82f6"
                    fill="url(#colorEvents)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="anomalies"
                    stroke="#ef4444"
                    fill="url(#colorAnomalies)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                Events
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                Anomalies
              </div>
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
            <div className="h-[180px]">
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
            <div className="mt-1 grid grid-cols-2 gap-2">
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

      {/* Bottom Row: Alerts + Top Risk Users */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                Recent Alerts
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {activeAlerts} active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="mt-0.5">
                    <ShieldAlert
                      className={`h-4 w-4 ${
                        alert.severity === "critical"
                          ? "text-red-500"
                          : alert.severity === "high"
                          ? "text-orange-500"
                          : alert.severity === "medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {alert.title}
                      </span>
                      <Badge
                        className={`text-[10px] ${severityColor[alert.severity]}`}
                      >
                        {alert.severity}
                      </Badge>
                      <Badge
                        className={`text-[10px] ${statusColor[alert.status]}`}
                      >
                        {alert.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {alert.username}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(alert.timestamp)}
                      </span>
                    </div>
                  </div>
                  <RiskScoreBar score={alert.riskScore} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Risk Users */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              Top Risk Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topRiskUsers.map((user) => (
                <div
                  key={user.userId}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${
                        user.riskScore >= 75
                          ? "bg-red-500"
                          : user.riskScore >= 50
                          ? "bg-orange-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {user.username
                        .split(".")
                        .map((n) => n[0].toUpperCase())
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {user.department}
                      </p>
                    </div>
                  </div>
                  <RiskScoreBar score={user.riskScore} />
                </div>
              ))}
            </div>

            {/* Mini bar chart of risk distribution */}
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Risk Distribution
              </p>
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topRiskUsers}
                    layout="vertical"
                    margin={{ left: 0, right: 0 }}
                  >
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis
                      type="category"
                      dataKey="username"
                      hide
                      width={0}
                    />
                    <Bar dataKey="riskScore" radius={[0, 4, 4, 0]} barSize={12}>
                      {topRiskUsers.map((user, i) => (
                        <Cell
                          key={i}
                          fill={
                            user.riskScore >= 75
                              ? "#ef4444"
                              : user.riskScore >= 50
                              ? "#f97316"
                              : "#eab308"
                          }
                          fillOpacity={0.8}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
