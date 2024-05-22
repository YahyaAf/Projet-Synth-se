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
            // Add validation rules for other fields if needed
        ]);

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
