<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectRequest extends Model
{
    protected $fillable = [
        'client_id',
        'service_id',
        'package_id',
        'title',
        'description',
        'deadline',
        'status',
        'budget',
        'reference_files',
        'admin_notes',
    ];

    protected function casts(): array
    {
        return [
            'reference_files' => 'array',
        ];
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function package()
    {
        return $this->belongsTo(Package::class);
    }
}
