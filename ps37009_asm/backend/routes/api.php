<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\TagsController;
use App\Http\Controllers\Customer\HomeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


// Route::get('/category', 'App\Http\Controllers\CategoryController@index');
// Route::post('/category', 'App\Http\Controllers\CategoryController@store');


Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::post('/logout', [AdminAuthController::class, 'logout']);
});

// Routes cho admin

// Route::group(['middleware' => 'auth:admin', 'prefix' => 'admin'], function ($router) {
//     Route::group(['prefix' => 'category'], function ($router) {
//         Route::get('/', [CategoryController::class, 'index']);
//         Route::post('/', [CategoryController::class, 'store']);
//         Route::put('/{id}', [CategoryController::class, 'update']);
//         Route::delete('/{id}', [CategoryController::class, 'destroy']);
//     });

//     Route::group(['prefix' => 'news'], function ($router) {
//         Route::get('/', [NewsController::class, 'index']);
//         Route::post('/', [NewsController::class, 'store']);
//         Route::put('/{id}', [NewsController::class, 'update']);
//         Route::delete('/{id}', [NewsController::class, 'destroy']);
//     });
// });


Route::prefix('admin/category')->group(function () {
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




// dành cho người dùng 

Route::get('/home', [HomeController::class, 'index']);



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