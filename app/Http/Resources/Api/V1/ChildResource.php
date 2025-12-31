<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChildResource extends JsonResource
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
         'user_id' => $this->user_id,
         'name' => $this->name,
         'birthday' => $this->birthday->format('Y-m-d'),
         'gender' => $this->gender,
         'avatar_url' => $this->avatar_url,
         'birth_weight' => $this->birth_weight ? (float) $this->birth_weight : null,
         'birth_height' => $this->birth_height ? (float) $this->birth_height : null,
         'head_circumference' => $this->head_circumference ? (float) $this->head_circumference : null,
         'is_active' => $this->is_active,
         'age' => [
            'months' => $this->age_in_months,
            'days' => $this->age_in_days,
            'label' => $this->getAgeLabel(),
         ],
         'created_at' => $this->created_at->toIso8601String(),
         'updated_at' => $this->updated_at->toIso8601String(),
      ];
   }

   /**
    * Get age label in Indonesian.
    */
   private function getAgeLabel(): string
   {
      $months = $this->age_in_months;

      if ($months < 1) {
         $days = $this->age_in_days;
         return "{$days} hari";
      }

      if ($months < 12) {
         return "{$months} bulan";
      }

      $years = floor($months / 12);
      $remainingMonths = $months % 12;

      if ($remainingMonths === 0) {
         return "{$years} tahun";
      }

      return "{$years} tahun {$remainingMonths} bulan";
   }
}
