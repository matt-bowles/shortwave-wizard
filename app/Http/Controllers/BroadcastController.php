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
     * Return all upcoming broadcasts (i.e. starting within 30mins)
     */
    public function upcoming()
    {
        $time = date("Hi");
        $day = date('N', strtotime("l")) + 2;

        $broadcasts = Broadcast::where('days', 'LIKE', '%'.$day.'%')->where('start', '>=', $time+30)->paginate(25);

        return response()->json($broadcasts, 200);
    }

    function getLive($query) {
        $time = date("Hi");                         // UTC; 00:00 - 23:59
        $day = date('N', strtotime("l")) + 2;       // Day of week, with 1 being Sunday

        return $query->where('days', 'LIKE', '%'.$day.'%')
            ->where('start', '>=', $time)->where('end', '<=', $time);
    }

    /**
     * Returns a list of broadcasts filtered by:
     *  - frequency
     *  - station
     *  - language
     *  - whether the broadcast is live
     */
    public function filter(Request $request)
    {
        // Initial dummy statement, i.e. select all broadcasts (so that they can be later paginated)
        $broadcasts = new Broadcast;
        $queries = [];

        $columns = [
            'freq', 'station', 'language'
        ];

        foreach($columns as $column) {
            if (!empty(request($column))) {
                $broadcasts = $broadcasts->where($column, request($column));
                $queries[$column] = request($column);
            }
        }

        // Filter by live broadcasts
        // if (!empty($request->live) and ($request->live == true)) {
        //     $query = $this->getLive($query);
        // }

        $broadcasts = $broadcasts->paginate(3)->appends($queries);
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
