import { SummaryReport } from "../../models/reports/SummaryReportModel";
import { SummaryCardModel } from "../../models/reports/SummaryCardModel";

export const summaryService = {
  formatSummary: (summary: SummaryReport) => {
    return {
      ganancia: buildGainCard(summary),
      ventas: buildSalesCard(summary),
      gastos: buildExpenseCard(summary),
      totalPagosColaboradores: buildEmployeeCard(summary)
    };
  },
};
function buildGainCard(summary: SummaryReport): SummaryCardModel {
  const isPositive = summary.gananciaNeta >= 0;

  return {
    title: "Balance",
    amount: `$${summary.gananciaNeta.toLocaleString("es-AR")}`,
    amountColor: isPositive ? "text-green-600" : "text-red-600",
    shadowColor: isPositive ? "green" : "red",   // <--- ACÁ
    leftLabel: "Ventas",
    rightLabel: "Gastos",
  };
}


function buildSalesCard(summary: SummaryReport): SummaryCardModel {
  return {
    title: "Ventas",
    amount: `$${summary.totalVentas.toLocaleString("es-AR")}`,
    amountColor: "text-green-600",
    shadowColor: "none",
    leftLabel: "Total de ingresos",
    rightLabel: "",
  };
}

function buildExpenseCard(summary: SummaryReport): SummaryCardModel {
  return {
    title: "Gastos",
    amount: `$${summary.totalGastos.toLocaleString("es-AR")}`,
    amountColor: "text-red-600",
    shadowColor: "none",
    leftLabel: "Total de gastos",
    rightLabel: "",
  };
}

function buildEmployeeCard(summary: SummaryReport): SummaryCardModel {
  return {
    title: "Pago colaboradores",
    amount: `$${summary.totalPagosColaboradores.toLocaleString("es-AR")}`,
    amountColor: "text-blue-600",
    shadowColor: "none",
    leftLabel: "Porcentaje realizado por colaboradores",
    rightLabel: "",
  };
}
