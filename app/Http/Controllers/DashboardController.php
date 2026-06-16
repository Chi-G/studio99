<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\DashboardService;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\PaymentResource;

class DashboardController extends Controller
{
    public function __construct(private readonly DashboardService $dashboardService)
    {
    }

    public function clientDashboard(Request $request)
    {
        $data = $this->dashboardService->getClientData($request->user());

        return Inertia::render('Dashboard/Client', [
            'projects' => ProjectResource::collection($data['projects']),
            'payments' => PaymentResource::collection($data['payments']),
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
