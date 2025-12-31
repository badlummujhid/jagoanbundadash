<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FoodResource extends JsonResource
{
   /**
    * Transform the resource into an array.
    *
    * @return array<string, mixed>
    */
   public function toArray(Request $request): array
   {
      return [
         'id' => $this->id,
         'name' => $this->name,
         'category' => $this->category,
         'icon' => $this->icon,
         'serving_size' => (float) $this->serving_size,
         'nutrition' => [
            'calories' => (float) $this->calories,
            'protein' => (float) $this->protein,
            'fat' => (float) $this->fat,
            'carbohydrate' => (float) $this->carbohydrate,
            'fiber' => $this->fiber ? (float) $this->fiber : null,
            'sugar' => $this->sugar ? (float) $this->sugar : null,
         ],
         'is_system' => $this->is_system,
         'is_active' => $this->is_active,
      ];
   }
}
