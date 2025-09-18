
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../components/sidebar';

type ProductType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock_value: string;
};

type SupplierType = {
  id: number;
  name: string;
  contact_details: string;
  total_products: number;
  total_stock_value: string;
  products: ProductType[];
};

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface SupplierPaginator {
  data: SupplierType[];
  links: PaginationLink[];
  current_page: number;
  last_page: number;
}

interface PageProps {
  auth: {
    user: { name: string; email: string };
  };
  suppliers: SupplierPaginator;
}


export default function Supplier({ suppliers }: PageProps) {
  return (
    <AppLayout title="Suppliers">
      <Head title="Suppliers" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-shadow-blue-50">Supplier List</h1>
            <Link
              href="/suppliers/create"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add New Supplier
            </Link>
          </div>

          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Contact Details</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Total Products</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Stock Value</th>
          <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {suppliers.data.length ? (
          suppliers.data.map((supplier) => (
            <tr key={supplier.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-800">{supplier.name}</td>
              <td className="px-6 py-4 text-gray-800">{supplier.contact_details}</td>
              <td className="px-6 py-4 text-gray-800">{supplier.total_products}</td>
              <td className="px-6 py-4 text-gray-800">${supplier.total_stock_value}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`/suppliers/${supplier.id}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium mr-4"
                >
                  View
                </Link>
                <Link
                  href={`/suppliers/${supplier.id}/edit`}
                  className="text-amber-600 hover:text-amber-800 font-medium mr-4"
                >
                  Edit
                </Link>
                <Link
                  as="button"
                  href={`/suppliers/${supplier.id}`}
                  method="delete"
                  className="text-rose-600 hover:text-rose-800 font-medium"
                  onClick={(e) => {
                    if (!confirm('Are you sure you want to delete this supplier?')) e.preventDefault();
                  }}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="px-6 py-4 text-center text-gray-500 italic">
              No suppliers found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>


          {/* Pagination */}
          <div className="flex space-x-2 mt-4">
            {suppliers.links.map((link, i) => (
              <Link
                key={i}
                href={link.url ?? "#"}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className={`px-3 py-1 rounded border ${
                  link.active ? "bg-blue-500 text-black" : "bg-gray-100"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
