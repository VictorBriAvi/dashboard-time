"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ServiceType } from "@/core/models/serviceType/ServiceType";
import { useServiceTypePage } from "./hooks/useServiceTypePage";
import { EditServiceTypeModal } from "./modal/EditServiceTypeModal";
import { useAuthStore } from "@/shared/store/useAuthStore";
import { useServiceCategorieSearch } from "@/data/hooks/serviceCategorie/useServiceCategorie";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { PageLayout, FormPanel, ContentCard, FilterBar, Btn } from "@/ui/PageLayout";
import { Input } from "@/ui/inputs/Input";
import { AsyncSearchableSelect } from "@/ui/inputs/SearchSelect";
import { formatARS } from "@/core/utils/format";

export default function ServiceTypePage() {
  const page = useServiceTypePage();
  const { vocab } = useAuthStore();
  const { loadServiceCategories } = useServiceCategorieSearch();

  const columns: ColumnDef<ServiceType>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">{getValue<string>()}</span>
      ),
    },
    {
      header: "Categoría",
      accessorKey: "serviceCategorieName",
      cell: ({ getValue }) => (
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
          style={{ background: "#E6F1FB", color: "#185FA5" }}
        >
          {getValue<string>()}
        </span>
      ),
    },
    {
      header: "Precio",
      accessorKey: "price",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">{formatARS(getValue<number>())}</span>
      ),
    },
  ];

  const formPanel = (
    <FormPanel title={`Nuevo ${vocab.service.toLowerCase()}`}>
      <AsyncSearchableSelect
        label={vocab.serviceCategory}
        loadOptions={loadServiceCategories}
        value={page.categorySelected}
        onChange={page.setCategorySelected}
      />
      <Input
        label={`Nombre del ${vocab.service.toLowerCase()}`}
        value={page.name}
        onChange={page.setName}
        disabled={page.isCreating}
        placeholder="Ej: Corte de cabello"
      />
      <Input
        label="Precio"
        value={page.price}
        onChange={page.setPrice}
        disabled={page.isCreating}
        placeholder="$0"
      />
      <Btn
        variant="primary"
        className="w-full justify-center mt-1"
        onClick={page.addService}
        loading={page.isCreating}
        disabled={!page.categorySelected || !page.name.trim() || !page.price}
      >
        Guardar {vocab.service.toLowerCase()}
      </Btn>
    </FormPanel>
  );

  return (
    <PageLayout
      title={`${vocab.service}s`}
      subtitle="Tipos de servicio del negocio"
      actions={
        <Link
          href="/serviceType/categories"
          className="text-sm font-medium text-[#185FA5] hover:underline"
        >
          Ver categorías →
        </Link>
      }
      sidebar={formPanel}
    >
      <FilterBar onClear={() => { page.setSearch(""); page.setCategoryFilter(null); }}>
        <Input
          label=""
          value={page.search}
          onChange={page.setSearch}
          placeholder={`Buscar ${vocab.service.toLowerCase()}...`}
        />
        <AsyncSearchableSelect
          label=""
          loadOptions={loadServiceCategories}
          value={page.categoryFilter}
          onChange={page.setCategoryFilter}
        />
      </FilterBar>

      <ContentCard
        title={`${vocab.service}s`}
        count={
          !page.isLoading
            ? `${page.services.length} resultado${page.services.length !== 1 ? "s" : ""}`
            : undefined
        }
      >
        <GenericDataTable<ServiceType>
          data={page.services}
          columns={columns}
          loading={page.isLoading}
          error={page.isError}
          rowKey={(row) => row.id}
          emptyMessage={`No se encontraron ${vocab.service.toLowerCase()}s`}
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
                if (window.confirm(`¿Eliminar "${row.name}"?`))
                  page.removeService(row.id);
              },
            },
          ]}
        />
      </ContentCard>

      {page.editingService && (
        <EditServiceTypeModal
          category={page.editCategory}
          name={page.editName}
          price={page.editPrice}
          isUpdating={page.isUpdating}
          loadCategories={loadServiceCategories}
          onChangeCategory={page.setEditCategory}
          onChangeName={page.setEditName}
          onChangePrice={page.setEditPrice}
          onClose={() => page.setEditingService(null)}
          onSave={page.saveEditService}
        />
      )}
    </PageLayout>
  );
}
