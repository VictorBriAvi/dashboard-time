"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div>
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Admin<span className="text-gray-800 dark:text-gray-100">Time</span>
            </Link>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Tu panel administrativo moderno y eficiente. Simplificá tus tareas y
              gestioná tu negocio con estilo.
            </p>
          </div>

          {/* Sección 1 */}
          <div>
            <h3 className="text-gray-800 dark:text-gray-100 font-semibold mb-3">
              Producto
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition"
                >
                  Características
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition"
                >
                  Planes
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition"
                >
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Sección 2 */}
          <div>
            <h3 className="text-gray-800 dark:text-gray-100 font-semibold mb-3">
              Empresa
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#about"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="#careers"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition"
                >
                  Trabajá con nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-gray-800 dark:text-gray-100 font-semibold mb-3">
              Seguinos
            </h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition">
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition">
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition">
                <i className="fa-brands fa-linkedin-in"></i>
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition">
                <i className="fa-brands fa-instagram"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} AdminTime. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
