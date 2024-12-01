<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
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

Route::get('/from-email', 'MailController@sendEmail');


Route::get('/test-email', function () {
    
    $details = [
        'title' => 'test mail php 3',
        'body' => 'xem thử mail được gửi chưa.'
    ];

    Mail::raw($details['body'], function ($message) use ($details) {
        $mailto = 'duyvanlee2001@gmail.com';
        $message->to($mailto) // Thay bằng email người nhận
                ->subject($details['title']);
    });

    return 'Email sent successfully!';
});