
@extends('layout')

@section('name', 'Danh sách Loại Tin')
    
@section('content')
<div class="container mt-5">
    <h2 class="text-center mb-4">Danh sách Loại Tin</h2>

    <!-- Nút thêm mới loại tin -->
    <div class="mb-3 text-end">
        <a href="{{ route('themloaitin')}}" class="btn btn-success" onclick="">+ Thêm Loại Tin</a>
    </div>

    <!-- Bảng hiển thị danh sách loại tin -->
    <table class="table table-bordered table-striped">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>Tên Loại Tin</th>
                <th>Tổng Số Tin</th>
                <th>Hành Động</th>
            </tr>
        </thead>
        <tbody id="loaiTinTable">
            <!-- Dữ liệu mẫu -->
            @foreach($list as $lt)
            <tr>
                <td>{{ $lt->id }}</td>
                <td>{{ $lt->ten }}</td>
                <td>0</td>
                <td style="display: flex; gap: 10px">
                    <a href="{{ route('sualoaitin', ['id'=>$lt->id]) }}" class="btn btn-primary btn-sm">Sửa</a>
                    <form action="{{ route('xoaloaitin', ['id'=>$lt->id]) }}" method="POST">
                        @method('DELETE')
                        @csrf
                        <button type="submit" class="btn btn-danger btn-sm" onclick="">Xóa</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

@endsection