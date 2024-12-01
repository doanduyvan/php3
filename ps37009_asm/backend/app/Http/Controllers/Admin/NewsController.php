<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $selectNews = ['id', 'title', 'img', 'created_at', 'onoff', 'idadmin', 'idcategory'];
        $data = News::select($selectNews)->with(['admin:id,fullname', 'category'])->get();
        return response()->json($data);
    }

    public function getNewsByAuthor(Request $request)
    {
        $idAdmin = 1;
        $limit = $request->query('limit', 10);
        $selectNews = ['id', 'title', 'img', 'created_at', 'onoff', 'idadmin', 'idcategory'];
        $data = News::select($selectNews)->where('idadmin', $idAdmin)->with(['admin:id,fullname', 'category'])->paginate($limit);
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $idAdmin = 1;
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'shortDes' => 'required|string|max:500',
            'content' => 'required|string',
            'category' => 'required|integer',
            'avatar' => 'required|image|mimes:jpeg,jpg,png|max:5120', // File phải là ảnh
        ]);

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar'); // Lấy file từ request
            $fileName = $this->handleFileImg($file); // Xử lý file ảnh
            $validated['avatar'] = $fileName; // Lưu đường dẫn file vào database
        }

        $dataSave = [
            'title' => $validated['title'],
            'img' => $validated['avatar'],
            'shortdes' => $validated['shortDes'],
            'des' => $validated['content'],
            'onoff' => 0,
            'count' => 1,
            'idadmin' => $idAdmin,
            'idcategory' => $validated['category'],
        ];

        $news = News::create($dataSave);

        if ($news) {
            return response()->json(['message' => 'Tạo bài viết thành công'], 201);
        }
        return response()->json(['message' => 'Tạo bài viết thất bại'], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = News::find($id);
        return response()->json($data);
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

        $idAdmin = 1;
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'shortDes' => 'required|string|max:500',
            'content' => 'required|string',
            'category' => 'required|integer',
        ]);

        if ($request->hasFile('avatar')) {
            $validated = array_merge($validated, $request->validate([
                'avatar' => 'image|mimes:jpeg,jpg,png|max:5120',
            ]));
        }

        $news = News::findOrFail($id);

        if ($news->idadmin != $idAdmin) {
            return response()->json(['message' => 'Bạn không có quyền chỉnh sửa bài viết này'], 403);
        }

        if ($news->onoff == 1) {
            return response()->json(['message' => 'Bài viết đã được đăng không thể chỉnh sửa'], 403);
        }

        $dataSave = [
            'title' => $validated['title'],
            'shortdes' => $validated['shortDes'],
            'des' => $validated['content'],
            'idcategory' => $validated['category'],
        ];

        $check = $news->update($dataSave);

        if(!$check) {
            return response()->json(['message' => 'Cập nhật bài viết thất bại'], 500);
        }

        if ($request->hasFile('avatar')) {
            $oldAvatar = $news->avatar;
            $file = $request->file('avatar'); 
            $filename = $this->handleFileImg($file, $oldAvatar);
            $news->img = $filename;
            $news->save();
        }
            return response()->json(['message' => 'Cập nhật bài viết thành công'], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $idAdmin = 1;
        $news = News::findOrFail($id);
        if($news->idadmin != $idAdmin) {
            return response()->json(['message' => 'Bạn không có quyền xóa bài viết này'], 403);
        }
        if($news->onoff == 1) {
            return response()->json(['message' => 'Bài viết đã được đăng không thể xóa'], 403);
        }
        $check = $news->delete();
        if($check) {
            return response()->json(['message' => 'Xóa bài viết thành công'], 200);
        }
        return response()->json(['message' => 'Xóa bài viết thất bại'], 500);
    }


    private function handleFileImg($file, $olds = null){
        // Xử lý file ảnh
        $filePath = $file->store('public/uploads'); // Lưu file vào thư mục 'storage/app/public/uploads'
        $fileName = basename($filePath); // Lấy tên file
        if ($olds && Storage::exists($olds)) {
            Storage::delete($olds);
        }
        return $fileName;
    }


}
