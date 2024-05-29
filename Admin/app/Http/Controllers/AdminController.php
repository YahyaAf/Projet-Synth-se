<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function Login(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);
    
        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
    
        // Retrieve the admin by email
        $admin = Admin::where('email', $request->email)->first();
    
        // Check if admin exists and verify password
        if (!$admin || !Hash::check($request->password, $admin->password)) {
            // Log failed login attempt
            Log::warning('Admin login attempt with incorrect credentials', ['email' => $request->email]);
            return response()->json(['error' => 'Incorrect credentials'], 401);
        }
    
        // Generate a new token for the authenticated admin
        $token = $admin->createToken('admin_token')->plainTextToken;
    
        // Log successful login
        Log::info('Admin logged in successfully', ['email' => $admin->email]);
    
        // Return token and admin information in the response
        return response()->json(['token' => $token, 'admin' => $admin], 200);
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
