<?php

namespace App\Http\Controllers;

use App\Models\Panier;
use Illuminate\Http\Request;

class paniersController extends Controller
{
    // Affiche la liste des paniers
    public function index()
    {
        $paniers = Panier::with('user')->get();
        return response()->json($paniers);
    }

    // Affiche un panier spécifique
    public function show($id)
    {
        $panier = Panier::with('user')->findOrFail($id);
        return response()->json($panier);
    }

    // Crée un nouveau panier
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $panier = Panier::create($validatedData);

        return response()->json($panier, 201);
    }

    // Met à jour un panier existant
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
        ]);

        $panier = Panier::findOrFail($id);
        $panier->update($validatedData);

        return response()->json($panier);
    }

    // Supprime un panier
    public function destroy($id)
    {
        $panier = Panier::findOrFail($id);
        $panier->delete();

        return response()->json(null, 204);
    }
}
