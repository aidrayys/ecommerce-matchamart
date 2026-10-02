<?php

include "db.php";

$nama_produk = $_POST["nama_produk"] ?? "";
$kategori = $_POST["kategori"] ?? "";
$harga = $_POST["harga"] ?? "";
$deskripsi = $_POST["deskripsi"] ?? "";
$stok = $_POST["stok"] ?? 0;
$image = $_POST["image"] ?? "";

if (
    empty($nama_produk) ||
    empty($kategori) ||
    empty($harga) ||
    empty($deskripsi)
) {

    echo "Semua data produk wajib diisi.";

} else {

    $harga = (int) $harga;
    $stok = (int) $stok;
    $image = trim($image);

    $sql = "INSERT INTO products
            (nama_produk, kategori, harga, deskripsi, stok, image)
            VALUES
            (?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssisis", $nama_produk, $kategori, $harga, $deskripsi, $stok, $image);

    if ($stmt->execute() === TRUE) {

        echo "Produk berhasil ditambahkan!";

    } else {

        echo "Error: " . $stmt->error;

    }

    $stmt->close();

}

$conn->close();

?>