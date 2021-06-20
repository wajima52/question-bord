<?php

namespace App\Services;

class UserService
{
    private \App\Models\User $user;

    public function __construct(\App\Models\User $user)
    {
        $this->user = $user;
    }

    public function findByEmail(string $email)
    {
        return $this->user
            ->where('email', $email)
            ->first();
    }
}
