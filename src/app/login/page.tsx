"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername]         = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Credenciales inválidas");
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
    <div
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 360 }}>

        {/* ── Logo + título ── */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#185FA5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="9" width="4" height="6" rx="1" fill="white" opacity=".8"/>
              <rect x="6" y="5" width="4" height="10" rx="1" fill="white"/>
              <rect x="11" y="1" width="4" height="14" rx="1" fill="white" opacity=".8"/>
            </svg>
          </div>

          <h1
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#111827",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            AdminTime
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#9ca3af",
              marginTop: 4,
            }}
          >
            Sistema de gestión para tu negocio
          </p>
        </div>

        {/* ── Card del formulario ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "0.5px solid #e5e7eb",
            padding: "28px 24px",
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Usuario */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="username"
                style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}
              >
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(null); }}
                placeholder="Ingresá tu usuario"
                disabled={loading}
                autoComplete="username"
                autoFocus
                style={{
                  width: "100%",
                  border: error ? "1px solid #fca5a5" : "0.5px solid #d1d5db",
                  borderRadius: 8,
                  padding: "9px 12px",
                  fontSize: 13,
                  color: "#111827",
                  background: loading ? "#f9fafb" : "#fff",
                  outline: "none",
                  transition: "border 0.15s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  if (!error) (e.target as HTMLInputElement).style.border = "1px solid #185FA5";
                }}
                onBlur={(e) => {
                  if (!error) (e.target as HTMLInputElement).style.border = "0.5px solid #d1d5db";
                }}
              />
            </div>

            {/* Contraseña */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="password"
                style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}
              >
                Contraseña
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  placeholder="••••••••"
                  disabled={loading}
                  autoComplete="current-password"
                  style={{
                    width: "100%",
                    border: error ? "1px solid #fca5a5" : "0.5px solid #d1d5db",
                    borderRadius: 8,
                    padding: "9px 38px 9px 12px",
                    fontSize: 13,
                    color: "#111827",
                    background: loading ? "#f9fafb" : "#fff",
                    outline: "none",
                    transition: "border 0.15s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    if (!error) (e.target as HTMLInputElement).style.border = "1px solid #185FA5";
                  }}
                  onBlur={(e) => {
                    if (!error) (e.target as HTMLInputElement).style.border = "0.5px solid #d1d5db";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={loading}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                    padding: 2,
                  }}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword
                    ? <EyeOff size={15} />
                    : <Eye size={15} />
                  }
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#fef2f2",
                  border: "0.5px solid #fca5a5",
                  borderRadius: 8,
                  padding: "10px 12px",
                  fontSize: 12,
                  color: "#b91c1c",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.2"/>
                  <path d="M7 4.5v3m0 2h.01" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                {error}
              </div>
            )}

            {/* Botón submit */}
            <button
              type="submit"
              disabled={loading || !username.trim() || !password.trim()}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 8,
                border: "none",
                background:
                  loading || !username.trim() || !password.trim()
                    ? "#93c5fd"
                    : "#185FA5",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor:
                  loading || !username.trim() || !password.trim()
                    ? "not-allowed"
                    : "pointer",
                transition: "background 0.15s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {loading ? (
                <>
                  <svg
                    style={{ animation: "spin 0.8s linear infinite" }}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <circle cx="7" cy="7" r="5.5" stroke="white" strokeOpacity=".35" strokeWidth="2"/>
                    <path d="M7 1.5a5.5 5.5 0 015.5 5.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Ingresando…
                </>
              ) : (
                "Ingresar"
              )}
            </button>

          </form>
        </div>

        {/* ── Footer ── */}
        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "#9ca3af",
            marginTop: 20,
          }}
        >
          © {new Date().getFullYear()} AdminTime. Todos los derechos reservados.
        </p>

      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
