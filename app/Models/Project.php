<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['client_id', 'assigned_staff_id', 'name', 'service_type', 'status', 'deadline'])]
class Project extends Model
{
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function assignedStaff()
    {
        return $this->belongsTo(User::class, 'assigned_staff_id');
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }
}
