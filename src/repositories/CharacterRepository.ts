import axios from "axios";
import { Character } from "src/models/character";
import { Comic } from "src/models/comic";
import { MARVEL_API_BASE_URL, MARVEL_API_KEY } from "src/utils/constants";

export const fetchCharacters = async (
  searchQuery: string
): Promise<Character[]> => {
  try {
    const response = await axios.get(`${MARVEL_API_BASE_URL}/characters`, {
      params: {
        apikey: MARVEL_API_KEY!,
        ...(searchQuery && { nameStartsWith: searchQuery }),
        limit: "50",
      },
    });

    return response.data.data.results;
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
      params: {
        apikey: MARVEL_API_KEY,
        limit: "20",
        orderBy: "onsaleDate",
      },
    }
  );

  return response.data.data.results;
};
