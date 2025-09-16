<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $products = Product::with(['category', 'supplier'])
        ->orderBy('created_at', 'desc')
        ->get()
        ;

        return Inertia::render('Product/Product', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $categories = Category::all();
        $suppliers = Supplier::all();
        $selectedSupplierId = $request->query('supplier_id');

        return Inertia::render('Product/Create', [
            'categories' => $categories,
            'suppliers' => $suppliers,
            'selectedSupplierId' => $selectedSupplierId,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * 
     * 
     * 
     */
    public function store(StoreProductRequest $request)
    {
        
        $validated = $request->validated();

        
        $validated['status'] = $validated['quantity'] > 0 ? 'in_stock' : 'sold_out';

        try {
            Product::create($validated);

            return Redirect::route('products.index')
            ->with('success', 'Product created successfully');
        } catch (\Exception $e) {
            return Redirect::back()
                ->withInput()
                ->with('error', 'Failed to create product: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $product = Product::with(['category', 'supplier'])->findOrFail($id);

        return Inertia::render('Product/view', [
            'product' => $product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id,)
    {
        //
        $product = Product::findOrFail($id);
        $categories = Category::all();
        $suppliers = Supplier::all();

        return Inertia::render('Product/edit', [
            'product'=> $product,
            'categories' => $categories,
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $validated = $request->validated();
        $validated['status'] = $validated['quantity'] > 0 ? 'in_stock' : 'sold_out';

    try {
        $product->update($validated);

        return Redirect::route('products.index')
            ->with('success', 'Product updated successfully');
    } catch (\Exception $e) {
        return Redirect::back()
            ->withInput()
            ->with('error', 'Failed to update product: ' . $e->getMessage());
    }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->update(['status' => 'discontinued']);
            $product->delete();

            return Redirect::route('products.index')->with('success', 'Product discontinued successfully');
        } catch (\Exception $e) {
            return Redirect::back()->with('error', 'Failed to discontinue product');
        }
    }
}
