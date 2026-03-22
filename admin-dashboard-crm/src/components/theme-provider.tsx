"use client";

import { createContext, PropsWithChildren, useContext, useEffect, useState, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  mounted: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const emptySubscribe = () => () => {};

function getPreferredTheme(): Theme {
  if (typeof document !== "undefined") {
    const rootTheme = document.documentElement.dataset.theme;

    if (rootTheme === "light" || rootTheme === "dark") {
      return rootTheme;
    }
  }

  if (typeof window !== "undefined") {
    const storedTheme = window.localStorage.getItem("crm-theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [theme, setTheme] = useState<Theme>(getPreferredTheme);

  useEffect(() => {
    applyTheme(theme);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("crm-theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        mounted,
        theme,
        setTheme,
        toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
