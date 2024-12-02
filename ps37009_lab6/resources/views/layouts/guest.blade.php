<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- Scripts -->
        {{-- @vite(['resources/css/app.css', 'resources/js/app.js']) --}}
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <script src="{{ asset('js/app.js') }}" defer></script>

        <style>

            .nav-custom {
                background-color: #cacaca;
                overflow: hidden;
            }

            .nav-custom ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
                overflow: hidden;
                background-color: #dadada;
                padding-left: 20px;
            }

            .nav-custom li {
                float: left;
            }

            .nav-custom li a {
                display: block;
                color: black;
                text-align: center;
                padding: 14px 16px;
                text-decoration: none;
            }

            .nav-custom li a:hover {
                background-color: #e9e9e9;
            }
        </style>

    </head>
    <body>

        <nav class="nav-custom">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="{{ route('dashboard') }}">Dashboard</a></li>
                <li><a href="{{ route('quantri') }}">Quản Trị</a></li>
                <li><a href="{{ route('quantritin') }}">Quản Trị Tin</a></li>
                <li><a href="{{ route('download') }}">DownLoad</a></li>
                <li><a href="{{ route('protected') }}">protected</a></li>
            </ul>
        </nav>

        <div class="font-sans text-gray-900 antialiased">
            {{ $slot }}
        </div>
    </body>
</html>
