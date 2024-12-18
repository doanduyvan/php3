<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuanTriTinController;

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
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('download', function () {
    return view('download');
})->middleware('auth')->name('download');

Route::get('quantritin', [QuanTriTinController::class, 'index'])->name('quantritin');

Route::get('quantri', function () {
    return view('quantri');
})->middleware('quantri')->name('quantri');

Route::get('protected', function () {
    return 'Bạn đã truy cập thành công!';
})->middleware('auth.basic')->name('protected');

require __DIR__.'/auth.php';


