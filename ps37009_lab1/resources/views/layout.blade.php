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
                <li><a href="/" class="active">Bài 1</a></li>
                <li><a href="/about">Bài 2</a></li>
                <li><a href="/contact">Bài 3</a></li>
            </ul>
    </header>

    @yield('content')

</body>
</html>