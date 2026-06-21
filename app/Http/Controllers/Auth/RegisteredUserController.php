<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterClientRequest;
use App\Jobs\ProcessNewUserRegistration;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

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
     * @throws ValidationException
     */
    public function store(RegisterClientRequest $request, AuthService $authService)
    {
        set_time_limit(120);

        $user = $authService->registerClient($request->validated());

        ProcessNewUserRegistration::dispatch($user);

        Auth::login($user);

        return redirect(route('client.dashboard', absolute: false));
    }
}
