
import React, { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./assets/components/Navbar";
import Beranda from "./assets/pages/Beranda";
import Katalog from "./assets/pages/Katalog";
import DetailBuku from "./assets/pages/DetailBuku";
import Favorit from "./assets/pages/Favorit";
import AdminBuku from "./assets/components/AdminBuku";

function loadStorage(key, fallback = []) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
}

export default function App() {
    const [favorit, setFavorit] = useState(
        () => loadStorage("pustaka-favorit")
    );

    const [recent, setRecent] = useState(
        () => loadStorage("pustaka-recent")
    );

    const [bukuTambahan, setBukuTambahan] = useState(
        () => loadStorage("pustaka-buku-tambahan")
    );

    // Menambahkan buku baru
    function simpanBukuTambahan(data) {
        setBukuTambahan((old) => {
            const next = [...old, data];

            localStorage.setItem(
                "pustaka-buku-tambahan",
                JSON.stringify(next)
            );

            return next;
        });
    }

    // Mengedit buku
    function editBukuTambahan(data) {
        setBukuTambahan((old) => {
            const next = old.map((item) =>
                item.id === data.id ? data : item
            );

            localStorage.setItem(
                "pustaka-buku-tambahan",
                JSON.stringify(next)
            );

            return next;
        });
    }

    // Menghapus buku
    function hapusBukuTambahan(id) {
        setBukuTambahan((old) => {
            const next = old.filter((item) => item.id !== id);

            localStorage.setItem(
                "pustaka-buku-tambahan",
                JSON.stringify(next)
            );

            return next;
        });

        setFavorit((old) => {
            const next = old.filter((item) => item !== id);

            localStorage.setItem(
                "pustaka-favorit",
                JSON.stringify(next)
            );

            return next;
        });

        setRecent((old) => {
            const next = old.filter((item) => item !== id);

            localStorage.setItem(
                "pustaka-recent",
                JSON.stringify(next)
            );

            return next;
        });
    }

    // Menambah atau menghapus favorit
    function toggleFavorit(id) {
        setFavorit((old) => {
            const next = old.includes(id)
                ? old.filter((item) => item !== id)
                : [...old, id];

            localStorage.setItem(
                "pustaka-favorit",
                JSON.stringify(next)
            );

            return next;
        });
    }

    // Menyimpan riwayat buku yang dilihat
    function addRecent(id) {
        setRecent((old) => {
            const next = [
                id,
                ...old.filter((item) => item !== id)
            ].slice(0, 5);

            localStorage.setItem(
                "pustaka-recent",
                JSON.stringify(next)
            );

            return next;
        });
    }

    return (
        <BrowserRouter>
            <Navbar favoriteCount={favorit.length} />

            <Routes>
                <Route
                    path="/"
                    element={
                        <Beranda
                            favorit={favorit}
                            onToggle={toggleFavorit}
                            recent={recent}
                            bukuTambahan={bukuTambahan}
                        />
                    }
                />

                <Route
                    path="/katalog"
                    element={
                        <Katalog
                            favorit={favorit}
                            onToggle={toggleFavorit}
                            bukuTambahan={bukuTambahan}
                        />
                    }
                />

                <Route
                    path="/detail/:id"
                    element={
                        <DetailBuku
                            favorit={favorit}
                            onToggle={toggleFavorit}
                            onView={addRecent}
                            bukuTambahan={bukuTambahan}
                        />
                    }
                />

                <Route
                    path="/favorit"
                    element={
                        <Favorit
                            favorit={favorit}
                            onToggle={toggleFavorit}
                            bukuTambahan={bukuTambahan}
                        />
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <AdminBuku
                            buku={bukuTambahan}
                            onTambah={simpanBukuTambahan}
                            onEdit={editBukuTambahan}
                            onHapus={hapusBukuTambahan}
                        />
                    }
                />
            </Routes>

            <footer className="footer">
                <div className="footer-brand">
                    ✦ Pustaka Kita
                </div>

                <p>
                    Temukan cerita, pengetahuan, dan inspirasi
                    di setiap halaman.
                </p>

                <span>
                    © 2026 Pustaka Kita · Katalog Buku Digital
                </span>
            </footer>
        </BrowserRouter>
    );
}
