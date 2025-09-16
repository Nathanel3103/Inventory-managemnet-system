import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function SupplierCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        contact_details: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/suppliers');
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Add Supplier" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            Add New Supplier
                        </h2>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <Link
                            href="/suppliers"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-info"
                        >
                            Back to Suppliers
                        </Link>
                    </div>
                </div>

                <div className="bg-white shadow-sm rounded-lg">
                    <form onSubmit={submit} className="space-y-6 p-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-info focus:ring-info sm:text-sm text-black"
                                placeholder="Enter supplier name"
                                required
                            />
                            {errors.name && <div className="mt-1 text-sm text-error">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Details</label>
                            <textarea
                                value={data.contact_details}
                                onChange={e => setData('contact_details', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-info focus:ring-info sm:text-sm text-black"
                                placeholder="Enter contact details"
                                rows={4}
                                required
                            />
                            {errors.contact_details && <div className="mt-1 text-sm text-error">{errors.contact_details}</div>}
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t">
                            <Link
                                href="/suppliers"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-info"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-success hover:bg-success/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success/70 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Supplier'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
