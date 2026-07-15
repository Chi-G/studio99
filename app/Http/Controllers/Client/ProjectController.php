<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::where('client_id', auth()->id())
            ->with(['assignedStaff', 'request.service'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Client/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function show(Project $project)
    {
        // Ensure client owns the project
        if (auth()->user()->id !== $project->client_id) {
            abort(403);
        }

        $project->load(['updates.user', 'files.uploader', 'assignedStaff', 'request']);

        return Inertia::render('Client/Projects/Show', [
            'project' => $project,
        ]);
    }
}
