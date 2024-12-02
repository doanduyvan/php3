<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Customer extends Authenticatable implements JWTSubject
{
    protected $table = 'customer';
    
    protected $fillable = [
        'fullname',
        'email',
        'pass',
        'avatar'
    ];

    protected $guarded = [];
 
    public $timestamps = false;

    protected $hidden = [
        'pass',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['pass'] = bcrypt($value);
    }

    public function comments()
    {
        return $this->hasMany(Comments::class, 'idcustomer', 'id');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}