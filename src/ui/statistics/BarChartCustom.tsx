"use client";

import { EmployeeSaleChartData } from "@/core/models/reports/EmployeeSaleSummaryReportModel";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const defaultColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];

interface BarChartCustomProps {
  title: string;
  data: EmployeeSaleChartData[];
  colors?: string[];
  dataKeyName?: keyof EmployeeSaleChartData;
  dataKeyValue?: keyof EmployeeSaleChartData;
  height?: number;
  orientation?: "vertical" | "horizontal";
  loading: boolean
}

export default function BarChartCustom({
  title,
  data,
  colors = defaultColors,
  dataKeyName = "name",
  dataKeyValue = "value",
  height = 350,
  orientation = "vertical",
  loading = false
}: BarChartCustomProps) {
const isHorizontal = orientation === "horizontal";

  // 🔥 LOADING SKELETON
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
        <div className="h-6 w-52 bg-gray-300 rounded mb-6"></div>

        <div className="w-full bg-gray-100 rounded" style={{ height }}>
          <div className="h-full flex items-end gap-3 p-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-300 rounded w-6"
                style={{
                  height: `${30 + Math.random() * 60}%`,
                }}
              ></div>
            ))}
          </div>
        </div>
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
              <XAxis type="number" />
              <YAxis dataKey={dataKeyName} type="category" width={150} />
            </>
          ) : (
            <>
              <XAxis dataKey={dataKeyName} />
              <YAxis />
            </>
          )}

          <Tooltip />

          <Bar dataKey={dataKeyValue}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
