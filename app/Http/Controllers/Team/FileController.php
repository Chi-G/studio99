<?php

namespace App\Http\Controllers\Team;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function store(Request $request, Project $project)
    {
        if ($project->assigned_to !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'deliverable' => 'required|file|max:5000',
        ]);

        $path = $request->file('deliverable')->store('deliverables', 'public');

        File::create([
            'project_id' => $project->id,
            'uploader_id' => auth()->id(),
            'file_url' => $path,
            'type' => 'deliverable',
        ]);

        return redirect()->back()->with('success', 'Deliverable uploaded successfully.');
    }
}
