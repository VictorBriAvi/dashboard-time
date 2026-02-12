"use client";

import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  IdCardLanyard,
} from "lucide-react";
import { useState, useEffect } from "react";

import { useSummary } from "@/data/hooks/reports/useSummary";
import { useDailySummary } from "@/data/hooks/reports/useDailySummary";
import { useEmployeeSaleSummary } from "@/data/hooks/reports/useEmployeSaleSummary";
import { useExpenseCategoryReport } from "@/data/hooks/reports/useExpenseCategoryReport";
import { useSalesSummaryByPayment } from "@/data/hooks/reports/useSalesSumaryByPayment";
import { useSalesByDateRange } from "@/data/hooks/reports/useSalesByDateRange";

import LineChartCustom from "@/ui/statistics/LineChartCustom";
import BarChartCustom from "@/ui/statistics/BarChartCustom";
import PieChartCustomer from "@/ui/statistics/PieChartCustome";
import SummaryCard from "@/ui/statistics/SummaryCard";

type RangeType = "day" | "week" | "month" | "year" | "custom";

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 🔹 Helper para calcular fechas (se mueve fuera o se mantiene dentro)
const getRangeDates = (type: RangeType) => {
  const today = new Date();
  const toDate = formatLocalDate(today);
  let fromDate = toDate;

  const prev = new Date(today);

  switch (type) {
    case "week":
      prev.setDate(today.getDate() - 7);
      fromDate = formatLocalDate(prev);
      break;

    case "month":
      fromDate = formatLocalDate(
        new Date(today.getFullYear(), today.getMonth(), 1),
      );
      break;

    case "year":
      fromDate = formatLocalDate(new Date(today.getFullYear(), 0, 1));
      break;

    case "day":
    default:
      fromDate = toDate;
      break;
  }

  return { fromDate, toDate };
};

