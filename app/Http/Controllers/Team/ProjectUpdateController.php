<?php

namespace App\Http\Controllers\Team;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectUpdate;
use Illuminate\Http\Request;

class ProjectUpdateController extends Controller
{
    public function store(Request $request, Project $project)
    {
        if ($project->assigned_to !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'content' => 'required|string|max:1000'
        ]);

        ProjectUpdate::create([
            'project_id' => $project->id,
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);

        return redirect()->back()->with('success', 'Project update posted successfully.');
    }
}
