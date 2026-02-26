"use client";

import { Input } from "@/ui/inputs/Input";
import { Employee } from "@/core/models/employee/employee";

type Props = {
  employee: Employee;
  isUpdating: boolean;
  onChange: (employee: Employee) => void;
  onClose: () => void;
  onSave: () => void;
};

export function EditEmployeeModal({
  employee,
  isUpdating,
  onChange,
  onClose,
  onSave,
}: Props) {

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold">Editar empleado</h3>

        <Input
          label="Nombre"
          value={employee.name}
          onChange={(v) => onChange({ ...employee, name: v })}
        />

        <Input
          label="Documento"
          value={employee.identityDocument}
          onChange={(v) =>
            onChange({ ...employee, identityDocument: v })
          }
        />

        <Input
          label="% Pago"
          value={String(employee.paymentPercentage)}
          onChange={(v) =>
            onChange({ ...employee, paymentPercentage: Number(v) })
          }
        />

        <Input
          type="date"
          label="Fecha nacimiento"
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


        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="px-4 py-2 text-sm rounded-md bg-gray-200"
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
