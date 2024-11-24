<?php

namespace App\Http\Controllers;

use App\Models\LoaiTin;
use Illuminate\Http\Request;

class LoaiTinController extends Controller
{
    public function show()
    {
        $list = LoaiTin::all();
        return view('loaitin.danhsachloaitin', compact('list'));
    }

    public function showFormAdd()
    {
        return view('loaitin.themloaitin');
    }

    public function showFormEdit($id)
    {
        $dataEdit = LoaiTin::find($id);
        return view('loaitin.themloaitin', compact('dataEdit'));
    }

    public function add(Request $request)
    {
        $tenloaitin = $request->input('tenLoaiTin');
        LoaiTin::create(['ten' => $tenloaitin]);
        return redirect()->route('danhsachloaitin');
    }

    public function edit(Request $request, $id)
    {
        $tenloaitin = $request->input('tenLoaiTin');
        $loaitin = LoaiTin::find($id);
        if(!$loaitin) {
            return redirect()->route('danhsachloaitin');
        }
        $loaitin->update(['ten' => $tenloaitin]);
        return redirect()->route('danhsachloaitin');
    }

    public function delete($id)
    {
        LoaiTin::destroy($id);
        return redirect()->route('danhsachloaitin');
    }
}
