
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { buku } from "../data/Buku";
import {
    ArrowLeft,
    Heart,
    BookOpen,
    ArrowRight
} from "lucide-react";

export default function DetailBuku({
    favorit = [],
    onToggle,
    onView,
    bukuTambahan = []
}) {
    const { id } = useParams();

    // Menggabungkan koleksi buku bawaan dan tambahan
    const semuaBuku = [...buku, ...bukuTambahan];

    // Mencari buku berdasarkan ID
    const detail = semuaBuku.find(
        (item) => String(item.id) === id
    );

    useEffect(() => {
        if (detail && onView) {
            onView(detail.id);
        }
    }, [detail?.id]);

    if (!detail) {
        return (
            <main className="container">
                <div className="buku-kosong">
                    <h2>Buku tidak ditemukan.</h2>

                    <Link to="/katalog" className="btn-primary">
                        Kembali ke Katalog
                    </Link>
                </div>
            </main>
        );
    }

    const isFavorit = favorit.includes(detail.id);

    return (
        <main className="detail-page">
            <div className="container">

                <Link to="/katalog" className="back-link">
                    <ArrowLeft size={16} />
                    Kembali ke koleksi
                </Link>

                <div className="detail-container">

                    <div className="detail-cover">
                        {detail.gambar ? (
                            <img
                                src={detail.gambar}
                                alt={detail.judul}
                            />
                        ) : (
                            <div className="empty-icon">
                                <BookOpen />
                            </div>
                        )}

                        <div className="cover-shadow" />
                    </div>

                    <div className="detail-info">

                        <span className="eyebrow">
                            {detail.kategori}
                        </span>

                        <h1>{detail.judul}</h1>

                        <p className="detail-author">
                            Ditulis oleh{" "}
                            <strong>{detail.penulis}</strong>
                        </p>

                        <div className="detail-meta">

                            <div>
                                <span>Tahun terbit</span>
                                <strong>{detail.tahun}</strong>
                            </div>

                            <div>
                                <span>Bahasa</span>
                                <strong>
                                    {detail.bahasa || "Indonesia"}
                                </strong>
                            </div>

                        </div>

                        <div className="detail-divider" />

                        <h3>Sinopsis</h3>

                        <p className="detail-description">
                            {detail.sinopsis}
                        </p>

                        <h3>Tema cerita</h3>

                        <p className="detail-description">
                            {detail.tema || "Belum tersedia"}
                        </p>

                        <div className="detail-buttons">

                            <button
                                className="btn-primary"
                                onClick={() => onToggle(detail.id)}
                            >
                                <Heart
                                    size={17}
                                    fill={
                                        isFavorit
                                            ? "currentColor"
                                            : "none"
                                    }
                                />

                                {isFavorit
                                    ? "Hapus dari Favorit"
                                    : "Simpan ke Favorit"}
                            </button>

                            <Link
                                to="/katalog"
                                className="detail-outline"
                            >
                                Jelajahi buku lain
                                <ArrowRight size={16} />
                            </Link>

                        </div>

                    </div>
                </div>

                <div className="detail-footnote">
                    <BookOpen size={16} />
                    Luangkan waktu, buka halaman, dan temukan sesuatu yang baru.
                </div>

            </div>
        </main>
    );
}
