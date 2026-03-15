// Reglas de negocio:
//  1. El recargo se aplica siempre sobre el TOTAL DE LA VENTA, no sobre el pago individual
//  2. Si hay múltiples medios de pago, se aplica el MAYOR porcentaje entre todos
//  3. Sin descuentos — esta función es solo recargo

export interface RecargoCalculo {
  totalOriginal: number;       // total de la venta sin tocar
  maxSurchargePercent: number; // el % efectivo (el mayor entre todos los medios usados)
  surchargeAmount: number;     // totalOriginal × maxSurchargePercent / 100
  effectiveTotal: number;      // totalOriginal + surchargeAmount → lo que el cliente paga en total
}

/**
 * @param totalAmount   - total original de la venta
 * @param percents      - lista de surchargePercent de cada medio de pago con applySurcharge=true
 */
export function calcularRecargo(
  totalAmount: number,
  percents: number[]
): RecargoCalculo {
  const maxSurchargePercent = percents.length > 0 ? Math.max(...percents) : 0;
  const surchargeAmount     = totalAmount * (maxSurchargePercent / 100);
  const effectiveTotal      = totalAmount + surchargeAmount;

  return { totalOriginal: totalAmount, maxSurchargePercent, surchargeAmount, effectiveTotal };
}