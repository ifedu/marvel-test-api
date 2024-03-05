import { useState, useEffect } from "react";
import { Character } from "src/models/character";
import { getCharacters } from "src/use-cases/characterUseCases";

export default function useCharacters(searchQuery: string) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const characters: any = await getCharacters(searchQuery);
        setCharacters(characters);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacters();
  }, [searchQuery]);

  return { characters, isLoading, error };
}
