"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { resolveSiteMode, type SiteMode } from "@/lib/site-mode";

type SiteModeContextValue = { mode: SiteMode; setMode: (mode: SiteMode) => void; toggleMode: () => void };
const SiteModeContext = createContext<SiteModeContextValue | null>(null);

function persistMode(mode: SiteMode) {
  document.documentElement.dataset.mode = mode;
  try { localStorage.setItem("site-mode", mode); } catch { /* The mode also works without storage. */ }
}

export function SiteModeProvider({ children, initialMode }: { children: ReactNode; initialMode: SiteMode }) {
  const [mode, setModeState] = useState<SiteMode>(initialMode);
  const setMode = useCallback((nextMode: SiteMode) => {
    persistMode(nextMode);
    setModeState(nextMode);
    const url = new URL(window.location.href);
    url.searchParams.set("mode", nextMode);
    // Visual changes need no server request or React Server Component refresh.
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  useEffect(() => {
    function syncMode() {
      const queryMode = resolveSiteMode(new URLSearchParams(window.location.search).get("mode"));
      const selected = queryMode || resolveSiteMode(document.documentElement.dataset.mode) || initialMode;
      persistMode(selected);
      setModeState(selected);
    }
    syncMode();
    window.addEventListener("popstate", syncMode);
    return () => window.removeEventListener("popstate", syncMode);
  }, [initialMode]);

  const toggleMode = useCallback(() => setMode(mode === "premium" ? "standard" : "premium"), [mode, setMode]);
  const value = useMemo(() => ({ mode, setMode, toggleMode }), [mode, setMode, toggleMode]);
  return <SiteModeContext.Provider value={value}>{children}</SiteModeContext.Provider>;
}

export function useSiteMode() {
  const context = useContext(SiteModeContext);
  if (!context) throw new Error("useSiteMode must be used within SiteModeProvider");
  return context;
}
