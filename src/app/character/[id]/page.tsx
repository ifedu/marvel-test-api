"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import "./page.css";
import { useFavorites } from "src/contexts/FavoritesContext";
import { useCharacterDetails } from "src/hooks/useCharacterDetails";
import { Comic } from "src/models/comic";

export default function CharacterPage() {
  const { id } = useParams();
  const { character, comics, loading } = useCharacterDetails(id as string);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(character!);

  if (!character) return <p>Loading...</p>;

  return (
    <div className="CharacterPage">
      <div className="container-header">
        <div className="header">
          <Image
            src={character.img}
            alt={character.name}
            width={384}
            height={384}
          />

          <article>
            <div className="title">
              <h1>{character.name}</h1>
              <button
                onClick={() =>
                  isFavorite(character)
                    ? removeFavorite(character)
                    : addFavorite(character)
                }
              >
                <Image
                  src={
                    favorite ? "/images/heart-fill.png" : "/images/heart.png"
                  }
                  alt="Heart"
                  width="24"
                  height="24"
                />
              </button>
            </div>
            <p>{character.description}</p>
          </article>
        </div>
      </div>

      <section>
        <h2 className="title">COMICS</h2>
        <div className="comics">{renderComics(comics)}</div>
      </section>
    </div>
  );

  function renderComics(comics: Comic[]) {
    return comics.map((comic) => {
      return (
        <div key={comic.id} className="comic">
          <Image src={comic.img} alt={comic.title} width={180} height={270} />
          <span className="comicTitle">{comic.title}</span>
          <span className="year">{comic.year}</span>
        </div>
      );
    });
  }
}
