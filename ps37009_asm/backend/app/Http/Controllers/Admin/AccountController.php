<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SMTPMail;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $account = Admin::orderBy('created_at', 'desc')->get();
        return response()->json($account);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate dữ liệu
        $validated = $request->validate([
            'fullname' => 'required',
            'email' => 'required|email',
            'rolechose' => 'required|numeric',
        ]);

        $checkEmail = Admin::where('email', $validated['email'])->first();
        if($checkEmail) {
            return response()->json(['error' => 'Email đã tồn tại'], 400);
        }

        $password = $this->randomPassword();

        $subject = 'Tài khoản admin web tin tức!';
        $details = [
            'fullname' => $validated['fullname'],
            'password' => $password,
        ];

        Mail::to($validated['email'])->send(new SMTPMail($subject, $details));

        $account = Admin::create([
            'fullname' => $validated['fullname'],
            'email' => $validated['email'],
            'pass' => $password,
            'role' => $validated['rolechose'],
        ]);

        $account->refresh();

        if(!$account) {
            return response()->json(['error' => 'Tạo tài khoản thất bại'], 500);
        }

        // Trả về thông báo
        return response()->json(['message' => 'Gửi mail thành công', 'newAccount' => $account], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    private function randomPassword($length = 8) {
        $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $password = '';
        for ($i = 0; $i < $length; $i++) {
            $password .= $characters[random_int(0, strlen($characters) - 1)];
        }
        return $password;
    }
}
