<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

// Guest Routes ++++++++++++++++++++++++
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

// ADMIN ROUTES ++++++++++++++++++++++++
Route::middleware('admin')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::resource('users', UserController::class);
});

// USERS ROUTES ++++++++++++++++++++++++
Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
}); 
