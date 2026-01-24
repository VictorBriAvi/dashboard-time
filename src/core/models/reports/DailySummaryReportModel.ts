export interface DailySummaryRaw {
  fecha: string;
  totalVentas: number;
  totalGastos: number;
  totalGanancia: number;
  diaSemana: number;
}

export interface DailyChartData {
  name: string;     
  ingresos: number;
  gastos: number;
  ganancias: number;
}
