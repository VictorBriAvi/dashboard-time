"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleSubmenu = (key: string) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Time for <span className="text-gray-800">You</span>
          </Link>

          {/* ===== Desktop ===== */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/sales" className="nav-link">
              Venta
            </Link>

            {/* Servicios */}
            <div className="relative">
              <div className="flex items-center gap-1">
                <Link href="/serviceType" className="nav-link">
                  Servicios
                </Link>
                <button
                  onClick={() => toggleSubmenu("services")}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              {openSubmenu === "services" && (
                <div className="submenu-premium">
                  <Link href="/serviceType/categories" className="submenu-btn">
                    Categorías Servicio
                  </Link>
                </div>
              )}
            </div>

            {/* Gastos */}
            <div className="relative">
              <div className="flex items-center gap-1">
                <Link href="/expenses" className="nav-link">
                  Gastos
                </Link>
                <button
                  onClick={() => toggleSubmenu("expenses")}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              {openSubmenu === "expenses" && (
                <div className="submenu-premium">
                  <Link href="/expenses/expensesCategorie" className="submenu-btn">
                    Categorías Gasto
                  </Link>
                </div>
              )}
            </div>

            {/* Clientes */}
            <div className="relative">
              <div className="flex items-center gap-1">
                <Link href="/clients" className="nav-link">
                  Clientes
                </Link>
                <button
                  onClick={() => toggleSubmenu("clients")}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              {openSubmenu === "clients" && (
                <div className="submenu-premium">
                  <Link href="/clients/history" className="submenu-btn">
                    Historial cliente
                  </Link>
                </div>
              )}
            </div>

            <Link href="/paymentType" className="nav-link">
              Tipos de pago
            </Link>

            <Link href="/employees" className="nav-link">
              Colaboradores
            </Link>
          </div>

          {/* Botón Mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ===== Mobile ===== */}
{/* ===== Mobile ===== */}
{isOpen && (
  <div className="md:hidden bg-white border-t border-gray-200 py-2">
    {[
      {
        key: "sales",
        label: "Venta",
        href: "/sales",
      },
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
      {
        key: "clients",
        label: "Clientes",
        href: "/clients",
        sub: [{ label: "Historial cliente", href: "/clients/history" }],
      },
      {
        key: "payment-types",
        label: "Tipos de pago",
        href: "/paymentType",
      },
      {
        key: "employees",
        label: "Colaboradores",
        href: "/employees",
      },
    ].map((item) => (
      <div key={item.key}>
        <div className="flex justify-between items-center px-4 py-2">
          <Link
            href={item.href}
            onClick={toggleMenu}
            className="font-medium text-gray-700"
          >
            {item.label}
          </Link>

          {item.sub && (
            <button
              onClick={() => toggleSubmenu(item.key)}
              className="p-1"
            >
              <ChevronDown size={16} />
            </button>
          )}
        </div>

        {item.sub && openSubmenu === item.key && (
          <div className="pl-8 pb-2 text-sm text-gray-600">
            {item.sub.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={toggleMenu}
                className="block py-1"
              >
                {s.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
)}

      </nav>

      <style jsx>{`
        .nav-link {
          color: #374151;
          font-weight: 500;
        }

        .nav-link:hover {
          color: #2563eb;
        }

        .submenu-premium {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 0.75rem;
          padding: 0.75rem;
          background: white;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          min-width: 220px;
          z-index: 50;
        }

        .submenu-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: #374151;
          transition: all 0.2s ease;
        }

        .submenu-btn:hover {
          background: #f0f9ff;
          color: #2563eb;
          transform: translateX(2px);
        }
      `}</style>
    </header>
  );
}
