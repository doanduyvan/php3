<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReviewlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reviewlogs', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('idadmin');
            $table->unsignedInteger('idnews');
            $table->text('note')->nullable();
            $table->tinyInteger('onoff',false,true);
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
        Schema::dropIfExists('reviewlogs');
    }
}
