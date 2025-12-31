<?php

namespace App\Http\Requests\Api\V1\Asq3;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubmitAnswersRequest extends FormRequest
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
         'answers' => ['required', 'array', 'min:1'],
         'answers.*.question_id' => ['required', 'exists:asq3_questions,id'],
         'answers.*.answer' => ['required', Rule::in(['yes', 'sometimes', 'no'])],
      ];
   }

   /**
    * Get custom messages for validator errors.
    */
   public function messages(): array
   {
      return [
         'answers.required' => 'Jawaban wajib diisi',
         'answers.min' => 'Minimal satu jawaban harus dikirim',
         'answers.*.question_id.required' => 'ID pertanyaan wajib diisi',
         'answers.*.question_id.exists' => 'Pertanyaan tidak ditemukan',
         'answers.*.answer.required' => 'Jawaban wajib dipilih',
         'answers.*.answer.in' => 'Jawaban tidak valid (pilih: yes, sometimes, no)',
      ];
   }
}
