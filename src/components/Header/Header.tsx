"use client";

import React from "react";
import Image from "next/image";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useFavorites } from "src/contexts/FavoritesContext";
import "./Header.css";

export default function Header() {
  const router = useRouter();
  const { favorites, setShowOnlyFavorites } = useFavorites();

  return (
    <header className="HeaderComponent">
      <button onClick={() => displayFavoritesAndGoToHome(router, false)}>
        <Image
          className="logo"
          alt="Logo"
          height="52"
          src="/images/logo.png"
          width="130"
        />
      </button>
      <button
        className="favorites"
        onClick={() => displayFavoritesAndGoToHome(router, true)}
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

  function displayFavoritesAndGoToHome(
    router: AppRouterInstance,
    display: boolean
  ) {
    setShowOnlyFavorites(display);
    router.push("/");
  }
}
