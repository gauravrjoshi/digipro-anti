<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use App\Models\PortfolioView;
use App\Models\PortfolioClick;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    public function trackView(Request $request, $slug)
    {
        $portfolio = Portfolio::where('slug', $slug)->firstOrFail();
        
        PortfolioView::create([
            'portfolio_id' => $portfolio->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'referrer' => $request->header('referer'),
            'viewed_at' => now(),
        ]);

        return response()->json(['tracked' => true]);
    }

    public function trackClick(Request $request)
    {
        $validated = $request->validate([
            'portfolio_id' => 'required|exists:portfolios,id',
            'link_type' => 'required|string',
            'link_url' => 'required|string',
            'link_label' => 'nullable|string',
        ]);

        PortfolioClick::create([
            'portfolio_id' => $validated['portfolio_id'],
            'link_type' => $validated['link_type'],
            'link_url' => $validated['link_url'],
            'link_label' => $validated['link_label'] ?? null,
            'ip_address' => $request->ip(),
            'clicked_at' => now(),
        ]);

        return response()->json(['tracked' => true]);
    }

    public function overview(Request $request)
    {
        $portfolio = $request->user()->portfolio;
        
        if (!$portfolio) {
            return response()->json(['error' => 'No portfolio found'], 404);
        }

        $totalViews = PortfolioView::where('portfolio_id', $portfolio->id)->count();
        $totalClicks = PortfolioClick::where('portfolio_id', $portfolio->id)->count();
        
        // Unique visitors (by IP)
        $uniqueVisitors = PortfolioView::where('portfolio_id', $portfolio->id)
            ->distinct('ip_address')
            ->count('ip_address');

        // Views in last 30 days
        $viewsLast30Days = PortfolioView::where('portfolio_id', $portfolio->id)
            ->where('viewed_at', '>=', now()->subDays(30))
            ->count();

        // Top referrers
        $topReferrers = PortfolioView::where('portfolio_id', $portfolio->id)
            ->whereNotNull('referrer')
            ->selectRaw('referrer, COUNT(*) as count')
            ->groupBy('referrer')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        return response()->json([
            'total_views' => $totalViews,
            'unique_visitors' => $uniqueVisitors,
            'total_clicks' => $totalClicks,
            'views_last_30_days' => $viewsLast30Days,
            'top_referrers' => $topReferrers,
        ]);
    }

    public function viewsOverTime(Request $request)
    {
        $portfolio = $request->user()->portfolio;
        $days = $request->input('days', 30);

        $views = PortfolioView::where('portfolio_id', $portfolio->id)
            ->where('viewed_at', '>=', now()->subDays($days))
            ->selectRaw('DATE(viewed_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json($views);
    }

    public function topClicks(Request $request)
    {
        $portfolio = $request->user()->portfolio;

        $clicks = PortfolioClick::where('portfolio_id', $portfolio->id)
            ->selectRaw('link_type, link_url, link_label, COUNT(*) as count')
            ->groupBy('link_type', 'link_url', 'link_label')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        return response()->json($clicks);
    }
}
