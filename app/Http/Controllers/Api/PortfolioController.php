<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Portfolio;
use Illuminate\Support\Facades\Auth;

class PortfolioController extends Controller
{
    public function update(Request $request)
    {
        $portfolio = Auth::user()->portfolio;
        
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'role_title' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $portfolio->update([
            'full_name' => $validated['full_name'],
            'role_title' => $validated['role_title'],
            'bio' => $validated['bio'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? '',
        ]);
        
        // Update contact JSON if needed, or just individual fields if they exist in schema
        // based on existing migration, phone/email are individual fields.
        
        return back()->with('message', 'Profile updated successfully!');
    }

    public function storeProject(Request $request)
    {
        $portfolio = Auth::user()->portfolio;
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'link' => 'nullable|url',
            'image_url' => 'nullable|string',
        ]);

        $portfolio->projects()->create($validated);
        
        return back()->with('message', 'Project added successfully!');
    }

    public function deleteProject($id)
    {
        $portfolio = Auth::user()->portfolio;
        $project = $portfolio->projects()->findOrFail($id);
        $project->delete();
        
        return back()->with('message', 'Project deleted successfully!');
    }

    public function storeSkill(Request $request)
    {
        $portfolio = Auth::user()->portfolio;
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'proficiency' => 'required|integer|min:0|max:100',
            'category' => 'nullable|string',
        ]);

        $portfolio->skills()->create($validated);
        
        return back()->with('message', 'Skill added successfully!');
    }

    public function deleteSkill($id)
    {
        $portfolio = Auth::user()->portfolio;
        $skill = $portfolio->skills()->findOrFail($id);
        $skill->delete();
        
        return back()->with('message', 'Skill deleted successfully!');
    }

    public function storeExperience(Request $request)
    {
        $portfolio = Auth::user()->portfolio;
        
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|string',
            'end_date' => 'nullable|string',
        ]);

        $portfolio->experiences()->create($validated);
        
        return back()->with('message', 'Experience added successfully!');
    }

    public function deleteExperience($id)
    {
        $portfolio = Auth::user()->portfolio;
        $experience = $portfolio->experiences()->findOrFail($id);
        $experience->delete();
        
        return back()->with('message', 'Experience deleted successfully!');
    }

    public function storeEducation(Request $request)
    {
        $portfolio = Auth::user()->portfolio;
        
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_year' => 'required|string',
            'end_year' => 'nullable|string',
        ]);

        $portfolio->education()->create($validated);
        
        return back()->with('message', 'Education added successfully!');
    }

    public function deleteEducation($id)
    {
        $portfolio = Auth::user()->portfolio;
        $education = $portfolio->education()->findOrFail($id);
        $education->delete();
        
        return back()->with('message', 'Education deleted successfully!');
    }
}
