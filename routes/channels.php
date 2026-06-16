<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('project.{projectId}', function ($user, $projectId) {
    $project = \App\Models\Project::find($projectId);
    if (!$project) return false;

    // Admin can join any project
    if ($user->role === 'admin') return true;
    
    // Team can join if assigned
    if ($user->role === 'team' && $project->assigned_to === $user->id) return true;
    
    // Client can join if they own the project
    if ($user->role === 'client' && $project->client_id === $user->id) return true;

    return false;
});
