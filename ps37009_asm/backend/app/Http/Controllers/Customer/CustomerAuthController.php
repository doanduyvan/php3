<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\Customer;

class CustomerAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = auth('customer')->attempt($credentials)) {
                return response()->json(['error' => 'Tài khoản hoặc mật khẩu không chính xác'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }
        return $this->respondWithToken($token);
    }

    public function signup(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:3',         
            'fullname' => 'required|string|max:255',         
        ]);

        $check = Customer::where('email', $request->email)->first();
        if ($check) {
            return response()->json(['error' => 'Email đã tồn tại!'], 400);
        }

        $dataSave = [
            'email' => $request->email,
            'pass' => $request->password,
            'fullname' => $request->fullname,
        ];

        $customer = Customer::create($dataSave);
        if($customer){
            return response()->json(['message' => 'Đăng ký thành công!'], 201);
        }else{
            return response()->json(['error' => 'Đăng ký thất bại!'], 400);
        }
    }

    public function me()
    {
        return response()->json(JWTAuth::guard('customer')->user());
    }

    public function logout()
    {
        JWTAuth::guard('customer')->logout();
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
