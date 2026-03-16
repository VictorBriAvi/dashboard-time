"use client";

import { useEffect, useState } from "react";
import { SIDEBAR_EXPANDED, SIDEBAR_COLLAPSED } from "@/ui/Slidebar";

// ─────────────────────────────────────────────────────────────────────────────
// SidebarAwareMain
//
// Client component que ajusta el margin-left del <main> en sync con
// la animación del sidebar. Escucha el evento "sidebar-toggle" que
// dispara el Sidebar cuando el usuario hace click en el botón de colapsar.
//
// Uso: envuelve el {children} en (private)/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────

export function SidebarAwareMain({ children }: { children: React.ReactNode }) {
  const [marginLeft, setMarginLeft] = useState(SIDEBAR_EXPANDED);

  useEffect(() => {
    const handler = (e: CustomEvent<{ collapsed: boolean }>) => {
      setMarginLeft(e.detail.collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED);
    };

    window.addEventListener("sidebar-toggle", handler as EventListener);
    return () => window.removeEventListener("sidebar-toggle", handler as EventListener);
  }, []);

  return (
    <main
      style={{
        marginLeft,
        minHeight: "100vh",
        background: "#f9fafb",
        transition: "margin-left 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </main>
  );
}
