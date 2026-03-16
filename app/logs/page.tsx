"use client";

import { useState } from "react";
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
import { userLogs } from "@/data/demo-data";
import type { UserLog } from "@/data/demo-data";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  ShieldOff,
} from "lucide-react";

const statusConfig: Record<
  UserLog["status"],
  { label: string; class: string; icon: React.ReactNode }
> = {
  success: {
    label: "Success",
    class:
      "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20",
    icon: <CheckCircle className="h-3 w-3" />,
  },
  failure: {
    label: "Failed",
    class: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
    icon: <XCircle className="h-3 w-3" />,
  },
  blocked: {
    label: "Blocked",
    class:
      "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    icon: <ShieldOff className="h-3 w-3" />,
  },
};

function riskColor(score: number) {
  if (score >= 75) return "text-red-500";
  if (score >= 50) return "text-orange-500";
  if (score >= 25) return "text-yellow-600 dark:text-yellow-400";
  return "text-green-500";
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

export default function LogsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = userLogs.filter((log) => {
    const matchesSearch =
      search === "" ||
      log.username.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.sourceIP.includes(search) ||
      log.details.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || log.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Activity Logs</h1>
        <p className="text-sm text-muted-foreground">
          Detailed user behavior events across all monitored systems
        </p>
      </div>

      {/* Stats Row */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Events</p>
            <p className="text-xl font-bold">{userLogs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Successful</p>
            <p className="text-xl font-bold text-green-500">
              {userLogs.filter((l) => l.status === "success").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Failed</p>
            <p className="text-xl font-bold text-red-500">
              {userLogs.filter((l) => l.status === "failure").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Blocked</p>
            <p className="text-xl font-bold text-yellow-500">
              {userLogs.filter((l) => l.status === "blocked").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-sm font-semibold">
              Event Log
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search user, IP, action..."
                  className="h-9 w-64 pl-9 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Tabs
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="success">Success</TabsTrigger>
                  <TabsTrigger value="failure">Failed</TabsTrigger>
                  <TabsTrigger value="blocked">Blocked</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Source IP</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead className="min-w-[200px]">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-8 text-center text-sm text-muted-foreground"
                  >
                    <Filter className="mx-auto mb-2 h-5 w-5" />
                    No logs match your filters
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((log) => {
                  const st = statusConfig[log.status];
                  return (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        {formatDateTime(log.timestamp)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">
                          {log.username}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs font-normal">
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {log.sourceIP}
                      </TableCell>
                      <TableCell className="text-xs">
                        {log.location}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {log.device}
                      </TableCell>
                      <TableCell>
                        <Badge className={`gap-1 text-[10px] ${st.class}`}>
                          {st.icon}
                          {st.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-sm font-bold ${riskColor(log.riskScore)}`}
                        >
                          {log.riskScore}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[250px] text-xs text-muted-foreground">
                        {log.details}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
