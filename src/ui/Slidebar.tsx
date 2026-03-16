"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/useAuthStore";

// ─── Constantes ───────────────────────────────────────────────────────────────
export const SIDEBAR_EXPANDED  = 210;
export const SIDEBAR_COLLAPSED = 56;

// ─── Íconos ───────────────────────────────────────────────────────────────────
const Icons = {
  dashboard: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="9.5" width="4" height="5" rx="1" fill="currentColor" opacity=".6"/><rect x="6" y="5.5" width="4" height="9" rx="1" fill="currentColor"/><rect x="11" y="1.5" width="4" height="13" rx="1" fill="currentColor" opacity=".6"/></svg>,
  sales:     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2.5h9.5l2 3-2 3H2V2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="5" cy="13" r="1.3" fill="currentColor"/><circle cx="9" cy="13" r="1.3" fill="currentColor"/></svg>,
  clients:   <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.75" stroke="currentColor" strokeWidth="1.3"/><path d="M2 14c0-2.5 2.7-4 6-4s6 1.5 6 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  employees: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 14c0-2.2 2-3.5 4.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="11" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.3"/><path d="M7.5 14c0-1.8 1.5-2.7 3.5-2.7s3.5.9 3.5 2.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  services:  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l1.8 4.5h4.7L11 8.8l1.5 4.7L8 11l-4.5 2.5L5 8.8 1.5 6h4.7L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  expenses:  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3.5" width="13" height="9" rx="1.3" stroke="currentColor" strokeWidth="1.3"/><path d="M1.5 7h13" stroke="currentColor" strokeWidth="1.3"/><circle cx="5.5" cy="10.5" r="1" fill="currentColor"/></svg>,
  payment:   <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l1.5 4H14l-3.5 2.5 1.5 4.5L8 10l-4 2.5 1.5-4.5L2 5.5h4.5L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  logout:    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5.5 2H3a1 1 0 00-1 1v10a1 1 0 001 1h2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M11 5.5l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 8H7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  chevronRight: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  chevronDown:  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  arrowLeft:    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 3L5 6.5 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  arrowRight:   <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M5 3l3 3.5-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  menu:         <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  close:        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
};

// ─── Tooltip (solo desktop colapsado) ────────────────────────────────────────
function Tooltip({ label, show }: { label: string; show: boolean }) {
  if (!show) return null;
  return (
    <div style={{
      position: "absolute",
      left: "calc(100% + 10px)",
      top: "50%",
      transform: "translateY(-50%)",
      background: "#1f2937",
      color: "#fff",
      fontSize: 11,
      fontWeight: 500,
      padding: "4px 9px",
      borderRadius: 6,
      whiteSpace: "nowrap",
      pointerEvents: "none",
      zIndex: 100,
      boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
    }}>
      {label}
    </div>
  );
}

// ─── NavItem ──────────────────────────────────────────────────────────────────
type NavItemDef = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
};

