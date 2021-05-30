<?php

namespace App\Http\Requests;


use App\Rules\Password;

/**
 * @property string password
 * @property string email
 * @property string device_name
 * @property string name
 */
class SignInRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email',
            'name' => 'required|string',
            'password' => ['required', 'confirmed', Password::min(8)->numbers()],
            'device_name' => 'required',
        ];
    }
}
