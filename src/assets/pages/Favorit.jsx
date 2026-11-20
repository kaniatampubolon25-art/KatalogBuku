import React from "react";
import { Link } from "react-router-dom";
import { buku } from "../data/Buku";
import BookCard from "../components/BookCard";
import { Heart } from "lucide-react";
export default function Favorit({ favorit, onToggle }) {
  const daftarFavorit = buku.filter((item) => favorit.includes(item.id));
  return <main className="favorite-page"><div className="container"><section className="catalog-intro favorite-intro"><span className="eyebrow"><Heart size={14}/> KOLEKSI PERSONAL</span><h1>Buku yang kamu<br/><em>sayangi.</em></h1><p>Semua bacaan yang kamu tandai, terkumpul di satu tempat.</p></section><div className="catalog-results"><span><strong>{daftarFavorit.length}</strong> buku tersimpan</span></div>{daftarFavorit.length ? <div className="book-grid">{daftarFavorit.map((item) => <BookCard key={item.id} buku={item} favorit={favorit} onToggle={onToggle}/>)}</div> : <div className="buku-kosong"><div className="empty-icon"><Heart/></div><h2>Belum ada buku favorit</h2><p>Tekan ikon hati pada buku yang ingin kamu simpan di sini.</p><Link to="/katalog" className="btn-primary">Cari buku favorit <span>→</span></Link></div>}</div></main>;
}
