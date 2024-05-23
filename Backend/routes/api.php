<?php

use App\Http\Controllers\commandeController;
use App\Http\Controllers\ContactController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
// });
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/product/{produit}', productController::class . "@show");
    Route::get("/panier", [paniersController::class, 'index']);
    Route::delete("/panier/{id}", [PaniersController::class, 'destroy']);
    Route::post("/panier", [paniersController::class, 'store']);
    Route::post("/command", [commandeController::class, 'store']);
});

Route::get('/product', productController::class . "@index");


Route::post('/signup', userController::class . "@signup");
Route::post('/login', userController::class . "@login");

//Route::post('/logout', userController::class . "@logout");
Route::apiResource('contacts', ContactController::class);
