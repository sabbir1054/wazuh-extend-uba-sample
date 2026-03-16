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
import { Input } from "@/components/ui/input";
import { userProfiles, alerts, userLogs } from "@/data/demo-data";
import type { UserProfile } from "@/data/demo-data";
import { Search, Users, ShieldAlert, Eye } from "lucide-react";

const userStatusConfig: Record<
  UserProfile["status"],
  { label: string; class: string }
> = {
  normal: {
    label: "Normal",
    class:
      "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20",
  },
  watchlist: {
    label: "Watchlist",
    class:
      "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/20",
  },
  suspended: {
    label: "Suspended",
    class: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  },
};

function riskBadge(score: number) {
  if (score >= 75)
    return "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20";
  if (score >= 50)
    return "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/20";
  if (score >= 25)
    return "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
  return "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20";
}

function formatLastActive(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const filtered = userProfiles.filter(
    (u) =>
      search === "" ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase())
  );

  const userAlerts = selectedUser
    ? alerts.filter((a) => a.userId === selectedUser.userId)
    : [];
  const userEvents = selectedUser
    ? userLogs.filter((l) => l.userId === selectedUser.userId)
    : [];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">User Profiles</h1>
        <p className="text-sm text-muted-foreground">
          Monitor individual user risk scores and behavior patterns
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* User List */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                All Users ({userProfiles.length})
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
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
                  <TableHead>User</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Events</TableHead>
                  <TableHead>Failed Logins</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => {
                  const st = userStatusConfig[user.status];
                  return (
                    <TableRow
                      key={user.userId}
                      className={
                        selectedUser?.userId === user.userId
                          ? "bg-primary/5"
                          : ""
                      }
                    >
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${
                              user.riskScore >= 75
                                ? "bg-red-500"
                                : user.riskScore >= 50
                                ? "bg-orange-500"
                                : user.riskScore >= 25
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          >
                            {user.username
                              .split(".")
                              .map((n) => n[0].toUpperCase())
                              .join("")}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {user.username}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">{user.department}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${riskBadge(user.riskScore)}`}>
                          {user.riskScore}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {user.totalEvents}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-sm font-medium ${
                            user.failedLogins > 0 ? "text-red-500" : ""
                          }`}
                        >
                          {user.failedLogins}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-[10px] ${st.class}`}>
                          {st.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {formatLastActive(user.lastActive)}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* User Detail Panel */}
        <div className="space-y-4">
          {selectedUser ? (
            <>
              {/* User Info Card */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${
                        selectedUser.riskScore >= 75
                          ? "bg-red-500"
                          : selectedUser.riskScore >= 50
                          ? "bg-orange-500"
                          : selectedUser.riskScore >= 25
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {selectedUser.username
                        .split(".")
                        .map((n) => n[0].toUpperCase())
                        .join("")}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">
                        {selectedUser.username}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedUser.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedUser.department}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        Risk Score
                      </p>
                      <p
                        className={`text-lg font-bold ${
                          selectedUser.riskScore >= 75
                            ? "text-red-500"
                            : selectedUser.riskScore >= 50
                            ? "text-orange-500"
                            : "text-green-500"
                        }`}
                      >
                        {selectedUser.riskScore}/100
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">Status</p>
                      <Badge
                        className={`mt-1 text-xs ${userStatusConfig[selectedUser.status].class}`}
                      >
                        {userStatusConfig[selectedUser.status].label}
                      </Badge>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        Total Events
                      </p>
                      <p className="text-lg font-bold">
                        {selectedUser.totalEvents}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        Failed Logins
                      </p>
                      <p
                        className={`text-lg font-bold ${
                          selectedUser.failedLogins > 0 ? "text-red-500" : ""
                        }`}
                      >
                        {selectedUser.failedLogins}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Alerts */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <ShieldAlert className="h-4 w-4" />
                    Alerts ({userAlerts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userAlerts.length === 0 ? (
                    <p className="py-3 text-center text-xs text-muted-foreground">
                      No alerts for this user
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {userAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="rounded-lg border border-border p-2.5"
                        >
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`text-[10px] ${
                                alert.severity === "critical"
                                  ? "bg-red-500/15 text-red-600 border-red-500/20"
                                  : alert.severity === "high"
                                  ? "bg-orange-500/15 text-orange-600 border-orange-500/20"
                                  : "bg-yellow-500/15 text-yellow-600 border-yellow-500/20"
                              }`}
                            >
                              {alert.severity}
                            </Badge>
                            <span className="text-xs font-medium">
                              {alert.title}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-muted-foreground">
                            {alert.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Events */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">
                    Recent Events ({userEvents.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userEvents.length === 0 ? (
                    <p className="py-3 text-center text-xs text-muted-foreground">
                      No recent events
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {userEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center justify-between rounded-lg border border-border p-2.5"
                        >
                          <div>
                            <p className="text-xs font-medium">
                              {event.action}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {event.sourceIP} - {event.location}
                            </p>
                          </div>
                          <Badge
                            className={`text-[10px] ${
                              event.status === "success"
                                ? "bg-green-500/15 text-green-600 border-green-500/20"
                                : event.status === "blocked"
                                ? "bg-yellow-500/15 text-yellow-600 border-yellow-500/20"
                                : "bg-red-500/15 text-red-600 border-red-500/20"
                            }`}
                          >
                            {event.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                <Users className="mb-3 h-10 w-10 text-muted-foreground/50" />
                <p className="text-sm font-medium text-muted-foreground">
                  Select a user to view details
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Click the eye icon on any user row
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
