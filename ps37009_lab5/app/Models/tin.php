<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tin extends Model
{
    use HasFactory;

    protected $table = 'tin';
    protected $primaryKey = 'id';
    protected $fillable = ['tieude', 'tomtat', 'noidung', 'xem', 'anhien', 'tags', 'hinh', 'noibat', 'idlt'];
    public $timestamps = true;
    protected $guarded = [];

    public function loaitin()
    {
        return $this->belongsTo(LoaiTin::class, 'idlt', 'id');
    }

    
}
