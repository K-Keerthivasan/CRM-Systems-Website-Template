"use client";

import { PropsWithChildren, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

type ChartFrameProps = PropsWithChildren<{
  className?: string;
}>;

const emptySubscribe = () => () => {};

export function ChartFrame({ children, className }: ChartFrameProps) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  return (
    <div className={cn("w-full min-w-0", className)}>
      {mounted ? (
        children
      ) : (
        <div className="flex h-[300px] items-center justify-center border border-dashed border-white/10 bg-white/4 text-[11px] uppercase tracking-[0.24em] text-slate-500">
          Loading chart
        </div>
      )}
    </div>
  );
}
