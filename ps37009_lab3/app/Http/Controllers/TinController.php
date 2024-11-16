<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TinController extends Controller
{
    //
    function index(){
        return view('home');
    }

    function danhmuc(){
        $danhmuc = DB::table('loaitin')->get();
        return view('danhmuc', compact('danhmuc'));
    }

    function tintrongloai($id){
        $loaitin = DB::table('loaitin')->join('tin', 'loaitin.id', '=', 'tin.idlt')->where('loaitin.id', $id)->orderBy('tin.id','desc')->get();
        $tenloaitin = $loaitin[0]->ten;
        return view('loaitin', compact('tenloaitin','loaitin'));
    }

    function chitiettin($id){
        $chitiettin = DB::table('tin')->where('id', $id)->first();
        $tieude = $chitiettin->tieude;
        $noidung = $chitiettin->noidung;
        return view('chitiet', compact('tieude','noidung'));
    }
}
