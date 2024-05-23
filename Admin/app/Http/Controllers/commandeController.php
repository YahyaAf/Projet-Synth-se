<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
    public function index()
    {
        $commandes = Commande::all();
        return response()->json($commandes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date_commande' => 'required|date',
            'statut' => 'required|string',
            'total' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'produit_id' => 'required|exists:produits,id',
            'adresse' => 'required|string',
            'ville' => 'required|string',
            'numero' => 'required|string',
        ]);

        $commande = Commande::create($request->all());
        return response()->json($commande, 201);
    }

    public function show($id)
    {
        $commande = Commande::findOrFail($id);
        return response()->json($commande);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'date_commande' => 'date',
            'statut' => 'string',
            'total' => 'numeric',
            'user_id' => 'exists:users,id',
            'produit_id' => 'exists:produits,id',
            'adresse' => 'string',
            'ville' => 'string',
            'numero' => 'string',
        ]);

        $commande = Commande::findOrFail($id);
        $commande->update($request->all());

        return response()->json($commande, 200);
    }

    public function destroy($id)
    {
        $commande = Commande::findOrFail($id);
        $commande->delete();

        return response()->json(null, 204);
    }
}
