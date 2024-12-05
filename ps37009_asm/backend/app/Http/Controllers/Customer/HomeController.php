<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\News;

class HomeController extends Controller
{
    public function index()
    {
        $news1 = News::select('id', 'title', 'img', 'created_at', 'idcategory')
        ->where('onoff', 1)
        ->orderBy('created_at', 'DESC')
        ->limit(12)
        ->get();

    $danhmuc = Category::select('id', 'title')
        ->with(['news' => function ($query) {
            $query->select('id', 'title', 'img' ,'idcategory', 'created_at')
                ->where('onoff', 1)->orderBy('created_at', 'DESC')->limit(9);
        }])
        ->get();

    return response()->json([
        'news1' => $news1,
        'danhmuc' => $danhmuc,
    ]);
    }
}
