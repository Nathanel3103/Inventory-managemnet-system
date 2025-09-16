<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        //dashboard stats  forr dashboard eg total products, total categories, total suppliers
         $stats = [
            'total_products'  => Product::count(),
            'total_suppliers' => Supplier::count(),
            'total_categories'=> Category::count(),
            
            
        ];

        $recentProducts = Product::with(['category', 'supplier'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentProducts' => $recentProducts,
        ]);
    }
}
    

    