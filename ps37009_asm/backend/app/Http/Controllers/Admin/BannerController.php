<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banners;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $banners = Banners::orderBy('created_at', 'desc')->get();
        return response()->json($banners);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'img' => 'required|image|mimes:jpeg,png,jpg|max:5012',
            'link' => 'required',
            'status' => 'required',
        ]);

        $dataSave = [
            'link' => $validated['link'],
            'onoff' => (int)$validated['status'],
        ];

        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $filename = $this->handleFileImg($file);
            $dataSave['img'] = $filename;
        }

        $banner = Banners::create($dataSave);
        if(!$banner) {
            return response()->json(['error' => 'Tạo banner thất bại'], 500);
        }
        return response()->json(['message' => 'Tạo banner thành công', 'banner' => $banner], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $validated = $request->validate([
            'link' => 'required',
            'status' => 'required',
        ]);

        if($request->hasFile('img')) {
           $validated = array_merge($validated, $request->validate([
               'img' => 'image|mimes:jpeg,png,jpg|max:5012',
           ]));
        }

        $banner = Banners::findOrfail($id);

        $dataSave = [
            'link' => $validated['link'],
            'onoff' => (int)$validated['status'],
        ];

        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $filename = $this->handleFileImg($file);
            $dataSave['img'] = $filename;
        }

        $check = $banner->update($dataSave);
        if(!$check) {
            return response()->json(['error' => 'Cập nhật banner thất bại'], 500);
        }

        return response()->json(['message' => 'Cập nhật banner thành công', 'banner' => $banner], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $banner = Banners::findOrfail($id);
        if ($banner) {
            $banner->delete();
            return response()->json(['message' => 'Xóa banner thành công'], 200);
        }
        return response()->json(['error' => 'Xóa banner thất bại'], 500);
    }

    private function handleFileImg($file = null, $olds = null)
    {
        $fileName = null;
        if ($file) {
            $originPath = 'public/uploads/banners/'; // Thư mục lưu file
            $filePath = $file->store($originPath); // Lưu file vào thư mục 'storage/app/public/uploads'
            $fileName = basename($filePath); // Lấy tên file
        }

        if ($olds) {
            $oldFilePath = $originPath . $olds; // Đường dẫn file cũ
            if (Storage::exists($oldFilePath)) {
                Storage::delete($oldFilePath); // Xóa file cũ
            }
        }
        return $fileName;
    }
}
