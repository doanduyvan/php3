<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTagsNewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tags_news', function (Blueprint $table) {
            $table->foreign('idnews')->references('id')->on('news')->onDelete('cascade');
            $table->foreign('idtags')->references('id')->on('tags')->onDelete('cascade');
            $table->unique(['idnews', 'idtags'], 'idnews_idtags_unique');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tags_news', function (Blueprint $table) {
            //
        });
    }
}
