"use client";

import { useEffect, useState } from "react";

export interface Option {
  value: number;
  label: string;
  // name: string;
}

interface AsyncSearchableSelectProps {
  label: string;
  loadOptions: (input: string) => Promise<Option[]>;
  value?: Option | null;
  onChange?: (option: Option | null) => void;
}


export function AsyncSearchableSelect({
  label,
  loadOptions,
  value,
  onChange,
}: AsyncSearchableSelectProps) {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  /** 🔄 sincroniza valor externo */
useEffect(() => {
  if (value) {
    setInput(value.label);
  } else {
    setInput("");
    setOptions([]);
    setHighlightedIndex(-1);
  }
}, [value]);


  useEffect(() => {
    if (!input) {
      setOptions([]);
      setHighlightedIndex(-1);
      return;
    }

    const fetchOptions = async () => {
      setLoading(true);
      const result = await loadOptions(input);
      setOptions(result);
      setHighlightedIndex(-1);
      setLoading(false);
    };

    fetchOptions();
  }, [input, loadOptions]);

const selectOption = (option: Option) => {
  setInput(option.label);
  setOpen(false);
  onChange?.(option);
};


  return (
    <div className="relative space-y-1">
      <label className="block text-sm font-medium">{label}</label>

      <input
        type="text"
        className="w-full border rounded-md p-2 text-sm"
        placeholder="Buscar..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (!open) return;

          switch (e.key) {
            case "ArrowDown":
              e.preventDefault();
              setHighlightedIndex((prev) =>
                Math.min(prev + 1, options.length - 1)
              );
              break;

            case "ArrowUp":
              e.preventDefault();
              setHighlightedIndex((prev) =>
                Math.max(prev - 1, 0)
              );
              break;

            case "Enter":
              if (highlightedIndex >= 0) {
                selectOption(options[highlightedIndex]);
              }
              break;

            case "Escape":
              setOpen(false);
              break;
          }
        }}
      />

      {open && (
        <div className="absolute z-10 w-full bg-white border rounded-md shadow-md max-h-48 overflow-auto">
          {loading && (
            <div className="p-2 text-sm text-gray-500">
              Buscando...
            </div>
          )}

          {!loading && options.length === 0 && (
            <div className="p-2 text-sm text-gray-500">
              Sin resultados
            </div>
          )}

          {!loading &&
            options.map((option, index) => (
              <div
                key={option.value}
                className={`p-2 cursor-pointer text-sm
                  ${index === highlightedIndex
                    ? "bg-gray-100"
                    : "hover:bg-gray-100"}`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => selectOption(option)}
              >
                {option.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
