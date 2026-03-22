"use client";

import { useQuery } from "@tanstack/react-query";
import { BuildingsIcon, CurrencyDollarSimpleIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useState } from "react";

import { formatNumber } from "@/lib/format";
import type { DealStage } from "@/lib/mock-crm-data";
import { deals } from "@/lib/mock-crm-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stages: DealStage[] = ["Lead", "Qualified", "Proposal", "Closed"];

const stageTone: Record<DealStage, string> = {
  Lead: "border-sky-400/20 bg-sky-400/10 text-sky-200",
  Qualified: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Proposal: "border-violet-400/20 bg-violet-400/10 text-violet-200",
  Closed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
};

export function PipelinePage() {
  const { data = [] } = useQuery({
    queryKey: ["deals"],
    queryFn: async () => deals,
  });
  const [board, setBoard] = useState(deals);
  const [dragId, setDragId] = useState<string | null>(null);

  function moveDeal(stage: DealStage) {
    if (!dragId) return;
    setBoard((current) => current.map((deal) => (deal.id === dragId ? { ...deal, stage } : deal)));
    setDragId(null);
  }

  return (
    <Card className="border border-white/10 bg-slate-900/70">
      <CardHeader className="border-b border-white/10">
        <CardDescription className="text-slate-400">Pipeline</CardDescription>
        <CardTitle className="font-sans text-white">Drag-and-drop deal board</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0 pb-0">
        <div className="flex gap-4 p-4 xl:grid xl:grid-cols-4">
        {stages.map((stage) => {
          const stageDeals = (board.length ? board : data).filter((deal) => deal.stage === stage);
          const stageTotal = stageDeals.reduce((sum, deal) => sum + deal.value, 0);

          return (
            <div
              key={stage}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => moveDeal(stage)}
              className="w-72 flex-none min-h-[520px] border border-white/10 bg-slate-950/60 p-3 xl:w-auto"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <Badge className={stageTone[stage]}>{stage}</Badge>
                  <p className="mt-2 text-xs text-slate-500">{stageDeals.length} deals</p>
                </div>
                <p className="font-sans text-sm font-semibold text-white">${Math.round(stageTotal / 1000)}k</p>
              </div>

              <div className="space-y-3">
                {stageDeals.map((deal) => (
                  <motion.div key={deal.id} layout>
                    <article
                      draggable
                      onDragStart={() => setDragId(deal.id)}
                      className="cursor-grab border border-white/10 bg-white/4 p-4 active:cursor-grabbing"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-white">{deal.title}</p>
                          <p className="mt-1 flex items-center gap-1 text-slate-500">
                            <BuildingsIcon size={13} />
                            {deal.company}
                          </p>
                        </div>
                        <Badge className="border border-white/10 bg-white/5 text-slate-300">{deal.probability}%</Badge>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="flex items-center gap-1 font-sans text-lg font-semibold text-white">
                          <CurrencyDollarSimpleIcon size={16} className="text-cyan-300" />
                          {formatNumber(deal.value)}
                        </p>
                        <span className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{deal.source}</span>
                      </div>
                      <div className="mt-4 border-t border-white/10 pt-3 text-[11px] text-slate-500">
                        Owner: {deal.owner} • Updated {deal.updatedAt}
                      </div>
                    </article>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
        </div>
      </CardContent>
    </Card>
  );
}
