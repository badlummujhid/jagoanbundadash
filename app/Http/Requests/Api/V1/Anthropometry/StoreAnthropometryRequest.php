<?php

namespace App\Http\Requests\Api\V1\Anthropometry;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAnthropometryRequest extends FormRequest
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
         'measurement_date' => ['required', 'date', 'before_or_equal:today'],
         'weight' => ['required', 'numeric', 'min:1', 'max:100'],
         'height' => ['required', 'numeric', 'min:30', 'max:200'],
         'head_circumference' => ['nullable', 'numeric', 'min:20', 'max:60'],
         'is_lying' => ['sometimes', 'boolean'],
         'measurement_location' => ['sometimes', Rule::in(['posyandu', 'home', 'clinic', 'hospital', 'other'])],
         'notes' => ['nullable', 'string', 'max:1000'],
      ];
   }

   /**
    * Get custom messages for validator errors.
    */
   public function messages(): array
   {
      return [
         'measurement_date.required' => 'Tanggal pengukuran wajib diisi',
         'measurement_date.before_or_equal' => 'Tanggal pengukuran tidak boleh di masa depan',
         'weight.required' => 'Berat badan wajib diisi',
         'weight.min' => 'Berat badan minimal 1 kg',
         'weight.max' => 'Berat badan maksimal 100 kg',
         'height.required' => 'Tinggi badan wajib diisi',
         'height.min' => 'Tinggi badan minimal 30 cm',
         'height.max' => 'Tinggi badan maksimal 200 cm',
      ];
   }
}
