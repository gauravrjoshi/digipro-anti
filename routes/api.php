<?php

use App\Http\Controllers\Api\PortfolioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/portfolio/{slug}', [PortfolioController::class, 'show']);
Route::put('/portfolio/{slug}', [PortfolioController::class, 'update']); // Protected in real app

// Route::apiResource('projects', ...); 
// Route::apiResource('skills', ...);
// Route::apiResource('experiences', ...);
// Route::apiResource('education', ...);

Route::middleware(['auth'])->get('/user', function (Request $request) {
    return $request->user()->load('portfolio');
});

// Public analytics tracking (no auth required)
Route::post('/track/view/{slug}', [\App\Http\Controllers\Api\AnalyticsController::class, 'trackView']);
Route::post('/track/click', [\App\Http\Controllers\Api\AnalyticsController::class, 'trackClick']);

// Domain Resolution (public - for React to detect custom domains)
Route::get('/resolve-domain', [\App\Http\Controllers\Api\DomainResolverController::class, 'resolve']);
