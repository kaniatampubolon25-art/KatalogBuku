import React from "react";
import { buku } from "../data/Buku";
import BookCard from "../components/BookCard";

export default function Favorit({ favorit, onToggle }) {
    const daftarFavorit = buku.filter((item) =>
        favorit.includes(item.id)
    );

    return (
        <div className="container">
            <h1 className="section-title">Buku Favorit</h1>

            {daftarFavorit.length > 0 ? (
                <div className="book-grid">
                    {daftarFavorit.map((item) => (
                        <BookCard
                            key={item.id}
                            buku={item}
                            favorit={favorit}
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            ) : (
                <p>Belum ada buku favorit.</p>
            )}
        </div>
    );
}