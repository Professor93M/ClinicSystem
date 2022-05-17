<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index(){
        return Inertia::render('Auth/Index',[
            'users' => User::where('role', '<>', 1)->get(),
        ]);
    }

    public function uedit($id){
        return Inertia::render('Auth/Edit',[
            'user' => User::find($id),
        ]);
    }

    public function uupdate($id, Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => ['confirmed', 'nullable', 'string', 'min:8'],
            'role' => 'required',
        ]);

        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = $request->role;
        $user->save();
        return redirect()->route('users.index');
    }

    public function udelete($id){
        User::find($id)->delete();
        return redirect()->route('users.index');
    }
}
