"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ModalSize = "sm" | "md" | "lg" | "xl";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  size?: ModalSize;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Prevent closing when clicking the overlay backdrop */
  preventBackdropClose?: boolean;
};

// ─── Size map ─────────────────────────────────────────────────────────────────

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  size = "md",
  children,
  footer,
  preventBackdropClose = false,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.45)" }}
      onClick={preventBackdropClose ? undefined : (e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Panel */}
      <div
        ref={panelRef}
        className={`
          relative w-full ${sizeClasses[size]}
          bg-white rounded-2xl shadow-xl
          flex flex-col max-h-[90vh]
          animate-in fade-in-0 zoom-in-95 duration-150
        `}
        style={{ border: "0.5px solid rgba(0,0,0,0.08)" }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-start justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "0.5px solid #f3f4f6" }}
        >
          <div className="pr-4">
            <h2 className="text-base font-semibold text-gray-900 leading-snug">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 text-sm text-gray-400">{subtitle}</p>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 -mt-0.5 -mr-1 flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            aria-label="Cerrar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* ── Footer (optional) ── */}
        {footer && (
          <div
            className="px-6 py-4 flex-shrink-0 flex items-center justify-between gap-3"
            style={{ borderTop: "0.5px solid #f3f4f6" }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Modal Footer helpers ─────────────────────────────────────────────────────
// Pre-built footer patterns so every modal has the same button layout

type FooterProps = {
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  isDestructive?: boolean;
  leftSlot?: React.ReactNode; // e.g. a total amount label
};

export function ModalFooter({
  onCancel,
  onConfirm,
  confirmLabel = "Guardar",
  cancelLabel = "Cancelar",
  isLoading = false,
  isDestructive = false,
  leftSlot,
}: FooterProps) {
  return (
    <>
      {/* Left slot (e.g. total amount) */}
      <div className="flex-1">{leftSlot}</div>

      {/* Right buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition-all disabled:opacity-50"
        >
          {cancelLabel}
        </button>

        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={`px-4 py-2 text-sm rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isDestructive
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-[#185FA5] text-white hover:bg-[#0c4476]"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
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
              Guardando…
            </span>
          ) : (
            confirmLabel
          )}
        </button>
      </div>
    </>
  );
}

// ─── Modal Section divider ────────────────────────────────────────────────────
// Useful inside modal bodies to separate form sections visually

export function ModalSection({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      {title && (
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

// ─── ModalField ───────────────────────────────────────────────────────────────
// Consistent label + input wrapper used inside modals

export function ModalField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-500">
        {label}
        {required && <span className="ml-0.5 text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}
