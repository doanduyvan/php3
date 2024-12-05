<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Reviewlogs;

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
        $idAdmin = $request->idadmin;
        $limit = $request->query('limit', 10);
        $selectNews = ['id', 'title', 'img', 'created_at', 'onoff', 'idadmin', 'idcategory'];
        $data = News::select($selectNews)->where('idadmin', $idAdmin)->with(['admin:id,fullname', 'category', 'tags'])->paginate($limit);
        return response()->json($data);
    }

    public function getNewsAccepting(Request $request)
    {
        $limit = $request->query('limit', 10);
        $status = $request->query('status', 0);
        $selectNews = ['id', 'title', 'img', 'created_at', 'onoff', 'idadmin', 'idcategory', 'created_at'];
        $data = News::select($selectNews)->where('onoff', $status)->with(['admin:id,fullname', 'category'])->orderBy('created_at','DESC')->paginate($limit);
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
        $idAdmin = $request->idadmin;
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

        $tags = json_decode($request->input('tagsid','[]'), true);

        $dataSave = [
            'title' => $validated['title'],
            'img' => $validated['avatar'],
            'shortdes' => $validated['shortDes'],
            'des' => $validated['content'],
            'onoff' => 0,
            'count' => 0,
            'idadmin' => $idAdmin,
            'idcategory' => $validated['category'],
        ];

        $news = News::create($dataSave);

        if(!$news) {
            return response()->json(['message' => 'Tạo bài viết thất bại'], 500);
        }

        // thêm Tags
        $news->tags()->sync($tags);

        return response()->json(['message' => 'Tạo bài viết thành công'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    $data = News::with(['admin:id,fullname', 'reviewlogs.admin:id,fullname', 'tags'])->find($id);
    if (!$data) {
        return response()->json(['message' => 'News not found'], 404);
    }
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

        $idAdmin = $request->idadmin;
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

        $tags = json_decode($request->input('tagsid','[]'), true);
        $isAccept = $request->input('isAccept', false);
        $isAccept = $isAccept == 1 ? true : false;

        $news = News::findOrFail($id);

        if ($news->idadmin != $idAdmin) {
            return response()->json(['error' => 'Bạn không có quyền chỉnh sửa bài viết này'], 403);
        }

        if ($news->onoff == 1) {
            return response()->json(['error' => 'Bài viết đã được đăng, không thể chỉnh sửa'], 403);
        }

        if ($news->onoff == 3) {
            return response()->json(['error' => 'Bài viết đã bị hủy, không thể chỉnh sửa'], 403);
        }

        $dataSave = [
            'title' => $validated['title'],
            'shortdes' => $validated['shortDes'],
            'des' => $validated['content'],
            'idcategory' => $validated['category'],
        ];

        if($news->onoff == 2 && $isAccept){
            $dataSave['onoff'] = 0;
        }

        $check = $news->update($dataSave);

        if(!$check) {
            return response()->json(['error' => 'Cập nhật bài viết thất bại'], 500);
        }

        $news->tags()->sync($tags);

        if ($request->hasFile('avatar')) {
            $oldAvatar = $news->avatar;
            $file = $request->file('avatar'); 
            $filename = $this->handleFileImg($file, $oldAvatar);
            $news->img = $filename;
            $news->save();
        }
            return response()->json(['message' => 'Cập nhật bài viết thành công'], 200);

    }

    public function updateStatusForCensor(Request $request)
    {
        $id = $request->id;
        $idAdmin = $request->idadmin;
        $validated = $request->validate([
            'status' => 'required|boolean',
        ]);

        $status = $validated['status'];
        $note = $request->input('note', '');

        $news = News::findOrFail($id);

        if($news->onoff != 0 ){
            return response()->json(['error' => 'Bài viết không trong trạng thái chờ duyệt!'], 403);
        }

        if($news->count > 3) {
            return response()->json(['error' => 'Bài viết đã bị hủy!'], 403);
        }

        if($news->count == 3){
            $news->count = $news->count + 1;
            if($status){
                $news->onoff = 1;
            }else{
                $news->onoff = 3;
            }
        }else{
            if($status){
                $news->onoff = 1;
            }else{
                $news->onoff = 2;
            }
        }
        $news->count = $news->count + 1;
        $check = $news->save();
        if(!$check) {
            return response()->json(['error' => 'Cập nhật trạng thái bài viết thất bại'], 500);
        }

        $dataSave = [
            'idadmin' => $idAdmin,
            'idnews' => $id,
            'note' => $note,
            'onoff' => $status ? 1 : 0,
        ];

        $reviewLog = Reviewlogs::create($dataSave);

        if(!$reviewLog) {
            return response()->json(['message' => 'Cập nhật trạng thái bài viết thất bại'], 500);
        }

        return response()->json(['message' => 'Cập nhật trạng thái bài viết thành công', 'reviewlog' => $reviewLog], 200);
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


    public function createTest(){
        $news = News::find(32);
        $news = $news->toArray();
        unset($news['id']);
        unset($news['created_at']);
        unset($news['updated_at']);
        $category = [3,4,6];
        $img = [
            'gHRjIY2CRrFMOCITMUWZTqMYTuhlnibJVHDKbOPw.jpg',
            'eJywxDybW3lNWA3b3pg5vC3ABbVe6ldS3WNTwEB9.jpg',
            'xT5qZ2m7e8Po9YNW4mFgVKbuNQLmMRAnHZZhKOYD.jpg',
            '6MLfOsZHye84sm965ngzvrClvstKAY51UXlzkMI8.jpg',
            '5F4r0lYSMLNKR9BvE2sXEBvbd4BDCooC9myHfDuF.jpg',
            'PRtReeGelAyvt0irNZBAoL3ScDxuvqm6XQv9KqT1.jpg',
            'CMYo5Jtyg76tYpOoFs1LmaexxK8SpRupujduxVai.jpg',
            'UPzSpwU7Mxw49vCyVZi2hrYRZ8B6B93XEAhwLQSM.png',
            'MLuG8VOjOJnFpyjy7YzLNGT5FxCzr16Qd4GEf1E1.jpg'
        ];
        $news['onoff'] = 1;

        for($i = 0; $i < 50; $i++){
            $news['title'] = 'Bài viết số ' . $i . ' ' . $news['title'];
            $news['img'] = $img[array_rand($img)];
            $news['idcategory'] = $category[array_rand($category)];
            News::create($news);
        }


        print_r($news);
    }

}
