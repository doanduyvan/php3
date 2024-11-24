<?php

namespace App\Http\Controllers;

use App\Models\LoaiTin;
use App\Models\tin;
use Illuminate\Http\Request;

class TinController extends Controller
{
    public function index()
    {
        // $tintuc = tin::all();
        $tintuc = tin::with('loaitin')->get();
        return view('tin.danhsach', compact('tintuc'));
    }

    public function showFormAdd()
    {
        $loaitins = LoaiTin::all();
        return view('tin.themtin', compact('loaitins'));
    }

    public function add(Request $request)
    {

        $tieuDe = $request->input('tieude');
        $tomTat = $request->input('tomtat');
        $noiDung = $request->input('noidung');
        $loaiTin = $request->input('idlt');
        $tags = $request->input('tags',null);
        $noibat = $request->input('noibat', 0);
        $hinh = null;
        if($request->hasFile('hinh')){
            $file = $request->file('hinh');
            $path = $file->store('public/img');
            $hinh = explode('public/img/', $path)[1];
        }

        $data = [
            'tieude' => $tieuDe,
            'tomtat' => $tomTat,
            'noidung' => $noiDung,
            'idlt' => $loaiTin,
            'tags' => $tags,
            'hinh' => $hinh,
            'noibat' => $noibat
        ];
        
        tin::create($data);

        return redirect()->route('danhsachtin');
    }


    public function showFormEdit($id)
    {
        $tin = tin::find($id);
        $loaitins = LoaiTin::all();
        return view('tin.suatin', compact('tin', 'loaitins'));
    }

    public function edit($id){
        $tin = tin::find($id);
        if($tin == null){
            return redirect()->route('danhsachtin');
        }
        $data = [
            'tieude' => request()->input('tieude'),
            'tomtat' => request()->input('tomtat'),
            'noidung' => request()->input('noidung'),
            'idlt' => request()->input('idlt'),
            'tags' => request()->input('tags'),
            'noibat' => request()->input('noibat', 0)
        ];

        if(request()->hasFile('hinh')){
            $file = request()->file('hinh');
            $path = $file->store('public/img');
            $data['hinh'] = explode('public/img/', $path)[1];
            if($tin->hinh != null && file_exists(storage_path('app/public/img/'.$tin->hinh))){
                unlink(storage_path('app/public/img/'.$tin->hinh));
            }
        }
        

        $tin->update($data);

        return redirect()->route('danhsachtin');
    }

    public function delete($id){
        $tin = tin::find($id);
        if($tin != null){
            if($tin->hinh != null && file_exists(storage_path('app/public/img/'.$tin->hinh))){
                unlink(storage_path('app/public/img/'.$tin->hinh));
            }
            $tin->delete();
        }
        return redirect()->route('danhsachtin');
    }

}
