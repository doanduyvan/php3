
@extends('layout')

@section('content')

<style>

    .title{
        max-width: calc(100% - 50px);
        margin: 0 auto;
        margin-top: 15px;
    }
    table{
        margin-top: 15px;
        width: 100%;
        border-collapse: collapse;
        max-width: calc(100% - 50px);
        margin: 0 auto;
    }
    table, th, td{
        border: 1px solid black;
    }
    th, td{
        padding: 10px;
        text-align: left;
    }
    th{
        background-color: #f2f2f2;
    }
    tr:nth-child(even){
        background-color: #f2f2f2;
    }
    tr:hover{
        background-color: #ddd;
    }
</style>

    <h1 class="title">Danh sách sinh viên</h1>

    <table class="">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên sinh viên</th>
            </tr>
        </thead>
        <tbody>
            @foreach($sinhviens as $sinhvien)
                <tr>
                    <td>{{ $sinhvien['id'] }}</td>
                    <td><a href="/sinh-vien/{{$sinhvien['id']}}">{{ $sinhvien['name'] }}</a></td>
                </tr>
            @endforeach

    </table>

@endsection