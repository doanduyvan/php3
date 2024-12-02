<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuanTriTinController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    function index()
    {
        return "<h1>Danh Sách Tin</h1>";
    }
}
