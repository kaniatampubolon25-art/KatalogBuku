import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Home, Heart } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="navbar">
            <h2>
                <BookOpen size={25} />
                Pustaka Kita
            </h2>

            <div className="nav-links">
                <Link to="/">
                    <Home size={18} /> Beranda
                </Link>

                <Link to="/katalog">
                    <BookOpen size={18} /> Katalog
                </Link>

                <Link to="/favorit">
                    <Heart size={18} /> Favorit
                </Link>
            </div>
        </nav>
    );
}