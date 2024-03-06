import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { getCharacters } from "src/use-cases/characterUseCases";
import useCharacters from "./useCharacters";

jest.mock("src/use-cases/characterUseCases", () => ({
  getCharacters: jest.fn(),
}));

const mockedGetCharacters = getCharacters as jest.MockedFunction<
  typeof getCharacters
>;

const MockComponent = ({ searchQuery }: any) => {
  const { characters, isLoading, error } = useCharacters(searchQuery);

  return (
    <div>
      {isLoading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error.message}</div>}
      <ul data-testid="character-list">
        {characters.map((char) => (
          <li key={char.id}>{char.name}</li>
        ))}
      </ul>
    </div>
  );
};

describe("useCharacters", () => {
  it("shows characters when loading is successful", async () => {
    const characters = [
      { id: 1, name: "Spider-Man", description: "", img: "" },
    ];
    mockedGetCharacters.mockResolvedValueOnce(characters);

    render(<MockComponent searchQuery="Spider-Man" />);

    await waitFor(() =>
      expect(screen.getByTestId("character-list")).not.toBeEmptyDOMElement()
    );
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  });

  it("shows an error message when the upload fails", async () => {
    mockedGetCharacters.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<MockComponent searchQuery="Bad Query" />);

    expect(screen.getByTestId("loading")).toHaveTextContent("Loading...");
    await waitFor(() =>
      expect(screen.getByTestId("error")).toBeInTheDocument()
    );
    expect(screen.getByTestId("error")).toHaveTextContent("Failed to fetch");
  });
});
