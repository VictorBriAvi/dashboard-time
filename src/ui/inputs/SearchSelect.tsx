"use client";

import { useEffect, useState } from "react";

export interface Option {
  value: number;
  label: string;
}

interface AsyncSearchableSelectProps {
  id?: string;
  label: string;
  loadOptions: (input: string) => Promise<Option[]>;
  value?: Option | null;
  onChange?: (option: Option | null) => void;
}

export function AsyncSearchableSelect({
  id,
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

  /** 🔄 Sync valor externo */
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
    <div className="relative flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-gray-800"
      >
        {label}
      </label>

      <input
        id={id}
        type="text"
        value={input}
        placeholder="Escribí para buscar…"
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
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
        className="
          w-full rounded-md border px-3 py-2 text-sm
          transition-all
          border-gray-300 text-gray-900
          placeholder:text-gray-400
          focus:outline-none
          focus:border-blue-500
          focus:ring-2 focus:ring-blue-500/20
        "
      />

      {open && (
        <div className="
          absolute top-full z-20 mt-1 w-full
          rounded-md border bg-white shadow-lg
          max-h-48 overflow-auto
        ">
          {loading && (
            <div className="px-3 py-2 text-sm text-gray-500">
              Buscando…
            </div>
          )}

          {!loading && options.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">
              Sin resultados
            </div>
          )}

          {!loading &&
            options.map((option, index) => (
              <div
                key={option.value}
                className={`
                  px-3 py-2 text-sm cursor-pointer
                  transition-colors
                  ${
                    index === highlightedIndex
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-100"
                  }
                `}
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
