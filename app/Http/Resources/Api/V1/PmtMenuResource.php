<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PmtMenuResource extends JsonResource
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
         'description' => $this->description,
         'image_url' => $this->image_url,
         'nutrition' => [
            'calories' => $this->calories ? (float) $this->calories : null,
            'protein' => $this->protein ? (float) $this->protein : null,
         ],
         'age_range' => [
            'min_months' => $this->min_age_months,
            'max_months' => $this->max_age_months,
         ],
         'is_active' => $this->is_active,
      ];
   }
}
