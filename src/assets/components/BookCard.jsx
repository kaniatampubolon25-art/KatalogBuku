import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function BookCard({ buku, favorit, onToggle }) {
    const isFavorit = favorit.includes(buku.id);

    return (
        <div className="book-card">
            <img src={buku.gambar} alt={buku.judul} />

            <div className="book-info">
                <h3>{buku.judul}</h3>
                <p>{buku.penulis}</p>
                <span>{buku.kategori}</span>

                <div className="book-actions">
                    <Link to={`/detail/${buku.id}`} className="detail-btn">
                        Lihat Detail
                    </Link>

                    <button
                        className={isFavorit ? "favorite active" : "favorite"}
                        onClick={() => onToggle(buku.id)}
                        aria-label="Tambah atau hapus favorit"
                    >
                        <Heart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}