"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/lib/axiosClient";
import { handleApi } from "@/lib/serverApi";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
console.log('URL usada:', axiosClient.defaults.baseURL);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error();
      }

      router.push("/");
      router.refresh();
    } catch {
      alert("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-80 space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">
          Iniciar sesión
        </h1>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-md p-2"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-md p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-md p-2"
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
