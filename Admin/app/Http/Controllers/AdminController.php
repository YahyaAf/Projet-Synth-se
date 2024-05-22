<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'mot_de_passe');

        $admin = Admin::where('email', $credentials['email'])->first();
        if (!$admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if (Hash::check($credentials['mot_de_passe'], $admin->mot_de_passe)) {
            $token = $admin->createToken('AdminToken')->plainTextToken;
            return response()->json(['token' => $token], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'mot_de_passe' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $admin = Admin::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
        ]);

        return response()->json(['admin' => $admin], 201);
    }

    public function index()
    {
        $admins = Admin::all();
        return response()->json(['admins' => $admins], 200);
    }

    public function show($id)
    {
        $admin = Admin::find($id);
        if (!$admin) {
            return response()->json(['error' => 'Admin not found'], 404);
        }
        return response()->json(['admin' => $admin], 200);
    }

    public function update(Request $request, $id)
    {
        $admin = Admin::find($id);
        if (!$admin) {
            return response()->json(['error' => 'Admin not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins,email,' . $admin->id,
            'mot_de_passe' => 'sometimes|required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $admin->nom = $request->nom;
        $admin->email = $request->email;
        if ($request->has('mot_de_passe')) {
            $admin->mot_de_passe = Hash::make($request->mot_de_passe);
        }
        $admin->save();

        return response()->json(['admin' => $admin], 200);
    }

    public function destroy($id)
    {
        $admin = Admin::find($id);
        if (!$admin) {
            return response()->json(['error' => 'Admin not found'], 404);
        }

        $admin->delete();
        return response()->json(['message' => 'Admin deleted successfully'], 200);
    }
}
