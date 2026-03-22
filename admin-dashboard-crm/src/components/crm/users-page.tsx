"use client";

import { useState } from "react";

import { teamUsers } from "@/lib/mock-crm-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const roleStyles = {
  Admin: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Manager: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Sales: "border-sky-400/20 bg-sky-400/10 text-sky-200",
  Support: "border-violet-400/20 bg-violet-400/10 text-violet-200",
};

export function UsersPage() {
  const [role, setRole] = useState("Sales");

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(320px,0.7fr)_minmax(0,1.3fr)]">
      <Card className="border border-white/10 bg-slate-900/70">
        <CardHeader>
          <CardDescription className="text-slate-400">Invite User</CardDescription>
          <CardTitle className="font-sans text-white">Grant workspace access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invite-name" className="text-slate-300">
              Full name
            </Label>
            <Input id="invite-name" placeholder="Avery Johnson" className="border-white/10 bg-white/5 text-slate-100" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite-email" className="text-slate-300">
              Email
            </Label>
            <Input id="invite-email" placeholder="avery@k2digitalmedia.com" className="border-white/10 bg-white/5 text-slate-100" />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Role</Label>
            <Select value={role} onValueChange={(value) => value && setRole(value)}>
              <SelectTrigger className="w-full border-white/10 bg-white/5 text-slate-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border border-white/10 bg-slate-950 text-slate-100">
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400">Send invite</Button>
        </CardContent>
      </Card>

      <Card className="border border-white/10 bg-slate-900/70">
        <CardHeader className="border-b border-white/10">
          <CardDescription className="text-slate-400">User List</CardDescription>
          <CardTitle className="font-sans text-white">Current workspace members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {teamUsers.map((user) => (
            <div key={user.id} className="flex flex-col gap-3 border border-white/10 bg-white/4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-white">{user.name}</p>
                <p className="text-slate-500">{user.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={roleStyles[user.role]}>{user.role}</Badge>
                <Badge
                  className={
                    user.status === "Active"
                      ? "border border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                      : user.status === "Pending"
                        ? "border border-amber-400/20 bg-amber-400/10 text-amber-200"
                        : "border border-rose-400/20 bg-rose-400/10 text-rose-200"
                  }
                >
                  {user.status}
                </Badge>
                <Button variant="destructive">Revoke access</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
