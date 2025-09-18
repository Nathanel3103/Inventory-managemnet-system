<?php

use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SupplierController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Authenticated and verified routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('products', ProductController::class);
    Route::resource('suppliers', SupplierController::class);
    Route::resource('categories', CategoryController::class);
     
    Route::resource('reports', \App\Http\Controllers\ReportsController::class);
});

//Route::middleware(['auth', 'verified'])->group(function () {
    //Route::resource('products', ProductController::class);
    //Route::resource('suppliers', SupplierController::class);
//});
//Route::resource('products', ProductController::class);

 


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
