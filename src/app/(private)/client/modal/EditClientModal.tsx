"use client";

import { Client } from "@/core/models/client/client";
import { Modal, ModalFooter, ModalField } from "@/ui/Modals";
import { Input } from "@/ui/inputs/Input";

type Props = {
  client: Client;
  isUpdating: boolean;
  onChange: (client: Client) => void;
  onClose: () => void;
  onSave: () => void;
};

export function EditClientModal({ client, isUpdating, onChange, onClose, onSave }: Props) {
  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Editar cliente"
      subtitle={`Modificando datos de ${client.name}`}
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
            value={client.name}
            onChange={(v) => onChange({ ...client, name: v })}
            placeholder="Nombre completo"
          />
        </ModalField>

        <ModalField label="Documento">
          <Input
            value={client.identityDocument ?? ""}
            onChange={(v) => onChange({ ...client, identityDocument: v || null })}
            placeholder="DNI / CUIT"
          />
        </ModalField>

        <ModalField label="Email">
          <Input
            value={client.email ?? ""}
            onChange={(v) => onChange({ ...client, email: v || null })}
            placeholder="correo@ejemplo.com"
          />
        </ModalField>

        <ModalField label="Teléfono">
          <Input
            value={client.phone ?? ""}
            onChange={(v) => onChange({ ...client, phone: v || null })}
            placeholder="+54 11..."
          />
        </ModalField>

        <ModalField label="Fecha de nacimiento">
          <Input
            type="date"
            value={client.dateBirth ?? ""}
            onChange={(v) => onChange({ ...client, dateBirth: v || null })}
          />
        </ModalField>
      </div>
    </Modal>
  );
}
