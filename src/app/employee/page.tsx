"use client";

import { ColumnDef } from "@tanstack/react-table";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Input } from "@/ui/inputs/Input";
import { useEmployeePage } from "@/app/employee/hook/useEmployeePage";
import { EditEmployeeModal } from "./modal/EditEmployeeModal";
import { Employee } from "@/core/models/employee/employee";

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
    <section className="w-full px-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold">Empleados</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Crear */}
        <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <Input
            label="Nombre"
            value={employeePage.name}
            onChange={employeePage.setName}
          />

          <Input
            label="Documento"
            value={employeePage.identityDocument}
            onChange={employeePage.setIdentityDocument}
          />

          <Input
            label="% de pago"
            value={employeePage.paymentPercentage}
            onChange={employeePage.setPaymentPercentage}
          />

          <Input
            type="date"
            label="Fecha nacimiento"
            value={employeePage.dateBirth}
            onChange={employeePage.setDateBirth}
          />

          <button
            onClick={employeePage.addEmployee}
            disabled={employeePage.isCreating}
            className={`w-full rounded-md py-2 text-sm transition ${
              employeePage.isCreating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {employeePage.isCreating ? "Agregando..." : "Agregar empleado"}
          </button>
        </div>

        {/* Listado */}
        <div className="col-span-12 lg:col-span-9 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <Input
            label="Buscar empleado"
            value={employeePage.search}
            onChange={employeePage.setSearch}
            placeholder="Ej: Juan"
          />

<GenericDataTable<Employee>
  data={employeePage.employees}
  columns={columns}
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
      label: employeePage.isDeleting ? "Eliminando..." : "Eliminar",
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

        </div>
      </div>

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
