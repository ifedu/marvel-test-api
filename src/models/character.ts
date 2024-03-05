export interface CharacterAPI {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface Character {
  description: string;
  id: number;
  img: string;
  name: string;
}
