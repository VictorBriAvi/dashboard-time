"use client";

import { useState, useMemo } from "react";
import { Client } from "@/core/models/client/client";
import { useClientAll } from "@/data/hooks/client/useClientSearch";
import {
  useCreateClient,
  useUpdateClient,
  useDeleteClient,
} from "@/data/hooks/client/useClientMutation";

export function useClientPage() {
  // ======================
  // Crear
  // ======================
  const [name, setName] = useState("");
  const [identityDocument, setIdentityDocument] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateBirth, setDateBirth] = useState("");

  // ======================
  // Buscar
  // ======================
  const [search, setSearch] = useState("");

  // ======================
  // Editar
  // ======================
  const [editingClient, setEditingClient] =
    useState<Client | null>(null);

  // ======================
  // Query
  // ======================
  const { data: clients = [] } = useClientAll(search);

  // ======================
  // Mutations
  // ======================
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();

  // ======================
  // Regla de negocio
  // ======================
const canCreateClient =
  !!name.trim() || !!email.trim() || !!phone.trim();


  // ======================
  // Crear
  // ======================
const addClient = async () => {
  if (!canCreateClient) return;

  await createClient.mutateAsync({
    name: name.trim(),
    identityDocument: identityDocument.trim() || null,
    email: email.trim() || null,
    phone: phone.trim() || null,
    dateBirth: dateBirth || null,
  });

  setName("");
  setIdentityDocument("");
  setEmail("");
  setPhone("");
  setDateBirth("");
};

  // ======================
  // Eliminar
  // ======================
  const removeClient = async (id: number) => {
    await deleteClient.mutateAsync(id);
  };

  // ======================
  // Editar
  // ======================
  const openEditModal = (client: Client) => {
    setEditingClient(client);
  };

  const updateClientData = async () => {
    if (!editingClient) return;

    await updateClient.mutateAsync(editingClient);
    setEditingClient(null);
  };

  return {
    // crear
    name,
    setName,
    identityDocument,
    setIdentityDocument,
    email,
    setEmail,
    phone,
    setPhone,
    dateBirth,
    setDateBirth,
    addClient,
    canCreateClient,
    isCreating: createClient.isPending,

    // listar
    clients,

    // buscar
    search,
    setSearch,

    // editar
    editingClient,
    setEditingClient,
    openEditModal,
    updateClient: updateClientData,
    isUpdating: updateClient.isPending,

    // eliminar
    removeClient,
    isDeleting: deleteClient.isPending,
  };
}
