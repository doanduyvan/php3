

<style>

    .nav-custom {
        background-color: #cacaca;
        overflow: hidden;
    }

    .nav-custom ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #dadada;
        padding-left: 20px;
    }

    .nav-custom li {
        float: left;
    }

    .nav-custom li a button,
    .nav-custom li a {
        display: block;
        color: black;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    .nav-custom li a:hover {
        background-color: #e9e9e9;
    }
</style>
<nav class="nav-custom">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="{{ route('dashboard') }}">Dashboard</a></li>
        <li><a href="{{ route('quantri') }}">Quản Trị</a></li>
        <li><a href="{{ route('quantritin') }}">Quản Trị Tin</a></li>
        <li><a href="{{ route('download') }}">DownLoad</a></li>
        <li><a href="{{ route('protected') }}">Protected</a></li>
        <li><a href="{{ route('logout') }}"
            onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
            >Log Out</a></li>
    </ul>
</nav>

<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
    @csrf
</form>