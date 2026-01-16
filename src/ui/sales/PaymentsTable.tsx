// PaymentsTable.tsx
import type { SalePayment } from "@/core/models/reports/SaleByDateRangeModel";

export default function PaymentsTable({ data }: { data: SalePayment[] }) {
  return (
    <table className="w-full border rounded-lg bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-3 py-2 text-left text-sm">Método</th>
          <th className="px-3 py-2 text-right text-sm">Monto</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {data.map((p, i) => (
          <tr key={i} className="hover:bg-gray-50">
            <td className="px-3 py-2 text-sm">{p.paymentTypeName}</td>
            <td className="px-3 py-2 text-sm text-right">
              ${p.amountPaid.toLocaleString("es-AR")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
