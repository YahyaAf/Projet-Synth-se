<?php

use App\Http\Controllers\commandeController;
use App\Http\Controllers\paniersController;
use App\Http\Controllers\productController;
use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/hello', function () {
    return 'hello world';
});

Route::get('/product', productController::class . "@index");
Route::get('/product/{produit}', productController::class . "@show");


Route::post('/signup', userController::class . "@signup");
Route::post('/login', userController::class . "@login");
//Route::post('/logout', userController::class . "@logout");

Route::group(['prefix' => 'api'], function () {
    Route::get('/commandes', [commandeController::class, 'index']);
    Route::post('/commandes', [commandeController::class, 'store']);
    Route::get('/commandes/{commande}', [commandeController::class, 'show']);
    Route::delete('/commandes/{commande}', [commandeController::class, 'destroy']);
});


Route::group(['prefix' => 'api'], function () {
    Route::get('/paniers', [paniersController::class, 'index']);
    Route::post('/paniers', [paniersController::class, 'store']);
    Route::get('/paniers/{panier}', [paniersController::class, 'show']);
    Route::delete('/paniers/{panier}', [paniersController::class, 'destroy']);
});
