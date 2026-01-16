export const formatARS = (value: number | string) => {
  const normalized =
    typeof value === "string"
      ? Number(value.replace(/\./g, "").replace(",", "."))
      : value;

  return (normalized / 1).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
};

export const parseARS = (value: string): number => {
  if (!value) return 0;

  return Number(
    value
      .replace(/\$/g, "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  );
};
