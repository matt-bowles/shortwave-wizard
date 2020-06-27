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
            $table->integer('start');
            $table->integer('end');
            $table->integer('days');
            $table->string('language');
            $table->decimal('power')->nullable();
            $table->integer('azimuth')->nullable();
            $table->string('location')->nullable();
            $table->string('country', 3)->nullable();
            $table->decimal('lat', 7, 4)->nullable();
            $table->decimal('lon', 6, 4)->nullable();
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
