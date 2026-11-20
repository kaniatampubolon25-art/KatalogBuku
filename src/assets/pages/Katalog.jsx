import React, { useMemo, useState } from "react";
import { buku } from "../data/Buku";
import BookCard from "../components/BookCard";
import { Search, SlidersHorizontal, X } from "lucide-react";
export default function Katalog({ favorit, onToggle }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urutkan, setUrutkan] = useState("default");
  const daftarKategori = ["Semua", ...new Set(buku.map((item) => item.kategori))];
  const hasilFilter = useMemo(() => {
    const filtered = buku.filter((item) => {
      const keyword = cari.toLowerCase();
      const cocok = `${item.judul} ${item.penulis} ${item.kategori}`.toLowerCase().includes(keyword);
      return cocok && (kategori === "Semua" || item.kategori === kategori);
    });
    if (urutkan === "az") filtered.sort((a, b) => a.judul.localeCompare(b.judul));
    if (urutkan === "terbaru") filtered.sort((a, b) => (parseInt(b.tahun) || 0) - (parseInt(a.tahun) || 0));
    return filtered;
  }, [cari, kategori, urutkan]);
  return (
    <main className="catalog-page"><div className="container">
      <section className="catalog-intro"><span className="eyebrow">PERPUSTAKAAN DIGITAL</span><h1>Temukan bacaan<br/><em>favorit berikutnya.</em></h1><p>Telusuri koleksi, cari topik yang kamu suka, dan temukan cerita baru.</p></section>
      <section className="catalog-tools">
        <div className="search-wrap"><Search size={19}/><input className="search-input" value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Cari judul, penulis, atau kategori..."/>{cari && <button onClick={() => setCari("")} aria-label="Hapus pencarian"><X size={16}/></button>}</div>
        <div className="filter-row"><div className="filter-label"><SlidersHorizontal size={16}/> Filter koleksi</div><div className="category-chips">{daftarKategori.map((item) => <button key={item} className={`category-chip ${kategori === item ? "selected" : ""}`} onClick={() => setKategori(item)}>{item}</button>)}</div><select className="sort-select" value={urutkan} onChange={(e) => setUrutkan(e.target.value)} aria-label="Urutkan buku"><option value="default">Urutan default</option><option value="az">Judul A–Z</option><option value="terbaru">Tahun terbaru</option></select></div>
      </section>
      <div className="catalog-results"><span><strong>{hasilFilter.length}</strong> buku ditemukan</span>{(cari || kategori !== "Semua" || urutkan !== "default") && <button className="clear-filter" onClick={() => {setCari("");setKategori("Semua");setUrutkan("default");}}>Reset filter <X size={14}/></button>}</div>
      {hasilFilter.length ? <div className="book-grid">{hasilFilter.map((item) => <BookCard key={item.id} buku={item} favorit={favorit} onToggle={onToggle}/>)}</div> : <div className="buku-kosong"><div className="empty-icon"><Search/></div><h2>Belum menemukan buku</h2><p>Coba kata kunci lain atau pilih kategori berbeda.</p><button onClick={() => {setCari("");setKategori("Semua");}}>Tampilkan semua buku</button></div>}
    </div></main>
  );
}
