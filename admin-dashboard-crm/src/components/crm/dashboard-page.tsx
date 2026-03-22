"use client";

import { ArrowUpRightIcon, CurrencyDollarIcon, TrendUpIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { formatCurrency } from "@/lib/format";
import { activities, dashboardStats, deals, revenueSeries } from "@/lib/mock-crm-data";
import { ChartFrame } from "@/components/crm/chart-frame";
import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const toneClasses = {
  active: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  warm: "border-sky-400/20 bg-sky-400/10 text-sky-200",
  cool: "border-violet-400/20 bg-violet-400/10 text-violet-200",
  closed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  risk: "border-rose-400/20 bg-rose-400/10 text-rose-200",
};

export function DashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const tooltipStyle = {
    contentStyle: {
      backgroundColor: isDark ? "#020617" : "#ffffff",
      border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.12)"}`,
    },
    labelStyle: { color: isDark ? "#E2E8F0" : "#0f172a" },
  };
  const topDeals = [...deals].sort((a, b) => b.value - a.value).slice(0, 6);

  return (
    <div className="space-y-4">
      <section className="grid gap-4 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="border border-white/10 bg-slate-900/70">
              <CardHeader>
                <CardDescription className="text-slate-400">{stat.label}</CardDescription>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="font-sans text-2xl text-white">{stat.value}</CardTitle>
                  <div className="flex h-9 w-9 items-center justify-center border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <CurrencyDollarIcon size={18} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <Badge className={toneClasses[stat.tone]}>{stat.delta}</Badge>
                <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  Live <TrendUpIcon size={12} />
                </span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]">
        <Card className="border border-white/10 bg-slate-900/70">
          <CardHeader>
            <CardDescription className="text-slate-400">Revenue Performance</CardDescription>
            <CardTitle className="font-sans text-white">Revenue vs pipeline coverage</CardTitle>
          </CardHeader>
          <CardContent className="min-w-0">
            <ChartFrame>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueSeries}>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle.contentStyle}
                    labelStyle={tooltipStyle.labelStyle}
                    formatter={(value) => [formatCurrency(Number(value ?? 0)), ""]}
                  />
                  <Line type="monotone" dataKey="pipeline" stroke="#38BDF8" strokeOpacity={0.5} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="revenue" stroke="#06B6D4" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartFrame>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-slate-900/70">
          <CardHeader>
            <CardDescription className="text-slate-400">Recent Activity</CardDescription>
            <CardTitle className="font-sans text-white">Team feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="grid grid-cols-[auto_1fr_auto] items-start gap-3 border border-white/6 bg-white/3 p-3">
                <div
                  className={`mt-0.5 h-2.5 w-2.5 rounded-full ${
                    activity.tone === "risk" ? "bg-rose-400" : activity.tone === "closed" ? "bg-emerald-400" : "bg-cyan-400"
                  }`}
                />
                <div>
                  <p className="text-xs text-slate-200">
                    <span className="font-semibold text-white">{activity.user}</span> {activity.action}{" "}
                    <span className="text-cyan-200">{activity.target}</span>
                  </p>
                </div>
                <span className="text-[11px] text-slate-500">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border border-white/10 bg-slate-900/70">
          <CardHeader className="border-b border-white/10">
            <CardDescription className="text-slate-400">Top Deals</CardDescription>
            <CardTitle className="font-sans text-white">Largest opportunities in motion</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Deal</th>
                    <th className="px-4 py-3 font-medium">Owner</th>
                    <th className="px-4 py-3 font-medium">Stage</th>
                    <th className="px-4 py-3 font-medium">Probability</th>
                    <th className="px-4 py-3 font-medium text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {topDeals.map((deal) => (
                    <tr key={deal.id} className="border-t border-white/6 text-slate-300">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-white">{deal.title}</p>
                          <p className="text-slate-500">{deal.company}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">{deal.owner}</td>
                      <td className="px-4 py-3">
                        <Badge className={toneClasses[deal.stage === "Closed" ? "closed" : deal.stage === "Proposal" ? "warm" : "active"]}>
                          {deal.stage}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">{deal.probability}%</td>
                      <td className="px-4 py-3 text-right font-medium text-white">{formatCurrency(deal.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="border border-white/10 bg-slate-900/70 xl:col-span-2">
          <CardHeader>
            <CardDescription className="text-slate-400">Forecast</CardDescription>
            <CardTitle className="font-sans text-white">Quarter close checkpoints</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {[
              ["Coverage ratio", "3.4x", "Healthy pipeline depth into late stage accounts."],
              ["Avg sales cycle", "37 days", "Down 5 days after workflow automation rollout."],
              ["Win rate", "31.2%", "Up against last quarter across mid-market and enterprise."],
            ].map(([label, value, body]) => (
              <div key={label} className="border border-white/10 bg-slate-950/70 p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
                <p className="mt-2 font-sans text-2xl font-semibold text-white">{value}</p>
                <p className="mt-2 text-slate-400">{body}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-slate-900/70">
          <CardHeader>
            <CardDescription className="text-slate-400">Focus Accounts</CardDescription>
            <CardTitle className="font-sans text-white">Exec attention needed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Monarch Capital", "Beacon Insurance", "Harbor Cloud"].map((account) => (
              <div key={account} className="flex items-center justify-between border border-white/8 bg-white/3 p-3">
                <div>
                  <p className="font-medium text-white">{account}</p>
                  <p className="text-slate-500">Decision cycle inside 7 days</p>
                </div>
                <ArrowUpRightIcon className="text-cyan-300" size={16} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
