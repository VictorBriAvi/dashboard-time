"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AsyncSearchableSelect } from "@/ui/inputs/SearchSelect";
import { Input } from "@/ui/inputs/Input";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { useServiceTypeSearch } from "@/data/hooks/serviceType/useServiceTypeSearch";
import { useServicePage, ServiceUI } from "./hooks/useServicePage";
import { formatARS } from "@/core/utils/format";

export default function ServicesPage() {
  const servicePage = useServicePage();
  const { loadServiceType } = useServiceTypeSearch();

  const columns: ColumnDef<ServiceUI>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Precio",
      accessorKey: "price",
      cell: ({ getValue }) => formatARS(getValue<number>()),
    },
    {
      header: "Categoría",
      accessorKey: "categoryName",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold">Servicios</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Panel izquierdo */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <AsyncSearchableSelect
            label="Categoría"
            loadOptions={loadServiceType}
            value={servicePage.categorySelected}
            onChange={servicePage.setCategorySelected}
          />

          <Input
            label="Nombre del servicio"
            value={servicePage.name}
            onChange={servicePage.setName}
          />

          <Input
            label="Precio"
            value={servicePage.price}
            onChange={servicePage.setPrice}
          />

          <button
            onClick={servicePage.addService}
            className="w-full bg-black text-white rounded-md py-2 text-sm hover:bg-gray-800 transition"
          >
            Agregar servicio
          </button>
        </div>

        {/* Panel derecho */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl shadow-md p-6">
          <GenericDataTable<ServiceUI>
            data={servicePage.services}
            columns={columns}
            rowKey={(_, index) => index}
          />
        </div>
      </div>
    </section>
  );
}
