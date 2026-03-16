"use client";

import { Employee } from "@/core/models/employee/employee";
import { Modal, ModalFooter, ModalField } from "@/ui/Modals";
import { Input } from "@/ui/inputs/Input";

type Props = {
  employee: Employee;
  isUpdating: boolean;
  onChange: (employee: Employee) => void;
  onClose: () => void;
  onSave: () => void;
};

export function EditEmployeeModal({ employee, isUpdating, onChange, onClose, onSave }: Props) {
  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Editar colaborador"
      subtitle={`Modificando datos de ${employee.name}`}
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
            value={employee.name}
            onChange={(v) => onChange({ ...employee, name: v })}
            placeholder="Nombre completo"
          />
        </ModalField>

        <ModalField label="Documento">
          <Input
            value={employee.identityDocument ?? ""}
            onChange={(v) => onChange({ ...employee, identityDocument: v })}
            placeholder="DNI"
          />
        </ModalField>

        <ModalField label="% de pago" required>
          <Input
            value={String(employee.paymentPercentage)}
            onChange={(v) => onChange({ ...employee, paymentPercentage: Number(v) })}
            placeholder="Ej: 50"
          />
        </ModalField>

        <ModalField label="Fecha de nacimiento">
          <Input
            type="date"
            value={
              employee.employeeDateBirth
                ? employee.employeeDateBirth.split("-").reverse().join("-")
                : ""
            }
            onChange={(v) =>
              onChange({
                ...employee,
                employeeDateBirth: v.split("-").reverse().join("-"),
              })
            }
          />
        </ModalField>
      </div>
    </Modal>
  );
}
