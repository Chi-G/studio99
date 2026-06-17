<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Requests\Auth\RegisterClientRequest;
use App\Services\AuthService;
use App\Jobs\ProcessNewUserRegistration;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create()
    {
        return Inertia::render('Welcome', ['showRegister' => true]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterClientRequest $request, AuthService $authService)
    {
        $user = $authService->registerClient($request->validated());

        ProcessNewUserRegistration::dispatch($user);

        Auth::login($user);

        return redirect(route('client.dashboard', absolute: false));
    }
}
