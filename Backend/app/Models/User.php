<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'email',
        'mot_de_passe',
        'id_administrateur',
        'id_panier'
    ];

    protected $hidden = [
        'mot_de_passe', // Pour cacher le mot de passe lors de la sérialisation
    ];


    public function panier()
    {
        return $this->belongsTo(Panier::class, 'panier_id');
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'commmand_id');
    }
}
