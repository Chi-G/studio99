<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

use App\Http\Controllers\DashboardController;

Route::middleware(['auth'])->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::middleware(['auth', 'role:client'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'clientDashboard'])->name('client.dashboard');
    Route::get('/client/requests/create', [App\Http\Controllers\Client\ProjectRequestController::class, 'create'])->name('client.requests.create');
    Route::post('/client/requests', [App\Http\Controllers\Client\ProjectRequestController::class, 'store'])->name('client.requests.store');
});

    Route::middleware(['role:team'])->group(function () {
        Route::get('/dashboard/team', [DashboardController::class, 'teamDashboard'])->name('team.dashboard');
    });

    Route::middleware(['role:admin'])->group(function () {
        Route::get('/dashboard/admin', [DashboardController::class, 'adminDashboard'])->name('admin.dashboard');
    });
});
