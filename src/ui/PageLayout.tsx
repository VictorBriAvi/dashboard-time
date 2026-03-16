"use client";

// ─────────────────────────────────────────────────────────────────────────────
// PageLayout — wrapper compartido por todas las páginas privadas.
//
// Uso básico (dos columnas — form panel izquierdo + contenido derecho):
//   <PageLayout
//     title="Clientes"
//     subtitle="Gestión de clientes"
//     actions={<button>+ Nuevo</button>}
//     sidebar={<FormPanel>...</FormPanel>}
//   >
//     <GenericDataTable ... />
//   </PageLayout>
//
// Uso full-width (ventas, reportes):
//   <PageLayout title="Ventas" fullWidth>
//     ...
//   </PageLayout>
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  /** Left sidebar panel (form). If omitted → full-width layout */
  sidebar?: React.ReactNode;
  /** Width of the sidebar column (default: 240px) */
  sidebarWidth?: number;
  /** Skip the two-column grid and go full width */
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
        className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 bg-white"
        style={{ borderBottom: "0.5px solid #e5e7eb" }}
      >
        <div>
          <h1 className="text-[15px] font-semibold text-gray-900 leading-snug">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[12px] text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2">{actions}</div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="px-6 py-5">
        {hasSidebar ? (
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: `${sidebarWidth}px minmax(0, 1fr)`,
            }}
          >
            {/* Left sidebar */}
            <aside className="flex flex-col gap-4">{sidebar}</aside>

            {/* Main content */}
            <div className="flex flex-col gap-4 min-w-0">{children}</div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">{children}</div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FormPanel — panel blanco para formularios de creación en el sidebar
// ─────────────────────────────────────────────────────────────────────────────

type FormPanelProps = {
  title: string;
  children: React.ReactNode;
};

export function FormPanel({ title, children }: FormPanelProps) {
  return (
    <div
      className="bg-white rounded-xl p-4 flex flex-col gap-3"
      style={{ border: "0.5px solid #e5e7eb" }}
    >
      <div
        className="pb-3"
        style={{ borderBottom: "0.5px solid #f3f4f6" }}
      >
        <p className="text-[12px] font-semibold text-gray-700">{title}</p>
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ContentCard — panel blanco para tablas / contenido principal
// ─────────────────────────────────────────────────────────────────────────────

type ContentCardProps = {
  title?: string;
  count?: string | number;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
};

export function ContentCard({
  title,
  count,
  toolbar,
  children,
}: ContentCardProps) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
      style={{ border: "0.5px solid #e5e7eb" }}
    >
      {(title || toolbar) && (
        <div
          className="flex items-center justify-between px-5 py-3 gap-4"
          style={{ borderBottom: "0.5px solid #f3f4f6" }}
        >
          {title && (
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[13px] font-semibold text-gray-800">
                {title}
              </span>
              {count !== undefined && (
                <span className="text-[11px] text-gray-400 font-normal">
                  {count}
                </span>
              )}
            </div>
          )}
          {toolbar && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {toolbar}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FilterBar — barra de filtros uniforme
// ─────────────────────────────────────────────────────────────────────────────

type FilterBarProps = {
  children: React.ReactNode;
  onSearch?: () => void;
  onClear?: () => void;
};

export function FilterBar({ children, onSearch, onClear }: FilterBarProps) {
  return (
    <div
      className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 flex-wrap"
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
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Limpiar
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Btn — botones consistentes para el sistema
// ─────────────────────────────────────────────────────────────────────────────

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
  const base =
    "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 select-none";

  const variants: Record<BtnVariant, string> = {
    primary:
      "bg-[#185FA5] text-white hover:bg-[#0c4476] disabled:opacity-50",
    secondary:
      "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 disabled:opacity-50",
    danger:
      "bg-red-600 text-white hover:bg-red-700 disabled:opacity-50",
    ghost:
      "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
          >
            <circle
              cx="6.5"
              cy="6.5"
              r="5"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M6.5 1.5a5 5 0 015 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Cargando…
        </>
      ) : (
        children
      )}
    </button>
  );
}
