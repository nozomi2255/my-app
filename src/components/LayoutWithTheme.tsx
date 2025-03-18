// components/LayoutWithTheme.tsx
'use client'
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "@/components/ThemeContext";

export default function LayoutWithTheme({ children }: { children: React.ReactNode }) {
  const context = useContext(ThemeContext);

  useEffect(() => {
    if (context) {
      const { theme } = context;
      document.documentElement.classList.remove("light", "dark");
        document.body.classList.remove("light", "dark");
        
        document.documentElement.classList.add(theme);
        document.body.classList.add(theme);
    }
  }, [context?.theme]);

  return <>{children}</>;
}