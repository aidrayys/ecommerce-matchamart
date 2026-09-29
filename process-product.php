<?php

include "db.php";

$nama_produk = $_POST["nama_produk"];
$harga = $_POST["harga"];
$deskripsi = $_POST["deskripsi"];

if (
    empty($nama_produk) ||
    empty($harga) ||
    empty($deskripsi)
) {

    echo "Semua data produk wajib diisi.";

} else {

    $sql = "INSERT INTO products
            (nama_produk, harga, deskripsi, stok)
            VALUES
            ('$nama_produk', '$harga', '$deskripsi', 0)";

    if ($conn->query($sql) === TRUE) {

        echo "Produk berhasil ditambahkan!";

    } else {

        echo "Error: " . $conn->error;

    }

}

$conn->close();

?>