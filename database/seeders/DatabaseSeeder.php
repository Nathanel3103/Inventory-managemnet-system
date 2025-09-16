<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create suppliers
        $suppliers = Supplier::factory(5)->create();

        // Create categories
        $categories = Category::factory(10)->create();

        // Create products with random suppliers and categories
        Product::factory(20)->create();
    }
}
