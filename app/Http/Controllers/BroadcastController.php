<?php

namespace App\Http\Controllers;

use App\Broadcast;
use Illuminate\Http\Request;

class BroadcastController extends Controller
{
    /**
     * Return all broadcasts registered within database
     */
    public function index()
    {
        $broadcasts = Broadcast::paginate(25);
        return response()->json($broadcasts->toArray(), 200);
    }

    /**
     * Return all broadcasts currently live
     */
    public function live()
    {
        $time = date("Hi");                         // UTC; 00:00 - 23:59
        $day = date('N', strtotime("l")) + 2;       // Day of week, with 1 being Sunday

        $broadcasts = Broadcast::where('days', 'LIKE', '%'.$day.'%')
        ->where('start', '>=', $time)->where('end', '<=', $time)->paginate(25);

        return response()->json($broadcasts, 200);
    }

    /**
     * Return all upcoming broadcasts (i.e. starting within 30mins)
     */
    public function upcoming()
    {
        $time = date("Hi");
        $day = date('N', strtotime("l")) + 2;

        $broadcasts = Broadcast::where('days', 'LIKE', '%'.$day.'%')->where('start', '>=', $time+30)->paginate(25);

        return response()->json($broadcasts, 200);
    }

    /**
     * Returns a list of broadcasts filtered by frequency, station, and/or language
     */
    public function filter(Request $request)
    {
        // Initial dummy statement, i.e. select all broadcasts (so that they can be later paginated)
        $query = Broadcast::where('freq', '>=', 0);

        // Filter by frequency
        if (!empty($request->freq)) {
            $query->where('freq', '=', $request->freq);
        }

        // Filter by station
        if (!empty($request->station)) {
            $query->where('station', 'LIKE', '%'.$request->station.'%');
        }

        // Filter by language
        if (!empty($request->language)) {
            $query->where('language', '=', $request->language);
        }

        $broadcasts = $query->paginate(25);
        return response()->json($broadcasts, 200);
    }

    /**
     * TODO: this is inefficient for large amounts of data
     * 
     * Fetches the "options" to be used in "select" elements. Includes:
     *  - all stations
     *  - all languages
     */
    public function selectOptions()
    {
        $languages = Array();
        $stations = Array();
        $options = Broadcast::select('language', 'station')
            ->distinct()
            ->get();

        foreach($options as $option) {
            if (!in_array($option['language'], $languages)) {
                array_push($languages, $option['language']);
            }

            if (!in_array($option['station'], $stations)) {
                array_push($stations, $option['station']);
            }
        }

        // Alphabetically sort all the options
        sort($languages);
        sort($stations);

        return response()->json(["languages" => $languages, "stations" => $stations], 200);
    }
}
