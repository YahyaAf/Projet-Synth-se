<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('commande_produit', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_commande');
            $table->unsignedBigInteger('id_produit');
            $table->integer('quantite');
            $table->timestamps();

            $table->foreign('id_commande')->references('id')->on('commandes')->onDelete('cascade');
            $table->foreign('id_produit')->references('id')->on('produits')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('commande_produit');
    }
};
