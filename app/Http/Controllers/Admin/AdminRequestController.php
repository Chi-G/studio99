<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Project;
use App\Models\ProjectRequest;
use App\Models\User;
use App\Notifications\ProjectAssigned;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminRequestController extends Controller
{
    /**
     * Display a listing of project requests.
     */
    public function index(): Response
    {
        $requests = ProjectRequest::with(['client', 'service', 'package'])
            ->latest()
            ->get();

        return Inertia::render('Admin/Requests/Index', [
            'requests' => $requests,
        ]);
    }

    /**
     * Show a specific project request.
     */
    public function show(ProjectRequest $projectRequest): Response
    {
        $projectRequest->load(['client', 'service', 'package', 'invoice.payments']);

        // Load staff members for assignment
        $staff = User::where('role', 'team')->get();

        return Inertia::render('Admin/Requests/Show', [
            'projectRequest' => $projectRequest,
            'staff' => $staff,
        ]);
    }

    /**
     * Send a quotation to the client.
     */
    public function sendQuotation(Request $request, ProjectRequest $projectRequest): RedirectResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
        ]);

        $amount = (float) $request->amount;

        // Update the project request status and budget
        $projectRequest->update([
            'budget' => $amount,
            'status' => 'reviewed',
        ]);

        // Generate or update the invoice
        Invoice::updateOrCreate(
            ['project_request_id' => $projectRequest->id],
            [
                'client_id' => $projectRequest->client_id,
                'amount' => $amount,
                'description' => 'Quotation for service: '.$projectRequest->title,
                'status' => 'unpaid',
                'due_date' => now()->addDays(7),
            ]
        );

        return redirect()->back()->with('success', 'Quotation sent to client successfully.');
    }

    /**
     * Convert the project request into an active project.
     */
    public function convertToProject(Request $request, ProjectRequest $projectRequest): RedirectResponse
    {
        $request->validate([
            'assigned_to' => 'required|exists:users,id',
            'deadline' => 'nullable|date|after:today',
        ]);

        // Create the active project
        $project = Project::create([
            'client_id' => $projectRequest->client_id,
            'request_id' => $projectRequest->id,
            'assigned_to' => $request->assigned_to,
            'name' => $projectRequest->title,
            'service_type' => $projectRequest->service->name,
            'status' => 'pending',
            'deadline' => $request->deadline,
        ]);

        // Mark request as assigned
        $projectRequest->update([
            'status' => 'assigned',
        ]);

        // Link the invoice to the project
        if ($projectRequest->invoice) {
            $projectRequest->invoice->update([
                'project_id' => $project->id,
            ]);
        }

        // Notify the assigned team member
        $assignedUser = User::find($request->assigned_to);
        if ($assignedUser) {
            $assignedUser->notify(new ProjectAssigned($project));
        }

        return redirect()->route('admin.dashboard')->with('success', 'Project created and assigned successfully.');
    }
}
