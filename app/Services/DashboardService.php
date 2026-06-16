<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use App\Models\Project;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Collection;

class DashboardService
{
    /**
     * Get data for the Client Dashboard.
     *
     * @return array{projects: Collection<int, Project>, payments: Collection<int, Payment>}
     */
    public function getClientData(User $user): array
    {
        return [
            'projects' => Project::where('client_id', $user->id)->get(),
            'projectRequests' => \App\Models\ProjectRequest::where('client_id', $user->id)->with(['service', 'package'])->latest()->get(),
            'invoices' => \App\Models\Invoice::where('client_id', $user->id)->latest()->get(),
            'payments' => Payment::where('user_id', $user->id)->get(),
        ];
    }

    /**
     * Get data for the Team Dashboard.
     *
     * @return array{assignedProjects: Collection<int, Project>}
     */
    public function getTeamData(User $user): array
    {
        return [
            'assignedProjects' => Project::where('assigned_to', $user->id)->with('client')->latest()->get(),
        ];
    }

    /**
     * Get aggregate data for the Admin Dashboard.
     */
    public function getAdminData(): array
    {
        $projects = Project::with('client')->latest()->get();
        $usersCount = User::count();
        $revenue = Payment::where('status', 'approved')->sum('amount');
        $requests = \App\Models\ProjectRequest::with(['client', 'service', 'package'])->latest()->take(5)->get();

        return [
            'total_projects' => $projects->count(),
            'active_projects' => $projects->whereIn('status', ['pending', 'in_progress', 'review'])->count(),
            'total_users' => $usersCount,
            'total_revenue' => $revenue,
            'recent_projects' => $projects->take(5),
            'recent_requests' => $requests,
        ];
    }
}
