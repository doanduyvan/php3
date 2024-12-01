<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    protected $table = 'tags';
    
    protected $fillable = [
        'title'
    ];

    protected $guarded = [];
 
    public $timestamps = false;

    public function news()
    {
        return $this->belongsToMany(News::class, 'tags_news', 'idtags', 'idnews');
    }
}
