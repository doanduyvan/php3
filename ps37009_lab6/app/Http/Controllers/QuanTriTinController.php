<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use function Ramsey\Uuid\v1;

class QuanTriTinController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    function index()
    {
        return view('quantritin');
    }
}
