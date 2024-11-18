<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDienthoaiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dienthoai', function (Blueprint $table) {
            $table->id();
            $table->string('tendt',30)->unique();
            $table->string('mota',1000)->nullable();
            $table->double('gia',8,2,true);
            $table->double('giakm',8,2, true)->default(0);
            $table->string('urlhinh',200)->nullable();
            $table->integer('soluongtonkho')->default(0);
            $table->boolean('hot')->default(false);
            $table->boolean('anhien')->default(true);
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
        Schema::dropIfExists('dienthoai');
    }
}
