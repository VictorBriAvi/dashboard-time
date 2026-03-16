"use client";

import { Modal, ModalFooter, ModalField } from "@/ui/Modals";
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
  category, name, price, isUpdating,
  loadCategories, onChangeCategory, onChangeName, onChangePrice,
  onClose, onSave,
}: Props) {
  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Editar servicio"
      subtitle={name}
      size="sm"
      footer={
        <ModalFooter
          onCancel={onClose}
          onConfirm={onSave}
          isLoading={isUpdating}
          confirmLabel="Guardar cambios"
        />
      }
    >
      <div className="flex flex-col gap-4">
        <ModalField label="Categoría" required>
          <AsyncSearchableSelect
            label=""
            loadOptions={loadCategories}
            value={category}
            onChange={onChangeCategory}
          />
        </ModalField>

        <ModalField label="Nombre del servicio" required>
          <Input
            value={name}
            onChange={onChangeName}
            placeholder="Ej: Corte de cabello"
          />
        </ModalField>

        <ModalField label="Precio" required>
          <Input
            value={price}
            onChange={onChangePrice}
            placeholder="$0"
          />
        </ModalField>
      </div>
    </Modal>
  );
}
