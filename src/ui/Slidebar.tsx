"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/useAuthStore";

// ─────────────────────────────────────────────────────────────────────────────
// Constantes de ancho
// ─────────────────────────────────────────────────────────────────────────────
export const SIDEBAR_EXPANDED = 210;
export const SIDEBAR_COLLAPSED = 56;

// ─────────────────────────────────────────────────────────────────────────────
// Íconos SVG
// ─────────────────────────────────────────────────────────────────────────────
const Icons = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="9.5" width="4" height="5" rx="1" fill="currentColor" opacity=".6"/>
      <rect x="6" y="5.5" width="4" height="9" rx="1" fill="currentColor"/>
      <rect x="11" y="1.5" width="4" height="13" rx="1" fill="currentColor" opacity=".6"/>
    </svg>
  ),
  sales: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 2.5h9.5l2 3-2 3H2V2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <circle cx="5" cy="13" r="1.3" fill="currentColor"/>
      <circle cx="9" cy="13" r="1.3" fill="currentColor"/>
    </svg>
  ),
  clients: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5.5" r="2.75" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M2 14c0-2.5 2.7-4 6-4s6 1.5 6 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  employees: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="5.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M1 14c0-2.2 2-3.5 4.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="11" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M7.5 14c0-1.8 1.5-2.7 3.5-2.7s3.5.9 3.5 2.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  services: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5l1.8 4.5h4.7L11 8.8l1.5 4.7L8 11l-4.5 2.5L5 8.8 1.5 6h4.7L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  expenses: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.3" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M1.5 7h13" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="5.5" cy="10.5" r="1" fill="currentColor"/>
    </svg>
  ),
  payment: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5l1.5 4H14l-3.5 2.5 1.5 4.5L8 10l-4 2.5 1.5-4.5L2 5.5h4.5L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  logout: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M5.5 2H3a1 1 0 00-1 1v10a1 1 0 001 1h2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M11 5.5l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 8H7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  chevronRight: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chevronDown: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  arrowLeft: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M8 3L5 6.5 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  arrowRight: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M5 3l3 3.5-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip — solo visible cuando el sidebar está colapsado
