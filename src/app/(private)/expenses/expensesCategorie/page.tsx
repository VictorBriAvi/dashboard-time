"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ExpenseCategorie } from "@/core/models/expenseCategorie/expenseCategorie";
import { useExpenseCategoryPage } from "./hook/useExpenseCategoryPage";
import { useAuthStore } from "@/shared/store/useAuthStore";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { PageLayout, FormPanel, ContentCard, FilterBar, Btn } from "@/ui/PageLayout";
import { Input } from "@/ui/inputs/Input";
import { Modal, ModalFooter, ModalField } from "@/ui/Modals";

export default function ExpenseCategoryPage() {
  const page = useExpenseCategoryPage();
  const { vocab } = useAuthStore();

  const columns: ColumnDef<ExpenseCategorie>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">{getValue<string>()}</span>
      ),
    },
  ];

  const formPanel = (
    <FormPanel title={`Nueva ${vocab.expenseCategory.toLowerCase()}`}>
      <Input
        label="Nombre"
        value={page.name}
        onChange={page.setName}
        disabled={page.isCreating}
        placeholder="Ej: Insumos, Alquiler..."
      />
      <Btn
        variant="primary"
        className="w-full justify-center mt-1"
        onClick={page.addCategory}
        loading={page.isCreating}
        disabled={!page.name.trim()}
      >
        Guardar categoría
      </Btn>
    </FormPanel>
  );

  return (
    <PageLayout
      title={`${vocab.expenseCategory}s`}
      subtitle="Clasificá tus egresos por tipo"
      actions={
        <Link
          href="/expenses"
          className="text-sm font-medium text-[#185FA5] hover:underline"
        >
          ← Ver gastos
        </Link>
      }
      sidebar={formPanel}
    >
      <FilterBar onClear={() => page.setSearch("")}>
        <Input
          label=""
          value={page.search}
          onChange={page.setSearch}
          placeholder="Buscar categoría..."
        />
      </FilterBar>

      <ContentCard
        title={`${vocab.expenseCategory}s`}
        count={
          !page.isLoading
            ? `${page.categories.length} registrada${page.categories.length !== 1 ? "s" : ""}`
            : undefined
        }
      >
        <GenericDataTable<ExpenseCategorie>
          data={page.categories}
          columns={columns}
          loading={page.isLoading}
          error={page.isError}
          rowKey={(row) => row.id}
          emptyMessage="No se encontraron categorías de gastos"
          rowActions={[
            {
              id: "edit",
              label: "Editar",
              variant: "edit",
              onClick: page.openEditModal,
            },
            {
              id: "delete",
              label: page.isDeleting ? "Eliminando…" : "Eliminar",
              variant: "delete",
              disabled: () => page.isDeleting,
              onClick: (row) => {
                if (window.confirm(`¿Eliminar la categoría "${row.name}"?`))
                  page.removeCategory(row.id);
              },
            },
          ]}
        />
      </ContentCard>

      {/* Modal editar — inline ya que es solo un campo */}
      {page.editingCategory && (
        <Modal
          isOpen
          onClose={() => page.setEditingCategory(null)}
          title="Editar categoría"
          subtitle={page.editingCategory.name}
          size="sm"
          footer={
            <ModalFooter
              onCancel={() => page.setEditingCategory(null)}
              onConfirm={page.saveEditCategory}
              isLoading={page.isUpdating}
              confirmLabel="Guardar cambios"
            />
          }
        >
          <ModalField label="Nombre" required>
            <Input
              value={page.editingCategory.name}
              onChange={(v) =>
                page.setEditingCategory({ ...page.editingCategory!, name: v })
              }
              placeholder="Ej: Insumos, Alquiler..."
            />
          </ModalField>
        </Modal>
      )}
    </PageLayout>
  );
}
