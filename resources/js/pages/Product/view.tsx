/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function View() {
	const { product } = usePage().props as any;

	if (!product) return <div className="container mx-auto py-8">Product not found</div>;

	return (
		<div className="container mx-auto py-8">
			<Head title={`Product: ${product.name}`} />

			<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
				<h2 className="text-xl font-semibold mb-4">{product.name}</h2>

				<div className="space-y-2">
					<div><strong>Category:</strong> {product.category?.name ?? '-'}</div>
					<div><strong>Supplier:</strong> {product.supplier?.name ?? '-'}</div>
					<div><strong>Price:</strong> {product.price}</div>
					<div><strong>Quantity:</strong> {product.quantity}</div> 
					<div><strong>Total stock value</strong>${product.stock_value}</div>
				</div>

				<div className="mt-6 flex justify-end space-x-3">
					<Link href="/products" className="px-4 py-2 rounded-lg border bg-gray-100 text-black">Back</Link>
					<Link as="button" href={`/products/${product.id}`} method="delete" className="px-4 py-2 rounded-lg bg-red-600 text-white">Delete</Link>
				</div>
			</div>
		</div>
	);
}
