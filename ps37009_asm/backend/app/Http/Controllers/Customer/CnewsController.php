<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Comments;
use App\Models\News;
use Illuminate\Support\Facades\Schema;

class CnewsController extends Controller
{
    public function getNewsByCategory(Request $request, $id)
    {
        $limit = $request->input('limit', 10);
        $columns = Schema::getColumnListing('news');
        $columns = array_diff($columns, ['des']);
        $news = Category::findOrfail($id)->news()->select($columns)->where('onoff', 1)->orderBy('created_at', 'desc')->paginate($limit);
        $title = Category::findOrfail($id)->title;
        return response()->json(['news' => $news, 'title' => $title]);
    }

    public function getTenNewNews()
    {
        $columns = Schema::getColumnListing('news');
        $columns = array_diff($columns, ['des']);
        $news = News::select($columns)->where('onoff', 1)->orderBy('created_at', 'desc')->limit(15)->get();
        return response()->json($news);
    }

    public function getDetail($id)
    {
        $news = News::with(['admin:id,fullname'])->findOrFail($id);
        if ($news->onoff == 0) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $news->countview = $news->countview + 1;
        $news->save();
        $columns = Schema::getColumnListing('news');
        $columns = array_diff($columns, ['des']);
        $relatedNews = News::whereHas('tags', function ($query) use ($news) {
            $query->whereIn('idtags', $news->tags->pluck('id'));
        })
            ->select($columns)
            ->where('id', '!=', $news->id)
            ->where('onoff', 1)
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
        
        $comments = $this->getCommetsByNews(new Request(), $id, true);
        $dataRes = [
            'chitiet' => $news,
            'lienquan' => $relatedNews,
            'comments' => $comments
        ];
        return response()->json($dataRes);
    }

    function getCommetsByNews(Request $request,$id, $firstQuery = false)
    {
        $limit = $request->input('limit', 5);
        $comments = Comments::with(['customer:id,fullname,avatar'])->where('idnews', $id)->orderBy('created_at', 'desc')->paginate($limit);
        if ($firstQuery) {
            return $comments;
        }
        return response()->json($comments);
    }

    public function setComment(Request $request, $id)
    {
        $request->validate([
            'comment' => 'required'
        ]);

        $idCustomer = $request->idcustomer;

        $dataSave = [
            'idnews' => $id,
            'idcustomer' => $idCustomer,
            'content' => $request->comment
        ];
        $comment = Comments::create($dataSave);
        if(!$comment){
            return response()->json(['error' => 'Bình luận thất bại!'], 400);
        }
        return response()->json($comment);
    }

}
