<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['user_id', 'amount', 'payment_method', 'proof_url', 'status'])]
class Payment extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
