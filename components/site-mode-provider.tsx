"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { resolveSiteMode, type SiteMode } from "@/lib/site-mode";

type SiteModeContextValue = {
  mode: SiteMode;
  setMode: (nextMode: SiteMode) => void;
  toggleMode: () => void;
};

const SiteModeContext = createContext<SiteModeContextValue | null>(null);

type Props = {
  children: ReactNode;
  initialMode: SiteMode;
};

function persistMode(mode: SiteMode) {
  document.documentElement.setAttribute("data-mode", mode);
  localStorage.setItem("site-mode", mode);
  document.cookie = `SITE_MODE=${mode}; path=/; max-age=31536000`;
}

export function SiteModeProvider({ children, initialMode }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mode, setModeState] = useState<SiteMode>(initialMode);

  const setMode = useCallback(
    (nextMode: SiteMode) => {
      setModeState(nextMode);
      persistMode(nextMode);

      const params = new URLSearchParams(searchParams.toString());
      params.set("mode", nextMode);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const toggleMode = useCallback(() => {
    setMode(mode === "premium" ? "standard" : "premium");
  }, [mode, setMode]);

  useEffect(() => {
    const queryMode = resolveSiteMode(searchParams.get("mode"));
    const storedMode = resolveSiteMode(localStorage.getItem("site-mode"));
    const selected = queryMode || storedMode || initialMode;

    if (selected !== mode) {
      setModeState(selected);
    }

    persistMode(selected);
  }, [initialMode, mode, searchParams]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode
    }),
    [mode, setMode, toggleMode]
  );

  return <SiteModeContext.Provider value={value}>{children}</SiteModeContext.Provider>;
}

export function useSiteMode() {
  const context = useContext(SiteModeContext);
  if (!context) {
    throw new Error("useSiteMode must be used within SiteModeProvider");
  }
  return context;
}