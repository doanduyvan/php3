<?php

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

Route::get('/', [TinController::class, 'index']);
Route::get('/danhmuc', [TinController::class, 'danhmuc']);
Route::get('/danhmuc/{id}', [TinController::class, 'tintrongloai']);
Route::get('/chitiet/{id}', [TinController::class, 'chitiettin']);
