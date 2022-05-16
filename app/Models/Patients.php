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
        'disease',
        'doctors_id',
        'note',
    ];

    public function doctors(){
        return $this->belongsTo('App\Models\Doctors');
    }
}
