<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    use HasFactory;

    // Specify the table if it's not the plural of the model name
    protected $table = 'paniers';

    // Specify the primary key column name if it's not 'id'
    protected $primaryKey = 'id_panier';

    // If the primary key is not an auto-incrementing integer, set these attributes accordingly
    public $incrementing = true; // Since 'id_panier' is likely auto-incrementing
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'produit_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function product()
    {
        return $this->belongsTo(Produit::class, 'produit_id');
    }
}
