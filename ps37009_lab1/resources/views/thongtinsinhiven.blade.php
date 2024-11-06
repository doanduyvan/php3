
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

    <h1 class="title">Chi tiết sinh viên</h1>

    <table class="">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên sinh viên</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
            </tr>
        </thead>
        <tbody>
            @if($sinhvien !== null)
            <tr>
                <td>{{ $sinhvien['id'] }}</td>
                <td>{{ $sinhvien['name'] }}</td>
                <td>{{ $sinhvien['email'] }}</td>
                <td>{{ $sinhvien['phone'] }}</td>
                <td>{{ $sinhvien['address'] }}</td>
            </tr>
            @else
            <tr>
                <td colspan="5">Không tìm thấy sinh viên</td>
            </tr>
            @endif
    </table>

@endsection