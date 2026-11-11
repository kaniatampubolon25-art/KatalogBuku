import React from "react";
import { useParams, Link } from "react-router-dom";
import { buku } from "../data/Buku";

export default function DetailBuku() {
    const { id } = useParams();

    const detail = buku.find(
        (item) => item.id === Number(id)
    );

    if (!detail) {
        return (
            <div className="container">
                <h2>Buku tidak ditemukan.</h2>
                <Link to="/katalog">Kembali ke Katalog</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="section-title">Informasi Buku</h1>

            <div className="detail-container">
                <img
                    src={detail.gambar}
                    alt={detail.judul}
                />

                <div className="detail-info">
                    <h1>{detail.judul}</h1>

                    <p>
                        <b>Penulis:</b> {detail.penulis}
                    </p>

                    <p>
                        <b>Kategori:</b> {detail.kategori}
                    </p>

                    <p>
                        <b>Tahun Terbit:</b> {detail.tahun}
                    </p>

                    <p>
                        <b>Bahasa:</b> {detail.bahasa}
                    </p>

                    <h3>Sinopsis</h3>
                    <p>{detail.sinopsis}</p>

                    <h3>Tema Buku</h3>
                    <p>{detail.tema}</p>

                    <Link to="/katalog" className="btn-primary">
                        Kembali ke Katalog
                    </Link>
                </div>
            </div>
        </div>
    );
}