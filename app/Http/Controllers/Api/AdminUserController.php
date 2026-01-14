<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::with('portfolio')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'is_admin' => $user->is_admin,
                    'registered_at' => $user->created_at->format('M d, Y'),
                    'portfolio_slug' => $user->portfolio ? $user->portfolio->slug : null,
                    'subscription_status' => $user->subscribed('default') ? 'Active' : 'Free',
                ];
            });

        $stats = [
            'total_users' => User::count(),
            'active_subscriptions' => \DB::table('subscriptions')->where('stripe_status', 'active')->count(),
        ];

        return response()->json([
            'users' => $users,
            'total_users' => $stats['total_users'],
            'active_subscriptions' => $stats['active_subscriptions'],
        ]);
    }
}
