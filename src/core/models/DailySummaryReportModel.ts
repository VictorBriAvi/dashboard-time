export interface DailySummaryRaw {
  fecha: string;
  totalVentas: number;
  totalGastos: number;
  diaSemana: number;
}

export interface DailyChartData {
  name: string;     
  ingresos: number;
  gastos: number;
}
