<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use App\Http\Controllers\Controller;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = auth('admin')->attempt($credentials)) {
                return response()->json(['error' => 'Tài khoản hoặc mật khẩu không chính xác'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        return $this->respondWithToken($token);
    }

    public function me()
    {
        // return response()->json(JWTAuth::guard('admin')->user());
        try {
            // Lấy thông tin người dùng từ token
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Token is invalid or expired'], 401);
        }

        // Trả về thông tin người dùng
        return response()->json(compact('user'));
    }

    public function logout()
    {
        JWTAuth::guard('admin')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ]);
    }
}
