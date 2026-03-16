"use client";

import { useEffect, useState } from "react";
import { SIDEBAR_EXPANDED, SIDEBAR_COLLAPSED } from "@/ui/Slidebar";

export function SidebarAwareMain({ children }: { children: React.ReactNode }) {
  const [marginLeft, setMarginLeft] = useState(SIDEBAR_EXPANDED);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en mobile al montar y al resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768; // breakpoint md de Tailwind
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Escuchar toggle del sidebar (solo desktop)
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
        // En mobile: sin margin (el sidebar es un drawer overlay)
        // En desktop: margin dinámico según estado del sidebar
        marginLeft: isMobile ? 0 : marginLeft,
        minHeight: "100vh",
        background: "#f9fafb",
        transition: "margin-left 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
        // Espacio extra arriba en mobile para el burger button
        paddingTop: isMobile ? 8 : 0,
      }}
    >
      {children}
    </main>
  );
}
