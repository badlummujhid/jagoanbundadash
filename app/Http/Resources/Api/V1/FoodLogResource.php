<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FoodLogResource extends JsonResource
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
         'log_date' => $this->log_date->format('Y-m-d'),
         'meal_time' => $this->meal_time,
         'meal_time_label' => $this->getMealTimeLabel(),
         'totals' => [
            'calories' => (float) $this->total_calories,
            'protein' => (float) $this->total_protein,
            'fat' => (float) $this->total_fat,
            'carbohydrate' => (float) $this->total_carbohydrate,
         ],
         'items' => $this->whenLoaded('items', function () {
            return $this->items->map(function ($item) {
               return [
                  'id' => $item->id,
                  'food' => $item->food ? [
                     'id' => $item->food->id,
                     'name' => $item->food->name,
                     'category' => $item->food->category,
                     'icon' => $item->food->icon,
                  ] : null,
                  'quantity' => (float) $item->quantity,
                  'serving_size' => (float) $item->serving_size,
                  'nutrition' => [
                     'calories' => (float) $item->calories,
                     'protein' => (float) $item->protein,
                     'fat' => (float) $item->fat,
                     'carbohydrate' => (float) $item->carbohydrate,
                  ],
               ];
            });
         }),
         'notes' => $this->notes,
         'created_at' => $this->created_at->toIso8601String(),
      ];
   }

   /**
    * Get meal time label in Indonesian.
    */
   private function getMealTimeLabel(): string
   {
      return match ($this->meal_time) {
         'pagi' => 'Sarapan',
         'siang' => 'Makan Siang',
         'malam' => 'Makan Malam',
         'snack' => 'Makanan Selingan',
         default => $this->meal_time,
      };
   }
}
