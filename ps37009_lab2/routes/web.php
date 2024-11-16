<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('layout');
});


Route::get('/tin-xem-nhieu', function (){
    $limit = 5;
    $arrtin = DB::table('tin')->select()->orderBy('xem', 'desc')->limit($limit)->get();
    return view('tinxemnhieu', compact('arrtin'));
});

Route::get('/tin-moi', function (){
    $title = 'Tin mới';
    $limit = 5;
    $arrtin = DB::table('tin')->select()->orderBy('ngaydang', 'desc')->take($limit)->get();
    return view('tinmoi', compact('arrtin', 'title'));
});

Route::get('/danh-muc',function(){
    $arrdanhmuc = DB::table('loaitin')->select()->get();
    return view('danhmuc', compact('arrdanhmuc'));
});

Route::get('/danh-muc/{id}',function($id){
    $arrtin = DB::table('loaitin')->join('tin', 'loaitin.id', '=', 'tin.idlt')->where('loaitin.id', $id)->get();
    $title = $arrtin[0]->ten;
    // dd($arrtin);
    return view('tinmoi', compact('arrtin', 'title'));
});

Route::get('/tin/{id}',function ($id){
    $tin = DB::table('tin')->where('id', $id)->first();
    // dd($tin);
    return view('chitiet', compact('tin'));
});