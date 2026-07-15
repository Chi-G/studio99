<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Services\ContactService;
use Illuminate\Http\RedirectResponse;

class ContactController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        protected readonly ContactService $contactService
    ) {}

    /**
     * Handle the contact form submission.
     */
    public function submit(ContactRequest $request): RedirectResponse
    {
        $this->contactService->submitContactForm($request->validated());

        return back()->with('success', 'Your message has been sent successfully! We will get back to you shortly.');
    }
}
