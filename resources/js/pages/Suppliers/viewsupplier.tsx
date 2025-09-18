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

interface PageProps {
  auth: {
    user: {
      name: string;
      email: string;
    };
  };
  supplier: SupplierType;
}

export default function ViewSupplier({ supplier }: PageProps) {
   
  console.log('Supplier data:', supplier);
  
  return (
    <AppLayout title={`Supplier - ${supplier.name}`}>
      <Head title={`Supplier - ${supplier.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Header + Actions */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-shadow-blue-50">{supplier.name}</h1>
              <span className="text-orange-400 mt-1">{supplier.contact_details}</span>
            </div>
            <div className="flex space-x-2">
              <Link
                href="/suppliers"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Back to Suppliers
              </Link>
              <Link
                href={`/suppliers/${supplier.id}/edit`}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
              >
                Edit Supplier
              </Link>
              <Link
                href={`/products/create?supplier_id=${supplier.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Add Product
              </Link>
            </div>
          </div>

          {/* Supplier Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{supplier.total_products}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600">Total Stock Value</p>
              <p className="text-2xl font-semibold text-gray-900">${supplier.total_stock_value}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600">Contact Details</p>
              <p className="text-sm text-gray-900 mt-1"><strong>{supplier.contact_details}</strong></p>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Products from this Supplier</h2>
              <p className="text-sm text-gray-600 mt-1">
                All products supplied by <span className='text-orange-400'>{supplier.name}</span> 
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Stock Value
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {supplier.products && supplier.products.length ? (
                    supplier.products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.quantity > 10
                                ? 'bg-green-100 text-green-800'
                                : product.quantity > 0
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.quantity} in stock
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${product.stock_value}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/products/${product.id}`}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            View
                          </Link>
                          <Link
                            href={`/products/${product.id}/edit`}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center">
                        <div className="text-center py-8">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
                          <p className="mt-1 text-sm text-gray-500">This supplier doesn't have any products yet.</p>
                          <div className="mt-6">
                            <Link
                              href={`/products/create?supplier_id=${supplier.id}`}
                              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                              Add Product
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}