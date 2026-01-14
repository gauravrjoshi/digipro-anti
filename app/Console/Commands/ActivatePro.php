<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class ActivatePro extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:activate-pro {email? : The email of the user to upgrade}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Manually activates a Pro subscription for a user (Local Testing Only)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');

        if ($email) {
            $user = User::where('email', $email)->first();
            if (!$user) {
                $this->error("User with email {$email} not found.");
                return 1;
            }
        } else {
            $user = User::latest()->first();
            if (!$user) {
                $this->error("No users found in the database.");
                return 1;
            }
        }

        if ($user->subscribed('default')) {
            $this->info("User {$user->email} is already subscribed.");
            return 0;
        }

        $user->subscriptions()->create([
            'type' => 'default',
            'stripe_id' => 'sub_mock_' . time(),
            'stripe_status' => 'active',
            'stripe_price' => env('STRIPE_PRICE_ID', 'price_1Sp78iH9awmOznkQPRD6Givj'),
            'quantity' => 1,
        ]);

        $this->info("Successfully activated Pro plan for: {$user->email}");
        return 0;
    }
}
