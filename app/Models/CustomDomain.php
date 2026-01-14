<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomDomain extends Model
{
    protected $fillable = [
        'portfolio_id',
        'domain',
        'verified',
        'verification_token',
        'dns_configured',
        'ssl_status',
    ];

    protected $casts = [
        'verified' => 'boolean',
        'dns_configured' => 'boolean',
    ];

    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class);
    }

    public static function generateVerificationToken()
    {
        return 'portfolio-verify-' . bin2hex(random_bytes(16));
    }
}
