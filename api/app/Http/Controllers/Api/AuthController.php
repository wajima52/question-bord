<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignInRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    /**
     * @var UserService
     */
    private UserService $userService;
    /**
     * @var User
     */
    private User $user;

    public function __construct(UserService $userService, User $user)
    {
        $this->userService = $userService;
        $this->user = $user;
    }

    public function login(LoginRequest $request)
    {
        $user = $this->userService->findByEmail($request->email);

        if (! $user || ! Hash::check($request->password, $user->password)) {
            Log::info('認証情報エラー email:'.$request->email);
            return response()->json([], \Illuminate\Http\Response::HTTP_BAD_REQUEST);
        }

        return ['token' => $user->createToken("question-bord")->plainTextToken];
    }

    public function signIn(SignInRequest $request)
    {
        if (!$this->userService->findByEmail($request->email)) {
            \DB::beginTransaction();
            try {
                $user = $this->user->create(['email' => $request->email, 'password' => Hash::make($request->password), 'name' => $request->name]);
                event(new Registered($user));
            } catch (\Exception $exception) {
                \DB::rollBack();
                Log::error($exception->getMessage());
                return response()->json("登録エラー", \Illuminate\Http\Response::HTTP_BAD_REQUEST);
            }
            \DB::commit();
            $user->createToken("question-bord")->plainTextToken;
        }

        return [];
    }
}
