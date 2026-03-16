"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PieChartCardProps {
  title: string;
  data: { name: string; value: number }[];
  colors?: string[];
  loading?: boolean;
}

// Paleta consistente con el design system
const PALETTE = [
  "#185FA5",
  "#3B6D11",
  "#854F0B",
  "#A32D2D",
  "#534AB7",
  "#0F6E56",
  "#993556",
  "#888780",
];

function generateColors(count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => PALETTE[i % PALETTE.length]
  );
}

// Render de etiquetas DENTRO del donut — evita overflow
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  if (percent < 0.05) return null; // no renderizar si es muy pequeño
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartCustomer({
  title = "Gastos por categoría",
  data,
  colors,
  loading = false,
}: PieChartCardProps) {
  const finalColors = colors ?? generateColors(data.length);

  if (loading) {
    return (
      <div style={{ border: "0.5px solid #e5e7eb" }} className="bg-white rounded-xl p-5 animate-pulse">
        <div className="h-4 w-40 bg-gray-200 rounded mb-5" />
        <div className="flex items-center justify-center" style={{ height: 200 }}>
          <div className="w-28 h-28 bg-gray-200 rounded-full" />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="h-3 bg-gray-200 rounded" style={{ width: `${40 + i * 15}%` }} />
            </div>
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
              <circle cx="8" cy="8" r="6.5" stroke="#9ca3af" strokeWidth="1.2"/>
              <path d="M8 5v3m0 2h.01" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-xs text-gray-400">Sin datos para mostrar</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ border: "0.5px solid #e5e7eb" }} className="bg-white rounded-xl p-5">
      {/* Título */}
      <p className="text-[12px] font-semibold text-gray-700 mb-4">{title}</p>

      {/* Donut chart — altura fija contenida */}
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
            cornerRadius={4}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={finalColors[index % finalColors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value?: number) =>
              typeof value === "number"
                ? `$${value.toLocaleString("es-AR")}`
                : "-"
            }
            contentStyle={{
              borderRadius: 8,
              border: "0.5px solid #e5e7eb",
              fontSize: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Leyenda custom — separada del gráfico, no causa overflow */}
      <div className="mt-3 flex flex-col gap-1.5">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="flex-shrink-0"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: finalColors[index % finalColors.length],
                }}
              />
              <span
                className="text-[11px] text-gray-600 truncate"
                title={item.name}
              >
                {item.name}
              </span>
            </div>
            <span className="text-[11px] font-medium text-gray-900 flex-shrink-0">
              ${item.value.toLocaleString("es-AR")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
