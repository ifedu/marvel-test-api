import { useState, useEffect } from "react";
import { Character } from "src/models/character";
import { Comic } from "src/models/comic";
import {
  fetchCharacterComics,
  fetchCharacterDetails,
} from "src/repositories/CharacterRepository";

export const useCharacterDetails = (characterId: string) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!characterId) return;
      setLoading(true);
      try {
        const characterData = await fetchCharacterDetails(characterId);
        const comicsData = await fetchCharacterComics(characterId);
        setCharacter(characterData);
        setComics(comicsData);
      } catch (error) {
        console.error("Error fetching character data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [characterId]);

  return { character, comics, loading };
};
