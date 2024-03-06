import axios from "axios";
import {
  fetchCharacters,
  fetchCharacterDetails,
  fetchCharacterComics,
} from "src/repositories/CharacterRepository";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("CharacterRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchCharacters makes a GET call and returns characters", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: { results: [{ id: 1, name: "Spider-Man" }] } },
    });

    const characters = await fetchCharacters("Spider-Man");

    expect(characters).toEqual([{ id: 1, name: "Spider-Man" }]);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/characters"),
      expect.any(Object)
    );
  });

  it("fetchCharacterDetails makes a GET call and returns character details", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: { results: [{ id: 1, name: "Spider-Man" }] } },
    });

    const character = await fetchCharacterDetails("1");
    expect(character).toEqual({ id: 1, name: "Spider-Man" });
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/characters/1"),
      expect.any(Object)
    );
  });

  it("fetchCharacterComics makes a GET call and returns character comics", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: { results: [{ id: 1, title: "Comic 1" }] } },
    });

    const comics = await fetchCharacterComics("1");

    expect(comics).toEqual([{ id: 1, title: "Comic 1" }]);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/characters/1/comics"),
      expect.any(Object)
    );
  });
});
