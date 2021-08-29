<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::domain(config('app.url'))->group(function () {
    // メールに添付するURL　確認処理は/api/email/verification/で行う
    Route::get('/email/verify/{id}/{hash}', function (Request $request) {
        return response()->json([]);
    })->name('verification.verify');

    Route::get('/auth/reset-password/{token}', function () {
        return response()->json([]);
    })->name('password.reset');
});
