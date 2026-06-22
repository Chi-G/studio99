<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
                ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
                ->name('password.store');
});

// Paystack Webhook (Unauthenticated)
Route::post('/api/v1/billing/webhook', [App\Http\Controllers\Webhook\PaystackWebhookController::class, 'handle'])->name('webhook.paystack');

use App\Http\Controllers\DashboardController;

Route::middleware(['auth'])->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('verify-email', EmailVerificationPromptController::class)
                ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    // Generic Dashboard Router to handle role-based redirection if users hit /dashboard directly
    Route::get('/dashboard', function (Illuminate\Http\Request $request) {
        if ($request->user()->role === 'admin') return redirect()->route('admin.dashboard');
        if ($request->user()->role === 'team') return redirect()->route('team.dashboard');
        return app(\App\Http\Controllers\DashboardController::class)->clientDashboard($request);
    })->middleware(['verified'])->name('client.dashboard');

    Route::middleware(['auth', 'verified', 'role:client'])->group(function () {
        Route::get('/client/requests/create', [App\Http\Controllers\Client\ProjectRequestController::class, 'create'])->name('client.requests.create');
        Route::post('/client/requests', [App\Http\Controllers\Client\ProjectRequestController::class, 'store'])->name('client.requests.store');
        
        // Invoices and Payments
        Route::get('/client/invoices', [App\Http\Controllers\Client\InvoiceController::class, 'index'])->name('client.invoices.index');
        Route::get('/client/invoices/{invoice}', [App\Http\Controllers\Client\InvoiceController::class, 'show'])->name('client.invoices.show');
        Route::post('/client/invoices/{invoice}/paystack', [App\Http\Controllers\Client\PaymentController::class, 'initializePaystack'])->name('client.payments.paystack');
        Route::get('/client/payments/callback', [App\Http\Controllers\Client\PaymentController::class, 'callbackPaystack'])->name('client.payments.callback');
        Route::post('/client/invoices/{invoice}/bank-transfer', [App\Http\Controllers\Client\PaymentController::class, 'submitBankTransfer'])->name('client.payments.bank_transfer');

        // Client Project Workspace
        Route::get('/client/projects', [App\Http\Controllers\Client\ProjectController::class, 'index'])->name('client.projects.index');
        Route::get('/client/projects/{project}', [App\Http\Controllers\Client\ProjectController::class, 'show'])->name('client.projects.show');

        // Client Subscriptions
        Route::get('/client/subscriptions', [App\Http\Controllers\Client\SubscriptionController::class, 'index'])->name('client.subscriptions.index');
        Route::post('/client/subscriptions/verify', [App\Http\Controllers\Client\SubscriptionController::class, 'initializePaystack'])->name('client.subscriptions.verify');

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
        Route::get('/dashboard/team', function() {
            return Inertia::render('Dashboard/Team');
        })->name('team.dashboard');
        
        // Team Workspace Routes
        Route::get('/team/projects/{project}', [App\Http\Controllers\Team\ProjectController::class, 'show'])->name('team.projects.show');
        Route::patch('/team/projects/{project}/status', [App\Http\Controllers\Team\ProjectController::class, 'updateStatus'])->name('team.projects.updateStatus');
        Route::post('/team/projects/{project}/updates', [App\Http\Controllers\Team\ProjectUpdateController::class, 'store'])->name('team.projects.updates.store');
        Route::post('/team/projects/{project}/files', [App\Http\Controllers\Team\FileController::class, 'store'])->name('team.projects.files.store');
        
        // Mock Team Pages
        Route::get('/team/time', function() { return Inertia::render('Team/Time'); })->name('team.time');
        Route::get('/team/messages', function() { return Inertia::render('Team/Messages'); })->name('team.messages');
        Route::get('/team/settings', function() { return Inertia::render('Team/Settings'); })->name('team.settings');
    });

    Route::middleware(['auth', 'role:admin'])->group(function () {
        Route::get('/dashboard/admin', function() {
            return Inertia::render('Dashboard/Admin');
        })->name('admin.dashboard');
        
        Route::get('/admin/requests', [App\Http\Controllers\Admin\AdminRequestController::class, 'index'])->name('admin.requests.index');
        Route::get('/admin/requests/{projectRequest}', [App\Http\Controllers\Admin\AdminRequestController::class, 'show'])->name('admin.requests.show');
        Route::post('/admin/requests/{projectRequest}/convert', [App\Http\Controllers\Admin\AdminRequestController::class, 'convertToProject'])->name('admin.requests.convert');
        
        Route::get('/admin/projects', function() { return Inertia::render('Admin/Projects'); })->name('admin.projects.index');
        Route::get('/admin/payments', function() { return Inertia::render('Admin/Payments'); })->name('admin.payments.index');
        Route::get('/admin/portfolio', function() { return Inertia::render('Admin/Portfolio'); })->name('admin.portfolio.index');
        Route::get('/admin/content', function() { return Inertia::render('Admin/Content'); })->name('admin.content.index');
        Route::get('/admin/analytics', function() { return Inertia::render('Admin/Analytics'); })->name('admin.analytics.index');
        Route::get('/admin/settings', function() { return Inertia::render('Admin/Settings'); })->name('admin.settings.index');
        
        Route::get('/admin/users', function() { return Inertia::render('Admin/Users'); })->name('admin.users.index');
    });
});
