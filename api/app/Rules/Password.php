<?php

namespace App\Rules;

use Illuminate\Container\Container;
use Illuminate\Contracts\Validation\UncompromisedVerifier;
use Illuminate\Support\Facades\Validator;

class Password extends \Illuminate\Validation\Rules\Password
{
    public function passes($attribute, $value)
    {
        $validator = Validator::make($this->data, [
            $attribute => 'string|min:'.$this->min,
        ]);

        if ($validator->fails()) {
            return $this->fail($validator->messages()->all());
        }

        $value = (string) $value;

        if ($this->mixedCase && ! preg_match('/(\p{Ll}+.*\p{Lu})|(\p{Lu}+.*\p{Ll})/u', $value)) {
            $this->fail(__('messages.rules.password.not_mixed'));
        }

        if ($this->numbers && ! preg_match('/\pN/u', $value)) {
            $this->fail(__('messages.rules.password.not_numbers'));
        }

        if (! empty($this->messages)) {
            return false;
        }

        if ($this->uncompromised && ! Container::getInstance()->make(UncompromisedVerifier::class)->verify([
                'value' => $value,
                'threshold' => $this->compromisedThreshold,
            ])) {
            return $this->fail(
                'The given :attribute has appeared in a data leak. Please choose a different :attribute.'
            );
        }

        return true;
    }

}
