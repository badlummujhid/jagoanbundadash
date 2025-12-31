<?php

namespace App\Http\Requests;

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
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:50',
            'serving_size' => 'required|numeric|min:0',
            'calories' => 'required|numeric|min:0',
            'protein' => 'required|numeric|min:0',
            'fat' => 'required|numeric|min:0',
            'carbohydrate' => 'required|numeric|min:0',
            'fiber' => 'nullable|numeric|min:0',
            'sugar' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama makanan wajib diisi.',
            'serving_size.required' => 'Ukuran porsi wajib diisi.',
            'calories.required' => 'Jumlah kalori wajib diisi.',
            'protein.required' => 'Jumlah protein wajib diisi.',
            'fat.required' => 'Jumlah lemak wajib diisi.',
            'carbohydrate.required' => 'Jumlah karbohidrat wajib diisi.',
        ];
    }
}
