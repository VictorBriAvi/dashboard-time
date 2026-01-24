"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";
import { useExpenseCategoryPage } from "@/app/expenses/expensesCategorie/hook/useExpenseCategoryPage";
import { ExpenseCategorie } from "@/core/models/expenseCategorie/expenseCategorie";
import { EditExpenseCategoryModal } from "./modal/EditExpenseCategoryModal";

export default function ExpenseCategoryPage() {
  const categoryPage = useExpenseCategoryPage();

  const columns: ColumnDef<ExpenseCategorie>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
  ];

  return (
    <section className="w-full px-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold">Categoría gasto</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Crear */}
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
            className={`w-full rounded-md py-2 text-sm transition ${
              categoryPage.isCreating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {categoryPage.isCreating ? "Agregando..." : "Agregar categoría"}
          </button>
        </div>

        {/* Listado */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl shadow-md p-6">
          <Input
            label="Buscar categoría"
            value={categoryPage.search}
            onChange={categoryPage.setSearch}
            placeholder="Ej: Alquiler"
          />

          <GenericDataTable<ExpenseCategorie>
            data={categoryPage.categories}
            columns={columns}
            rowKey={(row) => row.id}
            rowActions={[
              {
                id: "edit",
                label: "Editar",
                variant: "edit",
                onClick: categoryPage.openEditModal,
              },
              {
                id: "delete",
                label: (row) =>
                  categoryPage.isDeleting === row.id
                    ? "Eliminando..."
                    : "Eliminar",
                variant: "delete",
                disabled: () => categoryPage.isDeleting !== null,
                onClick: (row) => {
                  if (
                    window.confirm(
                      `¿Seguro que deseas eliminar la categoría "${row.name}"?`,
                    )
                  ) {
                    categoryPage.deleteCategory(row.id);
                  }
                },
              },
            ]}
          />
        </div>
      </div>

      {categoryPage.editingCategory && (
        <EditExpenseCategoryModal
          category={categoryPage.editingCategory}
          isUpdating={categoryPage.isUpdating}
          onChangeName={(value) =>
            categoryPage.setEditingCategory({
              ...categoryPage.editingCategory!,
              name: value,
            })
          }
          onClose={() => categoryPage.setEditingCategory(null)}
          onSave={categoryPage.updateCategory}
        />
      )}
    </section>
  );
}
