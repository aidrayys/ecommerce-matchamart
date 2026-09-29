<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Produk - MatchaMart</title>
</head>

<body>

    <h1>Tambah Produk</h1>

    <form action="process-product.php" method="POST">

        <label>Nama Produk</label><br>
        <input type="text" name="nama_produk">

        <br><br>

        <label>Harga</label><br>
        <input type="number" name="harga">

        <br><br>

        <label>Deskripsi</label><br>
        <textarea name="deskripsi"></textarea>

        <br><br>

        <button type="submit">
            Tambah Produk
        </button>

    </form>

</body>

</html>