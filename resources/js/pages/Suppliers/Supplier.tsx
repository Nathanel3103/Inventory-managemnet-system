import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';



type ProductType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock_value: number;
};

type SupplierType = {
  id: number;
  name: string;
  contact_details: string;
  total_products: number;
  total_stock_value: number;
  products: ProductType[];
};

interface PageProps {
  auth: {
    user: {
      name: string;
      email: string;
    };
  };
  suppliers: SupplierType[];
}
   

export default function Supplier({ suppliers = [] }: PageProps) {
     const { url } = usePage();
   const linkClasses = (path: string) =>
    url.startsWith(path)
      ? "border-b-2 border-blue-500 text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
      : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium";




  return (
    <div className="min-h-screen bg-gray-50 mt-5.5">
      <Head title="Suppliers" />

            {/*  current navbar */}
            <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/dashboard" className={linkClasses("/dashboard")}>
                Home
              </Link>
              <Link href="/products" className={linkClasses("/products")}>
                Products
              </Link>
              <Link href="/suppliers" className={linkClasses("/suppliers")}>
                Suppliers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Supplier List</h1>
            <Link
              href="/suppliers/create"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add New Supplier
            </Link>
          </div>

      {suppliers.length === 0 ? (
        <p>No suppliers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white shadow rounded-lg p-4 transition-all duration-300 hover:shadow-lg relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  href={`/products/create?supplier_id=${supplier.id}`}
                  className="bg-blue-500 text-white px-2 py-3 rounded-md hover:bg-blue-600 text-sm inline-block"
                >
                  Add Product
                </Link>
                <Link 
                    href={`/suppliers/${supplier.id}/edit`} 
                    className="  text-warning hover:text-warning/70 mr-2 px-2 py-1 rounded-md"
                >
                    Edit
                </Link>
              </div>

              <h2 className="text-xl font-semibold text-black">{supplier.name}</h2>
              <p className="text-gray-600 mt-1">{supplier.contact_details}</p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-lg font-semibold text-blue-600">{supplier.total_products}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Stock Value</p>
                  <p className="text-lg font-semibold text-green-600">${supplier.total_stock_value}</p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 mb-2">Products</h3>
                <div className="space-y-2">
                  {supplier.products.map((product: ProductType) => (
                    <div key={product.id} className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <div className="grid grid-cols-3 gap-2 mt-1 text-sm text-gray-600">
                        <p>Price: ${product.price}</p>
                        <p>Qty: {product.quantity}</p>
                        <p>Value: ${product.stock_value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
