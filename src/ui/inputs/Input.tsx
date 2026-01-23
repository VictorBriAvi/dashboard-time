"use client";

interface InputProps {
  label?: string;
  value: string | number;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export function Input({
  label,
  value = "",
  placeholder,
  disabled = false,
  onChange,
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          w-full rounded-md border p-2 text-sm
          transition-colors
          ${disabled
            ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"}
        `}
      />
    </div>
  );
}
