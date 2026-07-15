<?php

declare(strict_types=1);

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Models\Service;
use App\Services\ProjectRequestService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProjectRequestController extends Controller
{
    public function __construct(
        protected readonly ProjectRequestService $projectRequestService
    ) {}

    /**
     * Show the project request creation page.
     */
    public function create(): Response
    {
        $services = Service::with('packages')
            ->where('is_active', true)
            ->get();

        return Inertia::render('Client/Requests/Create', [
            'services' => $services,
        ]);
    }

    /**
     * Store a new project request.
     */
    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $result = $this->projectRequestService->submitRequest(
            $request->validated(),
            auth()->user()
        );

        // Auto-login the client if they were registered as a guest
        if (! auth()->check()) {
            auth()->login($result['client']);
        }

        return redirect()->route('client.dashboard')->with('success', 'Project request submitted! Our team will review your requirements and send a quotation.');
    }
}
