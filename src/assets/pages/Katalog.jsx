
import React, { useState } from "react";
import { buku } from "../data/Buku";
import BookCard from "../components/BookCard";

export default function Katalog({ favorit, onToggle }) {

    const [cari, setCari] = useState("");
    const [kategori, setKategori] = useState("Semua");
    const [urutkan, setUrutkan] = useState("default");

    // Mengambil kategori yang tersedia
    const daftarKategori = [
        "Semua",
        ...new Set(buku.map((item) => item.kategori))
    ];

    // Filter berdasarkan pencarian dan kategori
    let hasilFilter = buku.filter((item) => {
        const cocokJudul = item.judul
            .toLowerCase()
            .includes(cari.toLowerCase());

        const cocokKategori =
            kategori === "Semua" ||
            item.kategori === kategori;

        return cocokJudul && cocokKategori;
    });

    // Mengurutkan buku
    if (urutkan === "az") {
        hasilFilter.sort((a, b) =>
            a.judul.localeCompare(b.judul)
        );
    } else if (urutkan === "terbaru") {
        hasilFilter.sort((a, b) => {
            const tahunA = parseInt(a.tahun) || 0;
            const tahunB = parseInt(b.tahun) || 0;

            return tahunB - tahunA;
        });
    }

    return (
        <div className="container">

            <h1 className="section-title">
                Katalog Buku
            </h1>

            <p className="katalog-description">
                Temukan berbagai buku menarik di Pustaka Kita.
            </p>

            {/* Pencarian Buku */}
            <input
                type="text"
                className="search-input"
                placeholder="Cari judul buku..."
                value={cari}
                onChange={(e) => setCari(e.target.value)}
            />

            {/* Filter dan Pengurutan */}
            <div className="filter-container">

                <div className="filter-group">
                    <label>Filter Kategori</label>

                    <select
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                    >
                        {daftarKategori.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>Urutkan Buku</label>

                    <select
                        value={urutkan}
                        onChange={(e) => setUrutkan(e.target.value)}
                    >
                        <option value="default">
                            Default
                        </option>

                        <option value="az">
                            Judul A-Z
                        </option>

                        <option value="terbaru">
                            Tahun Terbit Terbaru
                        </option>
                    </select>
                </div>

            </div>

            {/* Jumlah Buku */}
            <p className="jumlah-buku">
                Menampilkan {hasilFilter.length} buku
            </p>

            {/* Daftar Buku */}
            {hasilFilter.length > 0 ? (

                <div className="book-grid">

                    {hasilFilter.map((item) => (
                        <div className="book-wrapper" key={item.id}>

                            {item.terbaru && (
                                <span className="badge-terbaru">
                                    Terbaru
                                </span>
                            )}

                            <BookCard
                                buku={item}
                                favorit={favorit}
                                onToggle={onToggle}
                            />

                        </div>
                    ))}

                </div>

            ) : (

                <div className="buku-kosong">
                    <h2>Buku tidak ditemukan</h2>

                    <p>
                        Maaf, buku yang kamu cari tidak tersedia.
                        Coba gunakan kata kunci atau kategori lain.
                    </p>

                    <button
                        onClick={() => {
                            setCari("");
                            setKategori("Semua");
                            setUrutkan("default");
                        }}
                    >
                        Reset Pencarian
                    </button>
                </div>

            )}

        </div>
    );
}
