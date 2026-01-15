<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioResource extends JsonResource
{
    /**
     * Disable the 'data' wrapper for this resource.
     *
     * @var string|null
     */
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'slug' => $this->slug,
            'full_name' => $this->full_name,
            'role_title' => $this->role_title,
            'bio' => $this->bio,
            'contact' => [
                'address' => $this->address,
                'phone' => $this->phone,
                'email' => $this->email,
                'social_links' => $this->social_links,
            ],
            'theme_color' => $this->theme_color,
            'projects' => $this->projects,
            'skills' => $this->skills->groupBy('category'),
            'experiences' => $this->experiences,
            'education' => $this->education,
            'profile_picture' => [
                'url' => $this->profile_picture_url,
                'show_on_portfolio' => (bool) $this->show_profile_picture,
            ],
            'resume' => [
                'has_resume' => (bool) $this->resume_type,
                'show_on_portfolio' => (bool) $this->show_resume_on_portfolio,
                'url' => (bool) $this->show_resume_on_portfolio ? $this->resume_url : null,
                'file_name' => (bool) $this->show_resume_on_portfolio ? $this->resume_file_name : null,
            ],
        ];
    }
}
