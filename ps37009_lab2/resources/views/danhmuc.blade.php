
<style>
    .ul-tinxemnhieu{
        list-style-type: none;
        margin-top: 15px;
    }
    .ul-tinxemnhieu li{
        margin-bottom: 10px;
    }
    .ul-tinxemnhieu li a{
        text-decoration: none;
        color: black;
        display: block;
        box-shadow: 0 0 5px rgb(198, 198, 198);
        border-radius: 5px;
        padding: 10px 20px;
        transition: all 0.2s linear;
    }

    .ul-tinxemnhieu li a:hover{
        background-color: rgb(21, 125, 0);
        color: white;
    }
</style>

@extends('layout')
@section('content')
<h1>Danh mục tin</h1>
<ul class="ul-tinxemnhieu">
    @foreach($arrdanhmuc as $tin)
    <li><a href="/danh-muc/{{$tin->id}}">
    {{$tin->ten}}
    </a></li>
    @endforeach
</ul>
@endsection
