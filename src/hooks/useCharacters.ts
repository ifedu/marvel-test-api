import React, { useEffect } from "react";
import { Character } from "src/models/character";
import { getCharacters } from "src/use-cases/characterUseCases";

export default function useCharacters(searchQuery: string) {
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

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
