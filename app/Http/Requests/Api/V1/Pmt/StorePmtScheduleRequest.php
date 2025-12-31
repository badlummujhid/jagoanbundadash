<?php

namespace App\Http\Requests\Api\V1\Pmt;

use Illuminate\Foundation\Http\FormRequest;

class StorePmtScheduleRequest extends FormRequest
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
         'menu_id' => ['required', 'exists:pmt_menus,id'],
         'scheduled_date' => ['required', 'date'],
      ];
   }

   /**
    * Get custom messages for validator errors.
    */
   public function messages(): array
   {
      return [
         'menu_id.required' => 'Menu PMT wajib dipilih',
         'menu_id.exists' => 'Menu PMT tidak ditemukan',
         'scheduled_date.required' => 'Tanggal jadwal wajib diisi',
      ];
   }
}
