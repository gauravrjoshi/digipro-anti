<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - {{ $portfolio->user->name }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; }
        .break-inside-avoid { break-inside: avoid; page-break-inside: avoid; }
    </style>
</head>

<body class="bg-white text-gray-700">
    <div class="w-full p-4">
        <!-- Header -->
        <header class="text-center mb-12">
            <h1 class="text-3xl font-light tracking-widest uppercase text-gray-900 mb-2">{{ $portfolio->full_name ?? $portfolio->user->name }}</h1>
            <p class="text-sm tracking-widest text-gray-500 uppercase">{{ $portfolio->role_title ?? 'Professional Portfolio' }}</p>
            
            <div class="mt-4 flex flex-wrap justify-center gap-6 text-xs text-gray-400 uppercase tracking-wider">
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
                <div class="mt-2 flex flex-wrap justify-center gap-6 text-xs text-gray-400 uppercase tracking-wider">
                    @foreach($portfolio->social_links as $platform => $url)
                        @if(is_string($url)) 
                            <a href="{{ $url }}" class="hover:text-gray-600 border-b border-transparent hover:border-gray-300">{{ $platform }}</a>
                        @elseif(is_array($url) && isset($url['url']))
                             <a href="{{ $url['url'] }}" class="hover:text-gray-600 border-b border-transparent hover:border-gray-300">{{ $url['platform'] ?? 'Link' }}</a>
                        @endif
                    @endforeach
                </div>
            @endif
        </header>

        <div class="grid grid-cols-1 gap-10">
            <!-- Bio -->
            @if($portfolio->bio)
            <section>
                <div class="flex items-baseline mb-6 border-b border-gray-100 pb-2">
                    <h2 class="w-32 flex-shrink-0 text-xs font-bold text-gray-400 uppercase tracking-widest">Profile</h2>
                </div>
                <div class="ml-32 text-gray-600 leading-relaxed text-sm">
                    {{ $portfolio->bio }}
                </div>
            </section>
            @endif

            <!-- Experience -->
            @if($portfolio->experiences->count() > 0)
                <section>
                    <div class="flex items-baseline mb-6 border-b border-gray-100 pb-2">
                        <h2 class="w-32 flex-shrink-0 text-xs font-bold text-gray-400 uppercase tracking-widest">Experience
                        </h2>
                    </div>
                    <div class="space-y-8">
                        @foreach($portfolio->experiences as $experience)
                            <div class="flex break-inside-avoid">
                                <div class="w-32 flex-shrink-0 text-xs text-gray-400 pt-1">
                                    {{ $experience->start_date }} <br>
                                    {{ $experience->end_date ?? 'Present' }}
                                </div>
                                <div class="flex-grow">
                                    <h3 class="text-gray-900 font-medium">{{ $experience->role }}</h3>
                                    <div class="text-sm text-gray-500 mb-2">{{ $experience->company }}</div>

                                    @if($experience->description)
                                        <p class="text-sm text-gray-600 leading-relaxed mb-2">{{ $experience->description }}</p>
                                    @endif

                                    @if($experience->details && is_array($experience->details))
                                        <ul class="list-none space-y-1">
                                            @foreach($experience->details as $detail)
                                                <li
                                                    class="text-sm text-gray-600 relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-gray-300">
                                                    {{ $detail }}</li>
                                            @endforeach
                                        </ul>
                                    @endif
                                </div>
                            </div>
                        @endforeach
                    </div>
                </section>
            @endif

            <!-- Education -->
            @if($portfolio->education->count() > 0)
                <section class="break-inside-avoid">
                    <div class="flex items-baseline mb-6 border-b border-gray-100 pb-2">
                        <h2 class="w-32 flex-shrink-0 text-xs font-bold text-gray-400 uppercase tracking-widest">Education
                        </h2>
                    </div>
                    <div class="space-y-6">
                        @foreach($portfolio->education as $edu)
                            <div class="flex">
                                <div class="w-32 flex-shrink-0 text-xs text-gray-400 pt-1">
                                    {{ $edu->start_year }} - {{ $edu->end_year ?? 'Present' }}
                                </div>
                                <div class="flex-grow">
                                    <h3 class="text-gray-900 font-medium">{{ $edu->institution }}</h3>
                                    <div class="text-sm text-gray-500">{{ $edu->degree }}</div>
                                    @if($edu->description)
                                        <p class="text-sm text-gray-400 mt-1">{{ $edu->description }}</p>
                                    @endif
                                </div>
                            </div>
                        @endforeach
                    </div>
                </section>
            @endif

            <!-- Skills -->
            @if($portfolio->skills->count() > 0)
                <section class="break-inside-avoid">
                    <div class="flex items-baseline mb-6 border-b border-gray-100 pb-2">
                        <h2 class="w-32 flex-shrink-0 text-xs font-bold text-gray-400 uppercase tracking-widest">Skills</h2>
                    </div>
                    <div class="flex ml-32 flex-wrap gap-x-6 gap-y-2">
                        @foreach($portfolio->skills as $skill)
                            <span class="text-sm text-gray-600">{{ $skill->name }}</span>
                        @endforeach
                    </div>
                </section>
            @endif

            <!-- Projects -->
            @if($portfolio->projects->count() > 0)
                <section>
                    <div class="flex items-baseline mb-6 border-b border-gray-100 pb-2">
                        <h2 class="w-32 flex-shrink-0 text-xs font-bold text-gray-400 uppercase tracking-widest">Projects
                        </h2>
                    </div>
                    <div class="space-y-6 ml-32">
                        @foreach($portfolio->projects as $project)
                            <div>
                                <div class="flex items-baseline gap-2">
                                    <h3 class="text-gray-900 font-medium">{{ $project->title }}</h3>
                                    @if($project->link)
                                        <a href="{{ $project->link }}"
                                            class="text-[10px] uppercase tracking-wider text-indigo-400 hover:underline">Link</a>
                                    @endif
                                </div>
                                <p class="text-sm text-gray-500 mt-1 leading-relaxed">{{ $project->description }}</p>
                            </div>
                        @endforeach
                    </div>
                </section>
            @endif
        </div>
    </div>
</body>

</html>