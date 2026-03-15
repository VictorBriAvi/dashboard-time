"use client";

import { PaymentType } from "@/core/models/paymentType/PaymentType";
import { Input } from "@/ui/inputs/Input";

type Props = {
  paymentType: PaymentType;
  isUpdating:  boolean;
  onChange:    (updated: PaymentType) => void;
  onClose:     () => void;
  onSave:      () => void;
};

export function EditPaymentTypeModal({
  paymentType,
  isUpdating,
  onChange,
  onClose,
  onSave,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold">Editar tipo de pago</h3>

        <Input
          label="Nombre"
          value={paymentType.name}
          onChange={(value) => onChange({ ...paymentType, name: value })}
          disabled={isUpdating}
        />

        {/* Descuento */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="edit-applyDiscount"
            checked={paymentType.applyDiscount}
            onChange={(e) =>
              onChange({ ...paymentType, applyDiscount: e.target.checked })
            }
            disabled={isUpdating}
            className="w-4 h-4 accent-black"
          />
          <label htmlFor="edit-applyDiscount" className="text-sm text-gray-700">
            Aplica descuento
          </label>
        </div>

        {paymentType.applyDiscount && (
          <Input
            label="Porcentaje de descuento (%)"
            value={String(paymentType.discountPercent)}
            onChange={(value) =>
              onChange({ ...paymentType, discountPercent: Number(value) })
            }
            disabled={isUpdating}
          />
        )}

        {/* Recargo */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="edit-applySurcharge"
            checked={paymentType.applySurcharge}
            onChange={(e) =>
              onChange({ ...paymentType, applySurcharge: e.target.checked })
            }
            disabled={isUpdating}
            className="w-4 h-4 accent-black"
          />
          <label htmlFor="edit-applySurcharge" className="text-sm text-gray-700">
            Aplica recargo
          </label>
        </div>

        {paymentType.applySurcharge && (
          <Input
            label="Porcentaje de recargo (%)"
            value={String(paymentType.surchargePercent)}
            onChange={(value) =>
              onChange({ ...paymentType, surchargePercent: Number(value) })
            }
            disabled={isUpdating}
          />
        )}

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