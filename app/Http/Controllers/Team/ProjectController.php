<?php

namespace App\Http\Controllers\Team;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function show(Project $project)
    {
        // Ensure the team member is assigned to this project
        if ($project->assigned_to !== auth()->id()) {
            abort(403);
        }

        $project->load(['client', 'request', 'updates.user', 'files.uploader']);

        return Inertia::render('Team/Projects/Show', [
            'project' => $project,
        ]);
    }

    public function updateStatus(Request $request, Project $project)
    {
        if ($project->assigned_to !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:pending,in_progress,review,completed'
        ]);

        $project->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Project status updated successfully.');
    }
}
