@extends('layout')

@section('title', 'Sửa Tin')

@section('content')
<div class="container mt-5">
    <h2 class="text-center mb-4">Sửa Tin</h2>

    <!-- Form thêm tin mới -->
    <form action="{{ route('suatin',['id' => $tin->id]) }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="mb-3">
            <label for="tieude" class="form-label">Tiêu Đề</label>
            <input type="text" class="form-control" id="tieude" value="{{$tin->tieude}}" name="tieude" placeholder="Nhập tiêu đề" required>
        </div>

        <div class="mb-3">
            <label for="tomtat" class="form-label">Tóm Tắt</label>
            <textarea class="form-control" id="tomtat" name="tomtat" rows="3" placeholder="Nhập tóm tắt bài viết" required>{{$tin->tomtat}}</textarea>
        </div>

        <div class="mb-3">
            <label for="noidung" class="form-label">Nội Dung</label>
            <textarea class="form-control" id="noidung" name="noidung" rows="5" placeholder="Nhập nội dung bài viết" required>{{$tin->noidung}}</textarea>
        </div>

        <div class="mb-3">
            <label for="idlt" class="form-label">Loại Tin</label>
            <select class="form-select" id="idlt" name="idlt" required>
                <option value="" disabled>Chọn loại tin</option>
                @foreach($loaitins as $loaitin)
                <option value="{{ $loaitin->id }}" {{ $tin->idlt == $loaitin->id ? "selected" : "" }}>
                    {{ $loaitin->ten }}
                </option>
            @endforeach

            </select>
        </div>

        <div class="mb-3">
            <label for="tags" class="form-label">Tags</label>
            <input type="text" class="form-control" id="tags" value="{{$tin->tags}}" name="tags" placeholder="Nhập tags, cách nhau bằng dấu phẩy">
        </div>

        <img src="{{ asset('storage/img/' . $tin->hinh) }}" style="width: 100px; object-fit: cover" alt="">
        <div class="mb-3">
            <label for="hinh" class="form-label">Hình Ảnh</label>
            <input type="file" class="form-control" id="hinh" name="hinh" accept="image/*">
        </div>

        <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="noibat" name="noibat" value="1" {{ $tin->noibat == 1 ? "checked" : "" }}>
            <label class="form-check-label" for="noibat">
                Tin Nổi Bật
            </label>
        </div>

        <div class="text-end">
            <button type="submit" class="btn btn-success">Lưu Tin Tức</button>
            <a href="{{ route('danhsachtin') }}" class="btn btn-secondary">Hủy</a>
        </div>
    </form>
</div>
@endsection
