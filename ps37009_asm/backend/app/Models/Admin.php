<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Facades\Log;

class Admin extends Authenticatable implements JWTSubject
{
    protected $table = 'admin';

    protected $fillable = [
        'fullname',
        'email',
        'pass',
        'role',
        'onoff',
        'avatar',
    ];

    protected $hidden = [
        'pass',
    ];

    protected $guarded = [];

    public $timestamps = false;

    public function setPassAttribute($value)
    {
        $this->attributes['pass'] = bcrypt($value);
    }

    public function getAuthPassword()
    {
        return $this->pass;
    }

    public function news()
    {
        return $this->hasMany(News::class, 'idadmin', 'id');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'username' => $this->fullname,
            'email' => $this->email,
            'role' => $this->role,
            'avatar' => $this->avatar,
        ];
    }

    public static function boot()
    {
        parent::boot();

        static::retrieved(function ($model) {
            Log::info('Admin model retrieved admin.php:', $model->toArray());
        });
    }
}
