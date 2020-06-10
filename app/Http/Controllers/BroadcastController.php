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
}
