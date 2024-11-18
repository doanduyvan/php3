<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChenDienThoai extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 300; $i++) {
            DB::table('dienthoai')->insert([
                [
                    'tenDT' => 'SamSung XA ' . $i,
                    'gia' => mt_rand(700000, 1000000),
                    'updated_at' => now(),
                    'idLoai' => 1,
                ],
                [
                    'tenDT' => 'Iphone xs Max ' . $i,
                    'gia' => mt_rand(500000, 800000),
                    'updated_at' => now(),
                    'idLoai' => 3,
                ],
                [
                    'tenDT' => 'LG Pro ' . $i,
                    'gia' => mt_rand(250000, 500000),
                    'updated_at' => now(),
                    'idLoai' => 4,
                ],
            ]);
        }
    }
}
