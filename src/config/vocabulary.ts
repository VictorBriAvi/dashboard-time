export type VocabKey =
  | "sale"
  | "service"
  | "client"
  | "employee"
  | "expense"
  | "serviceCategory"
  | "expenseCategory"
  | "paymentType"
  | "report"

export type VocabMap = Record<VocabKey, string>

export const VOCABULARY: Record<string, VocabMap> = {
  business: {
    sale:            "Venta",
    service:         "Producto/Servicio",
    client:          "Cliente",
    employee:        "Empleado",
    expense:         "Gasto",
    serviceCategory: "Categoría de Servicio",
    expenseCategory: "Categoría de Gasto",
    paymentType:     "Tipo de Pago",
    report:          "Reporte",
  },
  service_shop: {
    sale:            "Atención",
    service:         "Tratamiento",
    client:          "Cliente",
    employee:        "Colaborador",
    expense:         "Gasto",
    serviceCategory: "Categoría de Tratamiento",
    expenseCategory: "Categoría de Gasto",
    paymentType:     "Medio de Pago",
    report:          "Reporte",
  },
  personal: {
    sale:            "Ingreso",
    service:         "Categoría",
    client:          "Fuente",
    employee:        "—",
    expense:         "Gasto",
    serviceCategory: "Subcategoría",
    expenseCategory: "Categoría de Gasto",
    paymentType:     "Método",
    report:          "Resumen",
  },
  restaurant: {
    sale:            "Pedido",
    service:         "Plato/Menú",
    client:          "Comensal",
    employee:        "Mozo/Cocinero",
    expense:         "Insumo",
    serviceCategory: "Categoría de Menú",
    expenseCategory: "Categoría de Insumo",
    paymentType:     "Medio de Pago",
    report:          "Reporte",
  },
  grocery: {
    sale:            "Venta",
    service:         "Producto",
    client:          "Cliente",
    employee:        "Empleado",
    expense:         "Compra de mercadería",
    serviceCategory: "Categoría de Producto",
    expenseCategory: "Categoría de Compra",
    paymentType:     "Medio de Pago",
    report:          "Reporte",
  },
}

export const DEFAULT_VOCAB: VocabMap = VOCABULARY["business"]