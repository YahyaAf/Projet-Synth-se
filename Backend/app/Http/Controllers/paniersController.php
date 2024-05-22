<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Panier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class paniersController extends Controller
{
    /**
     * Display a listing of the paniers.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $paniers = Panier::with('product')->where("user_id", $user->id)->get();
        return response()->json($paniers);
    }

    /**
     * Store a newly created panier in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'produit_id' => 'required|exists:produits,id',
            // Add validation rules for other fields if needed
        ]);

        // Check if the product is already in the user's panier
        $existingPanier = Panier::where('user_id', $request->user_id)
            ->where('produit_id', $request->produit_id)
            ->first();

        if ($existingPanier) {
            return response()->json(['message' => 'The Product is already in the card'], 400);
        }

        // If not, create a new panier entry
        $panier = Panier::create($request->all());
        return response()->json($panier, 201);
    }


    /**
     * Display the specified panier.
     *
     * @param  \App\Models\Panier  $panier
     * @return \Illuminate\Http\Response
     */
    public function show(Panier $panier)
    {
        return response()->json($panier);
    }

    /**
     * Remove the specified panier from storage.
     *
     * @param  \App\Models\Panier  $panier
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $panier = Panier::findOrFail($id);
        $panier->delete();

        return response()->json("The panier deleted!", 200);
    }
}
