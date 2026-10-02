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
        <input type="text" name="nama_produk" required>

        <br><br>

        <label>Kategori</label><br>
        <select name="kategori" required>
            <option value="">-- Pilih Kategori --</option>
            <option value="Drink">Drink</option>
            <option value="Dessert">Dessert</option>
            <option value="Merch">Merch</option>
        </select>

        <br><br>

        <label>Harga</label><br>
        <input type="number" name="harga" required>

        <br><br>

        <label>Stok</label><br>
        <input type="number" name="stok" value="0" min="0" required>

        <br><br>

        <label>Deskripsi</label><br>
        <textarea name="deskripsi" required></textarea>

        <br><br>

        <label>Gambar (path, contoh: img/produk.jpg)</label><br>
        <input type="text" name="image">

        <br><br>

        <button type="submit">
            Tambah Produk
        </button>

    </form>

</body>

</html>