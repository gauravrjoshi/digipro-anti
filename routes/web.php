<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Resources\PortfolioResource;
use App\Models\Portfolio;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Root route - Handles both Landing Page and Custom Domain Portfolios
Route::get('/', function (Request $request) {
    if ($request->attributes->get('is_custom_domain')) {
        $slug = $request->attributes->get('custom_domain_slug');
        $portfolio = Portfolio::where('slug', $slug)
            ->with(['projects', 'skills', 'experiences', 'education'])
            ->first();

        if ($portfolio) {
            return Inertia::render('Portfolio', [
                'portfolio' => new PortfolioResource($portfolio)
            ]);
        }
    }

    return Inertia::render('LandingPage');
})->name('home');

// Auth Routes
Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register')->middleware('guest');

Route::get('/pricing', function () {
    return Inertia::render('Pricing');
})->name('pricing');

// Legal & Support Routes
Route::get('/support', function () {
    return Inertia::render('Support');
})->name('support');

Route::get('/terms-of-service', function () {
    return Inertia::render('TermsOfService');
})->name('terms');

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy');

Route::get('/cancellation', function () {
    return Inertia::render('CancellationPolicy');
})->name('cancellation');

// Dashboard (Protected)
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Home');
    })->name('dashboard');

    Route::get('/dashboard/profile', function () {
        return Inertia::render('Dashboard/ProfileEditor');
    })->name('dashboard.profile');

    Route::get('/dashboard/projects', function () {
        return Inertia::render('Dashboard/ProjectsEditor');
    })->name('dashboard.projects');

    Route::get('/dashboard/skills', function () {
        return Inertia::render('Dashboard/SkillsEditor');
    })->name('dashboard.skills');

    Route::get('/dashboard/experience', function () {
        return Inertia::render('Dashboard/ExperienceEditor');
    })->name('dashboard.experience');

    Route::get('/dashboard/education', function () {
        return Inertia::render('Dashboard/EducationEditor');
    })->name('dashboard.education');

    Route::get('/dashboard/analytics', function () {
        return Inertia::render('Dashboard/Analytics');
    })->name('dashboard.analytics');

    Route::get('/dashboard/domains', function () {
        return Inertia::render('Dashboard/DomainSettings');
    })->name('dashboard.domains');

    Route::get('/dashboard/users', function () {
        return Inertia::render('Dashboard/SuperAdminUsers');
    })->name('dashboard.users');

    // Portfolio Actions
    Route::post('/dashboard/profile', [PortfolioController::class, 'update'])->name('dashboard.profile.update');
    Route::post('/dashboard/projects', [PortfolioController::class, 'storeProject'])->name('dashboard.projects.store');
    Route::delete('/dashboard/projects/{id}', [PortfolioController::class, 'deleteProject'])->name('dashboard.projects.destroy');
    Route::post('/dashboard/skills', [PortfolioController::class, 'storeSkill'])->name('dashboard.skills.store');
    Route::delete('/dashboard/skills/{id}', [PortfolioController::class, 'deleteSkill'])->name('dashboard.skills.destroy');
    Route::post('/dashboard/experience', [PortfolioController::class, 'storeExperience'])->name('dashboard.experience.store');
    Route::delete('/dashboard/experience/{id}', [PortfolioController::class, 'deleteExperience'])->name('dashboard.experience.destroy');
    Route::post('/dashboard/education', [PortfolioController::class, 'storeEducation'])->name('dashboard.education.store');
    Route::delete('/dashboard/education/{id}', [PortfolioController::class, 'deleteEducation'])->name('dashboard.education.destroy');

    // Subscription routes
    Route::post('/subscription/checkout', [\App\Http\Controllers\Api\SubscriptionController::class, 'createCheckoutSession'])->name('subscription.checkout');
    Route::get('/subscription/status', [\App\Http\Controllers\Api\SubscriptionController::class, 'status'])->name('subscription.status');
    Route::post('/subscription/portal', [\App\Http\Controllers\Api\SubscriptionController::class, 'billingPortal'])->name('subscription.portal');

    // Analytics routes
    Route::get('/analytics/overview', [\App\Http\Controllers\Api\AnalyticsController::class, 'overview'])->name('analytics.overview');
    Route::get('/analytics/views', [\App\Http\Controllers\Api\AnalyticsController::class, 'viewsOverTime'])->name('analytics.views');
    Route::get('/analytics/clicks', [\App\Http\Controllers\Api\AnalyticsController::class, 'topClicks'])->name('analytics.clicks');

    // Admin Users
    Route::get('/admin/users', [\App\Http\Controllers\Api\AdminUserController::class, 'index'])->name('admin.users');

    // Custom Domain Management
    Route::get('/dashboard/api/domains', [\App\Http\Controllers\Api\CustomDomainController::class, 'index'])->name('domains.index');
    Route::post('/dashboard/api/domains', [\App\Http\Controllers\Api\CustomDomainController::class, 'store'])->name('domains.store');
    Route::post('/dashboard/api/domains/{id}/verify', [\App\Http\Controllers\Api\CustomDomainController::class, 'verify'])->name('domains.verify');
    Route::delete('/dashboard/api/domains/{id}', [\App\Http\Controllers\Api\CustomDomainController::class, 'destroy'])->name('domains.destroy');
});



// Auth Handlers
Route::post('/login', [LoginController::class, 'login'])->name('login.post');
Route::post('/register', [RegisterController::class, 'register'])->name('register.post');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Password Reset Routes
Route::get('/forgot-password', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('/reset-password/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->name('password.update');

// Utility
Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});

// Email Preview Routes (For Testing Only)
if (app()->environment('local')) {
    Route::get('/test/email/welcome', function () {
        $user = \App\Models\User::first() ?? new \App\Models\User([
            'name' => 'John Doe',
            'email' => 'john@example.com'
        ]);
        return new \App\Mail\WelcomeEmail($user);
    });

    Route::get('/test/email/subscription', function () {
        $user = \App\Models\User::first() ?? new \App\Models\User([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com'
        ]);
        return new \App\Mail\SubscriptionStarted($user);
    });

    Route::get('/test/email/send', function () {
        try {
            $user = \App\Models\User::first();
            if (!$user) {
                return 'No user found in database to send email to.';
            }

            \Illuminate\Support\Facades\Mail::to($user->email)->send(new \App\Mail\WelcomeEmail($user));
            return "Email sent to {$user->email}. Check your inbox.";
        } catch (\Exception $e) {
            return "Failed to send email: " . $e->getMessage();
        }
    });
}

// Custom Slug Portfolio Routing (for main domain users)
// improperly placed earlier, moving to end to catch only unhandled requests
Route::get('/{slug}', function (Request $request, $slug) {
    // Exclude common paths that might fall through
    if (in_array($slug, ['login', 'register', 'dashboard', 'api', 'sanctum'])) {
        abort(404);
    }

    $portfolio = Portfolio::where('slug', $slug)
        ->with(['projects', 'skills', 'experiences', 'education'])
        ->first();

    if (!$portfolio) {
        abort(404);
    }

    return Inertia::render('Portfolio', [
        'portfolio' => new PortfolioResource($portfolio)
    ]);
})->name('portfolio.show');