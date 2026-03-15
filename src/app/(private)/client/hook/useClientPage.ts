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
  const {
    data: clients,
    isLoading,
    isError,
  } = useClientAll(search);

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

    try {
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
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ??
        "Error al crear el cliente. Intentá de nuevo.";
      alert(msg);
    }
  };

  // ======================
  // Eliminar
  // ======================
  const removeClient = async (id: number) => {
    try {
      await deleteClient.mutateAsync(id);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ??
        "Error al eliminar el cliente. Intentá de nuevo.";
      alert(msg);
    }
  };

  // ======================
  // Editar
  // ======================
  const openEditModal = (client: Client) => {
    setEditingClient(client);
  };

  const updateClientData = async () => {
    if (!editingClient) return;

    // ✅ FIX: try/catch agregado — antes los errores de mutateAsync no se manejaban
    try {
      await updateClient.mutateAsync(editingClient);
      setEditingClient(null);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ??
        "Error al guardar el cliente. Intentá de nuevo.";
      alert(msg);
    }
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
    isLoading,
    isError,

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