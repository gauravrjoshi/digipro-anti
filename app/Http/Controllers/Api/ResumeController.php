<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ResumeController extends Controller
{
    /**
     * Store or update resume (file upload or URL)
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        // Check if user has active subscription
        if (!$user->subscribed('default')) {
            return response()->json([
                'message' => 'This feature is only available for Pro users. Please upgrade your subscription.',
                'requires_upgrade' => true
            ], 403);
        }

        $portfolio = $user->portfolio;

        if (!$portfolio) {
            return response()->json(['message' => 'Portfolio not found'], 404);
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:upload,url,generated',
            'resume_file' => 'required_if:type,upload|file|mimes:pdf,doc,docx|max:5120', // 5MB max
            'resume_url' => 'required_if:type,url|url|max:500',
            'resume_template' => 'nullable|string|in:modern,classic,minimal',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Delete old resume file if exists
        if ($portfolio->resume_type === 'upload' && $portfolio->resume_file_path) {
            Storage::disk('public')->delete($portfolio->resume_file_path);
        }

        if ($request->type === 'upload') {
            // Handle file upload
            $file = $request->file('resume_file');
            $fileName = 'resume_' . $user->id . '_' . time() . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('resumes', $fileName, 'public');

            $portfolio->update([
                'resume_type' => 'upload',
                'resume_file_path' => $filePath,
                'resume_url' => null,
                'resume_template' => null,
                'resume_uploaded_at' => now(),
            ]);

            return response()->json([
                'message' => 'Resume uploaded successfully',
                'resume' => [
                    'type' => 'upload',
                    'file_name' => $fileName,
                    'download_url' => asset('storage/' . $filePath),
                    'uploaded_at' => $portfolio->resume_uploaded_at,
                ]
            ]);
        } elseif ($request->type === 'url') {
            // Handle URL
            $portfolio->update([
                'resume_type' => 'url',
                'resume_file_path' => null,
                'resume_url' => $request->resume_url,
                'resume_template' => null,
                'resume_uploaded_at' => now(),
            ]);

            return response()->json([
                'message' => 'Resume URL saved successfully',
                'resume' => [
                    'type' => 'url',
                    'url' => $portfolio->resume_url,
                    'uploaded_at' => $portfolio->resume_uploaded_at,
                ]
            ]);
        } else {
            // Handle Generated
            $portfolio->update([
                'resume_type' => 'generated',
                'resume_file_path' => null,
                'resume_url' => null,
                'resume_template' => $request->resume_template ?? 'modern',
                'resume_uploaded_at' => now(),
            ]);

            return response()->json([
                'message' => 'System generated resume selected successfully',
                'resume' => [
                    'type' => 'generated',
                    'template' => $portfolio->resume_template,
                    'uploaded_at' => $portfolio->resume_uploaded_at,
                ]
            ]);
        }
    }

    /**
     * Get current resume information
     */
    public function show(Request $request)
    {
        $user = Auth::user();
        $portfolio = $user->portfolio;

        if (!$portfolio || !$portfolio->resume_type) {
            return response()->json([
                'portfolio_id' => $portfolio?->id,
                'has_resume' => false,
                'is_pro' => $user->subscribed('default')
            ]);
        }

        $resumeData = [
            'portfolio_id' => $portfolio->id,
            'has_resume' => true,
            'is_pro' => $user->subscribed('default'),
            'type' => $portfolio->resume_type,
            'uploaded_at' => $portfolio->resume_uploaded_at,
            'show_on_portfolio' => (bool) $portfolio->show_resume_on_portfolio,
        ];

        if ($portfolio->resume_type === 'upload') {
            $resumeData['file_name'] = basename($portfolio->resume_file_path);
            $resumeData['download_url'] = asset('storage/' . $portfolio->resume_file_path);
        } elseif ($portfolio->resume_type === 'url') {
            $resumeData['url'] = $portfolio->resume_url;
        } else {
            // Generated
            $resumeData['template'] = $portfolio->resume_template;
            // URL to download the generated resume
            $resumeData['download_url'] = route('resume.generate', [
                'portfolio' => $portfolio->id,
                'template' => $portfolio->resume_template
            ]);
        }

        return response()->json($resumeData);
    }

    /**
     * Toggle resume visibility on public portfolio
     */
    public function toggleVisibility(Request $request)
    {
        $user = Auth::user();
        $portfolio = $user->portfolio;

        if (!$portfolio) {
            return response()->json(['message' => 'Portfolio not found'], 404);
        }

        $request->validate([
            'show_on_portfolio' => 'required|boolean'
        ]);

        $portfolio->update([
            'show_resume_on_portfolio' => $request->show_on_portfolio
        ]);

        return response()->json([
            'message' => $request->show_on_portfolio ? 'Resume is now visible' : 'Resume is now hidden',
            'show_on_portfolio' => (bool) $portfolio->show_resume_on_portfolio
        ]);
    }

    /**
     * Download resume file
     */
    public function download(Request $request)
    {
        $user = Auth::user();
        $portfolio = $user->portfolio;

        if (!$portfolio || $portfolio->resume_type !== 'upload' || !$portfolio->resume_file_path) {
            return response()->json(['message' => 'Resume file not found'], 404);
        }

        if (!Storage::disk('public')->exists($portfolio->resume_file_path)) {
            return response()->json(['message' => 'Resume file not found on server'], 404);
        }

        // Clear output buffer to prevent corruption
        if (ob_get_level()) {
            ob_end_clean();
        }

        return Storage::disk('public')->download(
            $portfolio->resume_file_path,
            $portfolio->resume_file_name ?? basename($portfolio->resume_file_path)
        );
    }

    /**
     * Delete resume
     */
    public function destroy(Request $request)
    {
        $user = Auth::user();
        $portfolio = $user->portfolio;

        if (!$portfolio || !$portfolio->resume_type) {
            return response()->json(['message' => 'No resume to delete'], 404);
        }

        // Delete file if it's an upload
        if ($portfolio->resume_type === 'upload' && $portfolio->resume_file_path) {
            Storage::disk('public')->delete($portfolio->resume_file_path);
        }

        $portfolio->update([
            'resume_type' => null,
            'resume_file_path' => null,
            'resume_url' => null,
            'resume_uploaded_at' => null,
        ]);

        return response()->json(['message' => 'Resume deleted successfully']);
    }
}
