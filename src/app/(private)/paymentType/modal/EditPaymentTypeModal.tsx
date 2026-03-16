"use client";

import { PaymentType } from "@/core/models/paymentType/PaymentType";
import { Modal, ModalFooter, ModalField } from "@/ui/Modals";
import { Input } from "@/ui/inputs/Input";

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          background: checked ? "#185FA5" : "#d1d5db",
          position: "relative",
          transition: "background 0.2s",
          flexShrink: 0,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            left: checked ? 18 : 2,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </label>
  );
}

type Props = {
  paymentType: PaymentType;
  isUpdating: boolean;
  onChange: (updated: PaymentType) => void;
  onClose: () => void;
  onSave: () => void;
};

export function EditPaymentTypeModal({ paymentType, isUpdating, onChange, onClose, onSave }: Props) {
  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Editar medio de pago"
      subtitle={paymentType.name}
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
        <ModalField label="Nombre" required>
          <Input
            value={paymentType.name}
            onChange={(v) => onChange({ ...paymentType, name: v })}
            placeholder="Ej: Efectivo, Débito..."
          />
        </ModalField>

        <div
          className="rounded-lg p-3 flex flex-col gap-3"
          style={{ background: "#f9fafb", border: "0.5px solid #f3f4f6" }}
        >
          <Toggle
            checked={paymentType.applySurcharge}
            onChange={(v) => onChange({ ...paymentType, applySurcharge: v })}
            label="Aplicar recargo al cliente"
          />
          {paymentType.applySurcharge && (
            <ModalField label="% de recargo">
              <Input
                value={String(paymentType.surchargePercent)}
                onChange={(v) => onChange({ ...paymentType, surchargePercent: Number(v) })}
                placeholder="Ej: 10"
              />
            </ModalField>
          )}
        </div>

        <div
          className="rounded-lg p-3 flex flex-col gap-3"
          style={{ background: "#f9fafb", border: "0.5px solid #f3f4f6" }}
        >
          <Toggle
            checked={paymentType.applyDiscount}
            onChange={(v) => onChange({ ...paymentType, applyDiscount: v })}
            label="Descuento de app (ej: comisión)"
          />
          {paymentType.applyDiscount && (
            <ModalField label="% descuento app">
              <Input
                value={String(paymentType.discountPercent)}
                onChange={(v) => onChange({ ...paymentType, discountPercent: Number(v) })}
                placeholder="Ej: 3"
              />
            </ModalField>
          )}
        </div>
      </div>
    </Modal>
  );
}
