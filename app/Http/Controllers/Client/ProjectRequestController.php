<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ProjectRequest;
use App\Http\Requests\StoreProjectRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectRequestController extends Controller
{
    public function create()
    {
        $services = Service::with('packages')->where('is_active', true)->get();

        return Inertia::render('Client/Requests/Create', [
            'services' => $services
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['client_id'] = auth()->id();
        $data['status'] = 'pending';

        $referenceFiles = [];
        if ($request->hasFile('reference_files')) {
            foreach ($request->file('reference_files') as $file) {
                $path = $file->store('project-requests', 'public');
                $referenceFiles[] = $path;
            }
        }
        $data['reference_files'] = count($referenceFiles) > 0 ? $referenceFiles : null;

        ProjectRequest::create($data);

        return redirect()->route('client.dashboard')->with('success', 'Project request submitted successfully!');
    }
}
