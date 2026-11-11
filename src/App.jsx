import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./assets/components/Navbar";
import Beranda from "./assets/pages/Beranda";
import Katalog from "./assets/pages/Katalog";
import DetailBuku from "./assets/pages/DetailBuku";
import Favorit from "./assets/pages/Favorit";

export default function App() {
    const [favorit, setFavorit] = useState([]);

    function toggleFavorit(id) {
        if (favorit.includes(id)) {
            setFavorit(favorit.filter((item) => item !== id));
        } else {
            setFavorit([...favorit, id]);
        }
    }

    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={
                        <Beranda
                            favorit={favorit}
                            onToggle={toggleFavorit}
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
                    element={<DetailBuku />}
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
                © 2026 Pustaka Kita | Katalog Buku Digital
            </footer>
        </BrowserRouter>
    );
}