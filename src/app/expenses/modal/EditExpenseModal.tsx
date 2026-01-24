"use client";

import { Input } from "@/ui/inputs/Input";
import { AsyncSearchableSelect, Option } from "@/ui/inputs/SearchSelect";

type Props = {
  expenseType: Option | null;
  description: string;
  price: string;
  isUpdating: boolean;

  loadExpenseTypes: (input: string) => Promise<Option[]>;

  onChangeExpenseType: (option: Option | null) => void;
  onChangeDescription: (value: string) => void;
  onChangePrice: (value: string) => void;

  onClose: () => void;

  
  onSave: () => void;
};

export function EditExpenseModal({
  expenseType,
  description,
  price,
  isUpdating,
  loadExpenseTypes,
  onChangeExpenseType,
  onChangeDescription,
  onChangePrice,
  onClose,
  onSave,
}: Props) {
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold">Editar gasto</h3>

        <AsyncSearchableSelect
          label="Tipo de gasto"
          loadOptions={loadExpenseTypes}
          value={expenseType}
          onChange={onChangeExpenseType}
        />

        <Input
          label="Descripción"
          value={description}
          onChange={onChangeDescription}
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
