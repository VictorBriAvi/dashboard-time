"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AsyncSearchableSelect } from "@/ui/inputs/SearchSelect";
import { Input } from "@/ui/inputs/Input";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { useServiceTypePage } from "./hooks/useServiceTypePage";
import { formatARS } from "@/core/utils/format";
import { ServiceType } from "@/core/models/serviceType/ServiceType";
import { useServiceCategorieSearch } from "@/data/hooks/serviceCategorie/useServiceCategorie";
import { EditServiceTypeModal } from "./modal/EditServiceTypeModal";
import { useAuthStore } from "@/shared/store/useAuthStore";

export default function ServiceTypePage() {
  const servicePage = useServiceTypePage();
  const { loadServiceCategories } = useServiceCategorieSearch();
  const { vocab } = useAuthStore();

  const columns: ColumnDef<ServiceType>[] = [
    { header: "Nombre",          accessorKey: "name" },
    { header: "Precio",          accessorKey: "price", cell: ({ getValue }) => formatARS(getValue<number>()) },
    { header: vocab.serviceCategory, accessorKey: "serviceCategorieName" },
  ];

  return (
    <section className="w-full px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{vocab.service}s</h2>
          <p className="text-sm text-gray-500">
            Gestiona los {vocab.service.toLowerCase()}s y sus categorías
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Panel izquierdo */}
        <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-md p-6 space-y-6">
          <h3 className="text-sm font-medium text-gray-700">
            Nuevo {vocab.service.toLowerCase()}
          </h3>

          <AsyncSearchableSelect
            label={vocab.serviceCategory}
            loadOptions={loadServiceCategories}
            value={servicePage.categorySelected}
            onChange={(option) => servicePage.setCategorySelected(option)}
          />
          <Input
            label={`Nombre del ${vocab.service.toLowerCase()}`}
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
            className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
              servicePage.isCreating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {servicePage.isCreating ? "Agregando..." : `Agregar ${vocab.service.toLowerCase()}`}
          </button>
        </div>

        {/* Panel derecho */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <Input
                    label={`Buscar ${vocab.service.toLowerCase()}`}
                    value={servicePage.search}
                    onChange={servicePage.setSearch}
                    placeholder="Ej: Corte"
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <AsyncSearchableSelect
                    label={`Filtrar por ${vocab.serviceCategory.toLowerCase()}`}
                    loadOptions={loadServiceCategories}
                    value={servicePage.categoryFilter}
                    onChange={(option) => {
                      servicePage.setCategoryFilter(option);
                      servicePage.setSearch("");
                    }}
                  />
                </div>
              </div>
              <div className="border-t pt-4 flex justify-start">
                <button
                  type="button"
                  onClick={() => {
                    servicePage.setSearch("");
                    servicePage.setCategoryFilter(null);
                    servicePage.setCategorySelected(null);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            {!servicePage.isLoading && (
              <p className="text-sm text-gray-600">
                {servicePage.services.length} {vocab.service.toLowerCase()}
                {servicePage.services.length !== 1 && "s"} encontrado
                {servicePage.services.length !== 1 && "s"}
              </p>
            )}
            {!servicePage.isLoading && servicePage.services.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">
                  No se encontraron {vocab.service.toLowerCase()}s con los filtros seleccionados.
                </p>
              </div>
            ) : (
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
                    onClick: servicePage.openEditModal,
                  },
                  {
                    id: "delete",
                    label: servicePage.isDeleting ? "Eliminando..." : "Eliminar",
                    variant: "delete",
                    disabled: () => servicePage.isDeleting,
                    onClick: (row) => {
                      if (window.confirm(`¿Eliminar "${row.name}"?`))
                        servicePage.removeService(row.id)  // ← removeService, no deleteService
                    },
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal editar — props exactas que espera EditServiceTypeModal */}
      {servicePage.editingService && (
        <EditServiceTypeModal
          category={servicePage.editCategory}           // ← editCategory del hook
          name={servicePage.editName}                   // ← editName del hook
          price={servicePage.editPrice}                 // ← editPrice del hook
          isUpdating={servicePage.isUpdating}
          loadCategories={loadServiceCategories}
          onChangeCategory={servicePage.setEditCategory}
          onChangeName={servicePage.setEditName}
          onChangePrice={servicePage.setEditPrice}
          onClose={() => servicePage.setEditingService(null)}
          onSave={servicePage.saveEditService}          // ← saveEditService, no updateService
        />
      )}
    </section>
  );
}