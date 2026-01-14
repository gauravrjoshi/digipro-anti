<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'social_links' => 'array',
        'resume_uploaded_at' => 'datetime',
    ];

    /**
     * Get the full URL for the resume file
     */
    public function getResumeUrlAttribute()
    {
        if ($this->resume_type === 'upload' && $this->resume_file_path) {
            return asset('storage/' . $this->resume_file_path);
        }

        return $this->attributes['resume_url'] ?? null;
    }

    /**
     * Get the full URL for the profile picture
     */
    public function getProfilePictureUrlAttribute()
    {
        if ($this->profile_picture_path) {
            return asset('storage/' . $this->profile_picture_path);
        }

        return null;
    }

    /**
     * Get the resume file name
     */
    public function getResumeFileNameAttribute()
    {
        if ($this->resume_type === 'upload' && $this->resume_file_path) {
            return basename($this->resume_file_path);
        }

        return null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class)->orderBy('sort_order');
    }

    public function skills()
    {
        return $this->hasMany(Skill::class)->orderBy('sort_order');
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class)->orderBy('sort_order');
    }

    public function education()
    {
        return $this->hasMany(Education::class)->orderBy('sort_order');
    }
}
