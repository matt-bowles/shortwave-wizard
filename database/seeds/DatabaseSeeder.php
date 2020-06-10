<?php

use Illuminate\Database\Seeder;
use App\Broadcast;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        Broadcast::create([
            'freq' => 5850,
            'station' => 'WRMI VORW Radio International',
            'start' => 0100,
            'end' => 0200,
            'days' => 6,
            'language' => 'English',
            'power' => 100,
            'azimuth' => 315,
            'location' => 'Okeechobee12',
            'country' => 'USA',
            'lat' => 27.2730,
            'lon' => -080.5600
        ]);

        Broadcast::create([
            'freq' => 6170,
            'station' => 'R. NEW ZEALAND INT.',
            'start' => 1259,
            'end' => 1650,
            'days' => 123456,
            'language' => 'English',
            'power' => 100,
            'azimuth' => 35,
            'location' => 'Rangitaiki',
            'country' => 'NZL',
            'lat' => -38.5002,
            'lon' => 176.2501
        ]);

        Broadcast::create([
            'freq' => 6195,
            'station' => 'NHK WORLD RADIO JAPAN',
            'start' => 900,
            'end' => 930,
            'days' => 1234567,
            'language' => 'Portuguese',
            'power' => 250,
            'azimuth' => 152,
            'location' => 'Cypress Creek',
            'country' => 'USA',
            'lat' => 32.4138, 
            'lon' => -081.0741
        ]);

        Broadcast::create([
            'freq' => 7205,
            'station' => 'R. FRANCE INT.',
            'start' => 2000,
            'end' => 2200,
            'days' => 1234567,
            'language' => 'French',
            'power' => 500,
            'azimuth' => 200,
            'location' => 'Issoudun',
            'country' => 'F',
            'lat' => 46.5704,
            'lon' => 001.5305
        ]);

        Broadcast::create([
            'freq' => 7260,
            'station' => 'VOICE OF AMERICA',
            'start' => 330,
            'end' => 400,
            'days' => 1234567,
            'language' => 'Somali',
            'power' => 250,
            'azimuth' => 146,
            'location' => 'Santa Maria di Galeria',
            'country' => 'CVA',
            'lat' => 42.0204,
            'lon' => 012.1905
        ]);

        Broadcast::create([
            'freq' => 9410,
            'station' => 'BBC',
            'start' => 300,
            'end' => 500,
            'days' => 1234567,
            'language' => 'Arabic',
            'power' => 100,
            'azimuth' => 126,
            'location' => 'Kostinbrod(Sofia)',
            'country' => 'BUL',
            'lat' => 42.4835,
            'lon' => 023.1110

        ]);

        Broadcast::create([
            'freq' => 9440,
            'station' => 'CHINA RADIO INTERNATIONAL',
            'start' => 1900,
            'end' => 2000,
            'days' => 1234567,
            'language' => 'English',
            'power' => 500,
            'azimuth' => 283,
            'location' => 'Kunming-Anning',
            'country' => 'CHN',
            'lat' => 24.5255,
            'lon' => 102.2945
        ]);

        Broadcast::create([
            'freq' => 9440,
            'station' => 'CHINA RADIO INTERNATIONAL',
            'start' => 2000,
            'end' => 2100,
            'days' => 1234567,
            'language' => 'English',
            'power' => 500,
            'azimuth' => 300,
            'location' => 'Kunming-Anning',
            'country' => 'CHN',
            'lat' => 24.5255,
            'lon' => 102.2945
        ]);

        Broadcast::create([
            'freq' => 9640,
            'station' => 'R. HABANA CUBA',
            'start' => 1100,
            'end' => 1500,
            'days' => 1234567,
            'language' => 'Spanish',
            'power' => 50,
            'azimuth' => 110,
            'location' => 'Bejucal',
            'country' => 'CUB',
            'lat' => 22.5157,
            'lon' => -082.1858
        ]);

        Broadcast::create([
            'freq' => 11825,
            'station' => 'R. ROMANIA INT.',
            'start' => 0300,
            'end' => 0357,
            'days' => 1234567,
            'language' => 'English',
            'power' => 300,
            'azimuth' => 100,
            'location' => 'Galbeni-Bacau',
            'country' => 'ROU',
            'lat' => 46.4438, 
            'lon' => 026.5041
        ]);
    }
}
