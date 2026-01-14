<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProfilePictureController extends Controller
{
    /**
     * Store or update profile picture
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $portfolio = $user->portfolio;

        if (!$portfolio) {
            return response()->json(['message' => 'Portfolio not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // 2MB max
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Delete old profile picture if exists
        if ($portfolio->profile_picture_path) {
            Storage::disk('public')->delete($portfolio->profile_picture_path);
        }

        // Handle file upload
        $file = $request->file('profile_picture');
        $fileName = 'profile_' . $user->id . '_' . time() . '.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('profile_pictures', $fileName, 'public');

        $portfolio->update([
            'profile_picture_path' => $filePath,
        ]);

        return response()->json([
            'message' => 'Profile picture uploaded successfully',
            'profile_picture' => [
                'url' => asset('storage/' . $filePath),
            ]
        ]);
    }

    /**
     * Toggle profile picture visibility
     */
    public function toggleVisibility(Request $request)
    {
        $user = Auth::user();
        $portfolio = $user->portfolio;

        if (!$portfolio) {
            return response()->json(['message' => 'Portfolio not found'], 404);
        }

        $request->validate([
            'show_profile_picture' => 'required|boolean'
        ]);

        $portfolio->update([
            'show_profile_picture' => $request->show_profile_picture
        ]);

        return response()->json([
            'message' => $request->show_profile_picture ? 'Profile picture is now visible' : 'Profile picture is now hidden',
            'show_profile_picture' => (bool) $portfolio->show_profile_picture
        ]);
    }

    /**
     * Delete profile picture
     */
    public function destroy()
    {
        $user = Auth::user();
        $portfolio = $user->portfolio;

        if (!$portfolio || !$portfolio->profile_picture_path) {
            return response()->json(['message' => 'No profile picture to delete'], 404);
        }

        Storage::disk('public')->delete($portfolio->profile_picture_path);

        $portfolio->update([
            'profile_picture_path' => null,
            'show_profile_picture' => false,
        ]);

        return response()->json(['message' => 'Profile picture deleted successfully']);
    }
}
