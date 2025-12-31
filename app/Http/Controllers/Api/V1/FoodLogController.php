<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Food\StoreFoodLogRequest;
use App\Http\Requests\Api\V1\Food\UpdateFoodLogRequest;
use App\Http\Resources\Api\V1\FoodLogResource;
use App\Models\Child;
use App\Models\Food;
use App\Models\FoodLog;
use App\Models\FoodLogItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;

class FoodLogController extends Controller
{
   /**
    * Display a listing of food logs.
    */
   public function index(Request $request, Child $child): AnonymousResourceCollection
   {
      $this->authorizeChild($request, $child);

      $query = $child->foodLogs()->with('items.food');

      // Filter by date range
      if ($request->has('start_date')) {
         $query->whereDate('log_date', '>=', $request->start_date);
      }
      if ($request->has('end_date')) {
         $query->whereDate('log_date', '<=', $request->end_date);
      }

      // Filter by meal time
      if ($request->has('meal_time')) {
         $query->where('meal_time', $request->meal_time);
      }

      $logs = $query->orderByDesc('log_date')
         ->orderByRaw("FIELD(meal_time, 'breakfast', 'lunch', 'snack', 'dinner')")
         ->paginate($request->get('per_page', 20));

      return FoodLogResource::collection($logs);
   }

   /**
    * Store a newly created food log.
    */
   public function store(StoreFoodLogRequest $request, Child $child): JsonResponse
   {
      $this->authorizeChild($request, $child);

      $log = DB::transaction(function () use ($request, $child) {
         // Create food log
         $log = $child->foodLogs()->create([
            'log_date' => $request->log_date,
            'meal_time' => $request->meal_time,
            'notes' => $request->notes,
         ]);

         // Create food log items
         foreach ($request->items as $item) {
            $food = Food::findOrFail($item['food_id']);

            $quantity = $item['quantity'] ?? 1;
            $servingSize = $item['serving_size'] ?? $food->serving_size;
            $multiplier = ($quantity * $servingSize) / $food->serving_size;

            $log->items()->create([
               'food_id' => $food->id,
               'quantity' => $quantity,
               'serving_size' => $servingSize,
               'calories' => $food->calories * $multiplier,
               'protein' => $food->protein * $multiplier,
               'fat' => $food->fat * $multiplier,
               'carbohydrate' => $food->carbohydrate * $multiplier,
            ]);
         }

         // Calculate totals
         $log->calculateTotals();

         return $log;
      });

      return response()->json([
         'message' => 'Log makanan berhasil ditambahkan',
         'food_log' => new FoodLogResource($log->load('items.food')),
      ], 201);
   }

   /**
    * Display the specified food log.
    */
   public function show(Request $request, Child $child, FoodLog $foodLog): JsonResponse
   {
      $this->authorizeChild($request, $child);
      $this->authorizeFoodLog($child, $foodLog);

      return response()->json([
         'food_log' => new FoodLogResource($foodLog->load('items.food')),
      ]);
   }

   /**
    * Update the specified food log.
    */
   public function update(UpdateFoodLogRequest $request, Child $child, FoodLog $foodLog): JsonResponse
   {
      $this->authorizeChild($request, $child);
      $this->authorizeFoodLog($child, $foodLog);

      DB::transaction(function () use ($request, $foodLog) {
         // Update basic info
         $foodLog->update($request->only(['log_date', 'meal_time', 'notes']));

         // If items are provided, replace them
         if ($request->has('items')) {
            $foodLog->items()->delete();

            foreach ($request->items as $item) {
               $food = Food::findOrFail($item['food_id']);

               $quantity = $item['quantity'] ?? 1;
               $servingSize = $item['serving_size'] ?? $food->serving_size;
               $multiplier = ($quantity * $servingSize) / $food->serving_size;

               $foodLog->items()->create([
                  'food_id' => $food->id,
                  'quantity' => $quantity,
                  'serving_size' => $servingSize,
                  'calories' => $food->calories * $multiplier,
                  'protein' => $food->protein * $multiplier,
                  'fat' => $food->fat * $multiplier,
                  'carbohydrate' => $food->carbohydrate * $multiplier,
               ]);
            }

            $foodLog->calculateTotals();
         }
      });

      return response()->json([
         'message' => 'Log makanan berhasil diperbarui',
         'food_log' => new FoodLogResource($foodLog->fresh()->load('items.food')),
      ]);
   }

   /**
    * Remove the specified food log.
    */
   public function destroy(Request $request, Child $child, FoodLog $foodLog): JsonResponse
   {
      $this->authorizeChild($request, $child);
      $this->authorizeFoodLog($child, $foodLog);

      $foodLog->items()->delete();
      $foodLog->delete();

      return response()->json([
         'message' => 'Log makanan berhasil dihapus',
      ]);
   }

   /**
    * Get nutrition summary for a period.
    */
   public function nutritionSummary(Request $request, Child $child): JsonResponse
   {
      $this->authorizeChild($request, $child);

      $request->validate([
         'period' => 'sometimes|in:day,week,month',
         'date' => 'sometimes|date',
      ]);

      $period = $request->get('period', 'day');
      $date = $request->get('date', today()->format('Y-m-d'));
      $baseDate = \Carbon\Carbon::parse($date);

      $query = $child->foodLogs();

      switch ($period) {
         case 'week':
            $startDate = $baseDate->copy()->startOfWeek();
            $endDate = $baseDate->copy()->endOfWeek();
            break;
         case 'month':
            $startDate = $baseDate->copy()->startOfMonth();
            $endDate = $baseDate->copy()->endOfMonth();
            break;
         default: // day
            $startDate = $baseDate->copy()->startOfDay();
            $endDate = $baseDate->copy()->endOfDay();
      }

      $logs = $query->whereBetween('log_date', [$startDate, $endDate])->get();

      $summary = [
         'period' => $period,
         'start_date' => $startDate->format('Y-m-d'),
         'end_date' => $endDate->format('Y-m-d'),
         'total_meals' => $logs->count(),
         'totals' => [
            'calories' => (float) $logs->sum('total_calories'),
            'protein' => (float) $logs->sum('total_protein'),
            'fat' => (float) $logs->sum('total_fat'),
            'carbohydrate' => (float) $logs->sum('total_carbohydrate'),
         ],
         'by_meal_time' => $logs->groupBy('meal_time')->map(function ($group) {
            return [
               'count' => $group->count(),
               'calories' => (float) $group->sum('total_calories'),
               'protein' => (float) $group->sum('total_protein'),
               'fat' => (float) $group->sum('total_fat'),
               'carbohydrate' => (float) $group->sum('total_carbohydrate'),
            ];
         }),
      ];

      if ($period !== 'day') {
         $days = $startDate->diffInDays($endDate) + 1;
         $summary['daily_average'] = [
            'calories' => round($summary['totals']['calories'] / $days, 2),
            'protein' => round($summary['totals']['protein'] / $days, 2),
            'fat' => round($summary['totals']['fat'] / $days, 2),
            'carbohydrate' => round($summary['totals']['carbohydrate'] / $days, 2),
         ];
      }

      return response()->json($summary);
   }

   /**
    * Authorize that child belongs to user.
    */
   private function authorizeChild(Request $request, Child $child): void
   {
      if ($child->user_id !== $request->user()->id) {
         abort(403, 'Anda tidak memiliki akses ke data anak ini');
      }
   }

   /**
    * Authorize that food log belongs to child.
    */
   private function authorizeFoodLog(Child $child, FoodLog $foodLog): void
   {
      if ($foodLog->child_id !== $child->id) {
         abort(404, 'Log makanan tidak ditemukan');
      }
   }
}
