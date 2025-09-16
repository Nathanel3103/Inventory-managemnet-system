/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Product() {
  const { products, flash } = usePage().props as any;
  const { url } = usePage();

   
  const [visibleFlash, setVisibleFlash] = useState<{ success?: string; error?: string } | null>(null);

  useEffect(() => {
    if (flash?.success || flash?.error) {
      setVisibleFlash(flash);
      const timer = setTimeout(() => setVisibleFlash(null), 3000);  
      return () => clearTimeout(timer);
    }
  }, [flash]);

  const linkClasses = (path: string) =>
    url.startsWith(path)
      ? "border-b-2 border-blue-500 text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
      : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium";

  return (
    <div className="min-h-screen bg-gray-50">
      <Head title="Products" />

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/dashboard" className={linkClasses("/dashboard")}>Home</Link>
                <Link href="/products" className={linkClasses("/products")}>Products</Link>
                <Link href="/suppliers" className={linkClasses("/suppliers")}>Suppliers</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Flash Messages */}
      <div className="pt-20 flex justify-center">
        {visibleFlash?.success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center 
                       transition-opacity duration-500 ease-in-out w-1/2 animate-fadeIn"
            role="alert"
          >
            <span className="block sm:inline">{visibleFlash.success}</span>
          </div>
        )}
        {visibleFlash?.error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center 
                       transition-opacity duration-500 ease-in-out w-1/2 animate-fadeIn"
            role="alert"
          >
            <span className="block sm:inline">{visibleFlash.error}</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Products
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              href="/products/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-success hover:bg-success/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success/70"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Product
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products && products.length ? (
                  products.map((p: any) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info/10 text-info">
                          {p.category?.name ?? '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.supplier?.name ?? '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${p.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          p.quantity > 10 ? 'bg-success/10 text-success' :
                          p.quantity > 0 ? 'bg-warning/10 text-warning' :
                          'bg-error/10 text-error'
                        }`}>
                          {p.quantity} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          p.status === 'in_stock' ? 'bg-success/10 text-success' :
                          p.status === 'sold_out' ? 'bg-error/10 text-error' :
                          p.status === 'discontinued' ? 'bg-gray-500/10 text-gray-500' :
                          'bg-gray-500/10 text-gray-500'
                        }`}>
                          {p.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/products/${p.id}`} className="text-info hover:text-info/70 mr-3">View</Link>
                        <Link href={`/products/${p.id}/edit`} className="text-warning hover:text-warning/70 mr-3">Edit</Link>
                        <Link
                          as="button"
                          href={`/products/${p.id}`}
                          method="delete"
                          className="text-error hover:text-error/70"
                          onClick={(e) => {
                            if (!confirm('Are you sure you want to delete this product?')) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4">
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
                        <div className="mt-6">
                          <Link
                            href="/products/create"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-success hover:bg-success/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success/70"
                          >
                            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            New Product
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
  );
}
