"use client";

interface InputProps {
  id?: string;
  label?: string;
  value: string | number;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "number" | "date" | "email" | "password";
  onChange?: (value: string) => void;
}

export function Input({
  id,
  label,
  value = "",
  placeholder,
  disabled = false,
  type = "text",
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className={`
            text-sm font-semibold
            ${disabled ? "text-gray-400" : "text-gray-800"}
          `}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          w-full rounded-md border px-3 py-2 text-sm
          transition-all
          placeholder:text-gray-400
          ${
            disabled
              ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
              : `
                bg-white text-gray-900 border-gray-300
                focus:outline-none
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-500/20
              `
          }
        `}
      />
    </div>
  );
}
