"use client";

import { BarChart3, Users, Calendar, Shield, Clock, FileText } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Panel contable completo",
      description:
        "Gestioná tus ingresos, egresos y balances de forma centralizada y simple.",
      icon: <FileText className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Agenda inteligente",
      description:
        "Organizá citas y recordatorios automáticos con una interfaz visual moderna.",
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Gestión de clientes",
      description:
        "Centralizá datos de tus clientes y mejorá el seguimiento de cada relación.",
      icon: <Users className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Reportes visuales",
      description:
        "Analizá el rendimiento de tu negocio con gráficos claros y dinámicos.",
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Seguridad de datos",
      description:
        "Protegé tu información con encriptación y acceso seguro para cada usuario.",
      icon: <Shield className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Optimización del tiempo",
      description:
        "Automatizá procesos repetitivos y enfocá tus esfuerzos en lo que importa.",
      icon: <Clock className="w-8 h-8 text-blue-600" />,
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Características principales
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Todo lo que necesitás para administrar tu negocio de forma simple, moderna y segura.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
