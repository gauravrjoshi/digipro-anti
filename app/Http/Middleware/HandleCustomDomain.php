<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\CustomDomain;
use App\Models\Portfolio;

class HandleCustomDomain
{
    public function handle(Request $request, Closure $next)
    {
        $host = $request->getHost();
        
        \Log::info('HandleCustomDomain: Host detected', ['host' => $host]);
        
        // Skip if it's the main domain (digipro.test or localhost)
        $mainDomains = ['digipro.test', 'localhost', '127.0.0.1'];
        
        if (in_array($host, $mainDomains)) {
            \Log::info('HandleCustomDomain: Main domain, skipping');
            return $next($request);
        }

        // Check if this is a custom domain
        $customDomain = CustomDomain::where('domain', $host)
            ->where('verified', true)
            ->first();

        \Log::info('HandleCustomDomain: Custom domain lookup', [
            'found' => $customDomain ? 'yes' : 'no',
            'domain' => $host
        ]);

        // List of paths that MUST only be accessed on the main domain
        $restrictedPaths = [
            'dashboard',
            'admin',
            'login',
            'register',
            'subscription',
            'pricing',
            'logout'
        ];

        $path = $request->path();
        $isRestricted = false;
        foreach ($restrictedPaths as $restricted) {
            if ($path === $restricted || str_starts_with($path, $restricted . '/')) {
                $isRestricted = true;
                break;
            }
        }

        if ($isRestricted) {
            \Log::info('HandleCustomDomain: Restricted path on custom domain, redirecting to main domain', [
                'path' => $path,
                'target' => config('app.url') . '/' . $path
            ]);
            return redirect()->to(config('app.url') . '/' . $path);
        }

        if ($customDomain) {
            // Store the portfolio slug in the request for later use
            $portfolio = $customDomain->portfolio;
            $request->attributes->set('custom_domain_slug', $portfolio->slug);
            $request->attributes->set('is_custom_domain', true);
            
            \Log::info('HandleCustomDomain: Set custom domain attributes', [
                'slug' => $portfolio->slug
            ]);
        }

        return $next($request);
    }
}
