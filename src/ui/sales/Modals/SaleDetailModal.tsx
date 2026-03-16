"use client";

import { Sale } from "@/core/models/sales/Sale";
import { formatARS } from "@/core/utils/format";
import { Modal } from "@/ui/Modals"; // ✅ sin 's'

type Props = {
  sale: Sale;
  onClose: () => void;
};

export function SaleDetailModal({ sale, onClose }: Props) {
  const activeDetails = (sale.saleDetail ?? []).filter((d) => !d.isDeleted);
  const payments = sale.payments ?? [];

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={`Venta #${sale.id}`}
      subtitle={`${sale.dateSale} · ${sale.nameClient}`}
      size="lg"
      footer={
        <div className="flex justify-end w-full">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cerrar
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-6">

        {/* Servicios */}
        <section>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Servicios
          </p>
          {activeDetails.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">Sin servicios registrados.</p>
          ) : (
            <div className="rounded-xl overflow-hidden" style={{ border: "0.5px solid #e5e7eb" }}>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ background: "#f9fafb", borderBottom: "0.5px solid #f3f4f6" }}>
                    <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Servicio</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Colaborador</th>
                    <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Precio</th>
                    <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Desc.</th>
                    <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Adicional</th>
                    <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {activeDetails.map((d, i) => (
                    <tr key={i} style={{ borderBottom: "0.5px solid #f9fafb" }}>
                      <td className="px-4 py-3 font-medium text-gray-900">{d.nameServiceTypeSale}</td>
                      <td className="px-4 py-3 text-gray-500">{d.nameEmployeeSale}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{formatARS(d.unitPrice)}</td>
                      <td className="px-4 py-3 text-right">
                        {d.discountPercent > 0
                          ? <span className="text-orange-500 font-medium">{d.discountPercent}%</span>
                          : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        {d.additionalCharge > 0 ? formatARS(d.additionalCharge) : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">{formatARS(d.totalCalculated)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Pagos */}
        <section>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Pagos
          </p>
          {payments.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">Sin pagos registrados.</p>
          ) : (
            <div className="rounded-xl overflow-hidden" style={{ border: "0.5px solid #e5e7eb" }}>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ background: "#f9fafb", borderBottom: "0.5px solid #f3f4f6" }}>
                    <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Medio</th>
                    <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Monto cobrado</th>
                    <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Desc. app</th>
                    <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Neto negocio</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p, i) => (
                    <tr key={i} style={{ borderBottom: "0.5px solid #f9fafb" }}>
                      <td className="px-4 py-3 font-medium text-gray-900">{p.paymentTypeName}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{formatARS(p.amountPaid)}</td>
                      <td className="px-4 py-3 text-right">
                        {(p.appDiscountPercent ?? 0) > 0
                          ? <span style={{ color: "#185FA5" }}>{p.appDiscountPercent}% ({formatARS(p.appDiscountAmount)})</span>
                          : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-green-700">
                        {formatARS(p.netAmountReceived ?? p.amountPaid)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Resumen de totales */}
        <section
          className="rounded-xl p-4 flex flex-col gap-2"
          style={{ background: "#f9fafb", border: "0.5px solid #f3f4f6" }}
        >
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal servicios</span>
            <span>{formatARS(sale.baseAmount ?? 0)}</span>
          </div>
          {(sale.surchargePercent ?? 0) > 0 && (
            <div className="flex justify-between text-sm text-amber-600">
              <span>Recargo ({sale.surchargePercent}%)</span>
              <span>+{formatARS(sale.surchargeAmount ?? 0)}</span>
            </div>
          )}
          <div
            className="flex justify-between font-semibold text-base pt-2"
            style={{ borderTop: "0.5px solid #e5e7eb" }}
          >
            <span className="text-gray-900">Total cobrado</span>
            <span className="text-gray-900">{formatARS(sale.totalAmount)}</span>
          </div>
        </section>

      </div>
    </Modal>
  );
}
