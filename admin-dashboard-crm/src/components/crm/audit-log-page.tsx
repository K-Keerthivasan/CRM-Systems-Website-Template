"use client";

import { useState } from "react";

import { auditEntries } from "@/lib/mock-crm-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const actionClasses = {
  User: "border border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Deal: "border border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Contact: "border border-sky-400/20 bg-sky-400/10 text-sky-200",
  Settings: "border border-violet-400/20 bg-violet-400/10 text-violet-200",
};

export function AuditLogPage() {
  const [userFilter, setUserFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("All");

  const filteredEntries = auditEntries.filter((entry) => {
    const userMatch = `${entry.user} ${entry.action}`.toLowerCase().includes(userFilter.toLowerCase());
    const typeMatch = actionFilter === "All" ? true : entry.actionType === actionFilter;
    return userMatch && typeMatch;
  });

  return (
    <Card className="border border-white/10 bg-slate-900/70">
      <CardHeader className="border-b border-white/10">
        <CardDescription className="text-slate-400">Audit Log</CardDescription>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="font-sans text-white">Workspace activity trail</CardTitle>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={userFilter}
              onChange={(event) => setUserFilter(event.target.value)}
              placeholder="Filter by user or action"
              className="border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500"
            />
            <Select value={actionFilter} onValueChange={(value) => value && setActionFilter(value)}>
              <SelectTrigger className="w-full border-white/10 bg-white/5 text-slate-100 sm:w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border border-white/10 bg-slate-950 text-slate-100">
                <SelectItem value="All">All actions</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Deal">Deal</SelectItem>
                <SelectItem value="Contact">Contact</SelectItem>
                <SelectItem value="Settings">Settings</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {filteredEntries.map((entry) => (
          <div key={entry.id} className="grid gap-3 border border-white/10 bg-white/4 p-4 md:grid-cols-[180px_120px_minmax(0,1fr)] md:items-center">
            <p className="font-mono text-[11px] text-slate-500">{entry.timestamp}</p>
            <Badge className={actionClasses[entry.actionType]}>{entry.actionType}</Badge>
            <p className="text-slate-300">
              <span className="font-medium text-white">{entry.user}</span> {entry.action}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
