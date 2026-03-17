"use client";

import { useEffect, useState, useCallback } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiFetch, type LogsResponse, type AlertSummary } from "@/lib/api";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

function severityBadge(level: number) {
  if (level >= 8)
    return "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20";
  if (level >= 4)
    return "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/20";
  return "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20";
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const EVENT_TYPE_COLORS: Record<string, string> = {
  authentication: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
  malware_detection: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  security_audit: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20",
  security_compliance: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  host_monitoring: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  windows_event: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
};

export default function LogsPage() {
  const [data, setData] = useState<LogsResponse | null>(null);
  const [summary, setSummary] = useState<AlertSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("all");

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page, limit: 20 };
      if (eventFilter !== "all") params.eventType = eventFilter;

      const [logs, s] = await Promise.all([
        apiFetch<LogsResponse>("/logs", params),
        page === 1 ? apiFetch<AlertSummary>("/alerts/summary") : Promise.resolve(null),
      ]);
      setData(logs);
      if (s) setSummary(s);
    } catch (err) {
      console.error("Failed to load logs:", err);
    } finally {
      setLoading(false);
    }
  }, [page, eventFilter]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Client-side search filter on already fetched data
  const filtered = data?.logs.filter((log) => {
    if (search === "") return true;
    const q = search.toLowerCase();
    return (
      log.device.toLowerCase().includes(q) ||
      log.ip.includes(q) ||
      log.description.toLowerCase().includes(q) ||
      (log.username || "").toLowerCase().includes(q) ||
      (log.category || "").toLowerCase().includes(q)
    );
  }) ?? [];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Activity Logs</h1>
        <p className="text-sm text-muted-foreground">
          Wazuh alerts from all monitored devices
        </p>
      </div>

      {/* Stats Row */}
      {summary && (
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total Alerts</p>
              <p className="text-xl font-bold">{summary.totalAlerts}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">High Severity</p>
              <p className="text-xl font-bold text-red-500">
                {summary.highSeverity}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Medium Severity</p>
              <p className="text-xl font-bold text-orange-500">
                {summary.mediumSeverity}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Low Severity</p>
              <p className="text-xl font-bold text-green-500">
                {summary.lowSeverity}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-sm font-semibold">Event Log</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search device, IP, description..."
                  className="h-9 w-64 pl-9 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Tabs
                value={eventFilter}
                onValueChange={(v) => {
                  setEventFilter(v);
                  setPage(1);
                }}
              >
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="authentication">Auth</TabsTrigger>
                  <TabsTrigger value="malware_detection">Malware</TabsTrigger>
                  <TabsTrigger value="security_audit">Audit</TabsTrigger>
                  <TabsTrigger value="host_monitoring">Host</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="min-w-[250px]">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-8 text-center text-sm text-muted-foreground"
                    >
                      <Filter className="mx-auto mb-2 h-5 w-5" />
                      No logs match your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        {formatDateTime(log.timestamp)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">
                          {log.device}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {log.ip}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-[10px] ${EVENT_TYPE_COLORS[log.eventType] || "bg-muted text-foreground"}`}
                        >
                          {log.eventType.replace(/_/g, " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-[10px] ${severityBadge(log.severity)}`}
                        >
                          Level {log.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[120px] truncate text-xs text-muted-foreground">
                        {log.location}
                      </TableCell>
                      <TableCell className="text-xs">
                        {log.username || "—"}
                      </TableCell>
                      <TableCell className="max-w-[300px] text-xs text-muted-foreground">
                        {log.description}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}

          {/* Pagination */}
          {data && data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <p className="text-xs text-muted-foreground">
                Page {data.pagination.page} of {data.pagination.totalPages} ({data.pagination.total} total)
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPage((p) =>
                      Math.min(data.pagination.totalPages, p + 1)
                    )
                  }
                  disabled={page >= data.pagination.totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
