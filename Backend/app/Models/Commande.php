<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_utilisateur',
        'id_administrateur',
        'date_commande',
        'statut',
        'total'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'produit_id');
    }
}
