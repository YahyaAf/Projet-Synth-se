<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;

class commandeController extends Controller
{
    // Affiche la liste des commandes
    public function index()
    {
        $commandes = Commande::with(['user', 'produits'])->get();
        return response()->json($commandes);
    }

    // Affiche une commande spécifique
    public function show($id)
    {
        $commande = Commande::with(['user', 'produits'])->findOrFail($id);
        return response()->json($commande);
    }

    // Crée une nouvelle commande
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id_utilisateur' => 'required|exists:users,id',
            'id_administrateur' => 'required|exists:admins,id',
            'date_commande' => 'required|date',
            'statut' => 'required|string',
            'total' => 'required|numeric',
            'produits' => 'required|array',
            'produits.*.id' => 'exists:produits,id',
            'produits.*.quantite' => 'required|integer|min:1',
        ]);

        $commande = Commande::create($validatedData);

        foreach ($validatedData['produits'] as $produit) {
            $commande->produits()->attach($produit['id'], ['quantite' => $produit['quantite']]);
        }

        return response()->json($commande, 201);
    }

    // Met à jour une commande existante
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'id_utilisateur' => 'sometimes|exists:users,id',
            'id_administrateur' => 'sometimes|exists:admins,id',
            'date_commande' => 'sometimes|date',
            'statut' => 'sometimes|string',
            'total' => 'sometimes|numeric',
            'produits' => 'sometimes|array',
            'produits.*.id' => 'exists:produits,id',
            'produits.*.quantite' => 'sometimes|integer|min:1',
        ]);

        $commande = Commande::findOrFail($id);
        $commande->update($validatedData);

        if (isset($validatedData['produits'])) {
            $commande->produits()->detach();
            foreach ($validatedData['produits'] as $produit) {
                $commande->produits()->attach($produit['id'], ['quantite' => $produit['quantite']]);
            }
        }

        return response()->json($commande);
    }

    // Supprime une commande
    public function destroy($id)
    {
        $commande = Commande::findOrFail($id);
        $commande->produits()->detach();
        $commande->delete();

        return response()->json(null, 204);
    }
}
