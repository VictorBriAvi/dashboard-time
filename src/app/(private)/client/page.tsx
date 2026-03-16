"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Client } from "@/core/models/client/client";
import { useClientPage } from "./hook/useClientPage";
import { EditClientModal } from "./modal/EditClientModal";
import { useAuthStore } from "@/shared/store/useAuthStore";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { PageLayout, FormPanel, ContentCard, FilterBar, Btn } from "@/ui/PageLayout";
import { Input } from "@/ui/inputs/Input";

export default function ClientPage() {
  const page = useClientPage();
  const { vocab } = useAuthStore();

  const columns: ColumnDef<Client>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">{getValue<string>()}</span>
      ),
    },
    {
      header: "Documento",
      accessorKey: "identityDocument",
      cell: ({ getValue }) => (
        <span className="text-gray-500">{getValue<string>() || "—"}</span>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ getValue }) => (
        <span className="text-gray-500">{getValue<string>() || "—"}</span>
      ),
    },
    {
      header: "Teléfono",
      accessorKey: "phone",
      cell: ({ getValue }) => (
        <span className="text-gray-500">{getValue<string>() || "—"}</span>
      ),
    },
    {
      header: "Nacimiento",
      accessorKey: "dateBirth",
      cell: ({ getValue }) => (
        <span className="text-gray-500">{getValue<string>() || "—"}</span>
      ),
    },
  ];

  const formPanel = (
    <FormPanel title={`Nuevo ${vocab.client.toLowerCase()}`}>
      <Input
        label="Nombre"
        value={page.name}
        onChange={page.setName}
        disabled={page.isCreating}
        placeholder="Ej: Ana García"
      />
      <Input
        label="Documento"
        value={page.identityDocument}
        onChange={page.setIdentityDocument}
        disabled={page.isCreating}
        placeholder="DNI / CUIT"
      />
      <Input
        label="Email"
        value={page.email}
        onChange={page.setEmail}
        disabled={page.isCreating}
        placeholder="correo@ejemplo.com"
      />
      <Input
        label="Teléfono"
        value={page.phone}
        onChange={page.setPhone}
        disabled={page.isCreating}
        placeholder="+54 11..."
      />
      <Input
        type="date"
        label="Fecha de nacimiento"
        value={page.dateBirth}
        onChange={page.setDateBirth}
        disabled={page.isCreating}
      />
      <Btn
        variant="primary"
        className="w-full justify-center mt-1"
        onClick={page.addClient}
        disabled={!page.canCreateClient}
        loading={page.isCreating}
      >
        Guardar {vocab.client.toLowerCase()}
      </Btn>
    </FormPanel>
  );

  return (
    <PageLayout
      title={`${vocab.client}s`}
      subtitle={`Gestioná los ${vocab.client.toLowerCase()}s registrados`}
      sidebar={formPanel}
    >
      {/* Barra de búsqueda */}
      <FilterBar onClear={() => page.setSearch("")}>
        <Input
          label=""
          value={page.search}
          onChange={page.setSearch}
          placeholder={`Buscar ${vocab.client.toLowerCase()} por nombre...`}
        />
      </FilterBar>

      {/* Tabla */}
      <ContentCard
        title={`${vocab.client}s registrados`}
        count={
          !page.isLoading
            ? `${page.clients?.length ?? 0} resultado${(page.clients?.length ?? 0) !== 1 ? "s" : ""}`
            : undefined
        }
      >
        <GenericDataTable<Client>
          data={page.clients ?? []}
          columns={columns}
          loading={page.isLoading}
          error={page.isError}
          rowKey={(row) => row.id}
          emptyMessage={`No se encontraron ${vocab.client.toLowerCase()}s`}
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
                if (window.confirm(`¿Eliminar a "${row.name}"? Esta acción no se puede deshacer.`))
                  page.removeClient(row.id);
              },
            },
          ]}
        />
      </ContentCard>

      {/* Modal editar */}
      {page.editingClient && (
        <EditClientModal
          client={page.editingClient}
          isUpdating={page.isUpdating}
          onChange={page.setEditingClient}
          onClose={() => page.setEditingClient(null)}
          onSave={page.updateClient}
        />
      )}
    </PageLayout>
  );
}
