import {
  fetchCharacters,
  fetchCharacterDetails,
  fetchCharacterComics,
} from "src/repositories/CharacterRepository";
import { Character } from "src/models/character";
import { Comic } from "src/models/comic";

export async function getCharacters(searchQuery: string): Promise<Character[]> {
  const charactersAPI = await fetchCharacters(searchQuery);

  return charactersAPI.map((character) => {
    return {
      description: character.description,
      id: character.id,
      img: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      name: character.name,
    };
  });
}

export async function getCharacterDetails(
  characterId: string
): Promise<Character> {
  const characterDetailAPI = await fetchCharacterDetails(characterId);

  return {
    description: characterDetailAPI.description,
    id: characterDetailAPI.id,
    img: `${characterDetailAPI.thumbnail.path}.${characterDetailAPI.thumbnail.extension}`,
    name: characterDetailAPI.name,
  };
}

export async function getCharacterComics(
  characterId: string
): Promise<Comic[]> {
  const comicsAPI = await fetchCharacterComics(characterId);

  return comicsAPI.map((comic) => {
    return {
      id: comic.id,
      img: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      title: comic.title,
      year: new Date(comic.dates[0].date).getFullYear().toString(),
    };
  });
}
