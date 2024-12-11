<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AccountAdmin extends Seeder
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
                'fullname' => 'root',
                'pass' => Hash::make('123zzz'),
                'role' => 3,
                'email' => 'root@gmail.com',
                'avatar' => 'https://placehold.co/600x400'
            ]
        ]);
    }
}
