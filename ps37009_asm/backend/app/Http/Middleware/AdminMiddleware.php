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
    public function handle(Request $request, Closure $next, $role = null)
    {
        $token = $request->bearerToken();
        if (!$token) {
            return Response()->json(['error' => 'Bạn chưa đăng nhập'], 401);
        }
        try {
            // Giải mã token bằng secret key
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

            if (isset($decoded->exp) && $decoded->exp < time()) {
                return response()->json(['error' => 'Token đã hết hạn, vui lòng đăng nhập lại!'], 401);
            }

            // Gắn thông tin payload vào request
            $request->merge([
                'idadmin' => $decoded->sub ?? null,
                'role' => $decoded->role ?? null,
            ]);

            if ($role !== null) {
                $rolesArray = explode('.', $role); // Tách chuỗi role thành mảng

                if (!isset($decoded->role) || !in_array($decoded->role, $rolesArray)) {
                    return response()->json(['error' => 'Bạn không có quyền thực hiện chức năng này!'], 403);
                }
            }

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Token Không hợp lệ'
            ], 401);
        }
        
        return $next($request);
    }
}
