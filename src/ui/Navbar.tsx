"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (key: string) => {
    setOpenSubmenu((prev) => (prev === key ? null : key));
  };

  const closeAll = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      closeAll();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  // 🔥 Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeAll();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/85 backdrop-blur-lg border-b border-gray-200/70 shadow-sm"
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          <Link
            href="/"
            onClick={closeAll}
            className="text-xl font-semibold tracking-tight text-blue-600 hover:opacity-80 transition"
          >
            Time for <span className="text-gray-800">You</span>
          </Link>

          {/* ===== Desktop ===== */}
          <div className="hidden md:flex items-center gap-7">

            <Link href="/sales" onClick={closeAll} className="nav-link">
              Venta
            </Link>

            {/* Servicios */}
            <div className="relative">
              <div className="flex items-center gap-1">
                <Link
                  href="/serviceType"
                  onClick={closeAll}
                  className="nav-link"
                >
                  Servicios
                </Link>
                <button
                  onClick={() => toggleSubmenu("services")}
                  className="icon-btn"
                >
                  <ChevronDown size={15} />
                </button>
              </div>

              {openSubmenu === "services" && (
                <div className="submenu">
                  <Link
                    href="/serviceType/categories"
                    onClick={closeAll}
                    className="submenu-item"
                  >
                    Categorías Servicio
                  </Link>
                </div>
              )}
            </div>

            {/* Gastos */}
            <div className="relative">
              <div className="flex items-center gap-1">
                <Link
                  href="/expenses"
                  onClick={closeAll}
                  className="nav-link"
                >
                  Gastos
                </Link>
                <button
                  onClick={() => toggleSubmenu("expenses")}
                  className="icon-btn"
                >
                  <ChevronDown size={15} />
                </button>
              </div>

              {openSubmenu === "expenses" && (
                <div className="submenu">
                  <Link
                    href="/expenses/expensesCategorie"
                    onClick={closeAll}
                    className="submenu-item"
                  >
                    Categorías Gasto
                  </Link>
                </div>
              )}
            </div>

            <Link href="/client" onClick={closeAll} className="nav-link">
              Clientes
            </Link>

            <Link href="/paymentType" onClick={closeAll} className="nav-link">
              Tipos de pago
            </Link>

            <Link href="/employee" onClick={closeAll} className="nav-link">
              Colaboradores
            </Link>

            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={15} />
              Salir
            </button>
          </div>

          {/* ===== Mobile Button ===== */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="icon-btn">
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ===== Mobile ===== */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-3 rounded-b-xl shadow-xl">
            {[
              { key: "sales", label: "Venta", href: "/sales" },
              {
                key: "services",
                label: "Servicios",
                href: "/serviceType",
                sub: [{ label: "Categorías", href: "/serviceType/categories" }],
              },
              {
                key: "expenses",
                label: "Gastos",
                href: "/expenses",
                sub: [{ label: "Categorías", href: "/expenses/expensesCategorie" }],
              },
              { key: "client", label: "Clientes", href: "/client" },
              { key: "payment-types", label: "Tipos de pago", href: "/paymentType" },
              { key: "employees", label: "Colaboradores", href: "/employee" },
            ].map((item) => (
              <div key={item.key}>
                <div className="flex justify-between items-center px-5 py-2">
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    className="mobile-link"
                  >
                    {item.label}
                  </Link>

                  {item.sub && (
                    <button
                      onClick={() => toggleSubmenu(item.key)}
                      className="icon-btn"
                    >
                      <ChevronDown size={15} />
                    </button>
                  )}
                </div>

                {item.sub && openSubmenu === item.key && (
                  <div className="pl-10 pb-2 text-sm text-gray-600">
                    {item.sub.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={closeAll}
                        className="block py-1 hover:text-blue-600 transition"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="border-t mt-2 pt-3 px-5">
              <button onClick={handleLogout} className="mobile-logout">
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </nav>

      <style jsx>{`
        .nav-link {
          position: relative;
          font-weight: 500;
          color: #374151;
          padding: 4px 0;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: #1f2937;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(to right, #2563eb, #3b82f6);
          transition: width 0.25s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .submenu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 10px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          min-width: 220px;
          padding: 8px;
          animation: fadeIn 0.15s ease-out;
        }

        .submenu-item {
          display: block;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #374151;
          transition: all 0.2s ease;
        }

        .submenu-item:hover {
          background: #eff6ff;
          color: #1d4ed8;
        }

        .icon-btn {
          padding: 6px;
          border-radius: 8px;
          transition: background 0.2s ease;
        }

        .icon-btn:hover {
          background: #f3f4f6;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #dc2626;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: #fee2e2;
        }

        .mobile-link {
          font-weight: 500;
          color: #374151;
          transition: color 0.2s ease;
        }

        .mobile-link:hover {
          color: #2563eb;
        }

        .mobile-logout {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
          color: #dc2626;
          transition: opacity 0.2s ease;
        }

        .mobile-logout:hover {
          opacity: 0.8;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}