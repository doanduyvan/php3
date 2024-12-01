<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reviewlogs extends Model
{
    protected $table = 'reviewlogs';
    
    protected $fillable = [
        'idadmin',
        'idnews',
        'note'
    ];

    protected $guarded = [];
 
    public $timestamps = true;

    public function news()
    {
        return $this->belongsTo(News::class, 'idnews', 'id');
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'idadmin', 'id');
    }
}
