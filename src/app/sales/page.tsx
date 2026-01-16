"use client";

import Link from "next/link";
import SalesTable from "@/ui/sales/SalesTable";
import { useMemo, useState } from "react";
import { useSalesByDateRange } from "@/data/hooks/Sales/useSalesByDateRange";
import { salesByDateDomainService } from "@/core/services/Sales/SaleByDateService";

export default function SalesPage() {

  const fromDate = "2025-12-01";
  const toDate = "2026-12-31";
  const [queryDesde, setQueryDesde] = useState(fromDate);
  const [queryHasta, setQueryHasta] = useState(toDate);

  const [employeeFilter, setEmployeeFilter] = useState<number | null>(null);
  const { data, isLoading, isError } = useSalesByDateRange(fromDate, toDate);


  const employees = useMemo(
    () => salesByDateDomainService.getEmployees(data),
    [data]
  );
  const filteredData = useMemo(
    () => salesByDateDomainService.filterByEmployee(data, employeeFilter),
    [data, employeeFilter]
  );


  return (
    <section className="max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Ventas</h2>

        <Link
          href="/sales/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Nueva venta
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <section className="mt-8">
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            {/* TABLA */}
            <div className="col-span-12 lg:col-span-8">
              <SalesTable
                data={filteredData}
                loading={isLoading}
                error={isError}
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
