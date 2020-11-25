<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>SuperToDo</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <style>
        body {
            font-family: 'Nunito';
            /*background-color: #6893cc;*/
        }
    </style>
</head>
<body>
<div class="container" id="app">

    {{--<div>--}}
        {{--<div>--}}
            {{--<h1>Super Todo</h1>--}}
        {{--</div>--}}

        {{--<div>--}}
            {{--<form class="form-inline">--}}
                {{--<label class="sr-only" for="title">Title</label>--}}
                {{--<input type="text" class="form-control mb-2 mr-sm-2" id="title" placeholder="The task">--}}

                {{--<button type="submit" class="btn btn-primary mb-2">Add</button>--}}
            {{--</form>--}}
        {{--</div>--}}

        {{--<div class="todo">--}}

            {{--<div class="list-group">--}}
                {{--<a href="#" class="list-group-item list-group-item-action">--}}
                    {{--<div class="form-check">--}}
                        {{--<input type="checkbox" name="task" class="form-check-input">--}}
                        {{--Cras justo odio--}}
                    {{--</div>--}}
                {{--</a>--}}
                {{--<a href="#" class="list-group-item list-group-item-action">--}}
                    {{--<div class="form-check">--}}
                        {{--<input type="checkbox" name="task" class="form-check-input">--}}
                        {{--Another Task--}}
                    {{--</div>--}}
                {{--</a>--}}

            {{--</div>--}}

        {{--</div>--}}

    {{--</div>--}}
</div>
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="js/app.js"></script>
</body>
</html>
