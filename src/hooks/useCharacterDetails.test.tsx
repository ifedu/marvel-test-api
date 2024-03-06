import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { useCharacterDetails } from "src/hooks/useCharacterDetails";
import {
  getCharacterDetails,
  getCharacterComics,
} from "src/use-cases/characterUseCases";
import { characterMock, comicMock } from "src/utils/mocks";

jest.mock("src/use-cases/characterUseCases");

const mockedGetCharacterDetails = getCharacterDetails as jest.MockedFunction<
  typeof getCharacterDetails
>;
const mockedGetCharacterComics = getCharacterComics as jest.MockedFunction<
  typeof getCharacterComics
>;
mockedGetCharacterDetails.mockResolvedValue(characterMock);
mockedGetCharacterComics.mockResolvedValue([comicMock]);

function MockComponent({ characterId }: any) {
  const { character, comics, loading } = useCharacterDetails(characterId);

  if (loading) return <div>Loading...</div>;
  if (!character) return <div>No Character Found</div>;

  return (
    <div>
      <h1 data-testid="character-name">{character.name}</h1>
      <ul data-testid="comics-list">
        {comics.map((comic) => (
          <li key={comic.id}>{comic.title}</li>
        ))}
      </ul>
    </div>
  );
}

describe("useCharacterDetails", () => {
  it("renders character details and comics", async () => {
    const { getByTestId } = render(<MockComponent characterId="1" />);

    await waitFor(() => {
      expect(getByTestId("character-name")).toHaveTextContent("Spider-Man");
      expect(getByTestId("comics-list").children.length).toBeGreaterThan(0);
    });
  });
});
