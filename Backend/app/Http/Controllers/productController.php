<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Profiler\Profile;

class productController extends Controller
{
    public function index()
    {
        $product =  Produit::all();
        return response()->json($product, 200);
    }

    public function show(Produit $produit)
    {
        return response()->json($produit, 200);
    }
}
