<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - {{ $portfolio->user->name }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: Georgia, Cambria, "Times New Roman", Times, serif;
        }

        h1,
        h2,
        h3 {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        .break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
        }
    </style>
</head>

<body class="bg-white text-gray-900">
    <div class="w-full p-4">
        <!-- Header -->
        <header class="border-b-4 border-gray-900 pb-6 mb-8 text-center">
            <h1 class="text-4xl font-bold text-gray-900 uppercase tracking-wide">
                {{ $portfolio->full_name ?? $portfolio->user->name }}
            </h1>
            <p class="text-lg text-gray-700 mt-1">{{ $portfolio->role_title }}</p>

            <div class="text-gray-600 mt-3 text-sm flex flex-wrap justify-center gap-4">
                @if($portfolio->email || $portfolio->user->email)
                    <span>{{ $portfolio->email ?? $portfolio->user->email }}</span>
                @endif
                @if($portfolio->phone)
                    <span>{{ $portfolio->phone }}</span>
                @endif
                @if($portfolio->address)
                    <span>{{ $portfolio->address }}</span>
                @endif
            </div>

            @if(!empty($portfolio->social_links))
                <div class="text-gray-600 mt-2 text-sm flex flex-wrap justify-center gap-4">
                    @foreach($portfolio->social_links as $platform => $url)
                        @if(is_string($url))
                            <a href="{{ $url }}" class="text-blue-800 hover:underline capitalize">{{ $platform }}</a>
                        @elseif(is_array($url) && isset($url['url']))
                            <a href="{{ $url['url'] }}" class="text-blue-800 hover:underline">{{ $url['platform'] ?? 'Link' }}</a>
                        @endif
                    @endforeach
                </div>
            @endif
        </header>

        <!-- Bio / Summary -->
        @if($portfolio->bio)
            <section class="mb-8 p-4 bg-gray-50 border-t border-b border-gray-200">
                <h2 class="text-center text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Professional Summary
                </h2>
                <p class="text-gray-700 leading-relaxed text-sm text-center max-w-2xl mx-auto italic">
                    {{ $portfolio->bio }}
                </p>
            </section>
        @endif

        <!-- Experience -->
        @if($portfolio->experiences->count() > 0)
            <section class="mb-8">
                <h2 class="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 mb-4 pb-1">Professional
                    Experience</h2>
                <div class="space-y-6">
                    @foreach($portfolio->experiences as $experience)
                        <div class="break-inside-avoid">
                            <div class="flex justify-between items-baseline">
                                <h3 class="font-bold text-lg">{{ $experience->company }}</h3>
                                <span class="text-sm text-gray-600 italic">
                                    {{ $experience->start_date }} – {{ $experience->end_date ?? 'Present' }}
                                </span>
                            </div>
                            <div class="text-md font-semibold text-gray-700 italic mb-2">{{ $experience->role }}</div>
                            <!-- Location could go here -->

                            @if($experience->description)
                                <p class="text-sm mb-2">{{ $experience->description }}</p>
                            @endif

                            @if($experience->details && is_array($experience->details))
                                <ul class="list-disc list-outside ml-5 space-y-1">
                                    @foreach($experience->details as $detail)
                                        <li class="text-sm leading-relaxed">{{ $detail }}</li>
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
                <h2 class="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 mb-4 pb-1">Education</h2>
                <div class="space-y-4">
                    @foreach($portfolio->education as $edu)
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="font-bold">{{ $edu->institution }}</h3>
                                <div class="text-gray-700 italic">{{ $edu->degree }}</div>
                                @if($edu->description)
                                    <p class="text-sm text-gray-600 mt-1">{{ $edu->description }}</p>
                                @endif
                            </div>
                            <div class="text-sm text-gray-600 italic whitespace-nowrap">
                                {{ $edu->start_year }} – {{ $edu->end_year ?? 'Present' }}
                            </div>
                        </div>
                    @endforeach
                </div>
            </section>
        @endif

        <!-- Projects -->
        @if($portfolio->projects->count() > 0)
            <section class="mb-8">
                <h2 class="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 mb-4 pb-1">Projects</h2>
                <div class="space-y-4">
                    @foreach($portfolio->projects as $project)
                        <div>
                            <div class="flex items-baseline gap-2">
                                <h3 class="font-bold">{{ $project->title }}</h3>
                            </div>
                            <p class="text-sm leading-relaxed mt-1">{{ $project->description }}</p>
                            @if($project->link)
                                <a href="{{ $project->link }}"
                                    class="text-xs text-blue-800 underline block mt-1">{{ $project->link }}</a>
                            @endif
                        </div>
                    @endforeach
                </div>
            </section>
        @endif

        <!-- Skills -->
        @if($portfolio->skills->count() > 0)
            <section class="break-inside-avoid">
                <h2 class="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 mb-4 pb-1">Technical Skills
                </h2>
                <div class="text-sm leading-relaxed">
                    <span class="font-bold">Core Competencies:</span>
                    {{ $portfolio->skills->pluck('name')->join(', ') }}
                </div>
            </section>
        @endif
    </div>
</body>

</html>