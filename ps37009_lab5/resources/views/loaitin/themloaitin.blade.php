

@extends('layout')

@section('name', 'Thêm Loại Tin')
    
@section('content')

<div class="container mt-5">
    <h2 class="text-center mb-4">{{ isset($dataEdit) && $dataEdit ? "Sửa Tin" : "Thêm Loại Tin Mới" }}</h2>

    <!-- Form thêm loại tin -->
    <form id="addLoaiTinForm" action="{{ isset($dataEdit) && $dataEdit ? route('sualoaitin',['id'=> $dataEdit->id])  : route('themloaitin') }}" method="POST">
        @csrf
        @if(isset($dataEdit) && $dataEdit)
            @method('PUT')
        @endif
        <div class="mb-3">
            <label for="tenLoaiTin" class="form-label">Tên Loại Tin</label>
            <input type="text" class="form-control" id="tenLoaiTin" name="tenLoaiTin" value="{{ $dataEdit->ten ?? '' }}" placeholder="Nhập tên loại tin" required>
        </div>
        
        <!-- Nút Lưu -->
        <div class="text-right">
            <button type="submit" class="btn btn-success">Lưu</button>
            <a href="{{ route('danhsachloaitin') }}" class="btn btn-secondary">Hủy</a>
        </div>
    </form>
</div>

@endsection