"use client";

import { Sale } from "@/core/models/sales/Sale";
import { formatARS } from "@/core/utils/format";

type Props = {
  sale: Sale;
  onClose: () => void;
};

export function SaleDetailModal({ sale, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Venta #{sale.id}
            </h3>
            <p className="text-sm text-gray-500">{sale.dateSale} · {sale.nameClient}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">

          {/* Servicios */}
          <section>
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Servicios
            </h4>
            <div className="rounded-xl border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs">
                  <tr>
                    <th className="text-left px-4 py-2">Servicio</th>
                    <th className="text-left px-4 py-2">Colaborador</th>
                    <th className="text-right px-4 py-2">Precio</th>
                    <th className="text-right px-4 py-2">Desc. %</th>
                    <th className="text-right px-4 py-2">Adicional</th>
                    <th className="text-right px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sale.saleDetail.map((d, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{d.nameServiceTypeSale}</td>
                      <td className="px-4 py-3 text-gray-600">{d.nameEmployeeSale}</td>
                      <td className="px-4 py-3 text-right">{formatARS(d.unitPrice)}</td>
                      <td className="px-4 py-3 text-right">
                        {d.discountPercent > 0
                          ? <span className="text-orange-600">{d.discountPercent}%</span>
                          : <span className="text-gray-400">—</span>
                        }
                      </td>
                      <td className="px-4 py-3 text-right">
                        {d.additionalCharge > 0
                          ? formatARS(d.additionalCharge)
                          : <span className="text-gray-400">—</span>
                        }
                      </td>
                      <td className="px-4 py-3 text-right font-medium">{formatARS(d.totalCalculated)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Pagos */}
          <section>
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Pagos
            </h4>
            <div className="rounded-xl border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs">
                  <tr>
                    <th className="text-left px-4 py-2">Medio de pago</th>
                    <th className="text-right px-4 py-2">Monto cobrado</th>
                    <th className="text-right px-4 py-2">Desc. app</th>
                    <th className="text-right px-4 py-2">Neto negocio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sale.payments.map((p, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{p.paymentTypeName}</td>
                      <td className="px-4 py-3 text-right">{formatARS(p.amountPaid)}</td>
                      <td className="px-4 py-3 text-right">
                        {p.appDiscountPercent > 0
                          ? <span className="text-blue-600">{p.appDiscountPercent}% ({formatARS(p.appDiscountAmount)})</span>
                          : <span className="text-gray-400">—</span>
                        }
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-green-700">
                        {formatARS(p.netAmountReceived)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Totales */}
          <section className="bg-gray-50 rounded-xl p-4 text-sm space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal servicios</span>
              <span>{formatARS(sale.baseAmount)}</span>
            </div>
            {sale.surchargePercent > 0 && (
              <div className="flex justify-between text-yellow-700">
                <span>Recargo ({sale.surchargePercent}%)</span>
                <span>+ {formatARS(sale.surchargeAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>Total cobrado</span>
              <span>{formatARS(sale.totalAmount)}</span>
            </div>
          </section>

        </div>

        <div className="px-6 pb-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 font-medium"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}