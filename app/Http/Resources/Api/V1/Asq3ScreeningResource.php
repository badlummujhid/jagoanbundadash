<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Asq3ScreeningResource extends JsonResource
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
         'screening_date' => $this->screening_date->format('Y-m-d'),
         'age_at_screening' => [
            'months' => $this->age_at_screening_months,
            'days' => $this->age_at_screening_days,
         ],
         'age_interval' => $this->whenLoaded('ageInterval', function () {
            return [
               'id' => $this->ageInterval->id,
               'age_months' => $this->ageInterval->age_months,
               'age_label' => $this->ageInterval->age_label,
            ];
         }),
         'status' => $this->status,
         'status_label' => $this->getStatusLabel(),
         'overall_status' => $this->overall_status,
         'overall_status_label' => $this->getOverallStatusLabel(),
         'completed_at' => $this->completed_at?->toIso8601String(),
         'answers_count' => $this->whenLoaded('answers', fn() => $this->answers->count()),
         'results' => $this->whenLoaded('results', function () {
            return $this->results->map(function ($result) {
               return [
                  'domain' => [
                     'code' => $result->domain->code,
                     'name' => $result->domain->name,
                     'color' => $result->domain->color,
                  ],
                  'total_score' => (float) $result->total_score,
                  'cutoff_score' => (float) $result->cutoff_score,
                  'monitoring_score' => (float) $result->monitoring_score,
                  'status' => $result->status,
                  'status_label' => $result->status_label,
               ];
            });
         }),
         'notes' => $this->notes,
         'created_at' => $this->created_at->toIso8601String(),
      ];
   }

   /**
    * Get status label in Indonesian.
    */
   private function getStatusLabel(): string
   {
      return match ($this->status) {
         'in_progress' => 'Sedang Dikerjakan',
         'completed' => 'Selesai',
         'cancelled' => 'Dibatalkan',
         default => $this->status,
      };
   }

   /**
    * Get overall status label in Indonesian.
    */
   private function getOverallStatusLabel(): ?string
   {
      return match ($this->overall_status) {
         'sesuai' => 'Perkembangan Sesuai',
         'pantau' => 'Perlu Pemantauan',
         'perlu_rujukan' => 'Perlu Rujukan',
         default => null,
      };
   }
}
