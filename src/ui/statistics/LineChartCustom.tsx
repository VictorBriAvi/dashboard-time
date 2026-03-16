"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineChartCustomProps {
  title: string;
  data: Record<string, any>[];
  lines: string[];
  xAxisKey: string;
  colors?: string[];
  height?: number;
  formatter?: (value?: number) => string;
  loading?: boolean;
}

// Paleta del design system
const DEFAULT_COLORS = ["#3B6D11", "#ef4444", "#185FA5", "#854F0B"];

const defaultFormatter = (value?: number) =>
  typeof value === "number"
    ? `$${value.toLocaleString("es-AR", { minimumFractionDigits: 0 })}`
    : "-";

export default function LineChartCustom({
  title,
  data,
  lines,
  xAxisKey,
  colors = DEFAULT_COLORS,
  height = 260,
  formatter = defaultFormatter,
  loading = false,
}: LineChartCustomProps) {
  if (loading) {
    return (
      <div style={{ border: "0.5px solid #e5e7eb" }} className="bg-white rounded-xl p-5 animate-pulse">
        <div className="h-4 w-52 bg-gray-200 rounded mb-5" />
        <div className="flex items-end gap-1" style={{ height }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-gray-100 rounded-t"
              style={{ height: `${20 + (i % 5) * 15}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={{ border: "0.5px solid #e5e7eb" }} className="bg-white rounded-xl p-5">
        <p className="text-[12px] font-semibold text-gray-700 mb-4">{title}</p>
        <div className="flex flex-col items-center justify-center py-10 gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 12L5 7l3 3 4-5 3 2" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-xs text-gray-400">Sin datos para mostrar</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ border: "0.5px solid #e5e7eb" }} className="bg-white rounded-xl p-5">
      <p className="text-[12px] font-semibold text-gray-700 mb-4">{title}</p>

      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />

          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) =>
              typeof v === "number"
                ? `$${(v / 1000).toFixed(0)}k`
                : v
            }
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />

          <Tooltip
            formatter={(value) =>
              formatter(typeof value === "number" ? value : undefined)
            }
            contentStyle={{
              borderRadius: 8,
              border: "0.5px solid #e5e7eb",
              fontSize: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
          />

          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
            iconType="circle"
            iconSize={8}
          />

          {lines.map((lineKey, index) => (
            <Line
              key={lineKey}
              type="monotone"
              dataKey={lineKey}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
