
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
                        />
                    }
                />

                <Route
                    path="/katalog"
                    element={
                        <Katalog
                            favorit={favorit}
                            onToggle={toggleFavorit}
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
                        />
                    }
                />

                <Route
                    path="/favorit"
                    element={
                        <Favorit
                            favorit={favorit}
                            onToggle={toggleFavorit}
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
