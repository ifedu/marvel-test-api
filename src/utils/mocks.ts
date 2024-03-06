import { Character, CharacterAPI } from "src/models/character";
import { Comic, ComicAPI } from "src/models/comic";

export const characterMock: Character = {
  description: "Friendly neighborhood",
  id: 1,
  img: "http://example.com/spidey.jpg",
  name: "Spider-Man",
};

export const characterAPIMock: CharacterAPI = {
  description: "Friendly neighborhood",
  id: 1,
  thumbnail: {
    path: "http://example.com/spidey",
    extension: "jpg",
  },
  name: "Spider-Man",
};

export const comicMock: Comic = {
  id: 1,
  img: "http://example.com/comic.jpg",
  title: "Comic 1",
  year: "2024",
};

export const comicAPIMock: ComicAPI = {
  id: 1,
  thumbnail: {
    path: "http://example.com/comic",
    extension: "jpg",
  },
  title: "Comic 1",
  dates: [{ date: "2024" }],
};
