"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MoonIcon,
  SunIcon,
  ChartBarIcon,
  ChartLineIcon,
  CheckCircleIcon,
  GearSixIcon,
  KanbanIcon,
  ListIcon,
  MagnifyingGlassIcon,
  NotepadIcon,
  PresentationChartIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";

const navigation = [
  { href: "/", label: "Dashboard", icon: ChartLineIcon },
  { href: "/contacts", label: "Contacts", icon: UsersIcon },
  { href: "/pipeline", label: "Pipeline", icon: KanbanIcon },
  { href: "/reports", label: "Reports", icon: PresentationChartIcon },
  { href: "/settings", label: "Settings", icon: GearSixIcon },
  { href: "/users", label: "Users", icon: CheckCircleIcon },
  { href: "/audit-log", label: "Audit Log", icon: NotepadIcon },
];

function SidebarContent({
  pathname,
  isDark,
  onNavigate,
}: {
  pathname: string;
  isDark: boolean;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className={cn("border-b px-6 py-6", isDark ? "border-white/10" : "border-slate-200")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
            <ChartBarIcon size={20} weight="fill" />
          </div>
          <div>
            <p
              className={cn(
                "font-sans text-sm font-semibold tracking-wide",
                isDark ? "text-white" : "text-slate-900"
              )}
            >
              K2 Digital Media
            </p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">CRM Command</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto space-y-1 px-4 py-5">
        {navigation.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 border px-3 py-2 text-xs font-medium tracking-wide transition",
                active
                  ? isDark
                    ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                    : "border-cyan-500/40 bg-cyan-50 text-cyan-700"
                  : isDark
                    ? "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white"
                    : "border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className={cn("border-t px-4 py-4", isDark ? "border-white/10" : "border-slate-200")}>
        <div className="border border-emerald-400/20 bg-emerald-400/10 p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-emerald-300/80">System Health</p>
          <p
            className={cn(
              "mt-2 font-sans text-sm font-semibold",
              isDark ? "text-white" : "text-slate-900"
            )}
          >
            All services operational
          </p>
          <p className="mt-1 text-xs text-slate-500">99.98% uptime over the last 30 days.</p>
        </div>
      </div>
    </>
  );
}

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { mounted, theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className={cn(
        "crm-shell min-h-screen transition-colors",
        isDark
          ? "bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.12),_transparent_30%),linear-gradient(180deg,_#111827_0%,_#0F172A_48%,_#020617_100%)] text-slate-100"
          : "bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_26%),linear-gradient(180deg,_#F8FBFF_0%,_#EEF5FF_45%,_#E2ECF8_100%)] text-slate-900"
      )}
    >
      {/* Mobile nav sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className={cn(
            "flex w-72 flex-col p-0 sm:max-w-72",
            isDark
              ? "border-white/10 bg-slate-950"
              : "border-slate-200 bg-white"
          )}
        >
          <SidebarContent
            pathname={pathname}
            isDark={isDark}
            onNavigate={() => setMobileMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="grid min-h-screen lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Desktop sidebar */}
        <aside
          className={cn(
            "hidden border-r lg:flex lg:flex-col",
            isDark
              ? "border-white/10 bg-slate-950/80 backdrop-blur"
              : "border-slate-200 bg-white/90 backdrop-blur"
          )}
        >
          <SidebarContent pathname={pathname} isDark={isDark} />
        </aside>

        <div className="flex min-w-0 flex-col">
          <header
            className={cn(
              "sticky top-0 z-20 border-b backdrop-blur-xl",
              isDark
                ? "border-white/10 bg-slate-950/60"
                : "border-slate-200 bg-white/80"
            )}
          >
            <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div className="flex items-center gap-3">
                {/* Hamburger — mobile only */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open navigation menu"
                  className={cn(
                    "lg:hidden",
                    isDark
                      ? "border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                      : "border border-slate-200 text-slate-600 hover:text-slate-900"
                  )}
                >
                  <ListIcon size={20} />
                </Button>
                <div>
                  <p
                    className={cn(
                      "text-[11px] uppercase tracking-[0.28em]",
                      isDark ? "text-slate-500" : "text-slate-400"
                    )}
                  >
                    Enterprise Workspace
                  </p>
                  <h1
                    className={cn(
                      "mt-1 font-sans text-xl font-semibold tracking-tight",
                      isDark ? "text-white" : "text-slate-900"
                    )}
                  >
                    Admin Dashboard / CRM Boilerplate
                  </h1>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative min-w-0 sm:w-72">
                  <MagnifyingGlassIcon
                    className={cn(
                      "pointer-events-none absolute left-2 top-1/2 -translate-y-1/2",
                      isDark ? "text-slate-500" : "text-slate-400"
                    )}
                    size={14}
                  />
                  <Input
                    aria-label="Global search"
                    placeholder="Search contacts, deals, reports"
                    className={cn(
                      "pl-8",
                      isDark
                        ? "border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500"
                        : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                    )}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="border border-cyan-400/20 bg-cyan-400/10 text-cyan-500 dark:text-cyan-200">
                    Live Data Mode
                  </Badge>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
                    className={cn(
                      isDark
                        ? "border-white/10 bg-white/5 text-slate-100"
                        : "border-slate-200 bg-white text-slate-600"
                    )}
                  >
                    {mounted && !isDark ? <MoonIcon size={16} /> : <SunIcon size={16} />}
                  </Button>
                  <div
                    className={cn(
                      "flex items-center gap-3 border px-3 py-2",
                      isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
                    )}
                  >
                    <Avatar size="sm">
                      <AvatarFallback className="bg-cyan-400/20 text-cyan-200">MC</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "truncate font-sans text-xs font-medium",
                          isDark ? "text-white" : "text-slate-900"
                        )}
                      >
                        Maya Chen
                      </p>
                      <p className="truncate text-[11px] text-slate-500">Revenue Ops Admin</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
