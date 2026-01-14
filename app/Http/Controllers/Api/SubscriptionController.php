<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;


class SubscriptionController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        $user = $request->user();
        
        // If already subscribed, return error
        if ($user->subscribed('default')) {
            return response()->json(['message' => 'Already subscribed'], 400);
        }

        $checkout = $user->newSubscription('default', env('STRIPE_PRICE_ID'))
            ->checkout([
                'success_url' => url('/dashboard?success=true'),
                'cancel_url' => url('/pricing?canceled=true'),
            ]);

        return Inertia::location($checkout->url);
    }

    public function status(Request $request)
    {
        $user = $request->user();
        
        return response()->json([
            'subscribed' => $user->subscribed('default'),
            'on_trial' => $user->onTrial('default'),
        ]);
    }

    public function billingPortal(Request $request)
    {
        return response()->json([
            'url' => $request->user()->billingPortalUrl(
                env('FRONTEND_URL', 'http://localhost:5173') . '/dashboard'
            ),
        ]);
    }
}
