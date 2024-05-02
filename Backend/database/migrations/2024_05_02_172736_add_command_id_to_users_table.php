<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('panier_id')->nullable();
            $table->unsignedBigInteger('commmand_id')->nullable();
            $table->unsignedBigInteger('admin_id')->nullable();

            $table->foreign('admin_id')->references('id')->on('admins')->cascadeOnDelete();
            $table->foreign('panier_id')->references('id_panier')->on('paniers')->onDelete('set null');
            $table->foreign('commmand_id')->references('id')->on('commandes')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
