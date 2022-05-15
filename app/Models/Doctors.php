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
    
    public function paient(){
        return $this->belongsTo('App\Models\Patients');
    }

    public function user(){
        return $this->belongsTo('App\Models\Users');
    }
}
