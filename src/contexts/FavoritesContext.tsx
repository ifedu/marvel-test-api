"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { Character } from "src/models/character";

type FavoritesContextType = {
  favorites: Character[];
  addFavorite: (character: Character) => void;

  removeFavorite: (character: Character) => void;
  isFavorite: (character: Character) => boolean;

  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (show: boolean) => void;
};

type FavoritesProviderProps = {
  children: ReactNode;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export default function FavoritesProvider({
  children,
}: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  function addFavorite(character: Character) {
    setFavorites((prevFavorites) => [...prevFavorites, character]);
  }

  function removeFavorite(character: Character) {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== character.id)
    );
  }

  function isFavorite(character: Character) {
    return favorites.some((fav) => fav?.id === character?.id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,

        removeFavorite,
        isFavorite,

        showOnlyFavorites,
        setShowOnlyFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}
