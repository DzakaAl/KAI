<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Dashboard KAI</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light p-5">
  <div class="container text-center">
    <h1>Selamat datang, {{ $user->name }}</h1>
    <p>Email: {{ $user->email }}</p>
    <p>Nomor HP: {{ $user->phone }}</p>
    <a href="{{ route('logout') }}" class="btn btn-danger mt-3">Logout</a>
  </div>
</body>
</html>
