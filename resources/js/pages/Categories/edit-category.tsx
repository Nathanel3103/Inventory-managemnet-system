 
import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AppLayout from "../../components/sidebar";

type Category = {
    id: number;
    name: string;
    description?: string | null;
};

type PageProps = {
    category: Category;
};

export default function EditCategory() {
    const { category } = usePage<PageProps>().props;

    const { data, setData, put, processing, errors } = useForm<Category>({
        name: category.name || "",
        description: category.description || "",
        id: category.id, // not submitted but keeps TS happy
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/categories/${category.id}`);
    }

    return (
        <AppLayout title="Edit Category">
            <Head title="Edit Category" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                            Edit Category
                        </h2>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <Link
                            href="/categories"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-info hover:bg-info/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-info/70"
                        >
                            <svg
                                className="-ml-1 mr-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                                />
                            </svg>
                            Back to Categories
                        </Link>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-info focus:border-info sm:text-sm"
                            />
                            {errors.name && (
                                <div className="text-sm text-red-600 mt-1">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.description || ""}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-info focus:border-info sm:text-sm"
                            ></textarea>
                            {errors.description && (
                                <div className="text-sm text-red-600 mt-1">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm
                                    text-sm font-medium text-white bg-success hover:bg-success/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success/70"
                            >
                                <svg
                                    className="-ml-1 mr-2 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                Update Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
