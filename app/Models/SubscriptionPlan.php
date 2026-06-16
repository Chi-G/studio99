<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubscriptionPlan extends Model
{
    protected $fillable = [
        'name',
        'paystack_plan_code',
        'price',
        'interval',
        'features',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
        ];
    }
}
