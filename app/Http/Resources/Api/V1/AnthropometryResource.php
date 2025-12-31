<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnthropometryResource extends JsonResource
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
         'child_id' => $this->child_id,
         'measurement_date' => $this->measurement_date->format('Y-m-d'),
         'weight' => (float) $this->weight,
         'height' => (float) $this->height,
         'head_circumference' => $this->head_circumference ? (float) $this->head_circumference : null,
         'bmi' => $this->bmi,
         'is_lying' => $this->is_lying,
         'measurement_location' => $this->measurement_location,
         'z_scores' => [
            'weight_for_age' => $this->weight_for_age_zscore ? (float) $this->weight_for_age_zscore : null,
            'height_for_age' => $this->height_for_age_zscore ? (float) $this->height_for_age_zscore : null,
            'weight_for_height' => $this->weight_for_height_zscore ? (float) $this->weight_for_height_zscore : null,
            'bmi_for_age' => $this->bmi_for_age_zscore ? (float) $this->bmi_for_age_zscore : null,
            'head_circumference' => $this->head_circumference_zscore ? (float) $this->head_circumference_zscore : null,
         ],
         'status' => [
            'nutritional' => $this->nutritional_status,
            'stunting' => $this->stunting_status,
            'wasting' => $this->wasting_status,
         ],
         'notes' => $this->notes,
         'created_at' => $this->created_at->toIso8601String(),
      ];
   }
}
