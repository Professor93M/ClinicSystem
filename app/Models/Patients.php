<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patients extends Model
{
    use HasFactory;

    protected $fillable = [
        'fullname',
        'age',
        'mobile',
        'address',
        'doctor_id',
        'note',
    ];

    public function doctor(){
        return $this->hasMany('App\Models\Doctors');
    }
}
