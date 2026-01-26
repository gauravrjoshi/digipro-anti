<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - {{ $portfolio->user->name }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        }

        .break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
        }
    </style>
</head>

<body class="bg-white text-gray-800">
    <div class="w-full p-0">
        <!-- Header -->
        <header class="border-b-2 border-gray-100 pb-6 mb-6">
            <h1 class="text-4xl font-bold uppercase tracking-wide text-gray-900">
                {{ $portfolio->full_name ?? $portfolio->user->name }}
            </h1>
            <p class="text-xl text-indigo-600 mt-2 font-medium">{{ $portfolio->role_title ?? 'Professional' }}</p>

            <div class="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                @if($portfolio->email || $portfolio->user->email)
                    <div class="flex items-center gap-1.5">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                            </path>
                        </svg>
                        {{ $portfolio->email ?? $portfolio->user->email }}
                    </div>
                @endif

                @if($portfolio->phone)
                    <div class="flex items-center gap-1.5">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                            </path>
                        </svg>
                        {{ $portfolio->phone }}
                    </div>
                @endif

                @if($portfolio->address)
                    <div class="flex items-center gap-1.5">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                            </path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {{ $portfolio->address }}
                    </div>
                @endif
            </div>

            @if(!empty($portfolio->social_links))
                <div class="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                    @foreach($portfolio->social_links as $platform => $url)
                        <!-- Handle both array formats if needed, assuming simple key-value or array of objects -->
                        @if(is_string($url))
                            <a href="{{ $url }}" class="hover:text-indigo-600 underline capitalize">{{ $platform }}</a>
                        @elseif(is_array($url) && isset($url['url']))
                            <a href="{{ $url['url'] }}" class="hover:text-indigo-600 underline">{{ $url['platform'] ?? 'Link' }}</a>
                        @endif
                    @endforeach
                </div>
            @endif
        </header>

        <!-- Bio / Summary -->
        @if($portfolio->bio)
            <section class="mb-8">
                <h2 class="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 border-l-4 border-indigo-500 pl-3">
                    Profile</h2>
                <p class="text-gray-600 leading-relaxed text-sm text-justify">
                    {{ $portfolio->bio }}
                </p>
            </section>
        @endif

        <!-- Experience -->
        @if($portfolio->experiences->count() > 0)
            <section class="mb-8">
                <h2 class="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-4 border-indigo-500 pl-3">
                    Experience</h2>
                <div class="space-y-6">
                    @foreach($portfolio->experiences as $experience)
                        <div class="relative pl-2 break-inside-avoid">
                            <div class="flex justify-between items-baseline mb-1">
                                <h3 class="text-lg font-bold text-gray-800">{{ $experience->role }}</h3>
                                <span
                                    class="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100 whitespace-nowrap">
                                    {{ $experience->start_date }} — {{ $experience->end_date ?? 'Present' }}
                                </span>
                            </div>
                            <div class="text-indigo-600 font-medium mb-2">{{ $experience->company }}</div>

                            @if($experience->description)
                                <p class="text-gray-600 text-sm leading-relaxed">{{ $experience->description }}</p>
                            @endif

                            @if($experience->details && is_array($experience->details))
                                <ul class="list-disc list-outside ml-4 mt-2 space-y-1">
                                    @foreach($experience->details as $detail)
                                        <li class="text-sm text-gray-600">{{ $detail }}</li>
                                    @endforeach
                                </ul>
                            @endif
                        </div>
                    @endforeach
                </div>
            </section>
        @endif

        <!-- Education -->
        @if($portfolio->education->count() > 0)
            <section class="mb-8 break-inside-avoid">
                <h2 class="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-4 border-indigo-500 pl-3">
                    Education</h2>
                <div class="space-y-4">
                    @foreach($portfolio->education as $edu)
                        <div class="pl-2">
                            <div class="flex justify-between items-baseline mb-1">
                                <h3 class="font-bold text-gray-800">{{ $edu->institution }}</h3>
                                <span class="text-sm text-gray-500 whitespace-nowrap">
                                    {{ $edu->start_year }} — {{ $edu->end_year ?? 'Present' }}
                                </span>
                            </div>
                            <div class="text-gray-700">{{ $edu->degree }}</div>
                            @if($edu->description)
                                <p class="text-sm text-gray-500 mt-1">{{ $edu->description }}</p>
                            @endif
                        </div>
                    @endforeach
                </div>
            </section>
        @endif

        <!-- Skills -->
        @if($portfolio->skills->count() > 0)
            <section class="mb-8 pl-2 break-inside-avoid">
                <h2 class="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-4 border-indigo-500 pl-3">
                    Skills</h2>
                <div class="flex flex-wrap gap-2">
                    @foreach($portfolio->skills as $skill)
                        <div class="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded text-sm font-medium">
                            {{ $skill->name }}
                            @if($skill->proficiency > 0)
                                <span class="ml-1 text-gray-400 text-xs">• {{ $skill->proficiency }}%</span>
                            @endif
                        </div>
                    @endforeach
                </div>
            </section>
        @endif

        <!-- Projects -->
        @if($portfolio->projects->count() > 0)
            <section class="mb-8 pl-2">
                <h2 class="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-4 border-indigo-500 pl-3">
                    Projects</h2>
                <div class="space-y-4">
                    @foreach($portfolio->projects as $project)
                        <div>
                            <div class="flex items-baseline justify-between">
                                <h3 class="font-bold text-gray-800">{{ $project->title }}</h3>
                                @if($project->link)
                                    <a href="{{ $project->link }}"
                                        class="text-xs text-indigo-500 hover:underline">{{ parse_url($project->link, PHP_URL_HOST) }}</a>
                                @endif
                            </div>
                            <p class="text-sm text-gray-600 mt-1 leading-relaxed">{{ $project->description }}</p>
                        </div>
                    @endforeach
                </div>
            </section>
        @endif
    </div>
</body>

</html>