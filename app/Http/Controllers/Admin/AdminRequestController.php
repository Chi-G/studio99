<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProjectRequest;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminRequestController extends Controller
{
    public function index()
    {
        $requests = ProjectRequest::with(['client', 'service', 'package'])->latest()->get();
        return Inertia::render('Admin/Requests/Index', [
            'requests' => $requests,
        ]);
    }

    public function show(ProjectRequest $projectRequest)
    {
        $projectRequest->load(['client', 'service', 'package', 'invoice.payments']);
        
        // Load staff members for assignment
        $staff = User::where('role', 'team')->get();

        return Inertia::render('Admin/Requests/Show', [
            'projectRequest' => $projectRequest,
            'staff' => $staff,
        ]);
    }

    public function convertToProject(Request $request, ProjectRequest $projectRequest)
    {
        // Only convert requests that have been paid (or if manual override is fine, just check)
        // We'll trust the admin.

        $request->validate([
            'assigned_to' => 'required|exists:users,id',
            'deadline' => 'nullable|date|after:today',
        ]);

        // Create the active project
        $project = Project::create([
            'client_id' => $projectRequest->client_id,
            'request_id' => $projectRequest->id,
            'assigned_to' => $request->assigned_to,
            'name' => $projectRequest->service->name . ' for ' . $projectRequest->client->name,
            'service_type' => $projectRequest->service->name,
            'status' => 'pending', // Initial status for the team to pick up
            'deadline' => $request->deadline,
        ]);

        // Mark request as assigned
        $projectRequest->update([
            'status' => 'assigned'
        ]);

        return redirect()->route('admin.dashboard')->with('success', 'Project created and assigned successfully.');
    }
}
