<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        if (!$token) {
            return Response()->json(['message' => 'Đăng nhập đã hết hạn, vui lòng đăng nhập lại'], 401);
        }
        $decoded = null;
        try {
            // Giải mã token bằng secret key
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

            // Gắn thông tin payload vào request
            $request->merge([
                'jwt_payload' => (array) $decoded,
                'user_id' => $decoded->sub ?? null,
                'user_role' => $decoded->role ?? null,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Token is invalid',
                'message' => $e->getMessage(),
            ], 401);
        }
        
        
        return Response()->json(['message' => $decoded], 200);
        return $next($request);
    }
}
