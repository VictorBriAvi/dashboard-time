"use client";

import { Input } from "@/ui/inputs/Input";
import { Client } from "@/core/models/client/client";

type Props = {
  client: Client;
  isUpdating: boolean;
  onChange: (client: Client) => void;
  onClose: () => void;
  onSave: () => void;
};

export function EditClientModal({
  client,
  isUpdating,
  onChange,
  onClose,
  onSave,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold">Editar cliente</h3>

        <Input
          label="Nombre"
          value={client.name}
          onChange={(v) =>
            onChange({ ...client, name: v })
          }
        />

        <Input
          label="Documento"
          value={client.identityDocument ?? ""}
          onChange={(v) =>
            onChange({
              ...client,
              identityDocument: v || null,
            })
          }
        />

        <Input
          label="Email"
          value={client.email ?? ""}
          onChange={(v) =>
            onChange({
              ...client,
              email: v || null,
            })
          }
        />

        <Input
          label="Teléfono"
          value={client.phone ?? ""}
          onChange={(v) =>
            onChange({
              ...client,
              phone: v || null,
            })
          }
        />

        <Input
          type="date"
          label="Fecha nacimiento"
          value={client.dateBirth ?? ""}
          onChange={(v) =>
            onChange({
              ...client,
              dateBirth: v || null,
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
              isUpdating
                ? "bg-gray-400"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {isUpdating ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
