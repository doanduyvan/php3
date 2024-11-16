
<style>
    .noidung{
        font-size: 20px;
        margin-top: 30px;
    }
</style>

@extends('layout')
@section('content')

<h1>{{$tin->tieude}}</h1>

<p class="noidung">{{$tin->noidung}}</p>

@endsection