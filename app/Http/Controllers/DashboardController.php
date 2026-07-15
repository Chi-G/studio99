<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\PaymentResource;
use App\Http\Resources\ProjectResource;
use App\Models\Service;
use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(private readonly DashboardService $dashboardService) {}

    public function clientDashboard(Request $request)
    {
        $data = $this->dashboardService->getClientData($request->user());
        $services = Service::with('packages')->where('is_active', true)->get();

        return Inertia::render('Dashboard/Client', [
            'projects' => ProjectResource::collection($data['projects']),
            'projectRequests' => $data['projectRequests'],
            'invoices' => $data['invoices'],
            'payments' => PaymentResource::collection($data['payments']),
            'services' => $services,
        ]);
    }

    public function teamDashboard(Request $request)
    {
        $data = $this->dashboardService->getTeamData($request->user());

        return Inertia::render('Dashboard/Team', [
            'assignedProjects' => ProjectResource::collection($data['assignedProjects']),
        ]);
    }

    public function adminDashboard()
    {
        $data = $this->dashboardService->getAdminData();

        return Inertia::render('Dashboard/Admin', [
            'stats' => $data,
        ]);
    }
}
