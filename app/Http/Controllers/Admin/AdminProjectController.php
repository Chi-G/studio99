<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Inertia\Inertia;

class AdminProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with(['client', 'assignedStaff'])->latest()->get();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }
}
