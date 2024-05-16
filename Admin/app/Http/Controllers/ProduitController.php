<?php

namespace App\Http\Controllers;

use App\Models\produit;
use App\Models\Produit as ModelsProduit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produit = Produit::all();
        return response()->json($produit);
    }

    /**
     * Show the form for creating a new resource.
     */
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $form = $request->all();
        $user = Produit::create($form);
        return response()->json($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(produit $produit)
    {
        return response()->json($produit);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, produit $produit)
    {
        $form = $request->all();
        $produit->fill($form)->save();
        return response()->json($produit);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(produit $produit)
    {
        $produit->delete();
        return response()->json('the produit deleted');
    }
}
