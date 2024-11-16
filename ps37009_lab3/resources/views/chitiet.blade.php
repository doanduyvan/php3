

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
</style>

@extends('layout')

@section('tieude', 'Danh mục')

@section('noidung')

    <h1>{{ $tieude }}</h1>

    <p>{{ $noidung }}</p>


@endsection