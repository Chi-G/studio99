<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\ProjectRequest;
use App\Models\User;
use App\Notifications\ProjectRequestReceived;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ProjectRequestService
{
    /**
     * Submit a project request.
     *
     * @param  array<string, mixed>  $data
     * @return array{project_request: ProjectRequest, client: User, temp_password: ?string}
     *
     * @throws ValidationException
     */
    public function submitRequest(array $data, ?User $user = null): array
    {
        $tempPassword = null;
        $client = $user;

        // Auto-register guest if not authenticated
        if (! $client) {
            // Check if email already exists
            $existingUser = User::where('email', $data['email'])->first();
            if ($existingUser) {
                throw ValidationException::withMessages([
                    'email' => ['An account with this email already exists. Please log in first.'],
                ]);
            }

            $tempPassword = Str::random(10);
            $client = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'role' => 'client',
                'password' => Hash::make($tempPassword),
            ]);

            event(new Registered($client));
        }

        // Handle file uploads
        $storedFiles = [];
        if (isset($data['reference_files']) && is_array($data['reference_files'])) {
            foreach ($data['reference_files'] as $file) {
                if ($file instanceof UploadedFile) {
                    $path = $file->store('project-requests', 'public');
                    $storedFiles[] = $path;
                }
            }
        }

        // Create the project request
        $projectRequest = ProjectRequest::create([
            'client_id' => $client->id,
            'service_id' => $data['service_id'],
            'package_id' => $data['package_id'] ?? null,
            'title' => $data['title'],
            'description' => $data['description'],
            'deadline' => $data['deadline'] ?? null,
            'company_name' => $data['company_name'] ?? null,
            'website' => $data['website'] ?? null,
            'preferred_contact' => $data['preferred_contact'] ?? null,
            'business_goals' => $data['business_goals'] ?? null,
            'existing_branding' => (bool) ($data['existing_branding'] ?? false),
            'reference_links' => $data['reference_links'] ?? null,
            'timeline' => $data['timeline'] ?? null,
            'budget_range' => $data['budget_range'] ?? null,
            'hear_about_us' => $data['hear_about_us'] ?? null,
            'additional_info' => $data['additional_info'] ?? null,
            'reference_files' => count($storedFiles) > 0 ? $storedFiles : null,
            'status' => 'pending',
        ]);

        // Send acknowledgement notification
        $client->notify(new ProjectRequestReceived($projectRequest, $tempPassword));

        return [
            'project_request' => $projectRequest,
            'client' => $client,
            'temp_password' => $tempPassword,
        ];
    }
}
