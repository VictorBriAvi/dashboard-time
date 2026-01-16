// ServicesTable.tsx
import type { SaleDetail } from "@/core/models/reports/SaleByDateRangeModel";

export default function ServicesTable({ data }: { data: SaleDetail[] }) {
  return (
    <table className="w-full border rounded-lg bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-3 py-2 text-left text-sm">Servicio</th>
          <th className="px-3 py-2 text-left text-sm">Empleado</th>
          <th className="px-3 py-2 text-left text-sm">Precio</th>
          <th className="px-3 py-2 text-left text-sm">Descuento</th>
          <th className="px-3 py-2 text-left text-sm">Adicional</th>
          <th className="px-3 py-2 text-right text-sm">Total</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {data.map((d) => (
          <tr key={d.id} className="hover:bg-gray-50">
            <td className="px-3 py-2 text-sm">{d.nameServiceTypeSale}</td>
            <td className="px-3 py-2 text-sm">{d.nameEmployeeSale}</td>
            <td className="px-3 py-2 text-sm">{d.unitPrice}</td>
            <td className="px-3 py-2 text-sm">{d.discountPercent}</td>
            <td className="px-3 py-2 text-sm">{d.additionalCharge}</td>
            <td className="px-3 py-2 text-sm text-right">
              ${d.totalCalculated.toLocaleString("es-AR")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
