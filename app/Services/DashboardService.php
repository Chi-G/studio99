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
            'assignedProjects' => Project::where('assigned_staff_id', $user->id)->get(),
        ];
    }

    /**
     * Get aggregate data for the Admin Dashboard.
     */
    public function getAdminData(): array
    {
        $projects = Project::all();
        $usersCount = User::count();
        $revenue = Payment::where('status', 'approved')->sum('amount');

        return [
            'total_projects' => $projects->count(),
            'active_projects' => $projects->whereIn('status', ['pending', 'in_progress', 'review'])->count(),
            'total_users' => $usersCount,
            'total_revenue' => $revenue,
        ];
    }
}
