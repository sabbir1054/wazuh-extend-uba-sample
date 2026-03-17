"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  apiFetch,
  type Device,
  type DeviceDetail,
} from "@/lib/api";
import { Search, Monitor, ShieldAlert, Eye, Loader2, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const riskLevelColor: Record<string, string> = {
  HIGH: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  MEDIUM:
    "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/20",
  LOW: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20",
};

function riskScoreColor(score: number) {
  if (score > 70) return "text-red-500";
  if (score > 40) return "text-orange-500";
  return "text-green-500";
}

function avatarBg(level: string) {
  if (level === "HIGH") return "bg-red-500";
  if (level === "MEDIUM") return "bg-orange-500";
  return "bg-green-500";
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<DeviceDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    apiFetch<Device[]>("/devices")
      .then(setDevices)
      .catch((err) => console.error("Failed to load devices:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setDetail(null);
      return;
    }
    setDetailLoading(true);
    apiFetch<DeviceDetail>(`/devices/risk/${selectedId}`)
      .then(setDetail)
      .catch((err) => console.error("Failed to load device detail:", err))
      .finally(() => setDetailLoading(false));
  }, [selectedId]);

  const filtered = devices.filter(
    (d) =>
      search === "" ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.ip.includes(search)
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Devices</h1>
        <p className="text-sm text-muted-foreground">
          Monitored agents with risk scores and behavior metrics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Device List */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                All Devices ({devices.length})
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search device or IP..."
                  className="h-9 w-56 pl-9 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Total Alerts</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-8 text-center text-sm text-muted-foreground"
                    >
                      No devices found
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((device) => (
                    <TableRow
                      key={device.id}
                      className={
                        selectedId === device.id ? "bg-primary/5" : ""
                      }
                    >
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${avatarBg(device.riskLevel)}`}
                          >
                            {device.name.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium">
                            {device.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {device.ip}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-sm font-bold ${riskScoreColor(device.riskScore)}`}
                        >
                          {device.riskScore}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-[10px] ${riskLevelColor[device.riskLevel]}`}
                        >
                          {device.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {device.totalAlerts}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {device.manager || "—"}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => setSelectedId(device.id)}
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Detail Panel */}
        <div className="space-y-4">
          {detailLoading ? (
            <Card>
              <CardContent className="flex items-center justify-center p-10">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </CardContent>
            </Card>
          ) : detail ? (
            <>
              {/* Device Info */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${avatarBg(detail.risk?.riskLevel || "LOW")}`}
                    >
                      {detail.agent.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">
                        {detail.agent.name}
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground">
                        {detail.agent.ip}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Manager: {detail.agent.manager || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        Risk Score
                      </p>
                      <p
                        className={`text-lg font-bold ${riskScoreColor(detail.risk?.riskScore ?? 0)}`}
                      >
                        {detail.risk?.riskScore ?? 0}/100
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        Risk Level
                      </p>
                      <Badge
                        className={`mt-1 text-xs ${riskLevelColor[detail.risk?.riskLevel || "LOW"]}`}
                      >
                        {detail.risk?.riskLevel || "LOW"}
                      </Badge>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        Total Alerts
                      </p>
                      <p className="text-lg font-bold">{detail.totalAlerts}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        Last Updated
                      </p>
                      <p className="text-xs font-medium mt-1">
                        {detail.risk?.lastUpdated
                          ? new Date(detail.risk.lastUpdated).toLocaleString()
                          : "—"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Behaviour Metrics */}
              {detail.metrics && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      <Activity className="h-4 w-4" />
                      Behaviour Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        {
                          label: "Login Events",
                          value: detail.metrics.loginCount,
                          weight: "×5",
                          color: "#3b82f6",
                        },
                        {
                          label: "Audit Commands",
                          value: detail.metrics.auditCommandCount,
                          weight: "×10",
                          color: "#8b5cf6",
                        },
                        {
                          label: "Network Changes",
                          value: detail.metrics.networkChanges,
                          weight: "×15",
                          color: "#f97316",
                        },
                        {
                          label: "Malware Events",
                          value: detail.metrics.malwareEvents,
                          weight: "×40",
                          color: "#ef4444",
                        },
                      ].map((m) => (
                        <div
                          key={m.label}
                          className="flex items-center justify-between rounded-lg border border-border p-2.5"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="h-2.5 w-2.5 rounded-sm"
                              style={{ backgroundColor: m.color }}
                            />
                            <span className="text-xs">{m.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{m.value}</span>
                            <span className="text-[10px] text-muted-foreground">
                              {m.weight}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Risk History */}
              {detail.riskHistory.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      <ShieldAlert className="h-4 w-4" />
                      Risk History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[...detail.riskHistory].reverse()}>
                          <XAxis dataKey="createdAt" hide />
                          <YAxis domain={[0, 100]} hide />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "var(--card)",
                              border: "1px solid var(--border)",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                            formatter={(value) => [`${value}`, "Risk Score"]}
                            labelFormatter={(label) =>
                              new Date(String(label)).toLocaleString()
                            }
                          />
                          <Bar
                            dataKey="riskScore"
                            radius={[4, 4, 0, 0]}
                            barSize={16}
                          >
                            {[...detail.riskHistory]
                              .reverse()
                              .map((h, i) => (
                                <Cell
                                  key={i}
                                  fill={
                                    h.riskLevel === "HIGH"
                                      ? "#ef4444"
                                      : h.riskLevel === "MEDIUM"
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
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                <Monitor className="mb-3 h-10 w-10 text-muted-foreground/50" />
                <p className="text-sm font-medium text-muted-foreground">
                  Select a device to view details
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Click the eye icon on any device row
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
