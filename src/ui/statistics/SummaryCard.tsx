"use client";

import { ReactNode } from "react";

interface SummaryCardProps {
  title?: string;
  amount?: string | number;
  amountColor?: string;
  shadowColor?: string;
  leftIcon?: ReactNode;
  leftLabel?: string;
  rightIcon?: ReactNode;
  rightLabel?: string;
  loading?: boolean;
}

export default function SummaryCard({
  title,
  amount,
  amountColor = "text-gray-800",
  shadowColor = "none",
  leftIcon,
  leftLabel,
  rightIcon,
  rightLabel,
  loading = false,
}: SummaryCardProps) {
  if (loading) {
    return (
      <div
        className="bg-white rounded-2xl p-6 h-full animate-pulse"
        style={{ boxShadow: `inset 0 0 30px ${shadowColor}` }}
      >
        <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-8 w-20 bg-gray-300 rounded mb-6"></div>

        <div className="flex justify-between mt-2">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col justify-between h-full"
      style={{ boxShadow: `inset 0 0 30px ${shadowColor}` }}
    >
      <h2 className="text-gray-600 font-semibold text-lg mb-2">{title}</h2>

      <div className={`text-4xl font-bold mb-6 ${amountColor}`}>{amount}</div>

      <div className="flex items-center justify-between text-gray-600">
        <div className="flex items-center gap-2">
          {leftIcon && (
            <>
              {leftIcon}
              {leftLabel && <span className="text-sm font-medium">{leftLabel}</span>}
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {rightIcon && (
            <>
              {rightIcon}
              {rightLabel && <span className="text-sm font-medium">{rightLabel}</span>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
