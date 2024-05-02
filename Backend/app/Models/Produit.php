<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'description', 'prix', 'quantite_stock'];


    public function commandes()
    {
        return $this->belongsToMany(Commande::class, 'commande_id');
    }

    public function categoriesProduits()
    {
        return $this->belongsToMany(CategorieProduit::class, 'produit_categorie_id');
    }
}
