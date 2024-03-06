import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import CharacterCard from "src/components/CharacterCard/CharacterCard";
import { useFavorites } from "src/contexts/FavoritesContext";
import { characterMock } from "src/utils/mocks";

const addFavorite = jest.fn();
const isFavorite = jest.fn();
const removeFavorite = jest.fn();
jest.mock("src/contexts/FavoritesContext", () => ({
  useFavorites: jest.fn(),
}));
(jest.mocked(useFavorites) as any).mockImplementation(() => ({
  addFavorite,
  isFavorite,
  removeFavorite,
}));

describe("CharacterCard", () => {
  beforeEach(() => {
    isFavorite.mockReturnValue(true);
  });

  it("renders character information", () => {
    render(<CharacterCard character={characterMock} />);

    expect(screen.getByAltText("Spider-Man")).toBeInTheDocument();
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  });

  it("addFavorite is called when isn't favorite and the heart is clicked", () => {
    isFavorite.mockReturnValue(false);

    render(<CharacterCard character={characterMock} />);
    const favoriteButton = screen.getByAltText("Heart");

    fireEvent.click(favoriteButton);
    expect(addFavorite).toHaveBeenCalledWith(characterMock);
  });

  it("removeFavorite is called when is favorite and the heart is clicked", () => {
    render(<CharacterCard character={characterMock} />);
    const favoriteButton = screen.getByAltText("Heart");

    fireEvent.click(favoriteButton);
    expect(removeFavorite).toHaveBeenCalledWith(characterMock);
  });

  it("displays filled heart icon for favorite character", () => {
    render(<CharacterCard character={characterMock} />);
    const favoriteButton = screen.getByAltText("Heart");
    expect(favoriteButton).toHaveAttribute(
      "src",
      "/_next/image?url=%2Fimages%2Fheart-fill.png&w=48&q=75"
    );
  });
});
