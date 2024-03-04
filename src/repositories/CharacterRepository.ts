import axios from "axios";
import { Character } from "src/models/character";
import { Comic } from "src/models/comic";
import { MARVEL_API_BASE_URL, MARVEL_API_KEY } from "src/utils/constants";

export const fetchCharacters = async (
  searchQuery: string
): Promise<Character[]> => {
  try {
    const params = new URLSearchParams({
      apikey: MARVEL_API_KEY!,
      ...(searchQuery && { nameStartsWith: searchQuery }),
      limit: "50",
    });

    const response = await axios.get(
      `${MARVEL_API_BASE_URL}/characters?${params}`
    );

    const characters = response.data.data.results.map(
      (item: any): Character => ({
        id: item.id,
        name: item.name,
        description: item.description,
        thumbnail: {
          path: item.thumbnail.path,
          extension: item.thumbnail.extension,
        },
      })
    );

    return characters;
  } catch (error) {
    console.error("Error fetching characters from Marvel API:", error);
    throw new Error("Failed to fetch characters");
  }
};

export const fetchCharacterDetails = async (
  characterId: string
): Promise<Character> => {
  const response = await axios.get(
    `${MARVEL_API_BASE_URL}/characters/${characterId}`,
    {
      params: { apikey: MARVEL_API_KEY },
    }
  );

  return response.data.data.results[0];
};

export const fetchCharacterComics = async (
  characterId: string
): Promise<Comic[]> => {
  const response = await axios.get(
    `${MARVEL_API_BASE_URL}/characters/${characterId}/comics`,
    {
      params: { apikey: MARVEL_API_KEY },
    }
  );

  return response.data.data.results;
};
