<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoaispTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loaisp', function (Blueprint $table) {
            $table->id();
            $table->string('tenLoai', 30)->unique();
            $table->integer('thuTu')->default(0);
            $table->boolean('anHien')->default(1);
            $table->string('urlHinh', 200)->nullable();
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
        Schema::dropIfExists('loaisp');
    }
}
