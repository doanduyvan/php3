<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banners extends Model
{
    protected $table = 'banners';
    
    protected $fillable = [
        'img',
        'link',
        'onoff',
    ];

    protected $guarded = [];
 
    public $timestamps = true;    
}
