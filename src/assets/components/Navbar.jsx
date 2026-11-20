
import React from "react";
import { NavLink } from "react-router-dom";
import { BookOpen, Home, Heart, Library } from "lucide-react";

export default function Navbar({ favoriteCount = 0 }) {
    return (
        <nav className="navbar">
            <NavLink to="/" className="brand">
                <span className="brand-icon">
                    <BookOpen size={23} />
                </span>

                <span>
                    Pustaka Kita
                    <small>YOUR DIGITAL LIBRARY</small>
                </span>
            </NavLink>

            <div className="nav-links">
                <NavLink to="/" end>
                    <Home size={17} />
                    Beranda
                </NavLink>

                <NavLink to="/katalog">
                    <Library size={17} />
                    Katalog
                </NavLink>

                <NavLink to="/favorit">
                    <Heart size={17} />
                    Favorit
                    {favoriteCount > 0 && (
                        <span className="nav-count">
                            {favoriteCount}
                        </span>
                    )}
                </NavLink>
            </div>
        </nav>
    );
}
