import { Option } from "./SearchSelect";

interface SimpleSelectProps {
  label: string;
  options: Option[];
  value: Option | null;
  onChange: (option: Option | null) => void;
}

export function SimpleSelect({
  label,
  options,
  value,
  onChange,
}: SimpleSelectProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>

      <select
        className="w-full border rounded-md p-2 text-sm"
        value={value?.value ?? ""}
        onChange={(e) => {
          const selected = options.find(
            (o) => o.value === Number(e.target.value)
          );
          onChange(selected ?? null);
        }}
      >
        <option value="">Seleccionar…</option>

        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
