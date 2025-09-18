<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Supplier;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index(Request $request)
{
    $suppliers = Supplier::with('products')
        ->orderBy('name', 'asc')
        ->paginate(10)   
        ->through(function ($supplier) {
            return [
                'id' => $supplier->id,
                'name' => $supplier->name,
                'contact_details' => $supplier->contact_details,
                'total_products' => $supplier->products->count(),

                'total_stock_value' => number_format(
                    $supplier->products->sum(fn ($product) => $product->price * $product->quantity),
                    2
                ),
                'products' => $supplier->products->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'price' => $product->price,
                        'quantity' => $product->quantity,
                        'stock_value' => number_format($product->price * $product->quantity, 2),
                    ];
                }),
            ];
        })
        ->withQueryString(); 

    return Inertia::render('Suppliers/Supplier', [
        'suppliers' => $suppliers,
    ]);
}











    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return Inertia::render('Suppliers/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'contact_details' => ['required', 'string', 'max:1000'],
        ]);

        try {
            Supplier::create($validated);
            return Redirect::route('suppliers.index')->with('success', 'Supplier created successfully');
        } catch (\Exception $e) {
            return Redirect::back()->withInput()->with('error', 'Failed to create supplier');
        }
    }

    /**
     * Display the specified resource.
     */
   public function show($supplierId)
{
    // Get the supplier with products
    $supplier = Supplier::with('products')->findOrFail($supplierId);
    
    $formattedSupplier = [
        'id' => $supplier->id,
        'name' => $supplier->name,
        'contact_details' => $supplier->contact_details,
        'total_products' => $supplier->products->count(),  
        'total_stock_value' => number_format(
            $supplier->products->sum(function ($product) {
                return ($product->price) * ($product->quantity);
            }), 2
        ),
        'products' => $supplier->products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $product->quantity,
                'stock_value' => number_format(($product->price) * ($product->quantity), 2)
            ];
        }),
    ];

    return Inertia::render('Suppliers/viewsupplier', [
        'supplier' => $formattedSupplier
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $supplier = Supplier::findOrFail($id);
        return Inertia::render('Suppliers/edit', [
            'supplier' => $supplier
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'contact_details' => ['required', 'string', 'max:1000'],
        ]);

        try {
            $supplier = Supplier::findOrFail($id);
            $supplier->update($validated);
            return Redirect::route('suppliers.index')->with('success', 'Supplier updated successfully');
        } catch (\Exception $e) {
            return Redirect::back()->withInput()->with('error', 'Failed to update supplier');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
