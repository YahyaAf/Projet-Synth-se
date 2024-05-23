<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'date_commande',
        'statut',
        'total',
        'user_id',
        'produit_id',
        'adresse',
        'ville',
        'numero',
    ];

    /**
     * Get the user that owns the commande.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_utilisateur');
    }

    /**
     * Get the produits for the commande.
     */
    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'commande_produit', 'id_commande', 'id_produit')
            ->withPivot('quantite');
    }
}    
