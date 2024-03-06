import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import { useRouter } from "next/navigation";
import { useFavorites } from "src/contexts/FavoritesContext";
import Header from "src/components/Header/Header";
import { characterMock } from "src/utils/mocks";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
const push = jest.fn();
(jest.mocked(useRouter) as any).mockImplementation(() => ({
  push,
}));

jest.mock("src/contexts/FavoritesContext", () => ({
  useFavorites: jest.fn(),
}));
const setShowOnlyFavorites = jest.fn();
(jest.mocked(useFavorites) as any).mockImplementation(() => ({
  favorites: [characterMock, { ...characterMock, id: 2 }],
  setShowOnlyFavorites,
}));

describe("Header Component", () => {
  it("renders correctly with favorite count", () => {
    render(<Header />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByAltText("Heart")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("navigates to home on logo click", () => {
    render(<Header />);
    fireEvent.click(screen.getByAltText("Logo"));
    expect(push).toHaveBeenCalledWith("/");
  });

  it("shows only favorites when heart icon is clicked", () => {
    render(<Header />);
    fireEvent.click(screen.getByAltText("Heart"));
    expect(setShowOnlyFavorites).toHaveBeenCalledWith(true);
  });
});
