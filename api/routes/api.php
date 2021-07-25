<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

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

Route::domain(config('app.url'))->group(function () {
    Route::get('/email/verify/{id}/{hash}', function (\Illuminate\Foundation\Auth\EmailVerificationRequest $request) {
        $request->fulfill();

        return redirect('/home');
    })->middleware(['auth', 'signed'])->name('verification.verify');
});
