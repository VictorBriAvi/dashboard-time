"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";
import { AsyncSearchableSelect } from "@/ui/inputs/SearchSelect";
import { useExpensePage, ExpenseUI } from "@/app/expenses/hook/useExpensePage";
// import { useExpenseCategorySearch } from "@/data/hooks/reports/useExpenseCategoryReport";
import { formatARS } from "@/core/utils/format";

export default function ExpensesPage() {
  const expensePage = useExpensePage();
//   const { loadExpenseCategories } = useExpenseCategorySearch();

  const columns: ColumnDef<ExpenseUI>[] = [
    {
      header: "Descripción",
      accessorKey: "description",
    },
    {
      header: "Valor",
      accessorKey: "value",
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
        <h2 className="text-xl font-semibold">Gastos</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Panel izquierdo */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <Input
            label="Descripción gasto"
            value={expensePage.description}
            onChange={expensePage.setDescription}
          />

          <Input
            label="Valor"
            value={expensePage.value}
            onChange={expensePage.setValue}
          />

          {/* <AsyncSearchableSelect
            label="Categoría gasto"
            loadOptions={loadExpenseCategories}
            value={expensePage.categorySelected}
            onChange={expensePage.setCategorySelected}
          /> */}

          <button
            onClick={expensePage.addExpense}
            className="w-full bg-black text-white rounded-md py-2 text-sm hover:bg-gray-800 transition"
          >
            Agregar gasto
          </button>
        </div>

        {/* Panel derecho */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl shadow-md p-6">
          <GenericDataTable<ExpenseUI>
            data={expensePage.expenses}
            columns={columns}
            rowKey={(_, index) => index}
          />
        </div>
      </div>
    </section>
  );
}
