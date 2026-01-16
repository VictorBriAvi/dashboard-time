"use client";

import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Briefcase,
  IdCardLanyard,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useSummary } from "@/data/hooks/reports/useSummary";

import { useState } from "react";
import LineChartCustom from "@/ui/statistics/LineChartCustom";
import { useDailySummary } from "@/data/hooks/reports/useDailySummary";
import BarChartCustom from "@/ui/statistics/BarChartCustom";
import { useEmployeeSaleSummary } from "@/data/hooks/reports/useEmployeSaleSummary";
import PieChartCustomer from "@/ui/statistics/PieChartCustome";
import { useExpenseCategoryReport } from "@/data/hooks/reports/useExpenseCategoryReport";
import { useSalesSummaryByPayment } from "@/data/hooks/reports/useSalesSumaryByPayment";
import SummaryCard from "@/ui/statistics/SummaryCard";
import { useSalesByDateRange } from "@/data/hooks/reports/useSalesByDateRange";

export default function BalanceSummary() {
  const [rangeType, setRangeType] = useState<"day" | "week" | "month" | "year">("month");
  const { data: summary, isLoading : isLoadingCard, error, fromDate, toDate } = useSummary(rangeType);
  const { data: lineChart = [], isLoading: isLoadingLineChart, fromDateDisplay, toDateDisplay } = useDailySummary(rangeType);
  const { data: barData = [] } = useEmployeeSaleSummary(fromDate, toDate);
  const { data: pieData, isLoading: pieLoading, error: pieError } = useExpenseCategoryReport(fromDate, toDate);
  const { data: paymentData = [], isLoading: barChart } = useSalesSummaryByPayment(fromDate, toDate);
  const { data: SalesByDate = [], isLoading: salesByDate} = useSalesByDateRange(fromDate, toDate);

  console.log(SalesByDate)
  const baseBtn = "px-5 py-2 rounded-lg border transition-all font-medium";
  const getBtnClass = (type: string) =>rangeType === type ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100";

  return (

      <div className="pt-6 ">
        <div className="flex flex-wrap justify-end items-center gap-3 mt-8 mb-8 pr-6">
          <div className="px-6 mt-2">
            <p className="text-sm text-gray-600">
              Mostrando datos del <span className="font-semibold">{fromDate}</span> al{" "}
              <span className="font-semibold">{toDate}</span>
            </p>
          </div>

          <button className={`${baseBtn} ${getBtnClass("day")}`} onClick={() => setRangeType("day")}>
            Diaria
          </button>

          <button className={`${baseBtn} ${getBtnClass("week")}`} onClick={() => setRangeType("week")}>
            Semanal
          </button>

          <button className={`${baseBtn} ${getBtnClass("month")}`} onClick={() => setRangeType("month")}>
            Mensual
          </button>

          <button className={`${baseBtn} ${getBtnClass("year")}`} onClick={() => setRangeType("year")}>
            Año
          </button>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            />
            <SummaryCard
              title={summary?.gastos.title}
              amount={summary?.gastos.amount}
              amountColor={summary?.gastos.amountColor}
              shadowColor={summary?.gastos.shadowColor}
              leftIcon={<BanknoteArrowDown size={18} className="text-red-600" />}
              leftLabel={summary?.gastos.leftLabel}
              rightIcon={undefined}
              rightLabel={summary?.gastos.rightLabel}
              loading={isLoadingCard}   
            />
            <SummaryCard
              title={summary?.ventas.title}
              amount={summary?.ventas.amount}
              amountColor={summary?.ventas.amountColor}
              shadowColor={summary?.ventas.shadowColor}
              leftIcon={<BanknoteArrowUp size={18} className="text-green-600" />}
              leftLabel={summary?.ventas.leftLabel}
              rightIcon={undefined}
              rightLabel={summary?.ventas.rightLabel}
              loading={isLoadingCard}   
            />
            <SummaryCard
              title={summary?.totalPagosColaboradores.title}
              amount={summary?.totalPagosColaboradores.amount}
              amountColor={summary?.totalPagosColaboradores.amountColor}
              shadowColor={summary?.totalPagosColaboradores.shadowColor}
              leftIcon={<IdCardLanyard size={18} className="text-blue-600" />}
              leftLabel={summary?.totalPagosColaboradores.leftLabel}
              rightIcon={undefined}
              rightLabel={summary?.totalPagosColaboradores.rightLabel}
              loading={isLoadingCard}   
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 mb-10 px-4 sm:px-6 lg:px-8">
          <div className="col-span-12 lg:col-span-8">
            <LineChartCustom
              title="Evolución de ingresos y gastos"
              data={lineChart}
              xAxisKey="name"
              lines={["ingresos", "gastos", "ganancias"]}
              colors={["#10b981", "#ef4444", "#3b82f6"]}
              height={420}
              loading={isLoadingLineChart}

            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <PieChartCustomer title="Distribución de Gastos" data={pieData ?? []} loading={pieLoading} />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 px-4 sm:px-6 lg:px-8 mb-16">
          <div className="col-span-12 md:col-span-6 bg-white rounded-2xl p-6">
            <BarChartCustom
              title="Venta colaboradores"
              data={barData}
              colors={["#2563eb", "#16a34a", "#f97316", "#dc2626", "#9333ea"]}
              dataKeyName="name"
              dataKeyValue="value"
              loading={barChart}
            />
          </div>

          <div className="col-span-12 md:col-span-6 bg-white rounded-2xl p-6">
            <BarChartCustom
              title="Recaudación por Medio de Pago"
              data={paymentData}
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
