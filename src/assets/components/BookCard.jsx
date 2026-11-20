import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowUpRight } from "lucide-react";
export default function BookCard({ buku, favorit = [], onToggle }) {
  const isFavorit = favorit.includes(buku.id);
  return (
    <article className="book-card">
      <div className="book-cover-wrap">
        <Link to={`/detail/${buku.id}`} className="cover-link" aria-label={`Lihat ${buku.judul}`}>
          <img src={buku.gambar} alt={buku.judul} loading="lazy" />
        </Link>
        {buku.terbaru && <span className="book-tag">Pilihan terbaru</span>}
        <button className={`favorite ${isFavorit ? "active" : ""}`} onClick={() => onToggle(buku.id)} aria-label="Toggle favorit" title={isFavorit ? "Hapus dari favorit" : "Tambah ke favorit"}><Heart size={18} fill={isFavorit ? "currentColor" : "none"}/></button>
      </div>
      <div className="book-info">
        <span className="book-category">{buku.kategori}</span>
        <h3>{buku.judul}</h3>
        <p className="book-author">oleh {buku.penulis}</p>
        <Link to={`/detail/${buku.id}`} className="detail-btn">Jelajahi buku <ArrowUpRight size={16}/></Link>
      </div>
    </article>
  );
}
