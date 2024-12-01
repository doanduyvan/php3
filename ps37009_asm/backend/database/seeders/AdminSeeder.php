<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admin')->insert([
            [
                'fullname' => 'admin',
                'pass' => Hash::make('123'),
                'role' => 3,
                'email' => 'admin@gmail.com',
                'avatar' => 'https://placehold.co/600x400'
            ],
            [
                'fullname' => 'kiemduyet 1',
                'pass' => Hash::make('123'),
                'role' => 2,
                'email' => 'k1@gmail.com',
                'avatar' => 'https://placehold.co/600x400'
            ],
            [
                'fullname' => 'phong vien 1',
                'pass' => Hash::make('123'),
                'role' => 1,
                'email' => 'p1@gmail.com',
                'avatar' => 'https://placehold.co/600x400'
            ],
            [
                'fullname' => 'phong vien 2',
                'pass' => Hash::make('123'),
                'role' => 1,
                'email' => 'p2@gmail.com',
                'avatar' => 'https://placehold.co/600x400'
            ]
        ]);

        DB::table('category')->insert(
            [
                [
                    'title' => 'Thể thao'
                ],
                [
                    'title' => 'Giải trí'
                ],
                [
                    'title' => 'Kinh doanh'
                ],
                [
                    'title' => 'Công nghệ'
                ]
            ]
        );

        $news = [];

        for ($i = 1; $i <= 20; $i++) {
            $news[] = [
                'title' => 'Bài viết số ' . $i,
                'img' => 'https://placehold.co/600x400', // Đường dẫn ảnh giả
                'shortdes' => 'Mô tả ngắn cho bài viết số ' . $i,
                'des' => 'Nội dung chi tiết của bài viết số ' . $i,
                'onoff' => 0, // Trạng thái bài viết (0 hoặc 1)
                'count' => 0, // Số lượt xem ngẫu nhiên
                'idadmin' => rand(3, 4), // Giả sử bạn có 4 admin
                'idcategory' => rand(1, 4), // Giả sử bạn có 4 danh mục
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('news')->insert($news);

    }
}
