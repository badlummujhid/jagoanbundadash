<?php

namespace App\Http\Requests\Api\V1\Asq3;

use Illuminate\Foundation\Http\FormRequest;

class StartScreeningRequest extends FormRequest
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
         'screening_date' => ['sometimes', 'date', 'before_or_equal:today'],
         'notes' => ['nullable', 'string', 'max:1000'],
      ];
   }

   /**
    * Get custom messages for validator errors.
    */
   public function messages(): array
   {
      return [
         'screening_date.before_or_equal' => 'Tanggal screening tidak boleh di masa depan',
      ];
   }
}