export default function BalanceSummary() {
  const [showAmounts, setShowAmounts] = useState(true);

  // Cargar preferencia guardada
  useEffect(() => {
    const saved = localStorage.getItem("showAmounts");
    if (saved !== null) {
      setShowAmounts(saved === "true");
    }
  }, []);

  // Guardar preferencia
  useEffect(() => {
    localStorage.setItem("showAmounts", String(showAmounts));
  }, [showAmounts]);

  // 1. Inicialización de fechas (por defecto Mensual)
  const initialRange = getRangeDates("day");

  const [rangeType, setRangeType] = useState<RangeType>("day");
  const [dateFilter, setDateFilter] = useState({
    from: initialRange.fromDate,
    to: initialRange.toDate,
  });

  // Estado para los inputs visuales (pueden diferir del filtro aplicado hasta dar "Buscar")
  const [inputDesde, setInputDesde] = useState(initialRange.fromDate);
  const [inputHasta, setInputHasta] = useState(initialRange.toDate);

  // 🔹 USE SUMMARY: Ahora le pasamos fechas explícitas
  // NOTA: Debes actualizar la definición de este hook para aceptar (from, to)
  const { data: summary, isLoading: isLoadingCard } = useSummary(
    dateFilter.from,
    dateFilter.to,
  );

  // 🔹 LINE CHART
  const { data: lineChart, isLoading: isLoadingLineChart } = useDailySummary({
    fromDate: dateFilter.from,
    toDate: dateFilter.to,
  });

  // 🔹 RESTO DE REPORTES
  const { data: barData = [] } = useEmployeeSaleSummary(
    dateFilter.from,
    dateFilter.to,
  );

  const { data: pieData, isLoading: pieLoading } = useExpenseCategoryReport(
    dateFilter.from,
    dateFilter.to,
  );

  const { data: paymentData = [], isLoading: barChart } =
    useSalesSummaryByPayment(dateFilter.from, dateFilter.to);

  console.log(paymentData);
  useSalesByDateRange(dateFilter.from, dateFilter.to);

  // 🔹 UI Helpers
  const baseBtn = "px-5 py-2 rounded-lg border transition-all font-medium";
  const getBtnClass = (type: RangeType) =>
    rangeType === type
      ? "bg-blue-600 text-white border-blue-600"
      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100";

  // Manejo de botones predefinidos
  const handleRangeChange = (type: RangeType) => {
    const { fromDate, toDate } = getRangeDates(type);
    setRangeType(type);
    setInputDesde(fromDate);
    setInputHasta(toDate);
    setDateFilter({ from: fromDate, to: toDate });
  };

  // Manejo de búsqueda manual
  const handleSearch = () => {
    setRangeType("custom");
    setDateFilter({ from: inputDesde, to: inputHasta });
  };

  return (
    <div className="pt-6">
      {/* HEADER + FILTROS */}
<div className="mt-8 mb-8 px-6">

  <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-6">

    {/* 🔹 FILA SUPERIOR - CONTEXTO + ACCIÓN */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <p className="text-sm text-gray-600">
        Mostrando datos del{" "}
        <span className="font-semibold text-gray-900">
          {dateFilter.from}
        </span>{" "}
        al{" "}
        <span className="font-semibold text-gray-900">
          {dateFilter.to}
        </span>
      </p>

      <button
        onClick={() => setShowAmounts((prev) => !prev)}
        className="
          inline-flex items-center gap-2
          px-5 py-2.5
          rounded-xl
          bg-gradient-to-r from-blue-600 to-blue-500
          text-white font-semibold
          shadow-md shadow-blue-500/30
          transition-all duration-200
          hover:shadow-lg hover:scale-[1.03]
          active:scale-[0.97]
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        "
      >
        {showAmounts ? "Ocultar montos" : "Mostrar montos"}
      </button>
    </div>

    {/* 🔹 FILA INFERIOR - FILTROS */}
    <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">

      {/* Fechas + buscar */}
      <div className="flex flex-wrap items-end gap-3">

        <input
          type="date"
          value={inputDesde}
          onChange={(e) => setInputDesde(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="date"
          value={inputHasta}
          onChange={(e) => setInputHasta(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          onClick={handleSearch}
          className="
            px-4 py-2
            rounded-lg
            bg-gray-900 text-white text-sm font-medium
            hover:bg-black
            transition
          "
        >
          Buscar
        </button>
      </div>

      {/* Rangos rápidos */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`${baseBtn} ${getBtnClass("day")}`}
          onClick={() => handleRangeChange("day")}
        >
          Diaria
        </button>

        <button
          className={`${baseBtn} ${getBtnClass("week")}`}
          onClick={() => handleRangeChange("week")}
        >
          Semanal
        </button>

        <button
          className={`${baseBtn} ${getBtnClass("month")}`}
          onClick={() => handleRangeChange("month")}
        >
          Mensual
        </button>

        <button
          className={`${baseBtn} ${getBtnClass("year")}`}
          onClick={() => handleRangeChange("year")}
        >
          Año
        </button>
      </div>

    </div>

  </div>
</div>


      {/* CARDS */}
      <div className="px-4 sm:px-6 lg:px-8 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* GANANCIA */}
          <SummaryCard
            title={summary?.ganancia.title}
            amount={summary?.ganancia.amount}
            amountColor={summary?.ganancia.amountColor}
            shadowColor={summary?.ganancia.shadowColor}
            leftIcon={<BanknoteArrowUp size={18} className="text-green-600" />}
            leftLabel={summary?.ganancia.leftLabel}
            rightIcon={<BanknoteArrowDown size={18} className="text-red-500" />}
            rightLabel={summary?.ganancia.rightLabel}
            loading={isLoadingCard}
            hideAmount={!showAmounts}
          />
          <SummaryCard
            title={summary?.gastos.title}
            amount={summary?.gastos.amount}
            amountColor={summary?.gastos.amountColor}
            shadowColor={summary?.gastos.shadowColor}
            leftIcon={<BanknoteArrowDown size={18} className="text-red-600" />}
            leftLabel={summary?.gastos.leftLabel}
            rightLabel={summary?.gastos.rightLabel}
            loading={isLoadingCard}
            hideAmount={!showAmounts}
          />
          <SummaryCard
            title={summary?.ventas.title}
            amount={summary?.ventas.amount}
            amountColor={summary?.ventas.amountColor}
            shadowColor={summary?.ventas.shadowColor}
            leftIcon={<BanknoteArrowUp size={18} className="text-green-600" />}
            leftLabel={summary?.ventas.leftLabel}
            rightLabel={summary?.ventas.rightLabel}
            loading={isLoadingCard}
            hideAmount={!showAmounts}
          />
          {/* PAGOS COLABORADORES */}
          <SummaryCard
            title={summary?.totalPagosColaboradores.title}
            amount={summary?.totalPagosColaboradores.amount}
            amountColor={summary?.totalPagosColaboradores.amountColor}
            shadowColor={summary?.totalPagosColaboradores.shadowColor}
            leftIcon={<IdCardLanyard size={18} className="text-blue-600" />}
            leftLabel={summary?.totalPagosColaboradores.leftLabel}
            rightLabel={summary?.totalPagosColaboradores.rightLabel}
            loading={isLoadingCard}
            hideAmount={!showAmounts}
          />
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="grid grid-cols-12 gap-6 mb-10 px-4 sm:px-6 lg:px-8">
        <div className="col-span-12 lg:col-span-8">
          <LineChartCustom
            title="Evolución de ingresos y gastos"
            data={lineChart}
            xAxisKey="name"
            lines={["ingresos", "gastos", "ganancias"]}
            loading={isLoadingLineChart}
          />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <PieChartCustomer
            title="Distribución de Gastos"
            data={pieData ?? []}
            loading={pieLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 px-4 sm:px-6 lg:px-8 mb-16">
        <div className="col-span-12 md:col-span-6 bg-white rounded-2xl p-6">
          <BarChartCustom
            title="Recaudación por Medio de Pago"
            data={paymentData}
            dataKeyName="name"
            orientation="horizontal"
            loading={barChart}
            bars={[
              { key: "ventas", label: "Ventas", color: "#3b82f6" },
              { key: "gastos", label: "Gastos", color: "#ef4444" },
              { key: "disponible", label: "Disponible", color: "#10b981" },
            ]}
          />
        </div>

        <div className="col-span-12 md:col-span-6 bg-white rounded-2xl p-6">
          <BarChartCustom
            title="Venta colaboradores"
            data={barData}
            dataKeyName="name"
            dataKeyValue="value"
            orientation="horizontal"
            loading={barChart}
          />
        </div>
      </div>
    </div>
  );
}
