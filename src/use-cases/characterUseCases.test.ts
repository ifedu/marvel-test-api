import "@testing-library/jest-dom";
import { fetchCharacters } from "src/repositories/CharacterRepository";
import { getCharacters } from "src/use-cases/characterUseCases";
import { characterAPIMock } from "src/utils/mocks";

jest.mock("src/repositories/CharacterRepository", () => ({
  fetchCharacters: jest.fn(),
}));

const mockedFetchCharacters = fetchCharacters as jest.MockedFunction<
  typeof fetchCharacters
>;

describe("getCharacters", () => {
  it("transforms API data to Character model", async () => {
    mockedFetchCharacters.mockResolvedValueOnce([characterAPIMock]);
    const result = await getCharacters("spider");
    expect(result).toEqual([
      {
        id: 1,
        name: "Spider-Man",
        description: "Friendly neighborhood",
        img: "http://example.com/spidey.jpg",
      },
    ]);
  });
});
