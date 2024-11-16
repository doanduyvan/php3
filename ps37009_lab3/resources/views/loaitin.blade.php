

<style>
    ul{
        list-style-type: none;
        padding: 0;
    }

    .ul-danhmuc{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .ul-danhmuc li{
        box-shadow: 0 0 5px #adadad;
        padding: 10px;
        border-radius: 5px;
    }

    .ul-danhmuc li:hover{
        background-color: #eeeeee;
    }

    .ul-danhmuc li a{
        text-decoration: none;
        color: #333;
        font-size: 1.2em;
        display: block;
    }

    .tomtat{
        font-size: 0.8em;
        color: #666;
    }
</style>

@extends('layout')

@section('tieude', 'Danh mục')

@section('noidung')

    <h1>{{ $tenloaitin }}</h1>

        <ul class="ul-danhmuc">
            @foreach ($loaitin as $lt)
                <li><a href="/chitiet/{{$lt->id}}">{{ $lt->tieude }} <p class="tomtat">{{ $lt->tomtat }}</p></a></li>
            @endforeach
        </ul>


@endsection