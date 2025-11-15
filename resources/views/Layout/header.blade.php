<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dashboard KAI</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
<!-- HEADER -->
  <div class="header-bg mb-4 text-center d-flex justify-content-between align-items-center px-4 py-3">
    <div>
      <h2 class="fw-bold m-0">Dashboard KAI</h2>
      <p class="m-0">Selamat datang di layanan Kereta Api Indonesia</p>
    </div>
    <a href="/logout" class="btn btn-light shadow-sm fw-bold px-3 py-2 rounded-4 d-none d-md-block">Logout</a>
  </div>

  <div class="container mb-5">

    <!-- Search Bar -->
    <div class="row mb-4">
      <div class="col-12 col-lg-6 mx-auto">
        <input type="text" id="searchStation" class="form-control form-control-lg shadow-sm" placeholder="🔍 Cari stasiun atau aset..." />
      </div>
    </div>


  <!-- Summary cards -->
  <div class="row g-3 mb-4 text-center">
    <div class="col-6 col-md-3">
      <div class="card shadow-sm p-3 rounded-4">
        <div class="card-icon">📹</div>
        <h6 class="fw-bold">Total CCTV</h6>
      </div>
    </div>

    <div class="col-6 col-md-3">
      <div class="card shadow-sm p-3 rounded-4">
        <div class="card-icon">💻</div>
        <h6 class="fw-bold">Total Komputer</h6>
      </div>
    </div>

    <div class="col-6 col-md-3">
      <div class="card shadow-sm p-3 rounded-4">
        <div class="card-icon">🛠️</div>
        <h6 class="fw-bold">Total Peralatan</h6>
      </div>
    </div>

    <div class="col-6 col-md-3">
      <div class="card shadow-sm p-3 rounded-4">
        <div class="card-icon">📦</div>
        <h6 class="fw-bold">Kondisi Baik</h6>
      </div>
    </div>
  </div>

  @yield('content')   <!-- Tempat konten utama -->
  @yield('akun')
 <nav class="navbar fixed-bottom navbar-light bg-white border-top d-md-none">
    <div class="container d-flex justify-content-around">
      <a class="nav-link active text-center" href="#">🏠<br><small>Home</small></a>
      <a class="nav-link text-center" href="#">📊<br><small>Monitoring</small></a>
      <a class="nav-link text-center" href="#">🛠️<br><small>Aset</small></a>
      <a class="nav-link text-center" href="/akun">🚪<br><small>Akun</small></a>
    </div>
  </nav>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
