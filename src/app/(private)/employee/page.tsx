"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";
import { EditEmployeeModal } from "./modal/EditEmployeeModal";
import { Employee } from "@/core/models/employee/employee";
import { useEmployeePage } from "./hook/useEmployeePage";

export default function EmployeePage() {
  const employeePage = useEmployeePage();

  const columns: ColumnDef<Employee>[] = [
    { header: "Nombre", accessorKey: "name" },
    { header: "Documento", accessorKey: "identityDocument" },
    {
      header: "% Pago",
      accessorKey: "paymentPercentage",
      cell: ({ getValue }) => `${getValue<number>()}%`,
    },
    { header: "Fecha nacimiento", accessorKey: "employeeDateBirth" },
  ];

return (
  <section className="w-full px-6 py-6 space-y-6">
    {/* ===== Header ===== */}
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Empleados
        </h2>
        <p className="text-sm text-gray-500">
          Gestiona los empleados registrados en el sistema
        </p>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-6">
      {/* ======================
          Panel izquierdo (Crear empleado)
      ====================== */}
      <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h3 className="text-sm font-medium text-gray-700">
          Nuevo empleado
        </h3>

        <Input
          label="Nombre"
          value={employeePage.name}
          onChange={employeePage.setName}
          disabled={employeePage.isCreating}
        />

        <Input
          label="Documento"
          value={employeePage.identityDocument}
          onChange={employeePage.setIdentityDocument}
          disabled={employeePage.isCreating}
        />

        <Input
          label="% de pago"
          value={employeePage.paymentPercentage}
          onChange={employeePage.setPaymentPercentage}
          disabled={employeePage.isCreating}
        />

        <Input
          type="date"
          label="Fecha nacimiento"
          value={employeePage.dateBirth}
          onChange={employeePage.setDateBirth}
          disabled={employeePage.isCreating}
        />

        <button
          onClick={employeePage.addEmployee}
          disabled={employeePage.isCreating}
          className={`
            w-full rounded-lg py-2.5 text-sm font-medium transition-colors
            ${
              employeePage.isCreating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }
          `}
        >
          {employeePage.isCreating ? "Agregando..." : "Agregar empleado"}
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
                  label="Buscar empleado"
                  value={employeePage.search}
                  onChange={employeePage.setSearch}
                  placeholder="Ej: Juan Pérez"
                />
              </div>
            </div>

            <div className="border-t pt-4 flex justify-start">
              <button
                type="button"
                onClick={() => {
                  employeePage.setSearch("");
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
          {!employeePage.isLoading && (
            <p className="text-sm text-gray-600">
              {employeePage.employees.length} empleado
              {employeePage.employees.length !== 1 && "s"} encontrado
              {employeePage.employees.length !== 1 && "s"}
            </p>
          )}

          {/* Estado vacío */}
          {!employeePage.isLoading &&
          employeePage.employees.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">
                No se encontraron empleados con los filtros seleccionados.
              </p>
            </div>
          ) : (
            <GenericDataTable<Employee>
              data={employeePage.employees}
              columns={columns}
              loading={employeePage.isLoading}
              error={employeePage.isError}
              rowKey={(row) => row.id}
              rowActions={[
                {
                  id: "edit",
                  label: "Editar",
                  variant: "edit",
                  onClick: employeePage.openEditModal,
                },
                {
                  id: "delete",
                  label: employeePage.isDeleting
                    ? "Eliminando..."
                    : "Eliminar",
                  variant: "delete",
                  disabled: () => employeePage.isDeleting,
                  onClick: (row) => {
                    if (
                      window.confirm(
                        `¿Seguro que deseas eliminar al empleado "${row.name}"?`
                      )
                    ) {
                      employeePage.removeEmployee(row.id);
                    }
                  },
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>

    {/* Modal editar empleado */}
    {employeePage.editingEmployee && (
      <EditEmployeeModal
        employee={employeePage.editingEmployee}
        isUpdating={employeePage.isUpdating}
        onChange={employeePage.setEditingEmployee}
        onClose={() => employeePage.setEditingEmployee(null)}
        onSave={employeePage.updateEmployee}
      />
    )}
  </section>
);
}
