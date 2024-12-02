<?php

use App\Http\Controllers\EmailController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\HsController;
use App\Http\Controllers\SvController;
use App\Mail\TestMail;
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

Route::get('/fromemail', [EmailController::class, 'index'])->name('formemail');
Route::post('/fromemail', [EmailController::class, 'store'])->name('formemail.store');




Route::get('/hs', [HsController::class, 'hs'])->name('hs');
Route::post('/hs', [HsController::class, 'hs_store'])->name('hs_store');

Route::get('/sv', [SvController::class, 'sv'])->name('sv');
Route::post('/sv', [SvController::class, 'sv_store'])->name('sv_store');






// Route::get('/test-email', function () {
    
//     $subject = 'Test mail php 3';
//     Mail::to('duyvanlee2001@gmail.com') // Thay bằng email người nhận
//             ->send(new TestMail($subject));

//     return 'Email sent successfully!';
// });

// Route::get('/send-email', function () {
//     Mail::to('duyvanlee2001@gmail.com')->send(new TestMail('Test mail', 'Đây là nội dung của email'));
//     return 'Email đã được gửi thành công!';
// });

// Route::get('/email1', function () {
//     try {
//         Mail::raw('This is a test email from Mailgun Sandbox', function ($message) {
//             $message->to('duyanlee2001@gmail.com') // Địa chỉ email đã được thêm vào Authorized Recipients
//                     ->from('emailenv@example.com', 'Your Name Env')
//                     ->subject('Test Email from Mailgun');
//         });
//         return 'Email sent successfully!';
//     } catch (\Exception $e) {
//         return 'Error: ' . $e->getMessage();
//     }
// });