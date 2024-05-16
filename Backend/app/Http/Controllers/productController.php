<?php 
namespace App\Http\Controllers;
 
use App\Models\Produit;
use Illuminate\Http\Request;
 
class productController extends Controller
{
    public function index()
    {
        $product =  Produit::all();
        return response()->json($product, 200);
    }
 
    public function show($id)
    {
        $product = Produit::findOrFail($id);
        return response()->json($product, 200);
    }
}