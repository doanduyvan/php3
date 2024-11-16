<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        header{
            background-color: #333;
            color: white;
            padding: 10px;
        }
        header ul{
            list-style-type: none;
            display: flex;
            gap: 10px;
        }
        header ul li{
            display: inline;
            margin-right: 10px;
        }
        header ul li a{
            color: white;
            display: block;
            text-decoration: none;
            box-shadow: 0 0 2px gray;
            padding: 5px 10px;
            border-radius: 5px;
            background: gray;
        }
        main{
            padding: 20px;
        }
    </style>
</head>
<body>
    <header>
        <ul>
            <li><a href="/tin-xem-nhieu">Tin xem nhiều</a></li>
            <li><a href="/tin-moi">Tin mới</a></li>
            <li><a href="/danh-muc">Danh mục</a></li>
        </ul>
    </header>

    <main>
        @yield('content')
    </main>
</body>
</html>