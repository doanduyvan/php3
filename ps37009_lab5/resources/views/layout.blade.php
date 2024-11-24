<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- Header -->
    <header class="bg-primary text-white py-3 shadow-sm">
        <div class="container d-flex justify-content-between align-items-center">
            <h1 class="h3 mb-0">Quản lý Loại Tin</h1>
            <nav>
                <a href="/" class="btn btn-outline-light btn-sm me-2">Trang Chủ</a>
                <a href="{{ route('danhsachloaitin') }}" class="btn btn-outline-light btn-sm">Danh mục</a>
                <a href="{{ route('danhsachtin') }}" class="btn btn-outline-light btn-sm">Tin Tức</a>


            </nav>
        </div>
    </header>

    <!-- Content -->
    @yield('content')

    <!-- Thêm Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>


</body>
</html>
