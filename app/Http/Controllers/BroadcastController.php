<?php

namespace App\Http\Controllers;

use App\Broadcast;
use App\BroadcastView;
use Illuminate\Http\Request;

class BroadcastController extends Controller
{   
    const PAGINATION_NUM  = 250;

    /**
     * Return all broadcasts registered within database
     */
    public function index()
    {
        $broadcasts = BroadcastView::paginate(self::PAGINATION_NUM);
        return response()->json($broadcasts->toArray(), 200);
    }

    /**
     * Return all upcoming broadcasts (i.e. starting within 30mins)
     */
    public function upcoming()
    {
        $time = date("Hi");
        $day = date('N', strtotime("l")) + 2;

        $broadcasts = BroadcastView::where('days', 'LIKE', '%'.$day.'%')->where('start', '>=', $time+30)->paginate(self::PAGINATION_NUM);

        return response()->json($broadcasts, 200);
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
        $broadcasts = new BroadcastView;
        $queries = [];

        $columns = [
            'freq', 'station', 'language', 'isLive', 'band'
        ];

        foreach($columns as $column) {
            if (!empty(request($column))) {
                $broadcasts = $broadcasts->where($column, request($column));
                $queries[$column] = request($column);
            }
        }

        $broadcasts = $broadcasts->paginate(self::PAGINATION_NUM)->appends($queries);
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
        $bands = Array();
        $options = BroadcastView::select('language', 'station', 'band')
            ->distinct()
            ->get();

        foreach($options as $option) {
            if (!in_array($option['language'], $languages)) {
                array_push($languages, $option['language']);
            }

            if (!in_array($option['station'], $stations)) {
                array_push($stations, $option['station']);
            }

            if (!in_array($option['band'], $bands)) {
                array_push($bands, $option['band']);
            }
        }

        // Alphabetically sort all the options
        sort($languages);
        sort($stations);
        sort($bands);

        return response()->json(["languages" => $languages, "stations" => $stations, "bands" => $bands], 200);
    }
}
