"use client";

import Image from "next/image";
import { ArrowLeftIcon, ArrowUpRightIcon, XIcon } from "@phosphor-icons/react";
import { useEffect, useEffectEvent, useState } from "react";

const BACK_URL = "https://k2digitalmedia.ca";
const LOGO_URL = "/Logo.png";

export function K2DemoBanner() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const syncViewportState = useEffectEvent(() => {
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    setIsDesktop(desktop);
    setIsPanelOpen(desktop);
  });

  useEffect(() => {
    syncViewportState();

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => syncViewportState();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[99999] border-b border-cyan-400/20 bg-[linear-gradient(90deg,#0b1224,#0d1a30)] px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-white/60 sm:px-4 sm:text-[11px]">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(47,168,199,0.95)] motion-safe:animate-pulse" />
            <span className="truncate font-medium text-white/72">
              <span className="sm:hidden">Demo by K2 Digital Media</span>
              <span className="hidden sm:inline">This is a demo site built by K2 Digital Media</span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={BACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden border-b border-cyan-400/40 font-semibold tracking-[0.18em] text-cyan-300 transition hover:text-white sm:inline-flex"
            >
              K2 Digital Media
            </a>
            <a
              href={BACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-cyan-400/35 px-3 py-1 text-[9px] font-semibold tracking-[0.18em] text-white/70 transition hover:border-cyan-300 hover:text-white sm:text-[10px]"
            >
              <span>Go Back</span>
              <ArrowUpRightIcon size={12} weight="bold" />
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[99997] border-t border-cyan-400/15 bg-[rgba(8,15,30,0.96)] px-3 py-2 backdrop-blur-xl sm:px-4">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3 text-[9px] uppercase tracking-[0.18em] text-white/45 sm:text-[10px]">
          <div className="flex min-w-0 items-center gap-2">
            <Image src={LOGO_URL} alt="K2 Digital Media" width={18} height={18} className="h-[18px] w-[18px] shrink-0 opacity-75" />
            <span className="truncate">
              Demo by{" "}
              <a
                href={BACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto font-semibold text-cyan-300 transition hover:text-white"
              >
                K2 Digital Media
              </a>
            </span>
          </div>
          <a
            href={BACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto shrink-0 text-white/55 transition hover:text-white"
          >
            <span className="hidden sm:inline">Visit Main Site</span>
            <span className="sm:hidden">Visit Site</span>
          </a>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-[calc(var(--k2-demo-bottom-offset)+1rem)] right-3 z-[99998] flex items-end justify-end lg:right-0 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2">
        <div className="pointer-events-auto flex items-end lg:items-center">
          {isDesktop ? (
            <button
              type="button"
              onClick={() => setIsPanelOpen((current) => !current)}
              aria-expanded={isPanelOpen}
              aria-controls="k2-demo-panel"
              className="flex h-32 items-center justify-center rounded-l-xl border border-r-0 border-cyan-400/30 bg-[#0d1a30] px-2 text-[10px] uppercase tracking-[0.22em] text-cyan-300 transition hover:bg-cyan-400/15"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              <span className="mr-1 text-base leading-none">{isPanelOpen ? "\u203A" : "\u2039"}</span>
              Demo
            </button>
          ) : null}

          <div
            id="k2-demo-panel"
            className={[
              "overflow-hidden border border-cyan-400/25 bg-[linear-gradient(135deg,#080f1e,#0d1a30)] text-white shadow-[-4px_0_24px_rgba(0,0,0,0.4)] transition-all duration-300",
              isDesktop
                ? isPanelOpen
                  ? "w-[220px] rounded-l-3xl border-r-0 px-5 py-5 opacity-100"
                  : "w-0 rounded-l-3xl border-r-0 px-0 py-0 opacity-0"
                : isPanelOpen
                  ? "w-[min(20rem,calc(100vw-1.5rem))] rounded-3xl px-5 py-5 opacity-100"
                  : "w-0 rounded-3xl px-0 py-0 opacity-0",
            ].join(" ")}
            aria-hidden={!isPanelOpen}
          >
            <div className="w-[220px] max-w-full">
              <div className="mb-3 flex items-start justify-between gap-3 lg:hidden">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-cyan-300">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(47,168,199,0.95)] motion-safe:animate-pulse" />
                  Demo Site
                </div>
                <button
                  type="button"
                  onClick={() => setIsPanelOpen(false)}
                  aria-label="Close demo panel"
                  className="rounded-full border border-cyan-400/25 p-1 text-cyan-300 transition hover:bg-cyan-400/10 hover:text-white"
                >
                  <XIcon size={14} />
                </button>
              </div>

              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/8">
                  <Image src={LOGO_URL} alt="K2 Digital Media" width={48} height={48} className="h-12 w-12 object-contain" />
                </div>
                <div className="flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(47,168,199,0.95)] motion-safe:animate-pulse" />
                  Demo Site
                </div>
                <p className="text-sm leading-6 text-white/68">
                  This demo was built by <strong className="font-semibold text-white">K2 Digital Media</strong>.
                </p>
                <a
                  href={BACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#2fa8c7,#1d7a99)] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:scale-[0.98] hover:opacity-85"
                >
                  <ArrowLeftIcon size={12} weight="bold" />
                  Back to K2DM
                </a>
              </div>
            </div>
          </div>

          {!isDesktop && !isPanelOpen ? (
            <button
              type="button"
              onClick={() => setIsPanelOpen(true)}
              aria-controls="k2-demo-panel"
              aria-expanded={false}
              className="rounded-full border border-cyan-400/35 bg-[#0d1a30] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-cyan-300 shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition hover:bg-cyan-400/15"
            >
              Demo
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
