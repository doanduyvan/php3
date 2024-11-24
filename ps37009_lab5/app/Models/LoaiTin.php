<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class LoaiTin extends Model
{
    use HasFactory;
    protected $table = 'loaitin';
    protected $primaryKey = 'id';
    protected $fillable = ['ten'];
    public $timestamps = false;

    // Gán giá trị mặc định cho các cột trong bảng
    // protected $attributes = [
    //     'ten' => 'Chưa cập nhật'
    // ];

    // Quan hệ 1-n với bảng tin
    public function tin()
    {
        return $this->hasMany('App\Models\Tin', 'idlt', 'id');
    }

    protected $guarded = [];

    public function themtin(){

    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function($loaitin){
            Log::info('Creating loaitin: ' . $loaitin->ten);
        });

        static::deleting(function($loaitin){
            if($loaitin->tin->count() > 0){
                Log::warning('Không thể xóa loaitin: ' . $loaitin->ten . ' vì có tin liên quan');
                // $loaitin->tin()->delete();
                return false;
            }
            Log::info('Deleting loaitin: ' . $loaitin->ten);
        });
    }

}
