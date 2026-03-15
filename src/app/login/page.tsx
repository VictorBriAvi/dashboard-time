"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/lib/axiosClient";
import { handleApi } from "@/lib/serverApi";
import { User, Lock, Mail, AlertTriangle, RefreshCw, Eye, EyeOff } from "lucide-react";
export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log('URL usada:', axiosClient.defaults.baseURL);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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
        const errorData = await res.json();
        throw new Error(errorData.message || "Credenciales inválidas");
      }
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-xs space-y-6">
        {/* Logo y título */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-xl mb-2">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            NO SE A ESCOGIDO UN NOMBRE
          </h1>
          <p className="text-sm text-gray-600">
            Sistema de gestión para tu negocio
          </p>
        </div>
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de usuario */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <div className="relative">
              <User 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              />
              <input
                type="text"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                disabled={loading}
              />
              {error && (
                <AlertTriangle 
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500"
                />
              )}
            </div>
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>
          {/* Campo de contraseña */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <Lock 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                disabled={loading}
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          {/* Opciones y recordarme */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="text-gray-600">
                Recordar sesión
              </label>
            </div>
            <a 
              href="#" 
              className="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                // Aquí podría ir lógica para recuperar contraseña
                alert("Funcionalidad de recuperación de contraseña en desarrollo");
              }}
            >
              ¿Olvidó su contraseña?
            </a>
          </div>
          {/* Botón de envío */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Ingresando...</span>
              </div>
            ) : (
              "Entrar"
            )}
          </button>
          {/* Mensaje de error general (si no es de campo específico) */}
          {error && !username && !password && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </form>
        {/* Footer pequeño */}
        <div className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} NOMBRE. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
}