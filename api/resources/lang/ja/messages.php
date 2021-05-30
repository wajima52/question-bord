<?php

return [
    'rules' => [
        'password' => [
            'not_mixed' => ':attributeには大文字と小文字が１つ以上使われている必要があります',
            'not_numbers' => ':attributeには数字が1文字以上使われている必要があります'
        ],
    ]
];
