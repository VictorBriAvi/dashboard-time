"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DEFAULT_COLORS = ["#185FA5", "#ef4444", "#3B6D11", "#854F0B"];

interface MultiBarConfig {
  key: string;
  label: string;
  color?: string;
}

interface BarChartCustomProps {
  title: string;
  data: any[];
  loading?: boolean;
  dataKeyName?: string;
  dataKeyValue?: string;
  bars?: MultiBarConfig[];
  height?: number;
  orientation?: "vertical" | "horizontal";
}

const currencyFormatter = (value: number) =>
  `$${value.toLocaleString("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

export default function BarChartCustom({
  title,
  data,
  loading = false,
  dataKeyName = "name",
  dataKeyValue = "value",
  bars,
  height = 260,
  orientation = "vertical",
}: BarChartCustomProps) {
  const isHorizontal = orientation === "horizontal";

  if (loading) {
    return (
      <div style={{ border: "0.5px solid #e5e7eb" }} className="bg-white rounded-xl p-5 animate-pulse">
        <div className="h-4 w-48 bg-gray-200 rounded mb-5" />
        <div className="flex items-end gap-2" style={{ height }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-gray-200 rounded-t"
              style={{ height: `${30 + (i % 3) * 25}%` }}
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
              <rect x="1" y="9" width="3" height="6" rx="1" fill="#d1d5db"/>
              <rect x="5.5" y="5" width="3" height="10" rx="1" fill="#d1d5db"/>
              <rect x="10" y="1" width="3" height="14" rx="1" fill="#d1d5db"/>
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
        <BarChart
          data={data}
          layout={isHorizontal ? "vertical" : "horizontal"}
          margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />

          {isHorizontal ? (
            <>
              <XAxis
                type="number"
                tickFormatter={currencyFormatter}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey={dataKeyName}
                type="category"
                width={120}
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={dataKeyName}
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={currencyFormatter}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
            </>
          )}

          <Tooltip
            formatter={(value) =>
              typeof value === "number" ? currencyFormatter(value) : value
            }
            contentStyle={{
              borderRadius: 8,
              border: "0.5px solid #e5e7eb",
              fontSize: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            cursor={{ fill: "#f9fafb" }}
          />

          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
            iconType="circle"
            iconSize={8}
          />

          {bars && bars.length > 0 ? (
            bars.map((bar, index) => (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                name={bar.label}
                fill={bar.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                radius={isHorizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
                maxBarSize={28}
              />
            ))
          ) : (
            <Bar
              dataKey={dataKeyValue}
              fill={DEFAULT_COLORS[0]}
              radius={isHorizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              maxBarSize={28}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
