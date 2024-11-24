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
        Schema::table('tin', function (Blueprint $table) {
            $table->foreign(['idlt'], 'tin_loaitin')->references('id')->on('loaitin')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tin', function (Blueprint $table) {
            $table->dropForeign('tin_loaitin');
        });
    }
};
