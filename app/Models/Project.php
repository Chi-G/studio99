<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'client_id',
        'request_id',
        'assigned_to',
        'name',
        'service_type',
        'status',
        'deadline',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'deadline' => 'date',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function request()
    {
        return $this->belongsTo(ProjectRequest::class, 'request_id');
    }

    public function assignedStaff()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function updates()
    {
        return $this->hasMany(ProjectUpdate::class);
    }
}
