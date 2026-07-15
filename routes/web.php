<?php

use App\Http\Controllers\Admin\AdminRequestController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Client\InvoiceController;
use App\Http\Controllers\Client\PaymentController;
use App\Http\Controllers\Client\ProjectController;
use App\Http\Controllers\Client\ProjectRequestController;
use App\Http\Controllers\Client\SubscriptionController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Team\FileController;
use App\Http\Controllers\Team\ProjectUpdateController;
use App\Http\Controllers\Webhook\PaystackWebhookController;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $services = Service::with('packages')->where('is_active', true)->get();

    return Inertia::render('Welcome', [
        'services' => $services,
    ]);
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');

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
Route::post('/api/v1/billing/webhook', [PaystackWebhookController::class, 'handle'])->name('webhook.paystack');
Route::post('/client/requests', [ProjectRequestController::class, 'store'])->name('client.requests.store');

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
    Route::get('/dashboard', function (Request $request) {
        if ($request->user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        if ($request->user()->role === 'team') {
            return redirect()->route('team.dashboard');
        }

        return app(DashboardController::class)->clientDashboard($request);
    })->middleware(['verified'])->name('client.dashboard');

    Route::middleware(['auth', 'verified', 'role:client'])->group(function () {
        Route::get('/client/requests/create', [ProjectRequestController::class, 'create'])->name('client.requests.create');

        // Invoices and Payments
        Route::get('/client/invoices', [InvoiceController::class, 'index'])->name('client.invoices.index');
        Route::get('/client/invoices/{invoice}', [InvoiceController::class, 'show'])->name('client.invoices.show');
        Route::post('/client/invoices/{invoice}/paystack', [PaymentController::class, 'initializePaystack'])->name('client.payments.paystack');
        Route::get('/client/payments/callback', [PaymentController::class, 'callbackPaystack'])->name('client.payments.callback');
        Route::post('/client/invoices/{invoice}/bank-transfer', [PaymentController::class, 'submitBankTransfer'])->name('client.payments.bank_transfer');

        // Client Project Workspace
        Route::get('/client/projects', [ProjectController::class, 'index'])->name('client.projects.index');
        Route::get('/client/projects/{project}', [ProjectController::class, 'show'])->name('client.projects.show');

        // Client Subscriptions
        Route::get('/client/subscriptions', [SubscriptionController::class, 'index'])->name('client.subscriptions.index');
        Route::post('/client/subscriptions/verify', [SubscriptionController::class, 'initializePaystack'])->name('client.subscriptions.verify');

        // File Center & Support (UI Mocks for Dashboard Aesthetic)
        Route::get('/client/files', function () {
            return Inertia::render('Client/Files/Index');
        })->name('client.files.index');

        Route::get('/client/support', function () {
            return Inertia::render('Client/Support/Index');
        })->name('client.support.index');

        Route::get('/client/messages', function () {
            return Inertia::render('Client/Messages/Index');
        })->name('client.messages.index');

        Route::get('/client/notifications', function () {
            return Inertia::render('Client/Notifications/Index');
        })->name('client.notifications.index');
    });

    // Chat endpoints (shared for all authenticated users; authorization happens in controller)
    Route::middleware(['auth'])->group(function () {
        Route::get('/api/v1/projects/{project}/messages', [ChatController::class, 'index'])->name('chat.index');
        Route::post('/api/v1/projects/{project}/messages', [ChatController::class, 'store'])->name('chat.store');
    });

    Route::middleware(['auth', 'role:team'])->group(function () {
        Route::get('/dashboard/team', function () {
            return Inertia::render('Dashboard/Team');
        })->name('team.dashboard');

        // Team Workspace Routes
        Route::get('/team/projects/{project}', [App\Http\Controllers\Team\ProjectController::class, 'show'])->name('team.projects.show');
        Route::patch('/team/projects/{project}/status', [App\Http\Controllers\Team\ProjectController::class, 'updateStatus'])->name('team.projects.updateStatus');
        Route::post('/team/projects/{project}/updates', [ProjectUpdateController::class, 'store'])->name('team.projects.updates.store');
        Route::post('/team/projects/{project}/files', [FileController::class, 'store'])->name('team.projects.files.store');

        // Mock Team Pages
        Route::get('/team/tasks', function () {
            return Inertia::render('Team/AssignedTasks');
        })->name('team.tasks');
        Route::get('/team/deliverables', function () {
            return Inertia::render('Team/UploadDeliverables');
        })->name('team.deliverables');
        Route::get('/team/progress', function () {
            return Inertia::render('Team/ProgressUpdates');
        })->name('team.progress');
        Route::get('/team/activity-logs', function () {
            return Inertia::render('Team/ActivityLogs');
        })->name('team.activity_logs');
        Route::get('/team/notifications', function () {
            return Inertia::render('Team/Notifications');
        })->name('team.notifications');
        Route::get('/team/profile', function () {
            return Inertia::render('Team/Profile');
        })->name('team.profile');
        Route::get('/team/time', function () {
            return Inertia::render('Team/Time');
        })->name('team.time');
        Route::get('/team/messages', function () {
            return Inertia::render('Team/Messages');
        })->name('team.messages');
        Route::get('/team/settings', function () {
            return Inertia::render('Team/Settings');
        })->name('team.settings');
    });

    // Unified Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');

    // Admin Routes
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard/Admin');
        })->name('dashboard');

        Route::get('/clients', function () {
            return Inertia::render('Admin/Clients');
        })->name('clients.index');

        Route::get('/team-members', function () {
            return Inertia::render('Admin/TeamMembers');
        })->name('team_members.index');

        Route::get('/projects', function () {
            return Inertia::render('Admin/Projects');
        })->name('projects.index');

        Route::get('/requests', [AdminRequestController::class, 'index'])->name('requests.index');
        Route::get('/requests/{projectRequest}', [AdminRequestController::class, 'show'])->name('requests.show');
        Route::post('/requests/{projectRequest}/convert', [AdminRequestController::class, 'convertToProject'])->name('requests.convert');
        Route::post('/requests/{projectRequest}/quotation', [AdminRequestController::class, 'sendQuotation'])->name('requests.quotation');

        Route::get('/services', function () {
            return Inertia::render('Admin/Services');
        })->name('services.index');

        Route::get('/tasks', function () {
            return Inertia::render('Admin/Tasks');
        })->name('tasks.index');

        Route::get('/payments', function () {
            return Inertia::render('Admin/Payments');
        })->name('payments.index');

        Route::get('/reports', function () {
            return Inertia::render('Admin/Reports');
        })->name('reports.index');

        Route::get('/activity-logs', function () {
            return Inertia::render('Admin/ActivityLogs');
        })->name('activity_logs.index');

        Route::get('/settings', function () {
            return Inertia::render('Admin/Settings');
        })->name('settings.index');

        // Keep these if linked elsewhere, otherwise they are superseded
        Route::get('/portfolio', function () {
            return Inertia::render('Admin/Portfolio');
        })->name('portfolio.index');
        Route::get('/content', function () {
            return Inertia::render('Admin/Content');
        })->name('content.index');
        Route::get('/analytics', function () {
            return Inertia::render('Admin/Analytics');
        })->name('analytics.index');
        Route::get('/users', function () {
            return Inertia::render('Admin/Users');
        })->name('users.index');
    });
});
