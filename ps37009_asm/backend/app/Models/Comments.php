<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    protected $table = 'comments';
    
    protected $fillable = [
        'content',
        'idnews',
        'idcustomer'
    ];

    protected $guarded = [];
 
    public $timestamps = true;

    public function news()
    {
        return $this->belongsTo(News::class, 'idnews', 'id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'idcustomer', 'id');
    }
}
