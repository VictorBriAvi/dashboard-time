
export interface EmployeeSaleSummaryRaw {
  empleadoId: number;
  empleado: string;
  totalVentas: number;
  porcentajePago: number;
  totalAPagar: number;
  totalServicios: number;
  serviciosRealizados: ServicioRealizado[];
}
export interface EmployeeSaleChartData {
  name: string;
  value: number;
}

export interface ServicioRealizado {
  servicio: string;
  cantidad: number;
}
