<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioView extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'portfolio_id',
        'ip_address',
        'user_agent',
        'referrer',
        'country',
        'city',
        'viewed_at',
    ];

    protected $casts = [
        'viewed_at' => 'datetime',
    ];

    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class);
    }
}
