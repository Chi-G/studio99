<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'is_active',
    ];

    public function packages()
    {
        return $this->hasMany(Package::class);
    }

    public function projectRequests()
    {
        return $this->hasMany(ProjectRequest::class);
    }
}
