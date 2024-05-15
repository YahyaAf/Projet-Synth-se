<?php

namespace Database\Seeders;

use App\Models\Produit;
use Faker\Core\Number;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class productSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Produit::factory(20)->create();
        DB::table('produits')->insert([
            'nom' => Str::random(10),
            'description' => Str::random(10),
            'prix' => rand(1, 100),
            'quantite_stock' => rand(1, 100)
        ]);
    }
}
