/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Combobox } from "@headlessui/react";

interface SearchDropdownProps {
  items: { id: number | string; name: string }[]; // data list
  value: number | string | null;                  // selected value
  onChange: (id: number | string) => void;        // handle selection
  label?: string;                                 // optional label
  placeholder?: string;                           // input placeholder
}

export default function SearchDropdown({
  items,
  value,
  onChange,
  label = "Select an option",
  placeholder = "Search...",
}: SearchDropdownProps) {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <Combobox value={value} onChange={onChange}>
        {/* Input */}
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-info focus:ring-info sm:text-sm text-black"
          displayValue={(id: number | string) =>
            items.find((i) => i.id === id)?.name ?? ""
          }
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
        />

        {/* Options */}
        <Combobox.Options className="mt-1 max-h-60 overflow-auto rounded-md bg-white shadow-lg border border-gray-200">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <Combobox.Option
                key={item.id}
                value={item.id}
                className={({ active }) =>
                  `cursor-pointer px-4 py-2 text-sm ${
                    active ? "bg-info/10 text-info" : "text-gray-700"
                  }`
                }
              >
                {item.name}
              </Combobox.Option>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No results found
            </div>
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
