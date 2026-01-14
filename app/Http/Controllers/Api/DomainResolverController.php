<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CustomDomain;
use Illuminate\Http\Request;

class DomainResolverController extends Controller
{
    public function resolve(Request $request)
    {
        $host = $request->getHost();
        
        // Check if this is a custom domain
        $customDomain = CustomDomain::where('domain', $host)
            ->where('verified', true)
            ->with('portfolio')
            ->first();

        if ($customDomain) {
            return response()->json([
                'is_custom_domain' => true,
                'slug' => $customDomain->portfolio->slug,
                'domain' => $host
            ]);
        }

        return response()->json([
            'is_custom_domain' => false,
            'domain' => $host
        ]);
    }
}
