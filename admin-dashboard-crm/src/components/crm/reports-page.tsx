"use client";

import { useQuery } from "@tanstack/react-query";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { addDays, format } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { reportRevenueSeries, reportSources } from "@/lib/mock-crm-data";
import { ChartFrame } from "@/components/crm/chart-frame";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const pieColors = ["#06B6D4", "#0EA5E9", "#10B981", "#6366F1"];

export function ReportsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const tooltipBg = isDark ? "#020617" : "#ffffff";
  const tooltipBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.12)";

  const { data: revenueData = [] } = useQuery({
    queryKey: ["report-revenue"],
    queryFn: async () => reportRevenueSeries,
  });

  const { data: sourceData = [] } = useQuery({
    queryKey: ["report-sources"],
    queryFn: async () => reportSources,
  });

  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 0, 1),
    to: addDays(new Date(2026, 2, 21), 0),
  });

  const rangeLabel =
    range?.from && range?.to ? `${format(range.from, "MMM d, yyyy")} - ${format(range.to, "MMM d, yyyy")}` : "Pick a date range";

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Reporting</p>
          <h2 className="mt-1 font-sans text-2xl font-semibold text-white">Performance analytics</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" className="border-white/10 bg-white/5 text-slate-200" />}>
              {rangeLabel}
            </DialogTrigger>
            <DialogContent className="max-w-max border border-white/10 bg-slate-950 text-slate-100">
              <DialogHeader>
                <DialogTitle className="font-sans text-white">Date range</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Select the reporting window for revenue and source attribution.
                </DialogDescription>
              </DialogHeader>
              <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} className="bg-slate-950" />
            </DialogContent>
          </Dialog>
          <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
            <DownloadSimpleIcon size={16} />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
        <Card className="border border-white/10 bg-slate-900/70">
          <CardHeader>
            <CardDescription className="text-slate-400">Monthly Revenue</CardDescription>
            <CardTitle className="font-sans text-white">Booked revenue by month</CardTitle>
          </CardHeader>
          <CardContent className="min-w-0">
            <ChartFrame>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${value}k`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}` }}
                    formatter={(value) => [`$${Number(value ?? 0)}k`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" radius={[0, 0, 0, 0]} fill="#06B6D4" />
                </BarChart>
              </ResponsiveContainer>
            </ChartFrame>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-slate-900/70">
          <CardHeader>
            <CardDescription className="text-slate-400">Deal Sources</CardDescription>
            <CardTitle className="font-sans text-white">Source attribution mix</CardTitle>
          </CardHeader>
          <CardContent className="min-w-0">
            <ChartFrame>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={sourceData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={4}>
                    {sourceData.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}` }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartFrame>
            <div className="mt-4 grid gap-2">
              {sourceData.map((source, index) => (
                <div key={source.name} className="flex items-center justify-between border border-white/8 bg-white/3 px-3 py-2">
                  <span className="flex items-center gap-2 text-slate-300">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieColors[index % pieColors.length] }} />
                    {source.name}
                  </span>
                  <span className="font-medium text-white">{source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
