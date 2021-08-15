<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class VerifyController extends Controller
{
    /**
     * @var User
     */
    private User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function verifyEmail(Request $request, int $id, string $hash)
    {
        $user = $this->user->find($id);

        if (! hash_equals(
            (string) $hash,
            sha1($user->getEmailForVerification())
        )) {
            Log::info('不正なhash値です');
            return response()->json(['message' => '不正なhash値です'], Response::HTTP_BAD_REQUEST);
        }

        if ($user->hasVerifiedEmail()) {
            Log::info('既に確認済みです');
            return response()->json(['message' => '既に確認済みです'], Response::HTTP_CONFLICT);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return response()->json([], Response::HTTP_OK);
    }
}
