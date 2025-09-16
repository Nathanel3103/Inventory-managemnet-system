import {Link } from '@inertiajs/react'


export default function Nav(){
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      href="/dashboard"
                      className="border-b-2 border-primary text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/products"
                      className="border-b-2 border-primary text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                    >
                      Products
                    </Link>
                    <Link
                      href="/suppliers"
                      className="border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                    >
                      Suppliers
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
}