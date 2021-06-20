<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserService
{
    use SoftDeletes;
    private User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function findByEmail(string $email): User
    {
        return $this->user
            ->where('email', $email)
            ->first();
    }
}
