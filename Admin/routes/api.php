<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\commandeController;
use App\Http\Controllers\paniersController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\UserController;
use App\Models\User;
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

Route::apiResource('users', UserController::class);
Route::apiResource('produit', ProduitController::class);


// Route::middleware(['auth:admin'])->group(function () {
//     Route::resource('admin/commandes', commandeController::class);
// });
Route::resource('admin/commandes', commandeController::class);


// Route::middleware(['auth:admin'])->group(function () {
//     Route::resource('admin/paniers', paniersController::class);
// });
Route::resource('admin/paniers', paniersController::class);

Route::post('admin/login', [AdminController::class, 'login']);
Route::post('admin/register', [AdminController::class, 'signup']);

Route::post('/admin/login', [AuthController::class, 'login']);
Route::post('/admin/register', [AuthController::class, 'register']);

Route::middleware('auth:api')->group(function () {
    Route::get('/admins', [AdminController::class, 'index']);
    Route::post('/admins', [AdminController::class, 'store']);
    Route::put('/admins/{id}', [AdminController::class, 'update']);
    Route::delete('/admins/{id}', [AdminController::class, 'destroy']);
});