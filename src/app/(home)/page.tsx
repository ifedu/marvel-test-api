"use client";

import React from "react";
import "./page.css";
import CharacterCard from "src/components/CharacterCard/CharacterCard";
import SearchBar from "src/components/SearchBar/SearchBar";
import { useFavorites } from "src/contexts/FavoritesContext";
import useCharacters from "src/hooks/useCharacters";
import { Character } from "src/models/character";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { characters } = useCharacters(searchQuery);
  const { favorites, showOnlyFavorites } = useFavorites();

  const charactersToRender: Character[] = showOnlyFavorites
    ? favorites
    : characters;

  function renderCharacters() {
    return charactersToRender.map((character) => (
      <CharacterCard key={character.id} character={character} />
    ));
  }

  return (
    <div className="HomePage">
      {showOnlyFavorites && <h1>Favorites</h1>}
      <SearchBar
        onSearch={setSearchQuery}
        resultsCount={charactersToRender.length}
      />

      <div className="characterGrid">{renderCharacters()}</div>
    </div>
  );
}
