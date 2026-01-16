export const formatARS = (value: number) => {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
};


export const parseARS = (value: string | number): number => {
  if (value === null || value === undefined) return 0;

  // Si ya es número, no tocar
  if (typeof value === "number") return value;

  let clean = value
    .replace(/\$/g, "")
    .replace(/\s/g, "");

  // Caso: decimal con coma (110000,00 o 110.000,00)
  if (clean.includes(",")) {
    clean = clean.replace(/\./g, "").replace(",", ".");
    return Number(clean);
  }

  // Caso: decimal con punto o entero
  return Number(clean);
};

