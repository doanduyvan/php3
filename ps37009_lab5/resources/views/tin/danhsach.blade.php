@extends('layout')

@section('title', 'Quản lý Tin tức')

@section('content')
<div class="container mt-5">
    <h2 class="text-center mb-4">Danh sách Tin tức</h2>

    <!-- Nút thêm tin -->
    <div class="mb-3 text-end">
        <a href="{{ route('themtin') }}" class="btn btn-success">+ Thêm Tin Tức</a>
    </div>

    <!-- Bảng hiển thị danh sách tin -->
    <table class="table table-bordered table-striped">
        <thead class="table-dark text-center">
            <tr>
                <th>ID</th>
                <th>Hinh</th>
                <th>Tiêu Đề</th>
                <th>Tóm Tắt</th>
                <th>Loại Tin</th>
                <th>Hành Động</th>
            </tr>
        </thead>
        <tbody>
            @foreach($tintuc as $tin)
            <tr>
                <td class="text-center">{{ $tin->id }}</td>
                <td><img style="width: 100px; object-fit: cover" src="{{ asset('storage/img/' . $tin->hinh) }}" alt=""></td>
                <td>{{ $tin->tieude }}</td>
                <td>{{ Str::limit($tin->tomtat, 50) }}</td>
                <td>{{ $tin->loaitin->ten ?? 'khong có' }}</td>
                <td class="text-center">
                    <!-- Nút sửa -->
                    <a href="{{ route('suatin', ['id'=>$tin->id]) }}" class="btn btn-primary btn-sm">Sửa</a>
                
                    <!-- Nút xóa -->
                    <form action="{{ route('xoatin', ['id'=>$tin->id]) }}" method="POST" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Bạn có chắc chắn muốn xóa tin này?')">Xóa</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Phân trang (nếu có) -->
    <div class="d-flex justify-content-center mt-3">
        {{-- {{ $tintuc->links() }} --}}
    </div>
</div>
@endsection



