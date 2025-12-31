<?php

namespace App\Http\Requests\Api\V1\Pmt;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LogPmtRequest extends FormRequest
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
         'portion' => ['required', Rule::in(['habis', 'half', 'quarter', 'none'])],
         'photo_url' => ['nullable', 'url', 'max:500'],
         'notes' => ['nullable', 'string', 'max:1000'],
      ];
   }

   /**
    * Get custom messages for validator errors.
    */
   public function messages(): array
   {
      return [
         'portion.required' => 'Porsi yang dimakan wajib dipilih',
         'portion.in' => 'Porsi tidak valid (pilih: habis, half, quarter, none)',
      ];
   }
}
