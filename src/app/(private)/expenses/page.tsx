"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";
import { AsyncSearchableSelect } from "@/ui/inputs/SearchSelect";

import { formatARS } from "@/core/utils/format";
import { Expense } from "@/core/models/expense/expense";
import { useExpenseCategorieSearch } from "@/data/hooks/expenseCategorie/useExpenseCategorie";
import { EditExpenseModal } from "./modal/EditExpenseModal";
import { usePaymentTypeAllSearch } from "@/data/hooks/paymentType/usePaymentType";
import PaymentTypePage from "../paymentType/page";
import { useExpensePage } from "./hook/useExpensePage";

export default function ExpensePage() {
  const expensePage = useExpensePage();
  const { loadExpenseCategories } = useExpenseCategorieSearch();
  const { loadPaymentTypeSearch } = usePaymentTypeAllSearch();

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
    {
      header: "Tipo de pago",
      accessorKey: "paymentTypeName",
    },
  ];

return (
  <section className="w-full px-6 py-6 space-y-6">
    {/* ===== Header ===== */}
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Gastos
        </h2>
        <p className="text-sm text-gray-500">
          Gestiona los gastos registrados en el sistema
        </p>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-6">
      {/* ======================
          Panel izquierdo (Crear gasto)
      ====================== */}
      <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h3 className="text-sm font-medium text-gray-700">
          Nuevo gasto
        </h3>

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

        <AsyncSearchableSelect
          label="Tipo de pago"
          loadOptions={loadPaymentTypeSearch}
          value={expensePage.paymentTypeSelected}
          onChange={expensePage.setPaymentTypeSelected}
        />

        <Input
          type="date"
          label="Fecha del gasto"
          value={expensePage.expenseDate}
          onChange={expensePage.setExpenseDate}
        />

        <button
          onClick={expensePage.addExpense}
          disabled={
            expensePage.isCreating || !expensePage.expenseDate
          }
          className={`
            w-full rounded-lg py-2.5 text-sm font-medium transition-colors
            ${
              expensePage.isCreating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }
          `}
        >
          {expensePage.isCreating
            ? "Agregando..."
            : "Agregar gasto"}
        </button>
      </div>

      {/* ======================
          Panel derecho
      ====================== */}
      <div className="col-span-12 lg:col-span-9 space-y-6">

        {/* ===== Card Filtros ===== */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
          >
            <h3 className="text-sm font-medium text-gray-700">
              Filtros
            </h3>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <Input
                  label="Buscar descripción"
                  value={expensePage.search}
                  onChange={expensePage.setSearch}
                  placeholder="Ej: Alquiler"
                />
              </div>

              <div className="col-span-12 md:col-span-6">
                <AsyncSearchableSelect
                  label="Filtrar por tipo de gasto"
                  loadOptions={loadExpenseCategories}
                  value={expensePage.expenseTypeFilter}
                  onChange={expensePage.setExpenseTypeFilter}
                />
              </div>

              <div className="col-span-12 md:col-span-6">
                <AsyncSearchableSelect
                  label="Filtrar por tipo de pago"
                  loadOptions={loadPaymentTypeSearch}
                  value={expensePage.paymentTypeFilter}
                  onChange={expensePage.setPaymentTypeFilter}
                />
              </div>

              <div className="col-span-12 md:col-span-3">
                <Input
                  type="date"
                  label="Desde"
                  value={expensePage.fromDate}
                  onChange={expensePage.setFromDate}
                />
              </div>

              <div className="col-span-12 md:col-span-3">
                <Input
                  type="date"
                  label="Hasta"
                  value={expensePage.toDate}
                  onChange={expensePage.setToDate}
                />
              </div>
            </div>

            <div className="border-t pt-4 flex justify-start">
              <button
                type="button"
                onClick={expensePage.clearFilters}
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
          {!expensePage.isLoading && (
            <p className="text-sm text-gray-600">
              {expensePage.expenses.length} gasto
              {expensePage.expenses.length !== 1 && "s"} encontrado
              {expensePage.expenses.length !== 1 && "s"}
            </p>
          )}

          {/* Estado vacío */}
          {!expensePage.isLoading &&
          expensePage.expenses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">
                No se encontraron gastos con los filtros seleccionados.
              </p>
            </div>
          ) : (
            <GenericDataTable<Expense>
              data={expensePage.expenses}
              columns={columns}
              loading={expensePage.isLoading}
              error={expensePage.isError}
              rowKey={(row) => row.id}
              rowClassName={() =>
                "cursor-pointer hover:bg-blue-100 transition-colors duration-150"
              }
              rowActions={[
                {
                  id: "edit",
                  label: "Editar",
                  variant: "edit",
                  onClick: (row) =>
                    expensePage.openEditModal(row),
                },
                {
                  id: "delete",
                  variant: "delete",
                  label: expensePage.isDeleting
                    ? "Eliminando..."
                    : "Eliminar",
                  disabled: () => expensePage.isDeleting,
                  onClick: (row) => {
                    if (
                      window.confirm(
                        `¿Seguro que deseas eliminar el gasto "${row.description}"?`
                      )
                    ) {
                      expensePage.removeExpense(row.id);
                    }
                  },
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>

    {/* ===== Modal editar gasto ===== */}
    {expensePage.editingExpense && (
      <EditExpenseModal
        expenseType={expensePage.editExpenseType}
        paymentType={expensePage.editPaymentType}
        description={expensePage.editDescription}
        expenseDate={expensePage.editExpenseDate}
        price={expensePage.editPrice}
        isUpdating={expensePage.isUpdating}
        loadExpenseTypes={loadExpenseCategories}
        loadPaymentTypes={loadPaymentTypeSearch}
        onChangeExpenseType={expensePage.setEditExpenseType}
        onChangePaymentType={expensePage.setEditPaymentType}
        onChangeDescription={expensePage.setEditDescription}
        onChangeExpenseDate={expensePage.setEditExpenseDate}
        onChangePrice={expensePage.setEditPrice}
        onSave={expensePage.saveEditExpense}
        onClose={() =>
          expensePage.setEditingExpense(null)
        }
      />
    )}
  </section>
);
}
