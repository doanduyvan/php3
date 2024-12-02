@include('nav')

<p>Chào bạn {{ Auth::user()->name }}!</p>
<p>Đây là trang download software, chỉ dành cho thành viên đã đăng nhập.</p>
 <form method="POST" action="{{ route('logout') }}">
    @csrf
    <x-button class="ml-4">
        {{ __('Thoát') }}
    </x-button>