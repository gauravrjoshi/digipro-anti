<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/images/sw-logo.png">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @inertiaHead

    <!-- Primary Meta Tags -->
    <meta name="description"
        content="Build Your Professional Portfolio in Minutes. Create a stunning portfolio website without coding. Showcase your projects, skills, and experience with our powerful SaaS platform.">
    <meta name="keywords"
        content="portfolio builder, professional portfolio, developer portfolio, resume builder, saas">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url('/') }}">
    <meta property="og:title" content="Build Your Professional Portfolio in Minutes">
    <meta property="og:description"
        content="Create a stunning portfolio website without coding. Showcase your projects, skills, and experience with our powerful SaaS platform.">
    <meta property="og:image" content="{{ url('/images/sw-logo.png') }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ url('/') }}">
    <meta property="twitter:title" content="Build Your Professional Portfolio in Minutes">
    <meta property="twitter:description"
        content="Create a stunning portfolio website without coding. Showcase your projects, skills, and experience with our powerful SaaS platform.">
    <meta property="twitter:image" content="{{ url('/images/sw-logo.png') }}">
</head>

<body class="font-sans antialiased bg-[#0f172a] text-white">
    @inertia
</body>

</html>