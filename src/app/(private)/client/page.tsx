"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";


import { Client } from "@/core/models/client/client";
import { EditClientModal } from "./modal/EditClientModal";
import { useClientPage } from "./hook/useClientPage";

export default function ClientPage() {
  const clientPage = useClientPage();
console.log(clientPage)
  const columns: ColumnDef<Client>[] = [
    { header: "Nombre", accessorKey: "name" },
    { header: "Documento", accessorKey: "identityDocument" },
    { header: "Email", accessorKey: "email" },
    { header: "Telefono", accessorKey: "phone" },
    { header: "Fecha", accessorKey: "dateBirth" },
  ];

  

return (
  <section className="w-full px-6 py-6 space-y-6">
    {/* ===== Header ===== */}
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Clientes
        </h2>
        <p className="text-sm text-gray-500">
          Gestiona los clientes registrados en el sistema
        </p>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-6">
      {/* ======================
          Panel izquierdo (Crear cliente)
      ====================== */}
      <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h3 className="text-sm font-medium text-gray-700">
          Nuevo cliente
        </h3>

        <Input
          label="Nombre"
          value={clientPage.name}
          onChange={clientPage.setName}
          disabled={clientPage.isCreating}
        />

        <Input
          label="Documento"
          value={clientPage.identityDocument}
          onChange={clientPage.setIdentityDocument}
          disabled={clientPage.isCreating}
        />

        <Input
          label="Email"
          value={clientPage.email}
          onChange={clientPage.setEmail}
          disabled={clientPage.isCreating}
        />

        <Input
          label="Teléfono"
          value={clientPage.phone}
          onChange={clientPage.setPhone}
          disabled={clientPage.isCreating}
        />

        <Input
          type="date"
          label="Fecha nacimiento"
          value={clientPage.dateBirth}
          onChange={clientPage.setDateBirth}
          disabled={clientPage.isCreating}
        />

        <button
          onClick={clientPage.addClient}
          disabled={!clientPage.canCreateClient || clientPage.isCreating}
          className={`
            w-full rounded-lg py-2.5 text-sm font-medium transition-colors
            ${
              !clientPage.canCreateClient || clientPage.isCreating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }
          `}
        >
          {clientPage.isCreating ? "Agregando..." : "Agregar cliente"}
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
                  label="Buscar cliente"
                  value={clientPage.search}
                  onChange={clientPage.setSearch}
                  placeholder="Ej: Juan Pérez"
                />
              </div>
            </div>

            <div className="border-t pt-4 flex justify-start">
              <button
                type="button"
                onClick={() => {
                  clientPage.setSearch("");
                }}
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
          {!clientPage.isLoading && (
            <p className="text-sm text-gray-600">
              {clientPage.clients.length} cliente
              {clientPage.clients.length !== 1 && "s"} encontrado
              {clientPage.clients.length !== 1 && "s"}
            </p>
          )}

          {/* Estado vacío */}
          {!clientPage.isLoading &&
          clientPage.clients.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">
                No se encontraron clientes con los filtros seleccionados.
              </p>
            </div>
          ) : (
            <GenericDataTable<Client>
              data={clientPage.clients}
              columns={columns}
              loading={clientPage.isLoading}
              error={clientPage.isError}
              rowKey={(row) => row.id}
              rowActions={[
                {
                  id: "edit",
                  label: "Editar",
                  variant: "edit",
                  onClick: clientPage.openEditModal,
                },
                {
                  id: "delete",
                  label: clientPage.isDeleting
                    ? "Eliminando..."
                    : "Eliminar",
                  variant: "delete",
                  disabled: () => clientPage.isDeleting,
                  onClick: (row) => {
                    if (
                      window.confirm(
                        `¿Seguro que deseas eliminar al cliente "${row.name}"?`
                      )
                    ) {
                      clientPage.removeClient(row.id);
                    }
                  },
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>

    {/* Modal editar cliente */}
    {clientPage.editingClient && (
      <EditClientModal
        client={clientPage.editingClient}
        isUpdating={clientPage.isUpdating}
        onChange={clientPage.setEditingClient}
        onClose={() => clientPage.setEditingClient(null)}
        onSave={clientPage.updateClient}
      />
    )}
  </section>
);
}
