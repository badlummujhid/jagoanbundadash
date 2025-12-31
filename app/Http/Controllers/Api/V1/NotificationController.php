<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class NotificationController extends Controller
{
   /**
    * Display a listing of notifications.
    */
   public function index(Request $request): AnonymousResourceCollection
   {
      $query = $request->user()->notifications();

      // Filter by read status
      if ($request->has('unread_only') && $request->boolean('unread_only')) {
         $query->unread();
      }

      // Filter by type
      if ($request->has('type')) {
         $query->where('type', $request->type);
      }

      $notifications = $query->orderByDesc('created_at')
         ->paginate($request->get('per_page', 20));

      return NotificationResource::collection($notifications);
   }

   /**
    * Mark a notification as read.
    */
   public function markAsRead(Request $request, Notification $notification): JsonResponse
   {
      // Authorize
      if ($notification->user_id !== $request->user()->id) {
         abort(403, 'Anda tidak memiliki akses ke notifikasi ini');
      }

      $notification->markAsRead();

      return response()->json([
         'message' => 'Notifikasi ditandai sudah dibaca',
         'notification' => new NotificationResource($notification->fresh()),
      ]);
   }

   /**
    * Mark all notifications as read.
    */
   public function markAllAsRead(Request $request): JsonResponse
   {
      $request->user()->notifications()
         ->unread()
         ->update(['read_at' => now()]);

      return response()->json([
         'message' => 'Semua notifikasi ditandai sudah dibaca',
      ]);
   }

   /**
    * Remove the specified notification.
    */
   public function destroy(Request $request, Notification $notification): JsonResponse
   {
      // Authorize
      if ($notification->user_id !== $request->user()->id) {
         abort(403, 'Anda tidak memiliki akses ke notifikasi ini');
      }

      $notification->delete();

      return response()->json([
         'message' => 'Notifikasi berhasil dihapus',
      ]);
   }

   /**
    * Get unread notification count.
    */
   public function unreadCount(Request $request): JsonResponse
   {
      $count = $request->user()->notifications()->unread()->count();

      return response()->json([
         'unread_count' => $count,
      ]);
   }
}
