<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RuleNhapSV extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'masv' => 'required|alpha_num|min:3|max:10',
            'hoten' => 'required|min:3|max:50',
            'tuoi' => 'required|integer|min:18|max:30',
            'ngaysinh' => 'required|date',
            'cmnd' => 'required|digits:9',
            'email' => 'required|email',
        ];
    }

    public function messages()
    {
        return [
            'masv.required' => 'Mã sinh viên không được bỏ trống.',
            'masv.alpha_num' => 'Mã sinh viên chỉ được chứa chữ cái và số.',
            'masv.min' => 'Mã sinh viên phải chứa ít nhất 3 ký tự.',
            'hoten.required' => 'Họ tên không được bỏ trống.',
            'tuoi.integer' => 'Tuổi phải là số nguyên.',
            'cmnd.digits' => 'CMND phải chứa đúng 9 chữ số.',
            'email.required' => 'Email không được bỏ trống.',
            'email.email' => 'Email không hợp lệ.',
        ];
    }

    public function attributes()
    {
        return [
            'masv' => 'Mã sinh viên',
            'hoten' => 'Họ tên',
            'tuoi' => 'Tuổi',
            'ngaysinh' => 'Ngày sinh',
            'cmnd' => 'CMND',
            'email' => 'Email',
        ];
    }
}
