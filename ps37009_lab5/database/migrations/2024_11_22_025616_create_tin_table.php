<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tin', function (Blueprint $table) {
            $table->id();
            $table->string('tieude')->nullable();
            $table->text('tomtat')->nullable();
            $table->text('noidung')->nullable();
            $table->integer('xem')->nullable()->default(0);
            $table->tinyInteger('anhien')->nullable()->default(1);  
            $table->text('tags')->nullable();
            $table->text('hinh')->nullable();
            $table->tinyInteger('noibat')->nullable()->default(0);
            $table->integer('idlt')->index('tin_loaitin');
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
        Schema::dropIfExists('tin');
    }
};
