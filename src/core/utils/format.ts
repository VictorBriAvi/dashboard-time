export const formatARS = (value: number) => {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
};


export const parseARS = (value: string): number => {
  if (!value) return 0;

  const clean = value.replace(/\$/g, "").trim();

  // Caso 1: formato AR -> 9.000,50
  if (clean.includes(",") && clean.includes(".")) {
    return Number(clean.replace(/\./g, "").replace(",", "."));
  }

  // Caso 2: decimal simple -> 9000.50
  return Number(clean);
};

