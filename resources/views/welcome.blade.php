<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SaaS Portfolio</title>
    
    <!-- Load Vite from the dev server (localhost:5173) in development -->
    <script type="module">
        import RefreshRuntime from 'http://localhost:5173/{{ "@" }}react-refresh'
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
    </script>
    <script type="module" src="http://localhost:5173/{{ "@" }}vite/client"></script>
    <script type="module" src="http://localhost:5173/src/main.jsx"></script>
</head>
<body>
    <div id="root"></div>
</body>
</html>
