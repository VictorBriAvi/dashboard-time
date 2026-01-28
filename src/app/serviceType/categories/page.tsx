"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";
import { useServiceCategoryPage } from "@/app/serviceType/categories/hook/useServiceCategoryPage";
import { ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";
import { EditServiceCategoryModal } from "./modal/EditServiceCategoryModal";

export default function ServiceCategoryPage() {
  const categoryPage = useServiceCategoryPage();

  const columns: ColumnDef<ServiceCategorie>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
  ];

  return (
    <section className="w-full px-6 space-y-6">
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
            disabled={categoryPage.isCreating}
          />

          <button
            onClick={categoryPage.addCategory}
            disabled={categoryPage.isCreating}
            className={`w-full rounded-md py-2 text-sm transition ${categoryPage.isCreating ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
          >
            {categoryPage.isCreating ? "Agregando..." : "Agregar categoría"}
          </button>
        </div>

        {/* Panel derecho */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl shadow-md p-6">
          <Input
            label="Buscar categoría"
            value={categoryPage.search}
            onChange={categoryPage.setSearch}
            placeholder="Ej: Producción"
          />

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
                  categoryPage.openEditModal(row);
                },
              },
              {
                id: "delete",
                variant: "delete",
                label: categoryPage.isDeleting ? "Eliminando..." : "Eliminar",
                disabled: () => categoryPage.isDeleting,
                onClick: (row) => {
                  if (
                    window.confirm(
                      `¿Seguro que deseas eliminar la categoría "${row.name}"?`
                    )
                  ) {
                    categoryPage.removeCategory(row.id);
                  }
                },
              }
              ,
            ]}
          />
        </div>
      </div>
      {/* Modal editar categoría */}
      {categoryPage.editingCategory && (
      <EditServiceCategoryModal
        category={categoryPage.editingCategory}
        isUpdating={categoryPage.isUpdating}
        onChangeName={(value) =>
          categoryPage.setEditingCategory({
            ...categoryPage.editingCategory!,
            name: value,
          })
        }
        onClose={() => categoryPage.setEditingCategory(null)}
        onSave={categoryPage.saveCategory}
      />

      )}
    </section>
  );
}
