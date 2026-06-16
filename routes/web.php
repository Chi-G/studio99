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

// Paystack Webhook (Unauthenticated)
Route::post('/api/v1/billing/webhook', [App\Http\Controllers\Webhook\PaystackWebhookController::class, 'handle'])->name('webhook.paystack');

use App\Http\Controllers\DashboardController;

Route::middleware(['auth'])->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::middleware(['auth', 'role:client'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'clientDashboard'])->name('client.dashboard');
        Route::get('/client/requests/create', [App\Http\Controllers\Client\ProjectRequestController::class, 'create'])->name('client.requests.create');
        Route::post('/client/requests', [App\Http\Controllers\Client\ProjectRequestController::class, 'store'])->name('client.requests.store');
        
        // Invoices and Payments
        Route::get('/client/invoices', [App\Http\Controllers\Client\InvoiceController::class, 'index'])->name('client.invoices.index');
        Route::get('/client/invoices/{invoice}', [App\Http\Controllers\Client\InvoiceController::class, 'show'])->name('client.invoices.show');
        Route::post('/client/invoices/{invoice}/paystack', [App\Http\Controllers\Client\PaymentController::class, 'verifyPaystack'])->name('client.payments.paystack');
        Route::post('/client/invoices/{invoice}/bank-transfer', [App\Http\Controllers\Client\PaymentController::class, 'submitBankTransfer'])->name('client.payments.bank_transfer');

        // Client Project Workspace
        Route::get('/client/projects', [App\Http\Controllers\Client\ProjectController::class, 'index'])->name('client.projects.index');
        Route::get('/client/projects/{project}', [App\Http\Controllers\Client\ProjectController::class, 'show'])->name('client.projects.show');

        // Client Subscriptions
        Route::get('/client/subscriptions', [App\Http\Controllers\Client\SubscriptionController::class, 'index'])->name('client.subscriptions.index');
        Route::post('/client/subscriptions/verify', [App\Http\Controllers\Client\SubscriptionController::class, 'verifyPaystack'])->name('client.subscriptions.verify');

        // File Center & Support (UI Mocks for Dashboard Aesthetic)
        Route::get('/client/files', function () {
            return Inertia::render('Client/Files/Index');
        })->name('client.files.index');

        Route::get('/client/support', function () {
            return Inertia::render('Client/Support/Index');
        })->name('client.support.index');
    });

    // Chat endpoints (shared for all authenticated users; authorization happens in controller)
    Route::middleware(['auth'])->group(function () {
        Route::get('/api/v1/projects/{project}/messages', [App\Http\Controllers\ChatController::class, 'index'])->name('chat.index');
        Route::post('/api/v1/projects/{project}/messages', [App\Http\Controllers\ChatController::class, 'store'])->name('chat.store');
    });

    Route::middleware(['auth', 'role:team'])->group(function () {
        Route::get('/dashboard/team', [DashboardController::class, 'teamDashboard'])->name('team.dashboard');
        
        // Team Workspace Routes
        Route::get('/team/projects/{project}', [App\Http\Controllers\Team\ProjectController::class, 'show'])->name('team.projects.show');
        Route::patch('/team/projects/{project}/status', [App\Http\Controllers\Team\ProjectController::class, 'updateStatus'])->name('team.projects.updateStatus');
        Route::post('/team/projects/{project}/updates', [App\Http\Controllers\Team\ProjectUpdateController::class, 'store'])->name('team.projects.updates.store');
        Route::post('/team/projects/{project}/files', [App\Http\Controllers\Team\FileController::class, 'store'])->name('team.projects.files.store');
    });

    Route::middleware(['auth', 'role:admin'])->group(function () {
        Route::get('/dashboard/admin', [DashboardController::class, 'adminDashboard'])->name('admin.dashboard');
        
        Route::get('/admin/requests', [App\Http\Controllers\Admin\AdminRequestController::class, 'index'])->name('admin.requests.index');
        Route::get('/admin/requests/{projectRequest}', [App\Http\Controllers\Admin\AdminRequestController::class, 'show'])->name('admin.requests.show');
        Route::post('/admin/requests/{projectRequest}/convert', [App\Http\Controllers\Admin\AdminRequestController::class, 'convertToProject'])->name('admin.requests.convert');
        
        Route::get('/admin/projects', [App\Http\Controllers\Admin\AdminProjectController::class, 'index'])->name('admin.projects.index');
        Route::get('/admin/users', [App\Http\Controllers\Admin\UserController::class, 'index'])->name('admin.users.index');
    });
});
