"use client";

interface ModalServiciosProps {
  open: boolean;
  onClose: () => void;
  empleado?: string;
  servicios?: { servicio: string; cantidad: number }[];
}

export default function ModalServicios({
  open,
  onClose,
  empleado,
  servicios = [],
}: ModalServiciosProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fade-in">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Servicios realizados por {empleado}
        </h2>

        <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {servicios.map((srv, i) => (
            <li
              key={i}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-gray-700">{srv.servicio}</span>
              <span className="font-semibold text-gray-900">
                {srv.cantidad}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
