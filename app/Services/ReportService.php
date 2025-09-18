<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Product;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Support\Collection;

class ReportService implements FromCollection
{
    protected $type;

    public function for(string $type): self
    {
        $this->type = $type;
        return $this;
    }

    public function collection(): Collection
    {
        return match ($this->type) {
            'categories' => Category::select('id','name','description','created_at')->get(),
            'products'   => Product::select('id','name','price','quantity','created_at')->get(),
            default      => collect(),
        };
    }

    public function export(string $type)
    {
        return Excel::download($this->for($type), "{$type}_report.xlsx");
    }
}
