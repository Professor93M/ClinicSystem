<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctors extends Model
{
    use HasFactory;

    protected $fillable = [
        'fullname',
        'field',
        'mobile',
        'users_id',
    ];
    
    public function paients(){
        return $this->hasMany('App\Models\Patients');
    }

    public function users(){
        return $this->belongsTo('App\Models\Users');
    }
}
