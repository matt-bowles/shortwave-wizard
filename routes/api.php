<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::prefix('broadcasts')->group(function() {
    Route::get('/', 'BroadcastController@index');
    Route::get('/upcoming', 'BroadcastController@upcoming');
    Route::get('/filter', 'BroadcastController@filter');
    Route::get('/getOne', 'BroadcastController@getOne');
    Route::get('/selectOptions', 'BroadcastController@selectOptions');
});