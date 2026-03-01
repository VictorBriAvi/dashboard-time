"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";
import { ExpenseCategorie } from "@/core/models/expenseCategorie/expenseCategorie";
import { EditExpenseCategoryModal } from "./modal/EditExpenseCategoryModal";
import { useExpenseCategoryPage } from "./hook/useExpenseCategoryPage";

export default function ExpenseCategoryPage() {
  const categoryPage = useExpenseCategoryPage();

  const columns: ColumnDef<ExpenseCategorie>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
  ];

  return (
    <section className="w-full px-6 py-6 space-y-6">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Categorías de gasto
          </h2>
          <p className="text-sm text-gray-500">
            Gestiona las categorías utilizadas en los gastos
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* ======================
          Panel izquierdo (Crear categoría)
      ====================== */}
        <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-md p-6 space-y-6">
          <h3 className="text-sm font-medium text-gray-700">Nueva categoría</h3>

          <Input
            label="Nombre de la categoría"
            value={categoryPage.name}
            onChange={categoryPage.setName}
            disabled={categoryPage.isCreating}
          />

          <button
            onClick={categoryPage.addCategory}
            disabled={categoryPage.isCreating}
            className={`
            w-full rounded-lg py-2.5 text-sm font-medium transition-colors
            ${
              categoryPage.isCreating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }
          `}
          >
            {categoryPage.isCreating ? "Agregando..." : "Agregar categoría"}
          </button>
        </div>

        {/* ======================
          Panel derecho
      ====================== */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* ===== Card Filtros ===== */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <h3 className="text-sm font-medium text-gray-700">Filtros</h3>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <Input
                    label="Buscar categoría"
                    value={categoryPage.search}
                    onChange={categoryPage.setSearch}
                    placeholder="Ej: Alquiler"
                  />
                </div>
              </div>

              <div className="border-t pt-4 flex justify-start">
                <button
                  type="button"
                  onClick={() => categoryPage.setSearch("")}
                  className="
                  text-sm text-gray-500
                  hover:text-gray-700
                  transition-colors
                "
                >
                  Limpiar filtros
                </button>
              </div>
            </form>
          </div>

          {/* ===== Card Tabla ===== */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            {/* Contador */}
            {!categoryPage.isLoading && (
              <p className="text-sm text-gray-600">
                {categoryPage.categories.length} categoría
                {categoryPage.categories.length !== 1 && "s"} encontrada
                {categoryPage.categories.length !== 1 && "s"}
              </p>
            )}

            {/* Estado vacío */}
            {!categoryPage.isLoading && categoryPage.categories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">
                  No se encontraron categorías con los filtros seleccionados.
                </p>
              </div>
            ) : (
              <GenericDataTable<ExpenseCategorie>
                data={categoryPage.categories}
                columns={columns}
                loading={categoryPage.isLoading}
                error={categoryPage.isError}
                rowKey={(row) => row.id}
                className="cursor-pointer hover:bg-blue-100 transition-colors duration-150"
                rowActions={[
                  {
                    id: "edit",
                    label: "Editar",
                    variant: "edit",
                    onClick: (row) => categoryPage.openEditModal(row),
                  },
                  {
                    id: "delete",
                    label: categoryPage.isDeleting
                      ? "Eliminando..."
                      : "Eliminar",
                    variant: "delete",
                    disabled: () => categoryPage.isDeleting,
                    onClick: (row) => {
                      if (
                        window.confirm(
                          `¿Seguro que deseas eliminar la categoría "${row.name}"?`,
                        )
                      ) {
                        categoryPage.removeCategory(row.id);
                      }
                    },
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>

      {/* ===== Modal editar categoría ===== */}
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
          onSave={categoryPage.saveEditCategory}
        />
      )}
    </section>
  );
}
