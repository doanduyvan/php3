<?php

use App\Http\Controllers\LoaiTinController;
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

Route::get('/', [LoaiTinController::class, 'show']);

Route::prefix('/admin')->group(function () {
    Route::get('/danh-sach-loai-tin', [LoaiTinController::class, 'show'])->name('danhsachloaitin');
    Route::get('/loai-tin/them', [LoaiTinController::class, 'showFormAdd'])->name('themloaitin');
    Route::post('/loai-tin/them', [LoaiTinController::class, 'add'])->name('themloaitin');
    Route::get('/loai-tin/sua/{id}', [LoaiTinController::class, 'showFormEdit'])->name('sualoaitin');
    Route::put('/loai-tin/sua/{id}', [LoaiTinController::class, 'edit'])->name('sualoaitin');
    Route::delete('/loai-tin/xoa/{id}', [LoaiTinController::class, 'delete'])->name('xoaloaitin');

    Route::get('/tin', [TinController::class, 'index'])->name('danhsachtin');
    Route::get('/tin/them', [TinController::class, 'showFormAdd'])->name('themtin');
    Route::post('/tin/them', [TinController::class, 'add'])->name('themtin');
    Route::get('/tin/sua/{id}', [TinController::class, 'showFormEdit'])->name('suatin');
    Route::post('/tin/sua/{id}', [TinController::class, 'edit'])->name('suatin');
    Route::delete('/tin/xoa/{id}', [TinController::class, 'delete'])->name('xoatin');



});

