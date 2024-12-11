<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\TagsController;
use App\Http\Controllers\Customer\HomeController;
use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\HomeControllerAdmin;
use App\Http\Controllers\Customer\BannerController as BannerControllerCustomer;
use App\Http\Controllers\Customer\CcategoryController;
use App\Http\Controllers\Customer\CnewsController;
use App\Http\Controllers\Customer\CustomerAuthController;


Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::post('/logout', [AdminAuthController::class, 'logout']);
});

Route::get('admin/home',[HomeControllerAdmin::class, 'index'])->middleware('auth.admin');

Route::prefix('admin/category')->middleware('auth.admin')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
});

Route::prefix('admin/news')->middleware('auth.admin')->group(function () {
    Route::get('/', [NewsController::class, 'getNewsByAuthor']);
    Route::get('/getnewsaccepting', [NewsController::class, 'getNewsAccepting']);
    Route::post('/updatestatusforcensor', [NewsController::class, 'updateStatusForCensor'])->middleware('auth.admin:2');
    Route::get('/{id}', [NewsController::class, 'show']);

    Route::post('/', [NewsController::class, 'store'])->middleware('auth.admin:1');
    Route::post('/{id}', [NewsController::class, 'update']);
    Route::delete('/{id}', [NewsController::class, 'destroy']);
});

Route::prefix('admin/tags')->group(function () {
    Route::get('/', [TagsController::class, 'getTags']);
    Route::get('/getalltags', [TagsController::class, 'getAllTags']);
    Route::post('/', [TagsController::class, 'store']);
    Route::put('/{id}', [TagsController::class, 'update']);
    Route::delete('/{id}', [TagsController::class, 'destroy']);
});


Route::prefix('admin/banners')->middleware('auth.admin:3')->group(function () {
    Route::get('/', [BannerController::class, 'index']);
    Route::get('/{id}', [BannerController::class, 'show']);
    Route::post('/', [BannerController::class, 'store']);
    Route::post('/{id}', [BannerController::class, 'update']);
    Route::delete('/{id}', [BannerController::class, 'destroy']);
});

Route::prefix('admin/accounts')->middleware('auth.admin:3')->group(function () {
    Route::get('/', [AccountController::class, 'index']);
    Route::get('/{id}', [AccountController::class, 'show']);
    Route::post('/', [AccountController::class, 'store']);
    Route::put('/{id}', [AccountController::class, 'update']);
    Route::delete('/{id}', [AccountController::class, 'destroy']);
});


// dành cho người dùng 

Route::get('/nav', [CcategoryController::class, 'index']);
Route::get('/home', [HomeController::class, 'index']);
Route::get('/banners', [BannerControllerCustomer::class, 'index']);
Route::get('/danhmuc/gettennew', [CnewsController::class, 'getTenNewNews']);
Route::get('/danhmuc/{id}', [CnewsController::class, 'getNewsByCategory']);
Route::get('/chitiet/{id}', [CnewsController::class, 'getDetail']);
Route::get('/comments/{id}', [CnewsController::class, 'getCommetsByNews']);
Route::post('/comments/{id}', [CnewsController::class, 'setComment'])->middleware('auth.customer');

Route::post('/signin', [CustomerAuthController::class, 'login']);
Route::post('/signup', [CustomerAuthController::class, 'signup']);






Route::get('/tt', [NewsController::class, 'createTest']);



Route::get('test', function () {
    return response()->json(['message' => 'Test middleware chuoi trong test']);
})->middleware('auth.admin:1');

Route::middleware('auth:admin')->get('admin/test', function () {
    return response()->json(['message' => 'Hello Admin']);
});

// Route::middleware('auth:admin')->prefix('admin')->group(function () {
//         Route::get('me', [AdminAuthController::class, 'me']);
//         Route::get('test', function () {
//             return response()->json(['message' => 'Hello Admin']);
//         });
// });