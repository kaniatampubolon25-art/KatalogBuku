import React from "react";
import { Link } from "react-router-dom";
import { buku } from "../data/Buku";
import BookCard from "../components/BookCard";
import { ArrowRight, Sparkles, BookOpen, Heart, Search } from "lucide-react";
export default function Beranda({ favorit, onToggle, recent = [] }) {
  const recentBooks = recent.map((id) => buku.find((book) => book.id === id)).filter(Boolean);
  return (
    <main className="home-page">
      <div className="container">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={14}/> SELAMAT DATANG DI PUSTAKA KITA</span>
            <h1>Setiap buku,<br/><em>sebuah dunia</em> baru.</h1>
            <p>Temukan bacaan yang menemani hari, membuka perspektif, dan membawa kamu ke cerita yang belum pernah dibayangkan.</p>
            <div className="hero-actions"><Link to="/katalog" className="btn-primary">Jelajahi koleksi <ArrowRight size={17}/></Link><Link to="/favorit" className="hero-secondary"><Heart size={16}/> Buku favoritmu</Link></div>
            <div className="hero-note"><span className="note-dot"/> Kurasi bacaan untuk rasa ingin tahu yang tak ada habisnya</div>
          </div>
          <div className="hero-art" aria-label="Koleksi buku pilihan">
            <div className="hero-sun"/><div className="hero-label">READ<br/>AND GROW</div>
            <div className="hero-books">
              <div className="hero-book hero-book-one"><img src={buku[1].gambar} alt={buku[1].judul}/></div>
              <div className="hero-book hero-book-two"><img src={buku[4].gambar} alt={buku[4].judul}/></div>
              <div className="hero-book hero-book-three"><img src={buku[3].gambar} alt={buku[3].judul}/></div>
            </div>
            <div className="hero-art-caption">A little escape<br/>between pages ✦</div>
          </div>
        </section>
        <div className="quick-stats">
          <div><BookOpen/><strong>{buku.length}</strong><span>koleksi bacaan</span></div>
          <div><Heart/><strong>{favorit.length}</strong><span>buku favoritmu</span></div>
          <div><Search/><strong>∞</strong><span>cerita untuk ditemukan</span></div>
        </div>
        <section className="section-block">
          <div className="section-heading"><div><span className="eyebrow">DIPILIH UNTUKMU</span><h2>Mulai dari sini</h2><p>Beberapa bacaan yang mungkin akan kamu suka.</p></div><Link to="/katalog" className="text-link">Lihat semua koleksi <ArrowRight size={16}/></Link></div>
          <div className="book-grid">{buku.slice(0, 4).map((item) => <BookCard key={item.id} buku={item} favorit={favorit} onToggle={onToggle}/>)}</div>
        </section>
        {recentBooks.length > 0 && <section className="section-block recent-section"><div className="section-heading"><div><span className="eyebrow">LANJUTKAN PENJELAJAHAN</span><h2>Terakhir kamu lihat</h2></div></div><div className="book-grid">{recentBooks.map((item) => <BookCard key={item.id} buku={item} favorit={favorit} onToggle={onToggle}/>)}</div></section>}
        <section className="quote-banner"><span className="quote-mark">“</span><div><p>Books are a uniquely portable magic.</p><small>— Stephen King</small></div><span className="quote-flower">✳</span></section>
      </div>
    </main>
  );
}
