"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const defaultColors = ["#3b82f6", "#ef4444", "#10b981"];

interface MultiBarConfig {
  key: string;
  label: string;
  color?: string;
}

interface BarChartCustomProps {
  title: string;
  data: any[];
  loading: boolean;
  dataKeyName?: string;
  dataKeyValue?: string;
  bars?: MultiBarConfig[];
  height?: number;
  orientation?: "vertical" | "horizontal";
}

const currencyFormatter = (value: number) =>
  `$ ${value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function BarChartCustom({
  title,
  data,
  loading,
  dataKeyName = "name",
  dataKeyValue = "value",
  bars,
  height = 350,
  orientation = "vertical",
}: BarChartCustomProps) {
  const isHorizontal = orientation === "horizontal";

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
        <div className="h-6 w-52 bg-gray-300 rounded mb-6"></div>
        <div className="w-full bg-gray-100 rounded" style={{ height }} />
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-700 mb-6">{title}</h2>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout={isHorizontal ? "vertical" : "horizontal"}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {isHorizontal ? (
            <>
              <XAxis
                type="number"
                tickFormatter={currencyFormatter}
              />
              <YAxis dataKey={dataKeyName} type="category" width={150} />
            </>
          ) : (
            <>
              <XAxis dataKey={dataKeyName} />
              <YAxis tickFormatter={currencyFormatter} />
            </>
          )}

            <Tooltip
              formatter={(value) =>
                typeof value === "number" ? currencyFormatter(value) : value
              }
            />

          <Legend />

          {bars && bars.length > 0 ? (
            bars.map((bar, index) => (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                name={bar.label}
                fill={bar.color || defaultColors[index % defaultColors.length]}
                radius={[6, 6, 0, 0]}
              />
            ))
          ) : (
            <Bar
              dataKey={dataKeyValue}
              fill={defaultColors[0]}
              radius={[6, 6, 0, 0]}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
