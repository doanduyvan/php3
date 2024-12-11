<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        .email-header {
            text-align: center;
            background-color: #4CAF50;
            color: white;
            padding: 15px 0;
            border-radius: 8px 8px 0 0;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            text-align: left;
        }
        .email-body p {
            line-height: 1.6;
            font-size: 16px;
        }
        .email-body .password-box {
            background-color: #f3f4f6;
            padding: 10px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            color: #333;
            margin: 20px 0;
        }
        .email-footer {
            text-align: center;
            font-size: 14px;
            color: #777;
            margin-top: 20px;
        }
        .email-footer p {
            margin: 5px 0;
        }
        .email-footer a {
            color: #4CAF50;
            text-decoration: none;
        }
        .email-footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Created Account Admin</h1>
        </div>
        <div class="email-body">
            <p>Hi <strong>{{ $details['fullname'] }}</strong>,</p>
            <p>You recently requested to reset your password. Here is your temporary password:</p>
            <div class="password-box">
                {{ $details['password'] }}
            </div>
            <p>Please use this temporary password to log in to your account. Make sure to update your password after logging in for better security.</p>
            <p>If you didn’t request a password reset, please ignore this email or contact support if you have questions.</p>
        </div>
        <div class="email-footer">
            <p>Thanks,<br>The {{ config('app.name') }} Team</p>
            <p><a href="{{ config('app.url') }}">{{ config('app.url') }}</a></p>
        </div>
    </div>
</body>
</html>
