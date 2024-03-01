import Image from "next/image";
import React from "react";
import styles from "./CharacterCard.module.css";
import { useFavorites } from "src/contexts/FavoritesContext";
import { Character } from "src/models/character";

type CharacterCardProps = {
  character: Character;
};

export default function CharacterCard({ character }: CharacterCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(character);

  const handleFavoriteClick = () => {
    favorite ? removeFavorite(character) : addFavorite(character);
  };

  return (
    <div className={styles.card}>
      <Image
        alt={character.name}
        height="224"
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        width="224"
      />

      <div className={styles.description}>
        <span>{character.name}</span>
        <button onClick={handleFavoriteClick}>
          <Image
            src={favorite ? "/images/heart-fill.png" : "/images/heart.png"}
            alt="Heart"
            width="20"
            height="20"
          />
        </button>
      </div>
    </div>
  );
}
