/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import SearchDropdown from '../../components/SearchDropdown';
import AppLayout from '../../components/sidebar';

export default function Create() {
	const page = usePage();
	const props = page.props as unknown as {
        categories?: any[];
        suppliers?: any[];
        selectedSupplierId?: string;
    };
	const categories = props.categories || [];
	const suppliers = props.suppliers || [];

    const categoryOptions = categories.map(c => ({ value: c.id.toString(), label: c.name }));
    const supplierOptions = suppliers.map(s => ({ value: s.id.toString(), label: s.name }));

	const { data, setData, post, processing, errors } = useForm({
		name: '',
		category_id: '',
		supplier_id: '',
		price: '',
		quantity: ''
	});

    React.useEffect(() => {
        if (props.selectedSupplierId) {
            setData('supplier_id', props.selectedSupplierId);
        }
    }, [props.selectedSupplierId, setData]);

	function submit(e: React.FormEvent) {
		e.preventDefault();
		post('/products');
	}

	return (
        <AppLayout title="Add Product">
            <Head title="Add Product" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            Add New Product
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
                    <form onSubmit={submit} className="space-y-6 p-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-info focus:ring-info sm:text-sm text-black"
                                    placeholder="Enter product name"
                                    required
                                />
                                {errors.name && <div className="mt-1 text-sm text-error">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <div className="mt-1 text-black">
                                    <SearchDropdown
                                        options={categoryOptions}
                                        value={data.category_id}
                                        onChange={(value: string) => setData('category_id', value)}
                                        placeholder="Select a category"
                                    />
                                </div>
                                {errors.category_id && <div className="mt-1 text-sm text-error">{errors.category_id}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Supplier</label>
                                <div className="mt-1 text-black ">
                                    <SearchDropdown
                                        options={supplierOptions}
                                        value={data.supplier_id}
                                        onChange={(value: string) => setData('supplier_id', value)}
                                        
                                        placeholder="Select a supplier"
                                    />
                                </div>
                                {errors.supplier_id && <div className="mt-1 text-sm text-error">{errors.supplier_id}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="mt-1 block w-full pl-7 rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-info focus:ring-info sm:text-sm text-black"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                                {errors.price && <div className="mt-1 text-sm text-error">{errors.price}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    value={data.quantity}
                                    onChange={e => setData('quantity', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-info focus:ring-info sm:text-sm text-black"
                                    placeholder="Enter quantity"
                                    required
                                />
                                {errors.quantity && <div className="mt-1 text-sm text-error">{errors.quantity}</div>}
                            </div>
                        </div>

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
                                {processing ? 'Saving...' : 'Save Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </AppLayout>
    );}


