"use client";

import { ServiceCategorie } from "@/core/models/serviceCategorie/serviceCategorie";
import { Modal, ModalFooter, ModalField } from "@/ui/Modals";
import { Input } from "@/ui/inputs/Input";

type Props = {
  category: ServiceCategorie;
  isUpdating: boolean;
  onChangeName: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export function EditServiceCategoryModal({
  category, isUpdating, onChangeName, onClose, onSave,
}: Props) {
  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Editar categoría"
      subtitle={category.name}
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
      <ModalField label="Nombre" required>
        <Input
          value={category.name}
          onChange={onChangeName}
          placeholder="Ej: Cabello, Uñas..."
        />
      </ModalField>
    </Modal>
  );
}
