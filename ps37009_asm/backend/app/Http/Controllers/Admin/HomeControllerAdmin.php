<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\News;
use App\Models\Customer;
use Carbon\Carbon;

class HomeControllerAdmin extends Controller
{
    public function index()
    {
        $totalPosts = News::count();
        $pendingPosts = News::where('onoff', 0)->count();
        $totalUsers = Customer::count();
        // $postByMonth = News::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
        //     ->groupBy('month')
        //     ->orderBy('month')
        //     ->get()
        //     ->map(function ($item) {
        //         return [
        //             'month' => $item->month,
        //             'total' => $item->total
        //         ];
        //     });

        // Lấy bài viết theo tháng
        $postByMonth = News::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->whereYear('created_at', Carbon::now()->year) // Lọc theo năm hiện tại
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->keyBy('month'); // Chuyển thành collection với key là 'month'

        // Tạo danh sách tháng từ 1 đến 12, và điền giá trị mặc định nếu tháng không có dữ liệu
        $dataByMonth = collect(range(1, 12))->map(function ($month) use ($postByMonth) {
            return [
                'month' => $month,
                'total' => $postByMonth->has($month) ? $postByMonth->get($month)->total : 0,
            ];
        });

        return response()->json([
            'totalPosts' => $totalPosts,
            'pendingPosts' => $pendingPosts,
            'totalUsers' => $totalUsers,
            'postByMonth' => $dataByMonth,
        ]);
    }
}
