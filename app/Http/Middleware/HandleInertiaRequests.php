<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;

class HandleInertiaRequests extends \Inertia\Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? array_merge($request->user()->toArray(), [
                    'portfolio' => $request->user()->portfolio()->with(['projects', 'skills', 'experiences', 'education'])->first(),
                    'is_subscribed' => $request->user()->subscribed('default'),
                ]) : null,
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new \Tighten\Ziggy\Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
