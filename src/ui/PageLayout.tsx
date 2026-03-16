"use client";

// ─────────────────────────────────────────────────────────────────────────────
// PageLayout — wrapper responsivo para todas las páginas privadas.
//
// Mobile  (<md): una columna. El sidebar (form) va arriba del contenido.
// Desktop (≥md): dos columnas. Form a la izquierda, contenido a la derecha.
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarWidth?: number;
  fullWidth?: boolean;
  children: React.ReactNode;
};

export function PageLayout({
  title,
  subtitle,
  actions,
  sidebar,
  sidebarWidth = 240,
  fullWidth = false,
  children,
}: Props) {
  const hasSidebar = !!sidebar && !fullWidth;

  return (
    <section className="w-full min-h-full bg-gray-50">
      {/* ── Topbar ── */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 py-3 bg-white"
        style={{ borderBottom: "0.5px solid #e5e7eb" }}
      >
        {/* Espacio para el burger en mobile */}
        <div className="flex items-center gap-3">
          <div className="w-8 md:hidden" /> {/* placeholder para el burger fijo */}
          <div>
            <h1 className="text-[15px] font-semibold text-gray-900 leading-snug">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[12px] text-gray-400 mt-0.5 hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="px-4 md:px-6 py-4 md:py-5">
        {hasSidebar ? (
          <>
            {/* Mobile: columna única — form arriba, tabla abajo */}
            <div className="flex flex-col gap-4 md:hidden">
              {sidebar}
              {children}
            </div>

            {/* Desktop: dos columnas */}
            <div
              className="hidden md:grid gap-5"
              style={{ gridTemplateColumns: `${sidebarWidth}px minmax(0, 1fr)` }}
            >
              <aside className="flex flex-col gap-4">{sidebar}</aside>
              <div className="flex flex-col gap-4 min-w-0">{children}</div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4">{children}</div>
        )}
      </div>
    </section>
  );
}

// ─── FormPanel ────────────────────────────────────────────────────────────────
export function FormPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="bg-white rounded-xl p-4 flex flex-col gap-3"
      style={{ border: "0.5px solid #e5e7eb" }}
    >
      <div className="pb-3" style={{ borderBottom: "0.5px solid #f3f4f6" }}>
        <p className="text-[12px] font-semibold text-gray-700">{title}</p>
      </div>
      {children}
    </div>
  );
}

// ─── ContentCard ──────────────────────────────────────────────────────────────
export function ContentCard({
  title,
  count,
  toolbar,
  children,
}: {
  title?: string;
  count?: string | number;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
      style={{ border: "0.5px solid #e5e7eb" }}
    >
      {(title || toolbar) && (
        <div
          className="flex items-center justify-between px-4 md:px-5 py-3 gap-4"
          style={{ borderBottom: "0.5px solid #f3f4f6" }}
        >
          {title && (
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[13px] font-semibold text-gray-800">{title}</span>
              {count !== undefined && (
                <span className="text-[11px] text-gray-400 font-normal">{count}</span>
              )}
            </div>
          )}
          {toolbar && (
            <div className="flex items-center gap-2 flex-shrink-0">{toolbar}</div>
          )}
        </div>
      )}
      {/* Scroll horizontal en mobile para tablas anchas */}
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

// ─── FilterBar ────────────────────────────────────────────────────────────────
export function FilterBar({
  children,
  onSearch,
  onClear,
}: {
  children: React.ReactNode;
  onSearch?: () => void;
  onClear?: () => void;
}) {
  return (
    <div
      className="bg-white rounded-xl px-4 py-3 flex flex-wrap items-end gap-2 md:gap-3"
      style={{ border: "0.5px solid #e5e7eb" }}
    >
      {children}

      {onSearch && (
        <button
          onClick={onSearch}
          className="px-4 py-2 text-sm rounded-lg font-medium text-white bg-[#185FA5] hover:bg-[#0c4476] transition-all"
        >
          Buscar
        </button>
      )}

      {onClear && (
        <button
          onClick={onClear}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors px-2 py-2"
        >
          Limpiar
        </button>
      )}
    </div>
  );
}

// ─── Btn ──────────────────────────────────────────────────────────────────────
type BtnVariant = "primary" | "secondary" | "danger" | "ghost";

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: BtnVariant;
  loading?: boolean;
};

export function Btn({
  variant = "secondary",
  loading = false,
  children,
  disabled,
  className = "",
  ...rest
}: BtnProps) {
  const base = "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 select-none";

  const variants: Record<BtnVariant, string> = {
    primary:   "bg-[#185FA5] text-white hover:bg-[#0c4476] disabled:opacity-50",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 disabled:opacity-50",
    danger:    "bg-red-600 text-white hover:bg-red-700 disabled:opacity-50",
    ghost:     "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <>
          <svg className="animate-spin" width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2"/>
            <path d="M6.5 1.5a5 5 0 015 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Cargando…
        </>
      ) : children}
    </button>
  );
}
