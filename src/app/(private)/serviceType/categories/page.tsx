"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";

import { EditServiceCategoryModal } from "./modal/EditServiceCategoryModal";
import { useAuthStore } from "@/shared/store/useAuthStore";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { PageLayout, FormPanel, ContentCard, FilterBar, Btn } from "@/ui/PageLayout";
import { Input } from "@/ui/inputs/Input";
import { useServiceCategoryPage } from "./hook/useServiceCategoryPage";

export default function ServiceCategoryPage() {
  const page = useServiceCategoryPage();
  const { vocab } = useAuthStore();

  const columns: ColumnDef<ServiceCategorie>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">{getValue<string>()}</span>
      ),
    },
  ];

  const formPanel = (
    <FormPanel title={`Nueva ${vocab.serviceCategory.toLowerCase()}`}>
      <Input
        label="Nombre"
        value={page.name}
        onChange={page.setName}
        disabled={page.isCreating}
        placeholder="Ej: Cabello, Uñas..."
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
      title={`${vocab.serviceCategory}s`}
      subtitle="Agrupadores de tipos de servicio"
      actions={
        <Link
          href="/serviceType"
          className="text-sm font-medium text-[#185FA5] hover:underline"
        >
          ← Ver servicios
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
        title="Categorías"
        count={
          !page.isLoading
            ? `${page.categories.length} registrada${page.categories.length !== 1 ? "s" : ""}`
            : undefined
        }
      >
        <GenericDataTable<ServiceCategorie>
          data={page.categories}
          columns={columns}
          loading={page.isLoading}
          error={page.isError}
          rowKey={(row) => row.id}
          emptyMessage="No se encontraron categorías"
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

      {page.editingCategory && (
        <EditServiceCategoryModal
          category={page.editingCategory}
          isUpdating={page.isUpdating}
          onChangeName={(v) =>
            page.setEditingCategory({ ...page.editingCategory!, name: v })
          }
          onClose={() => page.setEditingCategory(null)}
          onSave={page.saveCategory}
        />
      )}
    </PageLayout>
  );
}
