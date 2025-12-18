"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface PieChartCardProps {
  title: string;
  data: { name: string; value: number }[];
  colors?: string[];
  height?: number;
  isAnimationActive?: boolean;
    loading?: boolean;
}

function generateColors(count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const hue = (i * (360 / count)) % 360;
    return `hsl(${hue}, 70%, 55%)`;
  });
}

export default function PieChartCustomer({
  title = "Distribución de Gastos",
  data,
  colors,
  height = 350,
  isAnimationActive = true,
  loading = false,

}: PieChartCardProps) {
   // 🔥 LOADING SKELETON
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-300 rounded mb-6"></div>
        <div className="w-full bg-gray-100 rounded" style={{ height }}>
          <div className="h-full flex items-center justify-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }
  const finalColors = colors ?? generateColors(data.length);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-center h-full">
      <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">{title}</h2>

      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={4}
            dataKey="value"
            isAnimationActive={isAnimationActive}
            cornerRadius={8}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={finalColors[index]} />
            ))}
          </Pie>

<Tooltip
  formatter={(value?: number) =>
    typeof value === "number"
      ? `$${value.toLocaleString("es-AR")}`
      : "-"
  }
  contentStyle={{
    borderRadius: "10px",
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  }}
/>

          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
