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
        $plan = $request->input('plan', 'monthly');

        // If already subscribed, return error
        if ($user->subscribed('default')) {
            return response()->json(['message' => 'Already subscribed'], 400);
        }

        $priceId = $plan === 'yearly'
            ? env('STRIPE_PRICE_YEARLY', 'pro_yearly_inr_999')
            : env('STRIPE_PRICE_MONTHLY', 'pro_monthly_inr_99');

        $checkout = $user->newSubscription('default', $priceId)
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
