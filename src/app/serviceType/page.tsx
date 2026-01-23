"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AsyncSearchableSelect } from "@/ui/inputs/SearchSelect";
import { Input } from "@/ui/inputs/Input";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";

import { useServicePage } from "./hooks/useServicePage";
import { formatARS } from "@/core/utils/format";
import { ServiceType } from "@/core/models/serviceType/ServiceType";
import { useServiceCategorieSearch } from "@/data/hooks/serviceCategorie/useServiceCategorie";
import { EditServiceTypeModal } from "./modal/EditServiceTypeModal";

export default function ServicesPage() {
  const servicePage = useServicePage();
  const { loadServiceCategories } = useServiceCategorieSearch();

  const columns: ColumnDef<ServiceType>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Precio",
      accessorKey: "price",
      cell: ({ getValue }) => formatARS(getValue<number>()),
    },
    {
      header: "Categoría",
      accessorKey: "serviceCategorieName",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold">Servicios</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* ======================
            Panel izquierdo (crear + filtrar por categoría)
        ====================== */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <AsyncSearchableSelect
            label="Categoría"
            loadOptions={loadServiceCategories}
            value={servicePage.categorySelected}
            onChange={(option) => {
              // ✅ SOLO crear
              servicePage.setCategorySelected(option);
            }}
          />

          <Input
            label="Nombre del servicio"
            value={servicePage.name}
            onChange={servicePage.setName}
            disabled={servicePage.isCreating}
          />

          <Input
            label="Precio"
            value={servicePage.price}
            onChange={servicePage.setPrice}
            disabled={servicePage.isCreating}
          />

          <button
            onClick={servicePage.addService}
            disabled={servicePage.isCreating}
            className={`w-full rounded-md py-2 text-sm transition ${
              servicePage.isCreating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {servicePage.isCreating ? "Agregando..." : "Agregar servicio"}
          </button>
        </div>

        {/* ======================
            Panel derecho (listar + buscar por nombre)
        ====================== */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <Input
            label="Buscar servicio"
            value={servicePage.search}
            onChange={servicePage.setSearch}
            placeholder="Ej: Corte"
          />
          <AsyncSearchableSelect
            label="Filtrar por categoría"
            loadOptions={loadServiceCategories}
            value={servicePage.categoryFilter}
            onChange={(option) => {
              // 🔹 filtra la tabla por categoría (envía ID)
              servicePage.setCategoryFilter(option);

              // 🔹 opcional: limpiar búsqueda por nombre
              servicePage.setSearch("");
            }}
          />

          <button
            onClick={() => {
              servicePage.setSearch("");
              servicePage.setCategoryFilter(null);
              servicePage.setCategorySelected(null);
            }}
            className="text-sm underline text-gray-500"
          >
            Limpiar filtros
          </button>

          <GenericDataTable<ServiceType>
            data={servicePage.services}
            columns={columns}
            loading={servicePage.isLoading}
            error={servicePage.isError}
            rowKey={(row) => row.id}
            rowActions={[
              {
                id: "edit",
                label: "Editar",
                variant: "edit",
                onClick: (row) => servicePage.openEditModal(row),
              },
              {
                id: "delete",
                variant: "delete",
                label: (row) =>
                  servicePage.isDeleting === row.id
                    ? "Eliminando..."
                    : "Eliminar",
                disabled: () => servicePage.isDeleting !== null,
                onClick: (row) => {
                  const confirmed = window.confirm(
                    `¿Seguro que deseas eliminar el servicio "${row.name}"?`,
                  );
                  if (!confirmed) return;
                  servicePage.deleteServiceType(row.id);
                },
              },
            ]}
          />
        </div>
      </div>

      {/* Modal editar servicio */}
      {servicePage.editingService && (
        <EditServiceTypeModal
          category={servicePage.editCategory}
          name={servicePage.editName}
          price={servicePage.editPrice}
          isUpdating={servicePage.isUpdating}
          loadCategories={loadServiceCategories}
          onChangeCategory={servicePage.setEditCategory}
          onChangeName={servicePage.setEditName}
          onChangePrice={servicePage.setEditPrice}
          onSave={servicePage.saveEditService}
          onClose={() => servicePage.setEditingService(null)}
        />
      )}
    </section>
  );
}
