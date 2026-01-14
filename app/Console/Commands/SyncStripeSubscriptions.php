<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Laravel\Cashier\Cashier;
use Stripe\Stripe;
use Stripe\Customer;

class SyncStripeSubscriptions extends Command
{
    protected $signature = 'stripe:sync-subscriptions {--user-id= : Sync for specific user ID}';
    protected $description = 'Manually sync subscriptions from Stripe to local database';

    public function handle()
    {
        Stripe::setApiKey(config('cashier.secret'));

        $userId = $this->option('user-id');
        
        if ($userId) {
            $users = User::where('id', $userId)->get();
        } else {
            $users = User::whereNotNull('stripe_id')->get();
        }

        if ($users->isEmpty()) {
            $this->info('No users with Stripe IDs found.');
            return 0;
        }

        $this->info("Syncing subscriptions for {$users->count()} user(s)...");

        foreach ($users as $user) {
            if (!$user->stripe_id) {
                $this->warn("User {$user->id} ({$user->email}) has no Stripe ID. Skipping.");
                continue;
            }

            try {
                // Fetch customer from Stripe with subscriptions expanded
                $customer = Customer::retrieve([
                    'id' => $user->stripe_id,
                    'expand' => ['subscriptions']
                ]);
                
                $this->info("Processing user: {$user->email} (Stripe: {$user->stripe_id})");

                // Get subscriptions from Stripe
                $stripeSubscriptions = $customer->subscriptions->data ?? [];

                if (empty($stripeSubscriptions)) {
                    $this->warn("  No subscriptions found in Stripe for this user.");
                    continue;
                }

                foreach ($stripeSubscriptions as $stripeSubscription) {
                    // Check if subscription already exists locally
                    $localSubscription = $user->subscriptions()
                        ->where('stripe_id', $stripeSubscription->id)
                        ->first();

                    if ($localSubscription) {
                        $this->info("  Subscription {$stripeSubscription->id} already exists locally. Updating...");
                        
                        $localSubscription->update([
                            'stripe_status' => $stripeSubscription->status,
                            'quantity' => $stripeSubscription->items->data[0]->quantity ?? 1,
                            'ends_at' => $stripeSubscription->cancel_at 
                                ? \Carbon\Carbon::createFromTimestamp($stripeSubscription->cancel_at)
                                : null,
                        ]);
                    } else {
                        $this->info("  Creating new subscription: {$stripeSubscription->id}");
                        
                        $user->subscriptions()->create([
                            'type' => 'default',
                            'stripe_id' => $stripeSubscription->id,
                            'stripe_status' => $stripeSubscription->status,
                            'stripe_price' => $stripeSubscription->items->data[0]->price->id ?? null,
                            'quantity' => $stripeSubscription->items->data[0]->quantity ?? 1,
                            'trial_ends_at' => $stripeSubscription->trial_end 
                                ? \Carbon\Carbon::createFromTimestamp($stripeSubscription->trial_end)
                                : null,
                            'ends_at' => $stripeSubscription->cancel_at 
                                ? \Carbon\Carbon::createFromTimestamp($stripeSubscription->cancel_at)
                                : null,
                        ]);

                        // Create subscription items
                        foreach ($stripeSubscription->items->data as $item) {
                            $user->subscriptions()
                                ->where('stripe_id', $stripeSubscription->id)
                                ->first()
                                ->items()
                                ->create([
                                    'stripe_id' => $item->id,
                                    'stripe_product' => $item->price->product,
                                    'stripe_price' => $item->price->id,
                                    'quantity' => $item->quantity ?? 1,
                                ]);
                        }
                    }

                    $this->info("  ✓ Subscription {$stripeSubscription->id} synced (Status: {$stripeSubscription->status})");
                }

            } catch (\Exception $e) {
                $this->error("Error syncing user {$user->id}: " . $e->getMessage());
            }
        }

        $this->info("\n✓ Sync completed!");
        return 0;
    }
}
