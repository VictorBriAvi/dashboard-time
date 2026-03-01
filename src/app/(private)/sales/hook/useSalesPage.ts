import { useState } from "react";
import type { Option } from "@/ui/inputs/SearchSelect";
import { useFilteredSales, type SalesFilter } from "@/data/hooks/Sales/useFilteredSales";

export function useSalesPage() {
const now = new Date();
const today = `${now.getFullYear()}-${String(
  now.getMonth() + 1
).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  // 🔹 Estado editable (formulario)
const [fromDate, setFromDate] = useState<string>("");
const [toDate, setToDate] = useState<string>("");
  const [client, setClient] = useState<Option | null>(null);
  const [employee, setEmployee] = useState<Option | null>(null);
  const [paymentType, setPaymentType] = useState<Option | null>(null);

  // 🔹 Estado aplicado (query real)
  const [appliedFilters, setAppliedFilters] = useState<SalesFilter>({
    fromDate: today,
    toDate: today,
    clientId: null,
    employeeId: null,
    paymentTypeId: null,
    serviceTypeId: null,
  });

  const { data, isLoading, isError } = useFilteredSales(appliedFilters);

  const handleSearch = () => {
    setAppliedFilters({
      fromDate,
      toDate,
      clientId: client?.value ?? null,
      employeeId: employee?.value ?? null,
      paymentTypeId: paymentType?.value ?? null,
      serviceTypeId: null,
    });
  };

  const clearFilters = () => {
    setFromDate(today);
    setToDate(today);
    setClient(null);
    setEmployee(null);
    setPaymentType(null);

    setAppliedFilters({
      fromDate: today,
      toDate: today,
      clientId: null,
      employeeId: null,
      paymentTypeId: null,
      serviceTypeId: null,
    });
  };

  return {
    sales: data,
    isLoading,
    isError,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    client,
    setClient,
    employee,
    setEmployee,
    paymentType,
    setPaymentType,
    handleSearch,
    clearFilters,
  };
}