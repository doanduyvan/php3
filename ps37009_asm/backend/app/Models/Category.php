<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\News;

class Category extends Model
{

    protected $table = 'category';

    /**
     * @var array<int, string>
     */

    protected $fillable = [
        'title',
    ];

    protected $guarded = [];

    public $timestamps = false;

    public function news()
    {
        return $this->hasMany(News::class, 'idcategory', 'id');
    }
}
