"use client"

import { ColumnDef } from "@tanstack/react-table"
import GenericDataTable from "@/ui/dataTable/GenericDataTable"
import { Input } from "@/ui/inputs/Input"
import { UserModel } from "@/core/models/user/user"
import { useUsersPage } from "./hook/useUsersPage"

export default function UsersPage() {
  const page = useUsersPage()

  const columns: ColumnDef<UserModel>[] = [
    { header: "Nombre",   accessorKey: "fullName" },
    { header: "Usuario",  accessorKey: "username" },
    { header: "Email",    accessorKey: "email" },
    {
      header: "Estado",
      accessorKey: "isActive",
      cell: ({ getValue }) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          getValue<boolean>() ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
        }`}>
          {getValue<boolean>() ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    { header: "Creado",   accessorKey: "createdOn" },
  ]

  return (
    <section className="w-full px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800">Usuarios</h2>
        <p className="text-sm text-gray-500">
          Gestiona los usuarios del sistema
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Panel izquierdo — Crear usuario */}
        <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Nuevo usuario</h3>

          <Input label="Nombre completo" value={page.fullName} onChange={page.setFullName} disabled={page.isCreating} />
          <Input label="Username"        value={page.username} onChange={page.setUsername} disabled={page.isCreating} />
          <Input label="Email"           value={page.email}    onChange={page.setEmail}    disabled={page.isCreating} />
          <Input label="Contraseña"      value={page.password} onChange={page.setPassword} disabled={page.isCreating} />

          <button
            onClick={page.addUser}
            disabled={page.isCreating}
            className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
              page.isCreating ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {page.isCreating ? "Creando..." : "Crear usuario"}
          </button>
        </div>

        {/* Panel derecho — Tabla */}
        <div className="col-span-12 lg:col-span-9">
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            {!page.isLoading && (
              <p className="text-sm text-gray-600">
                {page.users.length} usuario{page.users.length !== 1 && "s"}
              </p>
            )}

            {!page.isLoading && page.users.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">No hay usuarios registrados.</p>
              </div>
            ) : (
              <GenericDataTable<UserModel>
                data={page.users}
                columns={columns}
                loading={page.isLoading}
                error={page.isError}
                rowKey={(row) => row.id}
                rowActions={[
                  {
                    id: "reset",
                    label: "Resetear contraseña",
                    variant: "edit",
                    onClick: (row) => page.openResetModal(row),
                  },
                  // Eliminar solo visible para SuperAdmin
                  ...(page.isSuperAdmin
                    ? [{
                        id: "delete",
                        label: page.isDeleting ? "Eliminando..." : "Eliminar",
                        variant: "delete" as const,
                        disabled: () => page.isDeleting,
                        onClick: (row: UserModel) => {
                          if (window.confirm(`¿Eliminar usuario "${row.username}"?`))
                            page.deleteUser(row.id)
                        },
                      }]
                    : []),
                ]}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal reset contraseña */}
      {page.resettingUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold">Resetear contraseña</h3>
            <p className="text-sm text-gray-500">
              Usuario: <strong>{page.resettingUser.username}</strong>
            </p>

            <Input
              label="Nueva contraseña"
              value={page.newPassword}
              onChange={page.setNewPassword}
              disabled={page.isResetting}
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => page.setResettingUser(null)}
                disabled={page.isResetting}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={page.confirmReset}
                disabled={page.isResetting || !page.newPassword.trim()}
                className={`px-4 py-2 text-sm rounded-md text-white ${
                  page.isResetting || !page.newPassword.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {page.isResetting ? "Guardando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}