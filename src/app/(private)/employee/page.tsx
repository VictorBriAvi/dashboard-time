"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/core/models/employee/employee";
import { useEmployeePage } from "./hook/useEmployeePage";
import { EditEmployeeModal } from "./modal/EditEmployeeModal";
import { useAuthStore } from "@/shared/store/useAuthStore";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { PageLayout, FormPanel, ContentCard, FilterBar, Btn } from "@/ui/PageLayout";
import { Input } from "@/ui/inputs/Input";

export default function EmployeePage() {
  const page = useEmployeePage();
  const { vocab } = useAuthStore();

  const columns: ColumnDef<Employee>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <div
            className="flex-shrink-0 flex items-center justify-center text-[10px] font-semibold"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#E6F1FB",
              color: "#185FA5",
            }}
          >
            {row.original.name?.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-gray-900">{row.original.name}</span>
        </div>
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
      header: "% Pago",
      accessorKey: "paymentPercentage",
      cell: ({ getValue }) => (
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
          style={{ background: "#E6F1FB", color: "#185FA5" }}
        >
          {getValue<number>()}%
        </span>
      ),
    },
    {
      header: "Nacimiento",
      accessorKey: "employeeDateBirth",
      cell: ({ getValue }) => (
        <span className="text-gray-500">{getValue<string>() || "—"}</span>
      ),
    },
  ];

  const formPanel = (
    <FormPanel title={`Nuevo ${vocab.employee.toLowerCase()}`}>
      <Input
        label="Nombre"
        value={page.name}
        onChange={page.setName}
        disabled={page.isCreating}
        placeholder="Nombre completo"
      />
      <Input
        label="Documento"
        value={page.identityDocument}
        onChange={page.setIdentityDocument}
        disabled={page.isCreating}
        placeholder="DNI"
      />
      <Input
        label="% de pago"
        value={page.paymentPercentage}
        onChange={page.setPaymentPercentage}
        disabled={page.isCreating}
        placeholder="Ej: 50"
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
        onClick={page.addEmployee}
        loading={page.isCreating}
      >
        Guardar {vocab.employee.toLowerCase()}
      </Btn>
    </FormPanel>
  );

  return (
    <PageLayout
      title={`${vocab.employee}s`}
      subtitle={`Equipo del negocio`}
      sidebar={formPanel}
    >
      <FilterBar onClear={() => page.setSearch("")}>
        <Input
          label=""
          value={page.search}
          onChange={page.setSearch}
          placeholder={`Buscar ${vocab.employee.toLowerCase()}...`}
        />
      </FilterBar>

      <ContentCard
        title={`${vocab.employee}s`}
        count={
          !page.isLoading
            ? `${page.employees?.length ?? 0} activo${(page.employees?.length ?? 0) !== 1 ? "s" : ""}`
            : undefined
        }
      >
        <GenericDataTable<Employee>
          data={page.employees ?? []}
          columns={columns}
          loading={page.isLoading}
          error={page.isError}
          rowKey={(row) => row.id}
          emptyMessage={`No se encontraron ${vocab.employee.toLowerCase()}s`}
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
                if (window.confirm(`¿Eliminar a "${row.name}"?`))
                  page.removeEmployee(row.id);
              },
            },
          ]}
        />
      </ContentCard>

      {page.editingEmployee && (
        <EditEmployeeModal
          employee={page.editingEmployee}
          isUpdating={page.isUpdating}
          onChange={page.setEditingEmployee}
          onClose={() => page.setEditingEmployee(null)}
          onSave={page.updateEmployee}
        />
      )}
    </PageLayout>
  );
}
