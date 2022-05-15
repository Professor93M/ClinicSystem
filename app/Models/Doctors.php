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
        'mobile'
    ];
    
    public function paient(){
        return $this->belongsTo('App\Models\Patients');
    }
}
