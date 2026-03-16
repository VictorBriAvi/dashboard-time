"use client";

import { Modal, ModalFooter, ModalField } from "@/ui/Modals";
import { Input } from "@/ui/inputs/Input";
import { AsyncSearchableSelect, Option } from "@/ui/inputs/SearchSelect";

type Props = {
  expenseType: Option | null;
  paymentType: Option | null;
  description: string;
  expenseDate: string;
  price: string;
  isUpdating: boolean;
  loadExpenseTypes: (input: string) => Promise<Option[]>;
  loadPaymentTypes: (input: string) => Promise<Option[]>;
  onChangeExpenseType: (option: Option | null) => void;
  onChangePaymentType: (option: Option | null) => void;
  onChangeDescription: (value: string) => void;
  onChangeExpenseDate: (value: string) => void;
  onChangePrice: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export function EditExpenseModal({
  expenseType, paymentType, description, expenseDate, price, isUpdating,
  loadExpenseTypes, loadPaymentTypes,
  onChangeExpenseType, onChangePaymentType,
  onChangeDescription, onChangeExpenseDate, onChangePrice,
  onClose, onSave,
}: Props) {
  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Editar gasto"
      subtitle={description}
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
        <ModalField label="Descripción" required>
          <Input
            value={description}
            onChange={onChangeDescription}
            placeholder="Ej: Compra de insumos"
          />
        </ModalField>

        <ModalField label="Categoría de gasto" required>
          <AsyncSearchableSelect
            label=""
            loadOptions={loadExpenseTypes}
            value={expenseType}
            onChange={onChangeExpenseType}
          />
        </ModalField>

        <ModalField label="Monto" required>
          <Input
            value={price}
            onChange={onChangePrice}
            placeholder="$0"
          />
        </ModalField>

        <ModalField label="Medio de pago" required>
          <AsyncSearchableSelect
            label=""
            loadOptions={loadPaymentTypes}
            value={paymentType}
            onChange={onChangePaymentType}
          />
        </ModalField>

        <ModalField label="Fecha del gasto" required>
          <Input
            type="date"
            value={expenseDate}
            onChange={onChangeExpenseDate}
          />
        </ModalField>
      </div>
    </Modal>
  );
}
