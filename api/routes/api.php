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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [\App\Http\Controllers\UserController::class, 'getUser']);
});

Route::post('login', [\App\Http\Controllers\Api\AuthController::class, 'login'])->name('login');
Route::post('signIn', [\App\Http\Controllers\Api\AuthController::class, 'signIn']);

Route::get('/email/verification/{id}/{hash}', [\App\Http\Controllers\Api\VerifyController::class,  'verifyEmail']);
