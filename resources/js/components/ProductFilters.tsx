/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { router } from "@inertiajs/react";
import { debounce } from "lodash";

declare const route: any;

interface ProductFiltersProps {
  filters: Record<string, any>;
}

export default function ProductFilters({ filters }: ProductFiltersProps) {
  const [values, setValues] = useState(filters);

  const updateFilter = useCallback(debounce((newValues: Record<string, any>) => {
    router.get(route("products.index"), newValues, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  }, 300), []);

  useEffect(() => {
    if (JSON.stringify(values) !== JSON.stringify(filters)) {
      updateFilter(values);
    }
  }, [values, filters, updateFilter]);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-black">Search</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Search products..."
          value={values.search || ""} 
          onChange={(e) => setValues({ ...values, search: e.target.value })}
        />
      </div>
    </div>
  );
}
