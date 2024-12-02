<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
@include('header')

<div class="col-6 m-auto">
    <form method="post" class="p-3 border border-primary" action="{{ route('formemail.store') }}">
        @csrf
        <h3 class="h4 bg-info p-2 mx-n3 mt-n3 text-white">Gửi mail</h3>
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @if (session('info'))
            <div class="alert alert-success">
                <ul>
                    <li>{{ session('info') }}</li>
                </ul>
            </div>
        @endif

        <div class="form-group row">
            <label class="col-3">Email</label>
            <div class="col-9">
                <input value="{{ old('email') }}" type="text" class="form-control" name="email">
            </div>
        </div>

        <div class="form-group row">
            <label class="col-3">Tiêu Đề</label>
            <div class="col-9">
                <input value="{{ old('tieude') }}" type="text" class="form-control" name="tieude">
            </div>
        </div>

        <div class="form-group row">
            <label class="col-3">Nội dung</label>
            <div class="col-9">
                <textarea rows="5" class="form-control" name="noidung">{{ old('noidung') }}</textarea>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-12">
                <button type="submit" class="btn btn-primary w-25">Gửi</button>
            </div>
        </div>
    </form>
</div>
