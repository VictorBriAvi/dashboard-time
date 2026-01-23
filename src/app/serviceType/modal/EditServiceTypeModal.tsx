"use client";

import { Input } from "@/ui/inputs/Input";
import { AsyncSearchableSelect, Option } from "@/ui/inputs/SearchSelect";

type Props = {
  category: Option | null;
  name: string;
  price: string;
  isUpdating: boolean;

  loadCategories: (input: string) => Promise<Option[]>;

  onChangeCategory: (option: Option | null) => void;
  onChangeName: (value: string) => void;
  onChangePrice: (value: string) => void;

  onClose: () => void;
  onSave: () => void;
};

export function EditServiceTypeModal({
  category,
  name,
  price,
  isUpdating,
  loadCategories,
  onChangeCategory,
  onChangeName,
  onChangePrice,
  onClose,
  onSave,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold">Editar servicio</h3>

        <AsyncSearchableSelect
          label="Categoría"
          loadOptions={loadCategories}
          value={category}
          onChange={onChangeCategory}
        />

        <Input
          label="Nombre del servicio"
          value={name}
          onChange={onChangeName}
          disabled={isUpdating}
        />

        <Input
          label="Precio"
          value={price}
          onChange={onChangePrice}
          disabled={isUpdating}
        />

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>

          <button
            onClick={onSave}
            disabled={isUpdating}
            className={`px-4 py-2 text-sm rounded-md text-white ${
              isUpdating ? "bg-gray-400" : "bg-black hover:bg-gray-800"
            }`}
          >
            {isUpdating ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
