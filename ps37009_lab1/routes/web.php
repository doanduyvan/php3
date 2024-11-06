<?php

use App\Http\Controllers\SinhvienController;
use App\Http\Controllers\TinController;
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

Route::get('/bai1', function () {
    return view('welcome');
});

Route::get('/index',[TinController::class, 'index']);

Route::get('/lien-he',[TinController::class, 'lienhe']);

Route::get('/ct/{id}',[TinController::class, 'lay1tin']);

Route::get('/sinh-vien', [SinhvienController::class, 'showall']);

Route::get('/sinh-vien/{id}',[SinhvienController::class, 'chitiet']);