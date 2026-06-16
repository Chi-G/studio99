<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'client_id',
        'project_id',
        'subscription_id',
        'amount',
        'description',
        'status',
        'due_date',
        'paid_at',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'date',
            'paid_at' => 'datetime',
        ];
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
