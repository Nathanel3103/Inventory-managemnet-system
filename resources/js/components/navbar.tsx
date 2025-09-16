import React from 'react';
import { Link } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Navbar() {
	return (
		<header className="w-full bg-white dark:bg-gray-900 border-b border-neutral-200 dark:border-neutral-800">
			<div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
				<div className="text-lg font-semibold">Inventory</div>

				<nav className="flex items-center gap-3">
					<Link href={dashboard()} className="text-sm px-3 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800">
						Dashboard
					</Link>
					<Link href="/inventory" className="text-sm px-3 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800">
						Inventory
					</Link>
				</nav>
			</div>
		</header>
	);
}
