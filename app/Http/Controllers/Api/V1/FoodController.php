<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Food\StoreFoodRequest;
use App\Http\Resources\Api\V1\FoodResource;
use App\Models\Food;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FoodController extends Controller
{
   /**
    * Display a listing of foods.
    */
   public function index(Request $request): AnonymousResourceCollection
   {
      $query = Food::query()
         ->where('is_active', true)
         ->where(function ($q) use ($request) {
            // Show system foods and user's own foods
            $q->where('is_system', true)
               ->orWhere('created_by', $request->user()->id);
         });

      // Search by name
      if ($request->has('search')) {
         $query->where('name', 'like', '%' . $request->search . '%');
      }

      // Filter by category
      if ($request->has('category')) {
         $query->where('category', $request->category);
      }

      $foods = $query->orderBy('name')->paginate($request->get('per_page', 50));

      return FoodResource::collection($foods);
   }

   /**
    * Store a newly created custom food.
    */
   public function store(StoreFoodRequest $request): JsonResponse
   {
      $data = $request->validated();
      $data['created_by'] = $request->user()->id;
      $data['is_system'] = false;

      $food = Food::create($data);

      return response()->json([
         'message' => 'Makanan berhasil ditambahkan',
         'food' => new FoodResource($food),
      ], 201);
   }

   /**
    * Display the specified food.
    */
   public function show(Food $food): JsonResponse
   {
      return response()->json([
         'food' => new FoodResource($food),
      ]);
   }

   /**
    * Update the specified food.
    */
   public function update(Request $request, Food $food): JsonResponse
   {
      // Only allow updating user's own foods
      if ($food->is_system || $food->created_by !== $request->user()->id) {
         abort(403, 'Anda tidak dapat mengubah makanan ini');
      }

      $request->validate([
         'name' => 'sometimes|string|max:255',
         'category' => 'sometimes|string|max:100',
         'serving_size' => 'sometimes|numeric|min:1',
         'calories' => 'sometimes|numeric|min:0',
         'protein' => 'sometimes|numeric|min:0',
         'fat' => 'sometimes|numeric|min:0',
         'carbohydrate' => 'sometimes|numeric|min:0',
         'fiber' => 'sometimes|nullable|numeric|min:0',
         'sugar' => 'sometimes|nullable|numeric|min:0',
      ]);

      $food->update($request->only([
         'name',
         'category',
         'serving_size',
         'calories',
         'protein',
         'fat',
         'carbohydrate',
         'fiber',
         'sugar'
      ]));

      return response()->json([
         'message' => 'Makanan berhasil diperbarui',
         'food' => new FoodResource($food->fresh()),
      ]);
   }

   /**
    * Remove the specified food (soft delete).
    */
   public function destroy(Request $request, Food $food): JsonResponse
   {
      // Only allow deleting user's own foods
      if ($food->is_system || $food->created_by !== $request->user()->id) {
         abort(403, 'Anda tidak dapat menghapus makanan ini');
      }

      $food->update(['is_active' => false]);

      return response()->json([
         'message' => 'Makanan berhasil dihapus',
      ]);
   }

   /**
    * Get all food categories.
    */
   public function categories(): JsonResponse
   {
      $categories = Food::where('is_active', true)
         ->distinct()
         ->pluck('category')
         ->filter()
         ->values();

      return response()->json([
         'categories' => $categories,
      ]);
   }
}
