"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";
import { useServiceCategoryPage } from "@/app/services/categories/hook/useServiceCategoryPage";
import { ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";

export default function ServiceCategoryPage() {
  const categoryPage = useServiceCategoryPage();

  const columns: ColumnDef<ServiceCategorie>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold">Categoría servicio</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Panel izquierdo */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <Input
            label="Nombre"
            value={categoryPage.name}
            onChange={categoryPage.setName}
          />

          <button
            onClick={categoryPage.addCategory}
            className="w-full bg-black text-white rounded-md py-2 text-sm hover:bg-gray-800 transition"
          >
            Agregar categoría
          </button>
        </div>

        {/* Panel derecho */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl shadow-md p-6">
        <GenericDataTable<ServiceCategorie>
          data={categoryPage.categories}
          columns={columns}
          rowKey={(row) => row.id}
          rowActions={[
            {
              id: "edit",
              label: "Editar",
              variant: "edit",
              visible: true,
              onClick: (row) => {
                console.log("Editar", row);
              },
            },
            {
              id: "delete",
              label: "Eliminar",
              variant: "delete",
              visible: true, // o (row) => row.id !== 1
              onClick: (row) => {
                console.log("Eliminar", row);
              },
            },
          ]}
        />

        </div>
      </div>
    </section>
  );
}
