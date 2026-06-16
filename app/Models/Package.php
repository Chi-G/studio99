<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $fillable = [
        'service_id',
        'name',
        'price',
        'billing_type',
        'features',
        'is_popular',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
        ];
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
