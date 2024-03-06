import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "src/components/SearchBar/SearchBar";

describe("SearchBar Component", () => {
  it("renders correctly", () => {
    render(<SearchBar onSearch={jest.fn()} resultsCount={0} />);
    expect(
      screen.getByPlaceholderText(/search a character.../i)
    ).toBeInTheDocument();
    expect(screen.getByText("0 RESULTS")).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    render(<SearchBar onSearch={jest.fn()} resultsCount={0} />);
    const input = screen.getByPlaceholderText(/search a character.../i);
    await userEvent.type(input, "Spider-Man");
    expect(input).toHaveValue("Spider-Man");
  });

  it("calls onSearch with the correct value when form is submitted", async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} resultsCount={0} />);

    const input = screen.getByPlaceholderText(/search a character.../i);
    await userEvent.type(input, "Spider-Man");
    fireEvent.submit(input);

    expect(mockOnSearch).toHaveBeenCalledWith("Spider-Man");
  });

  it("displays the correct results count", () => {
    render(<SearchBar onSearch={jest.fn()} resultsCount={15} />);
    expect(screen.getByText("15 RESULTS")).toBeInTheDocument();
  });
});
