<?php

namespace App\Http\Requests\Api\V1\Food;

use Illuminate\Foundation\Http\FormRequest;

class StoreFoodRequest extends FormRequest
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
         'name' => ['required', 'string', 'max:255'],
         'category' => ['required', 'string', 'max:100'],
         'icon' => ['nullable', 'string', 'max:100'],
         'serving_size' => ['required', 'numeric', 'min:1'],
         'calories' => ['required', 'numeric', 'min:0'],
         'protein' => ['required', 'numeric', 'min:0'],
         'fat' => ['required', 'numeric', 'min:0'],
         'carbohydrate' => ['required', 'numeric', 'min:0'],
         'fiber' => ['nullable', 'numeric', 'min:0'],
         'sugar' => ['nullable', 'numeric', 'min:0'],
      ];
   }

   /**
    * Get custom messages for validator errors.
    */
   public function messages(): array
   {
      return [
         'name.required' => 'Nama makanan wajib diisi',
         'category.required' => 'Kategori wajib diisi',
         'serving_size.required' => 'Ukuran porsi wajib diisi',
         'calories.required' => 'Kalori wajib diisi',
         'protein.required' => 'Protein wajib diisi',
         'fat.required' => 'Lemak wajib diisi',
         'carbohydrate.required' => 'Karbohidrat wajib diisi',
      ];
   }
}
