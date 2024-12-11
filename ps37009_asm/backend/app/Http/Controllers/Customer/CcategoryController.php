<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CcategoryController extends Controller
{
    public function index(){
        $nav = Category::all();
        return response()->json($nav);
    }

}
