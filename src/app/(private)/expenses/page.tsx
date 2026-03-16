"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Expense } from "@/core/models/expense/expense";
import { useExpensePage } from "./hook/useExpensePage";
import { EditExpenseModal } from "./modal/EditExpenseModal";
import { useAuthStore } from "@/shared/store/useAuthStore";
import { useExpenseCategorieSearch } from "@/data/hooks/expenseCategorie/useExpenseCategorie";
import { usePaymentTypeAllSearch } from "@/data/hooks/paymentType/usePaymentType";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { PageLayout, FormPanel, ContentCard, FilterBar, Btn } from "@/ui/PageLayout";
import { Input } from "@/ui/inputs/Input";
import { AsyncSearchableSelect } from "@/ui/inputs/SearchSelect";
import { formatARS } from "@/core/utils/format";

export default function ExpensePage() {
  const page = useExpensePage();
  const { vocab } = useAuthStore();
  const { loadExpenseCategories } = useExpenseCategorieSearch();
  const { loadPaymentTypeSearch } = usePaymentTypeAllSearch();

  const columns: ColumnDef<Expense>[] = [
    {
      header: "Fecha",
      accessorKey: "expensesDateStr",
      cell: ({ getValue }) => (
        <span className="text-gray-500 text-xs">{getValue<string>()}</span>
      ),
    },
    {
      header: "Descripción",
      accessorKey: "description",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">{getValue<string>()}</span>
      ),
    },
    {
      header: vocab.expenseCategory,
      accessorKey: "nameExpenseType",
      cell: ({ getValue }) => (
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
          style={{ background: "#FAEEDA", color: "#854F0B" }}
        >
          {getValue<string>()}
        </span>
      ),
    },
    {
      header: vocab.paymentType,
      accessorKey: "paymentTypeName",
      cell: ({ getValue }) => (
        <span className="text-gray-500 text-xs">{getValue<string>()}</span>
      ),
    },
    {
      header: "Monto",
      accessorKey: "price",
      cell: ({ getValue }) => (
        <span className="font-medium text-red-600">
          -{formatARS(getValue<number>())}
        </span>
      ),
    },
  ];

  const formPanel = (
    <FormPanel title={`Nuevo ${vocab.expense.toLowerCase()}`}>
      <Input
        label="Descripción"
        value={page.description}
        onChange={page.setDescription}
        disabled={page.isCreating}
        placeholder="Ej: Compra de insumos"
      />
      <AsyncSearchableSelect
        label={vocab.expenseCategory}
        loadOptions={loadExpenseCategories}
        value={page.expenseTypeSelected}
        onChange={page.setExpenseTypeSelected}
      />
      <Input
        label="Monto"
        value={page.price}
        onChange={page.setPrice}
        disabled={page.isCreating}
        placeholder="$0"
      />
      <AsyncSearchableSelect
        label={vocab.paymentType}
        loadOptions={loadPaymentTypeSearch}
        value={page.paymentTypeSelected}
        onChange={page.setPaymentTypeSelected}
      />
      <Input
        type="date"
        label="Fecha"
        value={page.expenseDate}
        onChange={page.setExpenseDate}
        disabled={page.isCreating}
      />
      <Btn
        variant="primary"
        className="w-full justify-center mt-1"
        onClick={page.addExpense}
        loading={page.isCreating}
      >
        Guardar {vocab.expense.toLowerCase()}
      </Btn>
    </FormPanel>
  );

  return (
    <PageLayout
      title={`${vocab.expense}s`}
      subtitle="Registro de egresos del negocio"
      actions={
        <Link
          href="/expenses/expensesCategorie"
          className="text-sm font-medium text-[#185FA5] hover:underline"
        >
          Ver categorías →
        </Link>
      }
      sidebar={formPanel}
    >
      {/* Filtros — se aplican automáticamente al cambiar los valores */}
      <FilterBar onClear={page.clearFilters}>
        <Input
          label=""
          value={page.fromDate}
          onChange={page.setFromDate}
          type="date"
        />
        <Input
          label=""
          value={page.toDate}
          onChange={page.setToDate}
          type="date"
        />
        <AsyncSearchableSelect
          label=""
          loadOptions={loadExpenseCategories}
          value={page.expenseTypeFilter}
          onChange={page.setExpenseTypeFilter}
        />
        <AsyncSearchableSelect
          label=""
          loadOptions={loadPaymentTypeSearch}
          value={page.paymentTypeFilter}
          onChange={page.setPaymentTypeFilter}
        />
      </FilterBar>

      <ContentCard
        title={`${vocab.expense}s`}
        count={
          !page.isLoading
            ? `${page.expenses.length} registro${page.expenses.length !== 1 ? "s" : ""}`
            : undefined
        }
      >
        <GenericDataTable<Expense>
          data={page.expenses}
          columns={columns}
          loading={page.isLoading}
          error={page.isError}
          rowKey={(row) => row.id}
          emptyMessage={`No se encontraron ${vocab.expense.toLowerCase()}s`}
          rowActions={[
            {
              id: "edit",
              label: "Editar",
              variant: "edit",
              onClick: (row) => page.openEditModal(row),
            },
            {
              id: "delete",
              label: page.isDeleting ? "Eliminando…" : "Eliminar",
              variant: "delete",
              disabled: () => page.isDeleting,
              onClick: (row) => {
                if (window.confirm(`¿Eliminar este ${vocab.expense.toLowerCase()}?`))
                  page.removeExpense(row.id);
              },
            },
          ]}
        />
      </ContentCard>

      {page.editingExpense && (
        <EditExpenseModal
          expenseType={page.editExpenseType}
          paymentType={page.editPaymentType}
          description={page.editDescription}
          expenseDate={page.editExpenseDate}
          price={page.editPrice}
          isUpdating={page.isUpdating}
          loadExpenseTypes={loadExpenseCategories}
          loadPaymentTypes={loadPaymentTypeSearch}
          onChangeExpenseType={page.setEditExpenseType}
          onChangePaymentType={page.setEditPaymentType}
          onChangeDescription={page.setEditDescription}
          onChangeExpenseDate={page.setEditExpenseDate}
          onChangePrice={page.setEditPrice}
          onSave={page.saveEditExpense}
          onClose={() => page.setEditingExpense(null)}
        />
      )}
    </PageLayout>
  );
}
