"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";
import { useClientPage } from "@/app/client/hook/useClientPage";

import { Client } from "@/core/models/client/client";
import { EditClientModal } from "./modal/EditClientModal";

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
    <section className="w-full px-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold">Clientes</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Crear */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <Input
            label="Nombre"
            value={clientPage.name}
            onChange={clientPage.setName}
          />

          <Input
            label="Documento"
            value={clientPage.identityDocument}
            onChange={clientPage.setIdentityDocument}
          />

          <Input
            label="Email"
            value={clientPage.email}
            onChange={clientPage.setEmail}
          />
          
          <Input
            label="Telefono"
            value={clientPage.phone}
            onChange={clientPage.setPhone}
          />

          <Input
            type="date"
            label="Fecha nacimiento"
            value={clientPage.dateBirth}
            onChange={clientPage.setDateBirth}
          />

<button
  onClick={clientPage.addClient}
  disabled={!clientPage.canCreateClient || clientPage.isCreating}
  className={`w-full rounded-md py-2 text-sm transition ${
    !clientPage.canCreateClient || clientPage.isCreating
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-black text-white hover:bg-gray-800"
  }`}
>
  {clientPage.isCreating ? "Agregando..." : "Agregar cliente"}
</button>


        </div>

        {/* Listado */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <Input
            label="Buscar cliente"
            value={clientPage.search}
            onChange={clientPage.setSearch}
            placeholder="Ej: Juan"
          />

          <GenericDataTable<Client>
            data={clientPage.clients}
            columns={columns}
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
        </div>
      </div>

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
