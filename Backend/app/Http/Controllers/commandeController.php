<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use Illuminate\Http\Request;

class commandeController extends Controller
{
    public function index()
    {
        $commandes = Commande::all();
        return response()->json($commandes);
    }

    /**
     * Store a newly created commande in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'produit_id' => 'required|exists:produits,id',
            'admin_id' => 'required|exists:admins,id',
        ]);

        $commande = Commande::create($request->all());
        return response()->json($commande, 201);
    }

    /**
     * Display the specified commande.
     *
     * @param  \App\Models\Commande  $commande
     * @return \Illuminate\Http\Response
     */
    public function show(Commande $commande)
    {
        return response()->json($commande);
    }

    /**
     * Remove the specified commande from storage.
     *
     * @param  \App\Models\Commande  $commande
     * @return \Illuminate\Http\Response
     */
    public function destroy(Commande $commande)
    {
        $commande->delete();
        return response()->json(null, 204);
    }
}
