// src/ui/LineChartCustom.tsx
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

const defaultColors = ["#10b981", "#ef4444", "#3b82f6", "#f59e0b"];

export default function LineChartCustom({
  title,
  data,
  lines,
  xAxisKey,
  colors = defaultColors,
  height = 350,
  formatter = (value?: number) =>
    typeof value === "number" ? `$${value.toLocaleString("es-AR")}` : "-",
  loading = false,
}: LineChartCustomProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-300 rounded mb-6"></div>

        <div className="w-full bg-gray-100 rounded" style={{ height }}>
          {/* Base del gráfico */}
          <div className="h-full flex items-end gap-3 p-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-300 rounded w-6"
                style={{
                  height: `${30 + Math.random() * 50}%`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">{title}</h2>

      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey={xAxisKey} tick={{ fill: "#374151" }} />

          <YAxis tick={{ fill: "#374151" }} />
          <Tooltip
            formatter={(value) =>
              formatter(typeof value === "number" ? value : undefined)
            }
          />

          <Legend />

          {lines.map((lineKey, index) => (
            <Line
              key={lineKey}
              type="monotone"
              dataKey={lineKey}
              stroke={colors[index % colors.length]}
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
