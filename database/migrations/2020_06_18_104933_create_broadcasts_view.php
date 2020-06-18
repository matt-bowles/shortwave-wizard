<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBroadcastsView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement($this->dropView());
        DB::statement($this->createView());
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('broadcasts_view');
    }

    private function createView(): string
    {
        return <<<SQL
        CREATE VIEW `broadcasts_view` AS
        SELECT
            id,
            freq,
            station,
            start,
            end,
            days,
            language,
            power,
            IF(azimuth = 999, "ND", azimuth) as azimuth,
            location,
            country,
            CONCAT(lon, ", ", lat) AS coords,

            IF(start < end,
                
                # Normal
                IF(DATE_FORMAT(UTC_TIMESTAMP(), "%H%i%") BETWEEN start AND end, true, false),
                # Broadcast duration extends over midnight UTC
                IF(DATE_FORMAT(UTC_TIMESTAMP(), "%H%i%") NOT BETWEEN start and END, true, false)
            
            ) AND (days LIKE CONCAT("%", DAYOFWEEK(UTC_TIMESTAMP()), "%")) AS isLive
        FROM broadcasts
        SQL;
    }

    private function dropView(): string
    {
        return <<<SQL
        DROP VIEW IF EXISTS `broadcasts_view`;
        SQL;
    }
}