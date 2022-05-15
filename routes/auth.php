<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\PatientsController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\DoctorsController;
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
    
    Route::resource('doctors', DoctorsController::class);
    Route::get('/users/index', [Controller::class, 'index']);
    Route::get('/users/edit', [Controller::class, 'uedit']);
    Route::put('/users/update', [Controller::class, 'uupdate'])->name('users.update');
    Route::delete('/users/delete', [Controller::class, 'udelete'])->name('users.delete');
});

// USERS ROUTES ++++++++++++++++++++++++
Route::middleware('auth')->group(function () {
    Route::resource('patients', PatientsController::class);

    Route::get('/doctors/{id}/patients', [DoctorsController::class, 'patients'])->name('doctor.patients');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
}); 
