"use client";

import Image from "next/image";
import React, { useState } from "react";
import styles from "./page.module.css";
import CharacterCard from "src/components/CharacterCard/CharacterCard";
import SearchBar from "src/components/SearchBar/SearchBar";
import { useFavorites } from "src/contexts/FavoritesContext";
import useCharacters from "src/hooks/useCharacters";
import { Character } from "src/models/character";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { characters } = useCharacters(searchQuery);
  const { favorites, showOnlyFavorites, setShowOnlyFavorites } = useFavorites();

  const displayedCharacters = showOnlyFavorites ? favorites : characters;

  function renderCharacters(charactersToRender: Character[]) {
    return charactersToRender.map((character) => (
      <CharacterCard key={character.id} character={character} />
    ));
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          className={styles.logo}
          alt="Logo"
          height="52"
          src="/images/logo.png"
          width="130"
        />
        <button
          className={styles.favorites}
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          aria-label="Toggle favorite characters"
        >
          <Image
            src="/images/heart-fill.png"
            alt="Heart"
            width="24"
            height="24"
          />
          <span className={styles.favoritesCount}>{favorites.length}</span>
        </button>
      </header>

      <SearchBar onSearch={setSearchQuery} resultsCount={characters.length} />

      <div className={styles.characterGrid}>
        {renderCharacters(displayedCharacters)}
      </div>
    </div>
  );
}
