<?php

return [
    'rules' => [
        'password' => [
            'not_mixed' => 'The :attribute must contain at least one uppercase and one lowercase letter.',
            'not_numbers' => 'The :attribute must contain at least one number.'
        ],
    ]
];
