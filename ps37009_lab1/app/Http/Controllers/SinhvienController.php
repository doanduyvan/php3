<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SinhvienController extends Controller
{
    public function datademo(){
        return [
            ['id' => 1, 'name' => 'Nguyen Van A', 'email' => 'nguyenvana@gmail.com', 'phone' => '0123456789', 'address' => 'Ha Noi'],
            ['id' => 2, 'name' => 'Tran Thi B', 'email' => 'tranthib@gmail.com', 'phone' => '0987654321', 'address' => 'Hai Phong'],
            ['id' => 3, 'name' => 'Le Van C', 'email' => 'levanc@gmail.com', 'phone' => '0912345678', 'address' => 'Da Nang'],
            ['id' => 4, 'name' => 'Pham Thi D', 'email' => 'phamthid@gmail.com', 'phone' => '0908765432', 'address' => 'Can Tho'],
            ['id' => 5, 'name' => 'Hoang Van E', 'email' => 'hoangvane@gmail.com', 'phone' => '0934567890', 'address' => 'Quang Ninh'],
            ['id' => 6, 'name' => 'Vo Thi F', 'email' => 'vothif@gmail.com', 'phone' => '0976543210', 'address' => 'Hue'],
            ['id' => 7, 'name' => 'Dang Van G', 'email' => 'dangvang@gmail.com', 'phone' => '0981234567', 'address' => 'Binh Dinh'],
            ['id' => 8, 'name' => 'Nguyen Thi H', 'email' => 'nguyenthi@gmail.com', 'phone' => '0945671234', 'address' => 'Nha Trang'],
            ['id' => 9, 'name' => 'Trinh Van I', 'email' => 'trinhvani@gmail.com', 'phone' => '0967894321', 'address' => 'Vung Tau'],
            ['id' => 10, 'name' => 'Phan Thi K', 'email' => 'phanthik@gmail.com', 'phone' => '0923456789', 'address' => 'Lam Dong'],
        ];
    }

    public function showall()
    {
        $sinhviens = $this->datademo();
        // dd($sinhviens);
        return view('sinhvien', compact('sinhviens'));
    }

    public function chitiet($id){
        $sinhviens = $this->datademo();
        $sinhvien = null;
        foreach($sinhviens as $sv){
            if($sv['id'] == $id){
                $sinhvien = $sv;
                break;
            }
        }
        return view('thongtinsinhiven', compact('sinhvien'));
    }
}