// ─────────────────────────────────────────────────────────────────────────────
function Tooltip({ label, show }: { label: string; show: boolean }) {
  if (!show) return null;
  return (
    <div
      style={{
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
      }}
    >
      {label}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NavItem component
// ─────────────────────────────────────────────────────────────────────────────
type NavItemDef = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
};

function NavItem({
  item,
  isCollapsed,
  isActive,
  isOpen,
  onToggle,
  onNavigate,
  pathname,
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
              {/* ✅ FIX: la flecha es un botón separado — no mezcla navegación con toggle */}
              {hasChildren && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // evita que dispare el navigate del div padre
                    onToggle();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: isActive ? "#185FA5" : "#9ca3af",
                    flexShrink: 0,
                    padding: 0,
                  }}
                  onMouseOver={(e) => {
                    e.stopPropagation();
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.06)";
                  }}
                  onMouseOut={(e) => {
                    e.stopPropagation();
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                  aria-label={isOpen ? "Colapsar" : "Expandir"}
                >
                  {isOpen ? Icons.chevronDown : Icons.chevronRight}
                </button>
              )}
            </>
          )}
        </div>

        {/* Tooltip when collapsed */}
        <Tooltip label={item.label} show={showTooltip && isCollapsed} />
      </div>

      {/* Sub-items (only when expanded) */}
      {hasChildren && isOpen && !isCollapsed && (
        <div
          style={{
            marginLeft: 16,
            paddingLeft: 12,
            borderLeft: "1.5px solid #e5e7eb",
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          {item.children!.map((child) => {
            const childActive = pathname === child.href;
            return (
              <Link
                key={child.href}
                href={child.href}
                style={{
                  display: "block",
                  padding: "6px 10px",
                  borderRadius: 7,
                  fontSize: 11.5,
                  color: childActive ? "#185FA5" : "#9ca3af",
                  background: childActive ? "#E6F1FB" : "transparent",
                  fontWeight: childActive ? 500 : 400,
                  textDecoration: "none",
                  transition: "all 0.1s",
                  marginBottom: 1,
                }}
                onMouseOver={(e) => {
                  if (!childActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#374151";
                    (e.currentTarget as HTMLAnchorElement).style.background = "#f9fafb";
                  }
                }}
                onMouseOut={(e) => {
                  if (!childActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af";
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }
                }}
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

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar principal
// ─────────────────────────────────────────────────────────────────────────────
export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { storeName, storeType, vocab, clear } = useAuthStore();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  // Notifica al SidebarAwareMain cuando cambia el estado
  const handleToggle = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    window.dispatchEvent(
      new CustomEvent("sidebar-toggle", { detail: { collapsed: next } })
    );
  };

  const sidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  // Auto-open group based on current path
  useEffect(() => {
    if (pathname.startsWith("/serviceType") || pathname.startsWith("/services")) {
      setOpenGroup("services");
    } else if (pathname.startsWith("/expenses")) {
      setOpenGroup("expenses");
    }
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      clear();
      router.push("/login");
      router.refresh();
    } catch {
      // silent
    }
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const navItems: NavItemDef[] = [
    { key: "dashboard", label: "Dashboard",        href: "/",           icon: Icons.dashboard },
    { key: "sales",     label: `${vocab.sale}s`,   href: "/sales",      icon: Icons.sales     },
    { key: "clients",   label: `${vocab.client}s`, href: "/client",     icon: Icons.clients   },
    ...(storeType !== "personal"
      ? [{ key: "employees", label: `${vocab.employee}s`, href: "/employee", icon: Icons.employees }]
      : []),
    {
      key: "services",
      label: `${vocab.service}s`,
      href: "/serviceType",
      icon: Icons.services,
      children: [
        { label: `${vocab.serviceCategory}s`, href: "/serviceType/categories" },
      ],
    },
    {
      key: "expenses",
      label: `${vocab.expense}s`,
      href: "/expenses",
      icon: Icons.expenses,
      children: [
        { label: `${vocab.expenseCategory}s`, href: "/expenses/expensesCategorie" },
      ],
    },
    {
      key: "payment",
      label: vocab.paymentType,
      href: "/paymentType",
      icon: Icons.payment,
    },
  ];

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: sidebarWidth,
        background: "#ffffff",
        borderRight: "0.5px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        zIndex: 30,
      }}
    >
      {/* ── Logo ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isCollapsed ? 0 : 10,
          padding: isCollapsed ? "14px 0" : "14px 14px",
          justifyContent: isCollapsed ? "center" : "flex-start",
          borderBottom: "0.5px solid #f3f4f6",
          flexShrink: 0,
          minHeight: 56,
          transition: "padding 0.22s",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "#185FA5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="9" width="4" height="6" rx="1" fill="white" opacity=".8"/>
            <rect x="6" y="5" width="4" height="10" rx="1" fill="white"/>
            <rect x="11" y="1" width="4" height="14" rx="1" fill="white" opacity=".8"/>
          </svg>
        </div>

        {!isCollapsed && (
          <div style={{ minWidth: 0, overflow: "hidden" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              AdminTime
            </div>
            <div style={{ fontSize: 10, color: "#9ca3af", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {storeName || "Mi Negocio"}
            </div>
          </div>
        )}
      </div>

      {/* ── Nav ── */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: isCollapsed ? "10px 6px" : "10px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          transition: "padding 0.22s",
        }}
      >
        {navItems.map((item) => (
          <NavItem
            key={item.key}
            item={item}
            isCollapsed={isCollapsed}
            isActive={isActive(item.href)}
            isOpen={openGroup === item.key}
            onToggle={() => setOpenGroup(openGroup === item.key ? null : item.key)}
            onNavigate={(href) => router.push(href)}
            pathname={pathname}
          />
        ))}
      </nav>

      {/* ── Footer / User ── */}
      <div
        style={{
          borderTop: "0.5px solid #f3f4f6",
          padding: isCollapsed ? "10px 6px" : "10px 8px",
          flexShrink: 0,
          transition: "padding 0.22s",
        }}
      >
        {isCollapsed ? (
          // Collapsed: solo avatar + tooltip logout
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#E6F1FB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 600,
                color: "#185FA5",
                flexShrink: 0,
              }}
            >
              {storeName ? storeName.charAt(0).toUpperCase() : "A"}
            </div>
            <button
              onClick={handleLogout}
              title="Cerrar sesión"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                borderRadius: 7,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#9ca3af",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#fef2f2";
                (e.currentTarget as HTMLButtonElement).style.color = "#ef4444";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af";
              }}
            >
              {Icons.logout}
            </button>
          </div>
        ) : (
          // Expanded: avatar + name + logout
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "4px 6px" }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#E6F1FB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 600,
                color: "#185FA5",
                flexShrink: 0,
              }}
            >
              {storeName ? storeName.charAt(0).toUpperCase() : "A"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11.5, fontWeight: 500, color: "#1f2937", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {storeName || "Mi Negocio"}
              </div>
              <div style={{ fontSize: 10, color: "#9ca3af" }}>Admin</div>
            </div>
            <button
              onClick={handleLogout}
              title="Cerrar sesión"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: 7,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#9ca3af",
                flexShrink: 0,
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#fef2f2";
                (e.currentTarget as HTMLButtonElement).style.color = "#ef4444";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af";
              }}
            >
              {Icons.logout}
            </button>
          </div>
        )}
      </div>

      {/* ── Toggle button (flecha en el borde derecho) ── */}
      <button
        onClick={handleToggle}
        aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        style={{
          position: "absolute",
          top: "50%",
          right: -12,
          transform: "translateY(-50%)",
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#ffffff",
          border: "1.5px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#6b7280",
          boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
          zIndex: 40,
          transition: "all 0.15s",
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#185FA5";
          (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#185FA5";
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
          (e.currentTarget as HTMLButtonElement).style.color = "#6b7280";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e7eb";
        }}
      >
        {isCollapsed ? Icons.arrowRight : Icons.arrowLeft}
      </button>
    </aside>
  );
}
