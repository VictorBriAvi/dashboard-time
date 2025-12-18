"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Texto principal */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Gestioná tu{" "}
            <span className="text-blue-600">negocio</span> con eficiencia y
            simplicidad.
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto md:mx-0">
            AdminTime centraliza tus operaciones contables, agenda y clientes en un
            solo panel. Todo lo que necesitás para optimizar tu tiempo.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="#demo"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition active:scale-95"
            >
              Probar demo
            </Link>
            <Link
              href="#features"
              className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Ver características
            </Link>
          </div>
        </div>

        {/* Imagen / ilustración */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/dashboard-preview.png"
            alt="Vista previa del panel AdminTime"
            width={500}
            height={400}
            className="rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>
    </section>
  );
}
