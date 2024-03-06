import React from "react";
import FavoritesProvider, { useFavorites } from "src/contexts/FavoritesContext";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { characterMock } from "src/utils/mocks";

function TestFavoritesComponent() {
  const {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    setShowOnlyFavorites,
  } = useFavorites();

  return (
    <div>
      {favorites.map((fav) => (
        <div key={fav.id}>{fav.name}</div>
      ))}
      <button data-testid="add" onClick={() => addFavorite(characterMock)}>
        Add Spider-Man
      </button>
      <button
        data-testid="remove"
        onClick={() => removeFavorite(characterMock)}
      >
        Remove Spider-Man
      </button>
      <div data-testid="check">
        Is Spider-Man Favorite? {isFavorite(characterMock) ? "Yes" : "No"}
      </div>
      <button data-testid="show" onClick={() => setShowOnlyFavorites(true)}>
        Show Only Favorites
      </button>
    </div>
  );
}

describe("FavoritesContext", () => {
  it("allows adding and removing favorites", () => {
    render(
      <FavoritesProvider>
        <TestFavoritesComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByTestId("add"));
    expect(screen.getByTestId("check")).toHaveTextContent("Yes");
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("remove"));
    expect(screen.queryByText("Spider-Man")).not.toBeInTheDocument();
    expect(screen.getByTestId("check")).toHaveTextContent("No");
  });

  it("toggles show only favorites", () => {
    render(
      <FavoritesProvider>
        <TestFavoritesComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByTestId("show"));
  });
});
