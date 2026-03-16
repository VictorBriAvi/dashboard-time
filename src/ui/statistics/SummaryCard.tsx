"use client";

import { ReactNode } from "react";

interface SummaryCardProps {
  title?: string;
  amount?: string | number;
  amountColor?: string;
  shadowColor?: string; // mantenido por compatibilidad pero ya no se usa como inset shadow
  leftIcon?: ReactNode;
  leftLabel?: string;
  rightIcon?: ReactNode;
  rightLabel?: string;
  loading?: boolean;
  hideAmount?: boolean;
}

export default function SummaryCard({
  title,
  amount,
  amountColor,
  leftIcon,
  leftLabel,
  rightIcon,
  rightLabel,
  loading = false,
  hideAmount = false,
}: SummaryCardProps) {
  if (loading) {
    return (
      <div
        className="bg-white rounded-xl p-4 animate-pulse"
        style={{ border: "0.5px solid #e5e7eb" }}
      >
        <div className="h-3 w-28 bg-gray-200 rounded mb-3" />
        <div className="h-7 w-20 bg-gray-200 rounded mb-4" />
        <div className="flex justify-between mt-1">
          <div className="h-3 w-20 bg-gray-100 rounded" />
          <div className="h-3 w-20 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  // Determinar color del monto por contenido si no se pasa explícito
  // (compatibilidad con el sistema anterior que pasaba clases Tailwind)
  const amountClass = amountColor ?? "text-gray-900";

  return (
    <div
      className="bg-white rounded-xl p-4 flex flex-col gap-3"
      style={{ border: "0.5px solid #e5e7eb" }}
    >
      {/* Label */}
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </p>

      {/* Monto principal */}
      <div className={`text-2xl font-semibold leading-tight ${amountClass}`}>
        {hideAmount ? (
          <span className="tracking-widest text-gray-300 text-xl">••••••</span>
        ) : (
          amount
        )}
      </div>

      {/* Footer con iconos + labels */}
      {(leftLabel || rightLabel) && (
        <div
          className="flex items-center justify-between pt-2"
          style={{ borderTop: "0.5px solid #f3f4f6" }}
        >
          {leftLabel && (
            <div className="flex items-center gap-1.5">
              {leftIcon && (
                <span className="flex-shrink-0" style={{ fontSize: 14 }}>
                  {leftIcon}
                </span>
              )}
              <span className="text-[11px] text-gray-500 leading-tight">
                {leftLabel}
              </span>
            </div>
          )}

          {rightLabel && (
            <div className="flex items-center gap-1.5">
              {rightIcon && (
                <span className="flex-shrink-0" style={{ fontSize: 14 }}>
                  {rightIcon}
                </span>
              )}
              <span className="text-[11px] text-gray-500 leading-tight">
                {rightLabel}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
