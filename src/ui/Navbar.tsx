"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // íconos (livianos, modernos)
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
<header className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link href="/" className="text-2xl font-bold text-blue-600">
            Time for <span className="text-gray-800"> You</span>
          </Link>

          {/* Menú Desktop */}
          {/* <div className="hidden md:flex space-x-6 items-center gap-8">
            <Link href="#features" className="text-gray-700 hover:text-blue-600">
              Características
            </Link>
            <Link href="#pricing" className="text-gray-700 hover:text-blue-600">
              Precios
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600">
              Contacto
            </Link>
          </div> */}

          {/* Botón menú móvil */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="flex flex-col space-y-2 py-2">
              <Link
                href="#features"
                className="text-gray-700 px-4 py-2 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                Características
              </Link>
              <Link
                href="#pricing"
                className="text-gray-700 px-4 py-2 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                Precios
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 px-4 py-2 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                Contacto
              </Link>
              <button className="bg-blue-600 text-white mx-4 py-2 rounded-md hover:bg-blue-700 transition">
                Iniciar sesión
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
