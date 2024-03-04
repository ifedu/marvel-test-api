"use client";

import Image from "next/image";
import { useFavorites } from "src/contexts/FavoritesContext";
import "./Header.css";

export default function Header() {
  const { favorites, showOnlyFavorites, setShowOnlyFavorites } = useFavorites();

  return (
    <header className="HeaderComponent">
      <Image
        className="logo"
        alt="Logo"
        height="52"
        src="/images/logo.png"
        width="130"
      />
      <button
        className="favorites"
        onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
        aria-label="Toggle favorite characters"
      >
        <Image
          src="/images/heart-fill.png"
          alt="Heart"
          width="24"
          height="24"
        />
        <span className="favoritesCount">{favorites.length}</span>
      </button>
    </header>
  );
}
