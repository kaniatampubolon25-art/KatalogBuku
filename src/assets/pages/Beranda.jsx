import React from "react";
import { Link } from "react-router-dom";
import { buku } from "../data/Buku";
import BookCard from "../components/BookCard";

export default function Beranda({ favorit, onToggle }) {
    return (
        <div className="container">
            <section className="hero">
                <h1>Selamat Datang di BookSpace</h1>
                <p>Temukan berbagai buku menarik untuk menambah pengetahuan dan inspirasi.</p>

                <Link to="/katalog" className="btn-primary">
                    Lihat Katalog
                </Link>
            </section>

            <section>
                <h2 className="section-title">Buku Pilihan</h2>

                <div className="book-grid">
                    {buku.slice(0, 4).map((item) => (
                        <BookCard
                            key={item.id}
                            buku={item}
                            favorit={favorit}
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}