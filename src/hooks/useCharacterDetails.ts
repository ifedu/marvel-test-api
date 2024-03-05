import { useState, useEffect } from "react";
import { Character } from "src/models/character";
import { Comic } from "src/models/comic";
import {
  getCharacterComics,
  getCharacterDetails,
} from "src/use-cases/characterUseCases";

export const useCharacterDetails = (characterId: string) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!characterId) return;
      setLoading(true);
      try {
        const characterData = await getCharacterDetails(characterId);
        const comicsData = await getCharacterComics(characterId);
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
