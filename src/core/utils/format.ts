export const formatARS = (value: number) =>
  value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });



export const parseARS = (value: string | number): number => {
  if (value === null || value === undefined) return 0;

  if (typeof value === "number") return value;

  const normalized = value
    .replace(/\$/g, "")
    .replace(/\s/g, "")
    .replace(/\./g, "") // elimina miles
    .replace(",", "."); // decimal

  const result = Number(normalized);

  return isNaN(result) ? 0 : result;
};


