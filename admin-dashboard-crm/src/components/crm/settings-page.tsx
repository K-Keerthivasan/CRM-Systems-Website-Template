"use client";

import { useState } from "react";

import { teamUsers } from "@/lib/mock-crm-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    digest: true,
    riskAlerts: true,
    dealWon: false,
  });

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
      <Card className="border border-white/10 bg-slate-900/70">
        <CardHeader>
          <CardDescription className="text-slate-400">Company Info</CardDescription>
          <CardTitle className="font-sans text-white">Workspace settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-slate-300">
                Company name
              </Label>
              <Input id="company-name" defaultValue="K2 Digital Media" className="border-white/10 bg-white/5 text-slate-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-site" className="text-slate-300">
                Website
              </Label>
              <Input
                id="company-site"
                defaultValue="https://k2digitalmedia.com"
                className="border-white/10 bg-white/5 text-slate-100"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-slate-300">
                Industry
              </Label>
              <Input
                id="industry"
                defaultValue="Digital media and revenue operations"
                className="border-white/10 bg-white/5 text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hq" className="text-slate-300">
                Headquarters
              </Label>
              <Input id="hq" defaultValue="Toronto, ON" className="border-white/10 bg-white/5 text-slate-100" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-slate-300">
              Workspace notes
            </Label>
            <Textarea
              id="notes"
              defaultValue="Dark-mode only enterprise CRM workspace focused on revenue operations, lifecycle reporting, and pipeline control."
              className="min-h-28 border-white/10 bg-white/5 text-slate-100"
            />
          </div>
          <div className="flex justify-end">
            <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">Save settings</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="border border-white/10 bg-slate-900/70">
          <CardHeader>
            <CardDescription className="text-slate-400">User Roles</CardDescription>
            <CardTitle className="font-sans text-white">Access matrix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {teamUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between border border-white/10 bg-white/4 px-3 py-3">
                <div>
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-slate-500">{user.email}</p>
                </div>
                <Badge className="border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">{user.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-slate-900/70">
          <CardHeader>
            <CardDescription className="text-slate-400">Notifications</CardDescription>
            <CardTitle className="font-sans text-white">Preference toggles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Daily digest", "digest"],
              ["Risk alerts", "riskAlerts"],
              ["Deal won notifications", "dealWon"],
            ].map(([label, key]) => (
              <div key={key} className="flex items-center justify-between border border-white/10 bg-white/4 px-3 py-3">
                <div>
                  <p className="font-medium text-white">{label}</p>
                  <p className="text-slate-500">Control operational noise for the revenue team.</p>
                </div>
                <Switch
                  checked={notifications[key as keyof typeof notifications]}
                  onCheckedChange={(checked) => setNotifications((current) => ({ ...current, [key]: checked }))}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
