<?php

namespace App\Http\Requests\Api\V1\Anthropometry;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAnthropometryRequest extends FormRequest
{
   /**
    * Determine if the user is authorized to make this request.
    */
   public function authorize(): bool
   {
      return true;
   }

   /**
    * Get the validation rules that apply to the request.
    *
    * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
    */
   public function rules(): array
   {
      return [
         'measurement_date' => ['sometimes', 'date', 'before_or_equal:today'],
         'weight' => ['sometimes', 'numeric', 'min:1', 'max:100'],
         'height' => ['sometimes', 'numeric', 'min:30', 'max:200'],
         'head_circumference' => ['sometimes', 'nullable', 'numeric', 'min:20', 'max:60'],
         'is_lying' => ['sometimes', 'boolean'],
         'measurement_location' => ['sometimes', Rule::in(['posyandu', 'home', 'clinic', 'hospital', 'other'])],
         'notes' => ['sometimes', 'nullable', 'string', 'max:1000'],
      ];
   }
}
