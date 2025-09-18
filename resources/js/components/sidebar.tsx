import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

interface User {
  id: number;
  name: string;
  email: string;
}

import { type BreadcrumbItem } from '@/types';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
}

interface PageProps {
  auth: {
    user: User;
  };
  flash?: {
    success?: string;
    error?: string;
  };
  [key: string]: unknown;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
  const { auth, flash } = usePage<PageProps>().props;
  const { url } = usePage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      section: 'Overview',
      items: [
        {
          name: 'Dashboard',
          href: '/dashboard',
          icon: 'fas fa-tachometer-alt',
          current: url === '/dashboard',
        },
      ],
    },
    {
      section: 'Inventory Management',
      items: [
        {
          name: 'Products',
          href: '/products',
          icon: 'fas fa-boxes',
          current: url.startsWith('/products'),
        },
        {
          name: 'Categories',
          href: '/categories',
          icon: 'fas fa-tags',
          current: url.startsWith('/categories'),
        },
        {
          name: 'Stock Movements',
          href: '/stock-movements',
          icon: 'fas fa-exchange-alt',
          current: url.startsWith('/stock-movements'),
        },
      ],
    },
    {
      section: 'Supply Chain',
      items: [
        {
          name: 'Suppliers',
          href: '/suppliers',
          icon: 'fas fa-truck',
          current: url.startsWith('/suppliers'),
        },
        {
          name: 'Purchase Orders',
          href: '/purchase-orders',
          icon: 'fas fa-file-invoice',
          current: url.startsWith('/purchase-orders'),
        },
      ],
    },
    {
      section: 'Management',
      items: [
        {
          name: 'Employees',
          href: '/employees',
          icon: 'fas fa-users',
          current: url.startsWith('/employees'),
        },
        {
          name: 'Reports',
          href: '/reports',
          icon: 'fas fa-chart-bar',
          current: url.startsWith('/reports'),
        },
        {
          name: 'Settings',
          href: '/settings',
          icon: 'fas fa-cog',
          current: url.startsWith('/settings'),
        },
      ],
    },
  ];

  const linkClasses = (current: boolean) =>
    current
      ? 'bg-blue-800 text-white flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm'
      : 'text-gray-200 hover:bg-blue-700 hover:text-white flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors';

  return (
    <div className="min-h-screen flex flex-col dark:bg-blue-950">
      {title && <title>{title}</title>}

      {/* Header */}
      <header className="bg-blue-650 dark:bg-blue-900 shadow-md border-b border-blue-800 fixed w-full z-30 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                className="lg:hidden p-2 text-gray-200 hover:text-white mr-3"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
              <div className="relative h-screen">
                <h1 className="absolute top-5 left-5 text-xl sm:text-2xl font-bold text-white flex items-center">
                  <i className="fas fa-boxes text-blue-200 mr-2"></i>
                    Inventory Management System
                </h1>
              </div>

            </div>
            <div className="flex items-center space-x-4">
              <button
                className="p-2 text-gray-200 hover:text-white"
                title="Notifications"
              >
                <i className="fas fa-bell text-xl"></i>
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {auth.user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-200 hidden sm:block">
                  {auth.user.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Flash Messages */}
      {flash?.success && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50">
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            {flash.success}
          </div>
        </div>
      )}
      {flash?.error && (
        <div className="fixed top-20 right-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg z-50">
          <div className="flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {flash.error}
          </div>
        </div>
      )}

      {/* Sidebar + Main Content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-20 w-64 bg-gradient-to-b from-blue-700 to-blue-900 dark:from-blue-900 dark:to-blue-950 shadow-md transition-transform duration-300 ease-in-out flex flex-col`}
        >
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            {navigation.map((section) => (
              <div key={section.section} className="mb-8">
                <h3 className="px-3 text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  {section.section}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`${linkClasses(item.current)} relative group`}
                      >
                        <span className="absolute inset-y-0 left-0 w-1 bg-blue-400 rounded-r-full transition-transform origin-left scale-y-0 group-hover:scale-y-100" />
                        {item.current && (
                          <span className="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-r-full" />
                        )}
                        <i className={`${item.icon} mr-3 text-lg`}></i>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-blue-800">
            <Link
              href="/logout"
              method="post"
              as="button"
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-200 hover:bg-blue-800 rounded-md transition"
            >
              <i className="fas fa-sign-out-alt mr-3 text-lg"></i>
              Logout
            </Link>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 dark:bg-blue-950 min-h-screen p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
