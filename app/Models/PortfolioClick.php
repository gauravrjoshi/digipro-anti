<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioClick extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'portfolio_id',
        'link_type',
        'link_url',
        'link_label',
        'ip_address',
        'clicked_at',
    ];

    protected $casts = [
        'clicked_at' => 'datetime',
    ];

    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class);
    }
}
