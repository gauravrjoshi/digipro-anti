<?php

namespace App\Listeners;

use Laravel\Cashier\Events\WebhookReceived;
use Illuminate\Support\Facades\Mail;
use App\Mail\SubscriptionStarted;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class StripeEventListener
{
    /**
     * Handle the event.
     */
    public function handle(WebhookReceived $event): void
    {
        if ($event->payload['type'] === 'customer.subscription.created') {
            $this->handleSubscriptionCreated($event->payload['data']['object']);
        }
    }

    /**
     * Handle subscription created event.
     */
    protected function handleSubscriptionCreated($subscription)
    {
        Log::info('Stripe Subscription Created Webhook Received', ['subscription' => $subscription['id']]);

        try {
            $stripeCustomerId = $subscription['customer'];
            $user = User::where('stripe_id', $stripeCustomerId)->first();

            if ($user) {
                Mail::to($user->email)->send(new SubscriptionStarted($user));
                Log::info('Subscription email sent to user', ['user_id' => $user->id]);
            } else {
                Log::warning('User not found for Stripe Customer', ['customer_id' => $stripeCustomerId]);
            }
        } catch (\Exception $e) {
            Log::error('Error processing subscription webhook', ['error' => $e->getMessage()]);
        }
    }
}
