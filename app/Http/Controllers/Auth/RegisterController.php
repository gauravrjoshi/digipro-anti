<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeEmail;
use Log;

class RegisterController extends Controller
{
    public function register(Request $request)
    {

        $message = '';

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $message = 'Registering user ' . $validated['email'] . "\n";

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $message .= 'User created ' . $user->id . "\n";


        // Create a portfolio for the new user
        $slug = $this->generateUniqueSlug($validated['name']);

        Portfolio::create([
            'user_id' => $user->id,
            'slug' => $slug,
            'full_name' => $validated['name'],
            'role_title' => 'Professional',
            'bio' => 'Welcome to my portfolio!',
            'email' => $validated['email'],
            'phone' => '',
            'social_links' => [],
        ]);

        $message .= 'Portfolio created ' . $slug . "\n";


        // Log the user in
        auth()->login($user);

        $message .= 'User logged in ' . $user->id . "\n";
        Log::channel('slack')->info($message);

        // Send Welcome Email
        try {
            Mail::to($user->email)->send(new WelcomeEmail($user));
        } catch (\Exception $e) {
            Log::channel('slack')->error('Failed to send welcome email', ['error' => $e->getMessage()]);
        }

        return redirect('/pricing');
    }

    private function generateUniqueSlug($name)
    {
        $slug = \Illuminate\Support\Str::slug($name);
        $originalSlug = $slug;
        $counter = 1;

        while (Portfolio::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}
