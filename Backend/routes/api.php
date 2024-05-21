<?php

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
    Route::get('/product', productController::class . "@index");
    Route::get('/product/{produit}', productController::class . "@show");
    Route::get("/panier", [paniersController::class, 'index']);
});




Route::post("/panier", [paniersController::class, 'store']);
Route::delete("/panier/{panier}", [paniersController::class, 'destroy']);

Route::post('/signup', userController::class . "@signup");
Route::post('/login', userController::class . "@login");

//Route::post('/logout', userController::class . "@logout");
