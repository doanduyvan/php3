<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SuaTableDienThoai extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dienthoai', function (Blueprint $table) {
            // Thêm cột 'baiViet' kiểu TEXT (nullable)
            $table->text('baiViet')->nullable();
    
            // Thêm cột 'ghiChu' kiểu STRING với độ dài 500 (nullable)
            $table->string('ghiChu', 500)->nullable();
    
            // Thêm cột 'idLoai' kiểu UNSIGNED BIGINT
            $table->unsignedBigInteger('idLoai');
    
            // Thiết lập khóa ngoại cho 'idLoai' tham chiếu tới 'id' của bảng 'loaisp'
            $table->foreign('idLoai')->references('id')->on('loaisp');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dienthoai', function (Blueprint $table) {
            //
        });
    }
}
