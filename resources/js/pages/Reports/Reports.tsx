/** */
import React  from 'react';
import { Head, Link} from '@inertiajs/react';
import AppLayout from '../../components/sidebar';

export default function Reports() {
  return (
    <AppLayout title="Reports">
      <Head title="Reports" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-shadow-blue-50">Reports</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/reports/categories"
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-4">Category Report</h2>
              <p className="text-gray-600 dark:text-gray-400">
                View detailed reports on product categories, including total products and stock values.
              </p>
            </Link>

            <Link
              href="/reports/products"
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-4">Product Report</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Access comprehensive reports on individual products, including stock levels and values.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
