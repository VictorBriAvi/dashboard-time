"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";
import { AsyncSearchableSelect } from "@/ui/inputs/SearchSelect";

import { formatARS } from "@/core/utils/format";
import { Expense } from "@/core/models/expense/expense";
import { useExpensePage } from "@/app/expenses/hook/useExpensePage";
import { useExpenseCategorieSearch } from "@/data/hooks/expenseCategorie/useExpenseCategorie";
import { EditExpenseModal } from "./modal/EditExpenseModal";

export default function ExpensePage() {
  const expensePage = useExpensePage();
  const { loadExpenseCategories } = useExpenseCategorieSearch();

  const columns: ColumnDef<Expense>[] = [
    {
      header: "Fecha",
      accessorKey: "expensesDateStr",
    },
    { header: "Descripción", accessorKey: "description" },
    {
      header: "Precio",
      accessorKey: "price",
      cell: ({ getValue }) => formatARS(getValue<number>()),
    },
    {
      header: "Tipo de gasto",
      accessorKey: "nameExpenseType",
    },
  ];

  return (
    <section className="w-full px-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold">Gastos</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* =====================
            CREAR GASTO
        ====================== */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <Input
            label="Descripción"
            value={expensePage.description}
            onChange={expensePage.setDescription}
          />

          <Input
            label="Precio"
            value={expensePage.price}
            onChange={expensePage.setPrice}
          />

          <AsyncSearchableSelect
            label="Tipo de gasto"
            loadOptions={loadExpenseCategories}
            value={expensePage.expenseTypeSelected}
            onChange={expensePage.setExpenseTypeSelected}
          />

          {/* ✅ FECHA DEL GASTO */}
          <Input
            type="date"
            label="Fecha del gasto"
            value={expensePage.expenseDate}
            onChange={expensePage.setExpenseDate}
          />

          <button
            onClick={expensePage.addExpense}
            disabled={expensePage.isCreating || !expensePage.expenseDate}
            className={`w-full rounded-md py-2 text-sm transition ${
              expensePage.isCreating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {expensePage.isCreating ? "Agregando..." : "Agregar gasto"}
          </button>
        </div>

        {/* =====================
            LISTADO + FILTROS
        ====================== */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <Input
            label="Buscar descripción"
            value={expensePage.search}
            onChange={expensePage.setSearch}
            placeholder="Ej: Alquiler"
          />

          <AsyncSearchableSelect
            label="Filtrar por tipo"
            loadOptions={loadExpenseCategories}
            value={expensePage.expenseTypeFilter}
            onChange={expensePage.setExpenseTypeFilter}
          />

          {/* RANGO DE FECHAS */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              label="Desde"
              value={expensePage.fromDate}
              onChange={expensePage.setFromDate}
            />

            <Input
              type="date"
              label="Hasta"
              value={expensePage.toDate}
              onChange={expensePage.setToDate}
            />
          </div>


          <button
            onClick={expensePage.clearFilters}
            className="text-sm underline text-gray-500"
          >
            Limpiar filtros
          </button>
          <GenericDataTable<Expense>
            data={expensePage.expenses}
            columns={columns}
            loading={expensePage.isLoading}
            error={expensePage.isError}
            rowKey={(row) => row.id}
            rowActions={[
              {
                id: "edit",
                label: "Editar",
                variant: "edit",
                onClick: (row) => expensePage.openEditModal(row),
              },
              {
                id: "delete",
                variant: "delete",
                label: (row) =>
                  expensePage.isDeleting === row.id
                    ? "Eliminando..."
                    : "Eliminar",
                disabled: () => expensePage.isDeleting !== null,
                onClick: (row) => {
                  const confirmed = window.confirm(
                    `¿Seguro que deseas eliminar el gasto "${row.description}"?`
                  );
                  if (!confirmed) return;

                  expensePage.deleteExpense(row.id);
                },
              },
            ]}
          />
        </div>
      </div>

      {/* =====================
          MODAL EDICIÓN
      ====================== */}
      {expensePage.editingExpense && (
        <EditExpenseModal
          expenseType={expensePage.editExpenseType}
          description={expensePage.editDescription}
          price={expensePage.editPrice}
          isUpdating={expensePage.isUpdating}
          loadExpenseTypes={loadExpenseCategories}
          onChangeExpenseType={expensePage.setEditExpenseType}
          onChangeDescription={expensePage.setEditDescription}
          onChangePrice={expensePage.setEditPrice}
          onSave={expensePage.saveEditExpense}
          onClose={() => expensePage.setEditingExpense(null)}
        />
      )}
    </section>
  );
}
