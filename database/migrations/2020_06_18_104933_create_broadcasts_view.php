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
            
            ) AND (days LIKE CONCAT("%", DAYOFWEEK(UTC_TIMESTAMP()), "%")) AS isLive,
            
           CASE
           	WHEN (freq BETWEEN 2300 AND 2495) THEN "120m"
            WHEN (freq BETWEEN 3200 AND 3400) THEN "90m"
            WHEN (freq BETWEEN 3900 AND 4000) THEN "75m"
            WHEN (freq BETWEEN 4750 AND 4995) THEN "60m"
            WHEN (freq BETWEEN 5900 AND 6200) THEN "49m"
            WHEN (freq BETWEEN 7200 AND 7450) THEN "41m"
            WHEN (freq BETWEEN 9400 AND 9900) THEN "31m"
            WHEN (freq BETWEEN 11600 AND 12100) THEN "25m"
            WHEN (freq BETWEEN 13570 AND 13870) THEN "22m"
            WHEN (freq BETWEEN 15100 AND 15830) THEN "19m"
            WHEN (freq BETWEEN 17480 AND 17900) THEN "16m"
            WHEN (freq BETWEEN 18900 AND 19020) THEN "15m"
            WHEN (freq BETWEEN 21450 AND 21850) THEN "13m"
            WHEN (freq BETWEEN 25670 AND 26100) THEN "11m"
            ELSE "Other"
           END as band
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