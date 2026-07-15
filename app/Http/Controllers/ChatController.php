<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Project;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index(Project $project)
    {
        // Check authorization (client or assigned staff or admin)
        $user = auth()->user();
        if ($user->role === 'client' && $project->client_id !== $user->id) {
            abort(403);
        }
        if ($user->role === 'team' && $project->assigned_to !== $user->id) {
            abort(403);
        }

        $messages = $project->messages()->with('user')->oldest()->get();

        return response()->json($messages);
    }

    public function store(Request $request, Project $project)
    {
        // Check authorization
        $user = auth()->user();
        if ($user->role === 'client' && $project->client_id !== $user->id) {
            abort(403);
        }
        if ($user->role === 'team' && $project->assigned_to !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'content' => 'required|string|max:2000',
        ]);

        $message = $project->messages()->create([
            'user_id' => $user->id,
            'content' => $validated['content'],
        ]);

        broadcast(new MessageSent($message));

        return response()->json($message->load('user'));
    }
}
