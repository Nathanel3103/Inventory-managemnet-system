import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";

type ProductForm = {
  name: string;
  category_id: number | string;
  supplier_id: number | string;
  price: number;
  quantity: number;
};

interface EditProps {
  product: {
    id: number;
    name: string;
    category_id: number;
    supplier_id: number;
    price: number;
    quantity: number;
  };
  categories: { id: number; name: string }[];
  suppliers: { id: number; name: string }[];
}

export default function Edit({ product, categories, suppliers }: EditProps) {
  const { data, setData, put, processing, errors } = useForm<ProductForm>({
    name: product.name || "",
    category_id: product.category_id || "",
    supplier_id: product.supplier_id || "",
    price: product.price || 0,
    quantity: product.quantity || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/products/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head title="Edit Product" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Edit Product
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-info"
            >
              Back to Products
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-info focus:ring-info sm:text-sm text-black"
                  placeholder="Enter product name"
                  required
                />
                {errors.name && (
                  <div className="mt-1 text-sm text-error">{errors.name}</div>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={data.category_id}
                  onChange={(e) => setData("category_id", Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-info focus:ring-info sm:text-sm text-black"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <div className="mt-1 text-sm text-error">{errors.category_id}</div>
                )}
              </div>

              {/* Supplier */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Supplier
                </label>
                <select
                  value={data.supplier_id}
                  onChange={(e) => setData("supplier_id", Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-info focus:ring-info sm:text-sm text-black"
                  required
                >
                  <option value="">Select a supplier</option>
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                {errors.supplier_id && (
                  <div className="mt-1 text-sm text-error">{errors.supplier_id}</div>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={data.price}
                    onChange={(e) => setData("price", parseFloat(e.target.value) || 0)}
                    className="mt-1 block w-full pl-7 rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-info focus:ring-info sm:text-sm text-black"
                    placeholder="0.00"
                    required
                  />
                </div>
                {errors.price && (
                  <div className="mt-1 text-sm text-error">{errors.price}</div>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  value={data.quantity}
                  onChange={(e) => setData("quantity", parseInt(e.target.value) || 0)}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-info focus:ring-info sm:text-sm text-black"
                  placeholder="Enter quantity"
                  required
                />
                {errors.quantity && (
                  <div className="mt-1 text-sm text-error">{errors.quantity}</div>
                )}
              </div>
            </div>

            {/* Submit / Cancel */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-info"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-success hover:bg-success/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success/70 disabled:opacity-50"
              >
                {processing ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
