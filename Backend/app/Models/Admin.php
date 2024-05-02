<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'email',
        'mot_de_passe'
    ];

    protected $hidden = [
        'mot_de_passe', // Pour cacher le mot de passe lors de la sérialisation
    ];

    public function produits()
    {
        return $this->hasMany(Produit::class, 'produit_id');
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'commande_id');
    }

    public function user()
    {
        return $this->hasMany(User::class, 'user_id');
    }

    public function categoriesProduits()
    {
        return $this->hasMany(CategorieProduit::class, 'produit_categorie_id');
    }
}