function NavItem({
  item, isCollapsed, isActive, isOpen, onToggle, onNavigate, pathname,
}: {
  item: NavItemDef;
  isCollapsed: boolean;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (href: string) => void;
  pathname: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const hasChildren = !!item.children?.length;

  return (
    <div>
      <div style={{ position: "relative" }}>
        <div
          onMouseEnter={() => isCollapsed && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => onNavigate(item.href)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: isCollapsed ? 0 : 9,
            padding: isCollapsed ? "8px 0" : "7px 10px",
            justifyContent: isCollapsed ? "center" : "flex-start",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 12.5,
            fontWeight: isActive ? 500 : 400,
            color: isActive ? "#185FA5" : "#6b7280",
            background: isActive ? "#E6F1FB" : "transparent",
            transition: "all 0.12s",
            userSelect: "none",
            position: "relative",
          }}
          onMouseOver={(e) => {
            if (!isActive) {
              (e.currentTarget as HTMLDivElement).style.background = "#f9fafb";
              (e.currentTarget as HTMLDivElement).style.color = "#1f2937";
            }
          }}
          onMouseOut={(e) => {
            if (!isActive) {
              (e.currentTarget as HTMLDivElement).style.background = "transparent";
              (e.currentTarget as HTMLDivElement).style.color = "#6b7280";
            }
          }}
        >
          <span style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
            {item.icon}
          </span>

          {!isCollapsed && (
            <>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.label}
              </span>
              {hasChildren && (
                <button
                  onClick={(e) => { e.stopPropagation(); onToggle(); }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 20, height: 20, borderRadius: 4, border: "none",
                    background: "transparent", cursor: "pointer",
                    color: isActive ? "#185FA5" : "#9ca3af", flexShrink: 0, padding: 0,
                  }}
                  onMouseOver={(e) => { e.stopPropagation(); (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.06)"; }}
                  onMouseOut={(e) => { e.stopPropagation(); (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  {isOpen ? Icons.chevronDown : Icons.chevronRight}
                </button>
              )}
            </>
          )}
        </div>
        <Tooltip label={item.label} show={showTooltip && isCollapsed} />
      </div>

      {/* Sub-items */}
      {hasChildren && isOpen && !isCollapsed && (
        <div style={{ marginLeft: 16, paddingLeft: 12, borderLeft: "1.5px solid #e5e7eb", marginTop: 2, marginBottom: 2 }}>
          {item.children!.map((child) => {
            const childActive = pathname === child.href;
            return (
              <Link
                key={child.href}
                href={child.href}
                style={{
                  display: "block", padding: "6px 10px", borderRadius: 7,
                  fontSize: 11.5,
                  color: childActive ? "#185FA5" : "#9ca3af",
                  background: childActive ? "#E6F1FB" : "transparent",
                  fontWeight: childActive ? 500 : 400,
                  textDecoration: "none", transition: "all 0.1s", marginBottom: 1,
                }}
                onMouseOver={(e) => { if (!childActive) { (e.currentTarget as HTMLAnchorElement).style.color = "#374151"; (e.currentTarget as HTMLAnchorElement).style.background = "#f9fafb"; } }}
                onMouseOut={(e) => { if (!childActive) { (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; } }}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Contenido del sidebar (reutilizado en desktop y mobile) ──────────────────
function SidebarContent({
  isCollapsed,
  onToggle,
  onNavigate,
  onClose,
  isMobile = false,
}: {
  isCollapsed: boolean;
  onToggle?: () => void;
  onNavigate: (href: string) => void;
  onClose?: () => void;
  isMobile?: boolean;
}) {
  const pathname = usePathname();
  const { storeName, storeType, vocab, clear } = useAuthStore();
  const router = useRouter();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    if (pathname.startsWith("/serviceType")) setOpenGroup("services");
    else if (pathname.startsWith("/expenses"))   setOpenGroup("expenses");
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      clear();
      router.push("/login");
      router.refresh();
    } catch { /* silent */ }
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const navItems: NavItemDef[] = [
    { key: "dashboard", label: "Dashboard",          href: "/",           icon: Icons.dashboard },
    { key: "sales",     label: `${vocab.sale}s`,     href: "/sales",      icon: Icons.sales     },
    { key: "clients",   label: `${vocab.client}s`,   href: "/client",     icon: Icons.clients   },
    ...(storeType !== "personal"
      ? [{ key: "employees", label: `${vocab.employee}s`, href: "/employee", icon: Icons.employees }]
      : []),
    {
      key: "services",
      label: `${vocab.service}s`,
      href: "/serviceType",
      icon: Icons.services,
      children: [{ label: `${vocab.serviceCategory}s`, href: "/serviceType/categories" }],
    },
    {
      key: "expenses",
      label: `${vocab.expense}s`,
      href: "/expenses",
      icon: Icons.expenses,
      children: [{ label: `${vocab.expenseCategory}s`, href: "/expenses/expensesCategorie" }],
    },
    { key: "payment", label: vocab.paymentType, href: "/paymentType", icon: Icons.payment },
  ];

  return (
    <>
      {/* Logo */}
      <div style={{
        display: "flex", alignItems: "center",
        gap: isCollapsed && !isMobile ? 0 : 10,
        padding: isCollapsed && !isMobile ? "14px 0" : "14px 14px",
        justifyContent: isCollapsed && !isMobile ? "center" : "flex-start",
        borderBottom: "0.5px solid #f3f4f6",
        flexShrink: 0, minHeight: 56, transition: "padding 0.22s", overflow: "hidden",
      }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: "#185FA5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="9" width="4" height="6" rx="1" fill="white" opacity=".8"/>
            <rect x="6" y="5" width="4" height="10" rx="1" fill="white"/>
            <rect x="11" y="1" width="4" height="14" rx="1" fill="white" opacity=".8"/>
          </svg>
        </div>
        {(!isCollapsed || isMobile) && (
          <div style={{ minWidth: 0, overflow: "hidden", flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              AdminTime
            </div>
            <div style={{ fontSize: 10, color: "#9ca3af", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {storeName || "Mi Negocio"}
            </div>
          </div>
        )}
        {/* Botón X en mobile */}
        {isMobile && onClose && (
          <button
            onClick={onClose}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 7, border: "none", background: "transparent", cursor: "pointer", color: "#6b7280", flexShrink: 0 }}
          >
            {Icons.close}
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{
        flex: 1, overflowY: "auto", overflowX: "hidden",
        padding: isCollapsed && !isMobile ? "10px 6px" : "10px 8px",
        display: "flex", flexDirection: "column", gap: 2,
        transition: "padding 0.22s",
      }}>
        {navItems.map((item) => (
          <NavItem
            key={item.key}
            item={item}
            isCollapsed={isCollapsed && !isMobile}
            isActive={isActive(item.href)}
            isOpen={openGroup === item.key}
            onToggle={() => setOpenGroup(openGroup === item.key ? null : item.key)}
            onNavigate={(href) => { onNavigate(href); if (isMobile && onClose) onClose(); }}
            pathname={pathname}
          />
        ))}
      </nav>

      {/* Footer */}
      <div style={{ borderTop: "0.5px solid #f3f4f6", padding: isCollapsed && !isMobile ? "10px 6px" : "10px 8px", flexShrink: 0, transition: "padding 0.22s" }}>
        {isCollapsed && !isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E6F1FB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#185FA5" }}>
              {storeName ? storeName.charAt(0).toUpperCase() : "A"}
            </div>
            <button onClick={handleLogout} title="Cerrar sesión" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 7, border: "none", background: "transparent", cursor: "pointer", color: "#9ca3af" }}
              onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#fef2f2"; (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af"; }}
            >
              {Icons.logout}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "4px 6px" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#E6F1FB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#185FA5", flexShrink: 0 }}>
              {storeName ? storeName.charAt(0).toUpperCase() : "A"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11.5, fontWeight: 500, color: "#1f2937", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {storeName || "Mi Negocio"}
              </div>
              <div style={{ fontSize: 10, color: "#9ca3af" }}>Admin</div>
            </div>
            <button onClick={handleLogout} title="Cerrar sesión" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 7, border: "none", background: "transparent", cursor: "pointer", color: "#9ca3af", flexShrink: 0 }}
              onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#fef2f2"; (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af"; }}
            >
              {Icons.logout}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Sidebar principal ────────────────────────────────────────────────────────
export function Sidebar() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);

  // ✅ FIX: detectar mobile por JS — no dependemos de clases Tailwind para show/hide
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleToggle = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    window.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: { collapsed: next } }));
  };

  const sidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  // ── MOBILE ──────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        {/* Burger */}
        <button
          onClick={() => setMobileOpen(true)}
          style={{
            position: "fixed", top: 12, left: 12, zIndex: 50,
            width: 38, height: 38, borderRadius: 9,
            border: "0.5px solid #e5e7eb", background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#374151",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          {Icons.menu}
        </button>

        {/* Backdrop */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.45)", zIndex: 40,
            }}
          />
        )}

        {/* Drawer */}
        <aside style={{
          position: "fixed", top: 0,
          left: mobileOpen ? 0 : -260,
          width: 240, height: "100vh",
          background: "#fff",
          borderRight: "0.5px solid #e5e7eb",
          display: "flex", flexDirection: "column",
          zIndex: 50,
          transition: "left 0.25s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
        }}>
          <SidebarContent
            isCollapsed={false}
            isMobile
            onNavigate={(href) => router.push(href)}
            onClose={() => setMobileOpen(false)}
          />
        </aside>
      </>
    );
  }

  // ── DESKTOP ─────────────────────────────────────────────────────────────────
  return (
    <aside style={{
      position: "fixed", top: 0, left: 0,
      height: "100vh", width: sidebarWidth,
      background: "#fff",
      borderRight: "0.5px solid #e5e7eb",
      display: "flex", flexDirection: "column",
      transition: "width 0.22s cubic-bezier(0.4,0,0.2,1)",
      overflow: "hidden", zIndex: 30,
    }}>
      <SidebarContent
        isCollapsed={isCollapsed}
        onToggle={handleToggle}
        onNavigate={(href) => router.push(href)}
      />

      {/* Toggle arrow */}
      <button
        onClick={handleToggle}
        aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        style={{
          position: "absolute", top: "50%", right: -12,
          transform: "translateY(-50%)",
          width: 24, height: 24, borderRadius: "50%",
          background: "#fff", border: "1.5px solid #e5e7eb",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#6b7280",
          boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
          zIndex: 40, transition: "all 0.15s",
        }}
        onMouseOver={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#185FA5"; b.style.color = "#fff"; b.style.borderColor = "#185FA5"; }}
        onMouseOut={(e)  => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#fff"; b.style.color = "#6b7280"; b.style.borderColor = "#e5e7eb"; }}
      >
        {isCollapsed ? Icons.arrowRight : Icons.arrowLeft}
      </button>
    </aside>
  );
}
