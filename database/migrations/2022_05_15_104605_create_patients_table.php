<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("fullname");
            $table->integer("age");
            $table->string("address")->nullable();
            $table->string("mobile")->nullable();
            $table->string("disease")->nullable();
            $table->string("note")->nullable();
            $table->unsignedBigInteger("doctors_id");
            $table->foreign("doctors_id")->references("id")->on("doctors");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patients');
    }
}
