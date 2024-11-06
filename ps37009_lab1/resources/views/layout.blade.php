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
        ul{
            list-style: none;
        }
        a{
            text-decoration: none;
        }

        header {
            background: #e3e3e3;
            padding: 2em;
            text-align: center;
        }

        header ul {
            display: flex;
            justify-content: center;
            gap: 10px;
        }

        header ul li a{
            display: block;
            background-color: green;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
        }
        header ul li a:hover{
            background-color: darkgreen;
            box-shadow: inset -2px -2px 15px rgba(170, 170, 170,0.7);
        }

        header ul li a.active{
            background-color: rgb(0, 61, 0);
            box-shadow: inset -2px -2px 15px rgba(170, 170, 170,0.7);
        }


    </style>
</head>
<body>
    
    <header>
            <ul>
                <li><a href="/bai1">Cài đặt thành công laravel</a></li>
                <li><a href="/index">index</a></li>
                <li><a href="/lien-he">Liên Hệ</a></li>
                <li><a href="#" id="lay1tin">Lấy 1 tin</a><input type="number" onchange="lay1tin(this)"></li>
                <li><a href="/sinh-vien">Sinh Viên</a></li>
            </ul>
    </header>

    <script>
        function lay1tin(input){
            const id = input.value;
            const baseUrl = '/ct/';
            const a = document.getElementById('lay1tin');
            if(id == ''){
                a.href = '#';
                return;
            }
            a.href = baseUrl + id;
        }
    </script>

    @yield('content')

</body>
</html>