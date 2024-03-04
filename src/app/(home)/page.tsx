"use client";

import React, { useState } from "react";
import "./page.css";
import CharacterCard from "src/components/CharacterCard/CharacterCard";
import SearchBar from "src/components/SearchBar/SearchBar";
import { useFavorites } from "src/contexts/FavoritesContext";
import useCharacters from "src/hooks/useCharacters";
import { Character } from "src/models/character";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { characters } = useCharacters(searchQuery);
  const { favorites, showOnlyFavorites } = useFavorites();

  const displayedCharacters = showOnlyFavorites ? favorites : characters;

  function renderCharacters(charactersToRender: Character[]) {
    return charactersToRender.map((character) => (
      <CharacterCard key={character.id} character={character} />
    ));
  }

  return (
    <div className="HomePage">
      <SearchBar onSearch={setSearchQuery} resultsCount={characters.length} />

      <div className="characterGrid">
        {renderCharacters(displayedCharacters)}
      </div>
    </div>
  );
}
