<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $table = 'news';
    
    protected $fillable = [
        'title',
        'img',
        'shortdes',
        'des',
        'onoff',
        'count',
        'idadmin',
        'idcategory',
        'countview',
    ];

    protected $guarded = [];
 
    public $timestamps = true;

    public function getImgAttribute($value)
    {
        if ($value) {
            return asset('storage/uploads/' . $value);
        }
        return null; // Nếu không có ảnh
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'idcategory', 'id');
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'idadmin', 'id');
    }

    public function reviewlogs()
    {
        return $this->hasMany(Reviewlogs::class, 'idnews', 'id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tags::class, 'tags_news', 'idnews', 'idtags');
    }

}
