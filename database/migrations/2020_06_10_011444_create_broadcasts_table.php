<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBroadcastsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('broadcasts', function (Blueprint $table) {
            $table->id();
            $table->integer('freq');
            $table->string('station');
            $table->tinyInteger('start');
            $table->tinyInteger('end');
            $table->integer('days');
            $table->string('language');
            $table->integer('power')->nullable();
            $table->integer('azimuth')->nullable();
            $table->string('location')->nullable();
            $table->decimal('lat')->nullable();
            $table->decimal('lon')->nullable();
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('broadcasts');
    }
}
